import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { prisma } from '../utils/prisma.js';
import { redis, sessionStore } from '../utils/redis.js';
import { 
  UnauthorizedError, 
  ConflictError, 
  NotFoundError,
  AppError 
} from '../middleware/errorHandler.js';
import { logger } from '../utils/logger.js';

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  referralCode?: string;
}

interface TelegramAuthData {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  auth_date: number;
  hash: string;
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export class AuthService {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;
  private readonly refreshExpiresIn: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'secret';
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';
    this.refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '30d';
  }

  async register(data: RegisterData) {
    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          ...(data.phone ? [{ phone: data.phone }] : []),
        ],
      },
    });

    if (existingUser) {
      throw new ConflictError('Пользователь с таким email или телефоном уже существует');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 12);

    // Create user with profile
    const user = await prisma.user.create({
      data: {
        email: data.email,
        phone: data.phone,
        passwordHash,
        profile: {
          create: {
            firstName: data.firstName,
            lastName: data.lastName,
            displayName: `${data.firstName} ${data.lastName}`,
          },
        },
        bodyAvatar: {
          create: {
            bodyShape: {},
            muscleGroups: {},
            goals: { primary: [], secondary: [] },
          },
        },
      },
      include: {
        profile: true,
      },
    });

    // Handle referral
    if (data.referralCode) {
      await this.handleReferral(data.referralCode, user.id);
    }

    // Generate referral code for new user
    await prisma.referralCode.create({
      data: {
        userId: user.id,
        code: this.generateReferralCode(user.id),
      },
    });

    // Generate tokens
    const tokens = this.generateTokens(user.id, user.email, user.role);

    // Store session
    await sessionStore.setSession(user.id, {
      refreshToken: tokens.refreshToken,
      createdAt: new Date().toISOString(),
    });

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    logger.info(`New user registered: ${user.email}`);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: user.profile,
      },
      ...tokens,
    };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!user) {
      throw new UnauthorizedError('Неверный email или пароль');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Аккаунт заблокирован');
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      throw new UnauthorizedError('Неверный email или пароль');
    }

    // Generate tokens
    const tokens = this.generateTokens(user.id, user.email, user.role);

    // Store session
    await sessionStore.setSession(user.id, {
      refreshToken: tokens.refreshToken,
      createdAt: new Date().toISOString(),
    });

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    logger.info(`User logged in: ${user.email}`);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: user.profile,
        tokenBalance: user.tokenBalance,
        walletAddress: user.walletAddress,
      },
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string): Promise<TokenPair> {
    try {
      const decoded = jwt.verify(refreshToken, this.jwtSecret) as {
        userId: string;
        type: string;
      };

      if (decoded.type !== 'refresh') {
        throw new UnauthorizedError('Недействительный refresh token');
      }

      // Verify token in session store
      const session = await sessionStore.getSession<{ refreshToken: string }>(decoded.userId);

      if (!session || session.refreshToken !== refreshToken) {
        throw new UnauthorizedError('Сессия не найдена');
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user || !user.isActive) {
        throw new UnauthorizedError('Пользователь не найден');
      }

      // Generate new tokens
      const tokens = this.generateTokens(user.id, user.email, user.role);

      // Update session
      await sessionStore.setSession(user.id, {
        refreshToken: tokens.refreshToken,
        createdAt: new Date().toISOString(),
      });

      return tokens;
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw error;
      }
      throw new UnauthorizedError('Недействительный refresh token');
    }
  }

  async logout(userId: string): Promise<void> {
    await sessionStore.deleteSession(userId);
    logger.info(`User logged out: ${userId}`);
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Don't reveal if user exists
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Store token in Redis (expires in 1 hour)
    await redis.setex(`password_reset:${hashedToken}`, 3600, user.id);

    // TODO: Send email with reset link
    // await emailService.sendPasswordReset(user.email, resetToken);

    logger.info(`Password reset requested for: ${email}`);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const userId = await redis.get(`password_reset:${hashedToken}`);

    if (!userId) {
      throw new AppError('Недействительный или просроченный токен', 400);
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    // Delete reset token
    await redis.del(`password_reset:${hashedToken}`);

    // Invalidate all sessions
    await sessionStore.deleteSession(userId);

    logger.info(`Password reset for user: ${userId}`);
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundError('Пользователь');
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash);

    if (!isValidPassword) {
      throw new UnauthorizedError('Неверный текущий пароль');
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    logger.info(`Password changed for user: ${userId}`);
  }

  async verifyEmail(token: string): Promise<void> {
    const userId = await redis.get(`email_verify:${token}`);

    if (!userId) {
      throw new AppError('Недействительный или просроченный токен', 400);
    }

    await prisma.user.update({
      where: { id: userId },
      data: { isEmailVerified: true },
    });

    await redis.del(`email_verify:${token}`);

    logger.info(`Email verified for user: ${userId}`);
  }

  async resendVerificationEmail(userId: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundError('Пользователь');
    }

    if (user.isEmailVerified) {
      throw new AppError('Email уже подтвержден', 400);
    }

    // Generate verification token
    const verifyToken = crypto.randomBytes(32).toString('hex');
    await redis.setex(`email_verify:${verifyToken}`, 86400, userId); // 24 hours

    // TODO: Send email
    // await emailService.sendVerification(user.email, verifyToken);

    logger.info(`Verification email resent to: ${user.email}`);
  }

  async telegramAuth(data: TelegramAuthData) {
    // Verify Telegram auth hash
    if (!this.verifyTelegramAuth(data)) {
      throw new UnauthorizedError('Недействительные данные авторизации Telegram');
    }

    // Check if auth_date is not too old (24 hours)
    if (Date.now() / 1000 - data.auth_date > 86400) {
      throw new UnauthorizedError('Данные авторизации устарели');
    }

    // Find or create user
    let telegramUser = await prisma.telegramUser.findUnique({
      where: { telegramId: data.id.toString() },
    });

    let user;

    if (telegramUser) {
      user = await prisma.user.findUnique({
        where: { id: telegramUser.userId },
        include: { profile: true },
      });
    } else {
      // Create new user
      const email = `telegram_${data.id}@nexusvita.io`;
      
      user = await prisma.user.create({
        data: {
          email,
          passwordHash: await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 12),
          profile: {
            create: {
              firstName: data.first_name || 'Telegram',
              lastName: data.last_name || 'User',
              displayName: data.username || `User${data.id}`,
            },
          },
          bodyAvatar: {
            create: {
              bodyShape: {},
              muscleGroups: {},
              goals: { primary: [], secondary: [] },
            },
          },
        },
        include: { profile: true },
      });

      await prisma.telegramUser.create({
        data: {
          userId: user.id,
          telegramId: data.id.toString(),
          username: data.username,
          firstName: data.first_name,
          lastName: data.last_name,
          authDate: new Date(data.auth_date * 1000),
          authHash: data.hash,
        },
      });

      // Create referral code
      await prisma.referralCode.create({
        data: {
          userId: user.id,
          code: this.generateReferralCode(user.id),
        },
      });
    }

    if (!user || !user.isActive) {
      throw new UnauthorizedError('Аккаунт не активен');
    }

    // Generate tokens
    const tokens = this.generateTokens(user.id, user.email, user.role);

    await sessionStore.setSession(user.id, {
      refreshToken: tokens.refreshToken,
      createdAt: new Date().toISOString(),
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: user.profile,
      },
      ...tokens,
      isNewUser: !telegramUser,
    };
  }

  async getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        bodyAvatar: true,
        trainerProfile: true,
        doctorProfile: true,
        psychologistProfile: true,
        sexologistProfile: true,
        nutritionistProfile: true,
      },
    });

    if (!user) {
      throw new NotFoundError('Пользователь');
    }

    // Get referral code
    const referralCode = await prisma.referralCode.findUnique({
      where: { userId },
    });

    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
      tokenBalance: user.tokenBalance,
      walletAddress: user.walletAddress,
      profile: user.profile,
      bodyAvatar: user.bodyAvatar,
      trainerProfile: user.trainerProfile,
      doctorProfile: user.doctorProfile,
      psychologistProfile: user.psychologistProfile,
      sexologistProfile: user.sexologistProfile,
      nutritionistProfile: user.nutritionistProfile,
      referralCode: referralCode?.code,
      createdAt: user.createdAt,
    };
  }

  private generateTokens(userId: string, email: string, role: string): TokenPair {
    const accessToken = jwt.sign(
      { userId, email, role },
      this.jwtSecret,
      { expiresIn: this.jwtExpiresIn }
    );

    const refreshToken = jwt.sign(
      { userId, type: 'refresh' },
      this.jwtSecret,
      { expiresIn: this.refreshExpiresIn }
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: this.parseExpiresIn(this.jwtExpiresIn),
    };
  }

  private parseExpiresIn(expiresIn: string): number {
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match) return 604800; // 7 days default

    const value = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
      case 's': return value;
      case 'm': return value * 60;
      case 'h': return value * 3600;
      case 'd': return value * 86400;
      default: return 604800;
    }
  }

  private verifyTelegramAuth(data: TelegramAuthData): boolean {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) return false;

    const { hash, ...authData } = data;

    const dataCheckString = Object.keys(authData)
      .sort()
      .map(key => `${key}=${authData[key as keyof typeof authData]}`)
      .join('\n');

    const secretKey = crypto.createHash('sha256').update(botToken).digest();
    const computedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    return computedHash === hash;
  }

  private generateReferralCode(userId: string): string {
    const hash = crypto.createHash('md5').update(userId).digest('hex');
    return `NV${hash.substring(0, 8).toUpperCase()}`;
  }

  private async handleReferral(referralCode: string, newUserId: string): Promise<void> {
    const referrer = await prisma.referralCode.findUnique({
      where: { code: referralCode },
    });

    if (!referrer || referrer.userId === newUserId) {
      return;
    }

    await prisma.referral.create({
      data: {
        referrerId: referrer.userId,
        referredId: newUserId,
        referralCode,
        status: 'pending',
      },
    });

    // Update referral code usage
    await prisma.referralCode.update({
      where: { code: referralCode },
      data: { usageCount: { increment: 1 } },
    });

    logger.info(`Referral created: ${referrer.userId} -> ${newUserId}`);
  }
}


