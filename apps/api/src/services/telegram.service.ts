import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';
import crypto from 'crypto';
import axios from 'axios';

interface TelegramUserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

interface TelegramInitData {
  query_id?: string;
  user?: TelegramUserData;
  auth_date: number;
  hash: string;
  start_param?: string; // Реферальный код
}

export class TelegramService {
  private botToken: string;
  private botApiUrl: string;

  constructor() {
    this.botToken = process.env.TELEGRAM_BOT_TOKEN || '';
    this.botApiUrl = `https://api.telegram.org/bot${this.botToken}`;
  }

  /**
   * Verify Telegram init data hash
   */
  private verifyInitData(initData: string): boolean {
    try {
      const botToken = process.env.TELEGRAM_BOT_TOKEN || '';
      const secretKey = crypto
        .createHmac('sha256', 'WebAppData')
        .update(botToken)
        .digest();

      const urlParams = new URLSearchParams(initData);
      const hash = urlParams.get('hash');
      urlParams.delete('hash');

      const dataCheckString = Array.from(urlParams.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

      const calculatedHash = crypto
        .createHmac('sha256', secretKey)
        .update(dataCheckString)
        .digest('hex');

      return calculatedHash === hash;
    } catch (error) {
      logger.error(`Error verifying init data: ${error}`);
      return false;
    }
  }

  /**
   * Parse Telegram init data
   */
  private parseInitData(initData: string): TelegramInitData | null {
    if (!this.verifyInitData(initData)) {
      return null;
    }

    const params = new URLSearchParams(initData);
    const userStr = params.get('user');
    
    return {
      query_id: params.get('query_id') || undefined,
      user: userStr ? JSON.parse(userStr) : undefined,
      auth_date: parseInt(params.get('auth_date') || '0'),
      hash: params.get('hash') || '',
      start_param: params.get('start_param') || undefined, // Реферальный код
    };
  }

  /**
   * Authenticate user via Telegram Mini App
   */
  async authenticateMiniApp(initData: string) {
    const parsed = this.parseInitData(initData);
    if (!parsed || !parsed.user) {
      throw new Error('Invalid init data');
    }

    const { user, start_param } = parsed;

    // Find or create Telegram user
    let telegramUser = await prisma.telegramUser.findUnique({
      where: { telegramId: user.id.toString() },
      include: { user: { include: { profile: true } } },
    });

    let dbUser;

    if (telegramUser) {
      dbUser = telegramUser.user;
    } else {
      // Create new user
      const email = `telegram_${user.id}@nexusvita.io`;
      const referralCode = this.generateReferralCode();

      // Handle referral if start_param exists
      let referredBy = null;
      if (start_param) {
        const referrer = await prisma.referralCode.findUnique({
          where: { code: start_param },
          include: { owner: true },
        });
        if (referrer) {
          referredBy = referrer.userId;
        }
      }

      dbUser = await prisma.user.create({
        data: {
          email,
          passwordHash: crypto.randomBytes(32).toString('hex'), // Random password for Telegram users
          role: 'USER',
          isEmailVerified: true, // Telegram users are considered verified
          profile: {
            create: {
              firstName: user.first_name,
              lastName: user.last_name || '',
              displayName: user.first_name + (user.last_name ? ` ${user.last_name}` : ''),
              avatarUrl: user.photo_url,
            },
          },
          referralCode: {
            create: {
              code: referralCode,
              type: 'USER',
            },
          },
        },
        include: { profile: true },
      });

      // Create Telegram user record
      telegramUser = await prisma.telegramUser.create({
        data: {
          userId: dbUser.id,
          telegramId: user.id.toString(),
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          miniAppEnabled: true,
          authDate: new Date(parsed.auth_date * 1000),
        },
        include: { user: { include: { profile: true } } },
      });

      // Handle referral
      if (referredBy) {
        await this.handleReferral(referredBy, dbUser.id, start_param!);
      }
    }

    // Generate JWT token
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      {
        userId: dbUser.id,
        email: dbUser.email,
        role: dbUser.role,
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '30d' }
    );

    return {
      user: {
        id: dbUser.id,
        email: dbUser.email,
        role: dbUser.role,
        profile: dbUser.profile,
      },
      token,
      telegramUser: {
        telegramId: telegramUser.telegramId,
        username: telegramUser.username,
      },
    };
  }

  /**
   * Generate referral code
   */
  private generateReferralCode(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  /**
   * Handle referral
   */
  private async handleReferral(referrerId: string, newUserId: string, referralCode: string) {
    try {
      // Create referral record
      await prisma.referral.create({
        data: {
          referrerId,
          referredId: newUserId,
          referralCode,
          status: 'PENDING',
        },
      });

      // Award referrer
      await prisma.tokenTransaction.create({
        data: {
          userId: referrerId,
          type: 'REFERRAL_REWARD',
          amount: 100, // 100 NVT за реферала
          description: 'Награда за приглашение друга',
        },
      });

      // Update user token balance
      await prisma.user.update({
        where: { id: referrerId },
        data: {
          tokenBalance: { increment: 100 },
        },
      });
    } catch (error) {
      logger.error(`Error handling referral: ${error}`);
    }
  }

  /**
   * Send invite card via Telegram
   */
  async sendInviteCard(telegramId: string, referrerId: string, chatId?: number) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: referrerId },
        include: {
          profile: true,
          referralCode: true,
        },
      });

      if (!user || !user.referralCode) {
        throw new Error('User or referral code not found');
      }

      const referralCode = user.referralCode.code;
      const inviteLink = `https://t.me/${process.env.TELEGRAM_BOT_USERNAME}?start=${referralCode}`;
      const webAppLink = `https://nexusvita.io/telegram?ref=${referralCode}`;

      // Create beautiful invite card
      const inviteMessage = this.createInviteCardMessage(user, referralCode, inviteLink);

      // Send via Telegram Bot API
      const targetChatId = chatId || telegramId;
      
      await axios.post(`${this.botApiUrl}/sendPhoto`, {
        chat_id: targetChatId,
        photo: user.profile?.avatarUrl || 'https://nexusvita.io/images/default-avatar.png',
        caption: inviteMessage,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '🚀 Присоединиться',
                url: inviteLink,
              },
            ],
            [
              {
                text: '📱 Открыть в приложении',
                web_app: { url: webAppLink },
              },
            ],
            [
              {
                text: '📤 Поделиться',
                switch_inline_query: `Присоединяйся к Nexus Vita! ${inviteLink}`,
              },
            ],
          ],
        },
      });

      return { success: true, inviteLink };
    } catch (error: any) {
      logger.error(`Error sending invite card: ${error.message}`);
      throw error;
    }
  }

  /**
   * Create beautiful invite card message
   */
  private createInviteCardMessage(user: any, referralCode: string, inviteLink: string): string {
    const displayName = user.profile?.displayName || user.email;
    
    return `🎉 <b>Приглашение в Nexus Vita!</b>

👋 Привет! <b>${displayName}</b> приглашает тебя присоединиться к экосистеме здоровья и фитнеса!

✨ <b>Что тебя ждёт:</b>
💪 Персональные тренировки
🥗 Планы питания
🧠 Психология и ментальное здоровье
🏆 Челленджи и награды
🪙 Зарабатывай NVT токены
📚 Образовательные курсы

🎁 <b>Бонус за регистрацию:</b>
Получи 50 NVT токенов при регистрации по этой ссылке!

🔗 <b>Твоя реферальная ссылка:</b>
<code>${inviteLink}</code>

📱 Нажми кнопку ниже, чтобы присоединиться!`;
  }

  /**
   * Get user's referral link for social sharing
   */
  async getReferralLink(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        referralCode: true,
        profile: true,
      },
    });

    if (!user || !user.referralCode) {
      throw new Error('Referral code not found');
    }

    const code = user.referralCode.code;
    const telegramLink = `https://t.me/${process.env.TELEGRAM_BOT_USERNAME}?start=${code}`;
    const webLink = `https://nexusvita.io/register?ref=${code}`;

    return {
      code,
      telegramLink,
      webLink,
      shareText: this.createShareText(user, code, telegramLink),
    };
  }

  /**
   * Create share text for social media
   */
  private createShareText(user: any, code: string, link: string): string {
    const displayName = user.profile?.displayName || 'Я';
    
    return `🎉 ${displayName} приглашает тебя в Nexus Vita - экосистему здоровья и фитнеса!

💪 Персональные тренировки
🥗 Планы питания  
🧠 Психология и ментальное здоровье
🏆 Челленджи и награды
🪙 Зарабатывай NVT токены

🎁 Получи 50 NVT при регистрации!

Присоединяйся: ${link}

#NexusVita #Здоровье #Фитнес #Web3`;
  }

  /**
   * Handle webhook events
   */
  async handleWebhook(update: any) {
    try {
      if (update.message) {
        await this.handleMessage(update.message);
      } else if (update.callback_query) {
        await this.handleCallbackQuery(update.callback_query);
      }
    } catch (error: any) {
      logger.error(`Error handling webhook: ${error.message}`);
      throw error;
    }
  }

  /**
   * Handle incoming messages
   */
  private async handleMessage(message: any) {
    const chatId = message.chat.id;
    const text = message.text;
    const fromId = message.from.id;

    if (text?.startsWith('/start')) {
      const parts = text.split(' ');
      const startParam = parts[1]; // Реферальный код
      // Handle start command with referral
      const { TelegramBotService } = await import('./telegram-bot.service.js');
      const botService = new TelegramBotService();
      await botService.handleStartCommand(chatId, fromId, startParam);
    } else if (text === '/invite') {
      // Send invite card
      const { TelegramBotService } = await import('./telegram-bot.service.js');
      const botService = new TelegramBotService();
      await botService.handleInviteCommand(chatId, fromId.toString());
    }
  }


  /**
   * Handle callback queries
   */
  private async handleCallbackQuery(callbackQuery: any) {
    const { data, message, from } = callbackQuery;

    if (data === 'send_invite') {
      const telegramUser = await prisma.telegramUser.findUnique({
        where: { telegramId: from.id.toString() },
      });
      if (telegramUser) {
        const { TelegramBotService } = await import('./telegram-bot.service.js');
        const botService = new TelegramBotService();
        await botService.sendInviteCardToUser(from.id.toString(), telegramUser.userId);
      }
    }

    // Answer callback query
    await axios.post(`${this.botApiUrl}/answerCallbackQuery`, {
      callback_query_id: callbackQuery.id,
    });
  }
}

// Export functions for routes
export const authenticateMiniApp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const service = new TelegramService();
    const { initData } = req.body;
    const result = await service.authenticateMiniApp(initData);
    res.json(result);
  } catch (error: any) {
    logger.error(`Error authenticating Mini App: ${error.message}`);
    next(error);
  }
};

export const sendInviteCard = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      res.status(401);
      throw new Error('Not authenticated');
    }

    const service = new TelegramService();
    const { telegramId, chatId } = req.body;
    
    const telegramUser = await prisma.telegramUser.findUnique({
      where: { userId: req.user.id },
    });

    if (!telegramUser) {
      res.status(404);
      throw new Error('Telegram account not connected');
    }

    const result = await service.sendInviteCard(telegramId || telegramUser.telegramId, req.user.id, chatId);
    res.json(result);
  } catch (error: any) {
    logger.error(`Error sending invite card: ${error.message}`);
    next(error);
  }
};

export const getReferralLink = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      res.status(401);
      throw new Error('Not authenticated');
    }

    const service = new TelegramService();
    const result = await service.getReferralLink(req.user.id);
    res.json(result);
  } catch (error: any) {
    logger.error(`Error getting referral link: ${error.message}`);
    next(error);
  }
};

