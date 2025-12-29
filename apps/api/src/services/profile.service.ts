import { prisma } from '../utils/prisma.js';
import { NotFoundError, AppError } from '../middleware/errorHandler.js';
import { ethers } from 'ethers';

interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string | null;
  coverImageUrl?: string | null;
  dateOfBirth?: string | null;
  gender?: string;
  height?: number | null;
  weight?: number | null;
  bodyFatPercent?: number | null;
  language?: string;
  timezone?: string;
  country?: string;
  city?: string;
  isProfilePublic?: boolean;
  showAge?: boolean;
  showWeight?: boolean;
  themeId?: string | null;
}

interface UpdateBodyAvatarData {
  bodyShape?: Record<string, any>;
  muscleGroups?: Record<string, any>;
  injuries?: Record<string, any> | null;
  goals?: { primary: string[]; secondary?: string[] };
  targetWeight?: number | null;
  targetBodyFat?: number | null;
  targetMuscle?: number | null;
}

interface ConnectWalletData {
  walletAddress: string;
  signature: string;
  message: string;
}

export class ProfileService {
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: {
          include: { theme: true },
        },
        bodyAvatar: true,
      },
    });

    if (!user) {
      throw new NotFoundError('Пользователь');
    }

    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role,
      walletAddress: user.walletAddress,
      tokenBalance: user.tokenBalance,
      profile: user.profile,
      bodyAvatar: user.bodyAvatar,
    };
  }

  async updateProfile(userId: string, data: UpdateProfileData) {
    const profile = await prisma.userProfile.update({
      where: { userId },
      data: {
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
      },
      include: { theme: true },
    });

    return profile;
  }

  async getBodyAvatar(userId: string) {
    const bodyAvatar = await prisma.bodyAvatar.findUnique({
      where: { userId },
    });

    if (!bodyAvatar) {
      throw new NotFoundError('Аватар тела');
    }

    return bodyAvatar;
  }

  async updateBodyAvatar(userId: string, data: UpdateBodyAvatarData) {
    const bodyAvatar = await prisma.bodyAvatar.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        bodyShape: data.bodyShape || {},
        muscleGroups: data.muscleGroups || {},
        injuries: data.injuries,
        goals: data.goals || { primary: [], secondary: [] },
        targetWeight: data.targetWeight,
        targetBodyFat: data.targetBodyFat,
        targetMuscle: data.targetMuscle,
      },
    });

    return bodyAvatar;
  }

  async connectWallet(userId: string, data: ConnectWalletData) {
    const { walletAddress, signature, message } = data;

    // Verify signature
    try {
      const recoveredAddress = ethers.verifyMessage(message, signature);

      if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
        throw new AppError('Неверная подпись кошелька', 400);
      }
    } catch (error) {
      throw new AppError('Не удалось верифицировать подпись', 400);
    }

    // Check if wallet already connected to another user
    const existingUser = await prisma.user.findUnique({
      where: { walletAddress: walletAddress.toLowerCase() },
    });

    if (existingUser && existingUser.id !== userId) {
      throw new AppError('Этот кошелек уже привязан к другому аккаунту', 400);
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { walletAddress: walletAddress.toLowerCase() },
    });

    return {
      walletAddress: user.walletAddress,
      message: 'Кошелек успешно подключен',
    };
  }

  async disconnectWallet(userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { walletAddress: null },
    });
  }

  async uploadAvatar(userId: string, file: any) {
    // TODO: Implement file upload to S3 or similar
    // For now, return a placeholder
    const avatarUrl = `https://cdn.nexusvita.io/avatars/${userId}/${Date.now()}.jpg`;

    await prisma.userProfile.update({
      where: { userId },
      data: { avatarUrl },
    });

    return avatarUrl;
  }

  async getPrivacySettings(userId: string) {
    const profile = await prisma.userProfile.findUnique({
      where: { userId },
      select: {
        isProfilePublic: true,
        showAge: true,
        showWeight: true,
      },
    });

    if (!profile) {
      throw new NotFoundError('Профиль');
    }

    return profile;
  }

  async updatePrivacySettings(userId: string, data: {
    isProfilePublic?: boolean;
    showAge?: boolean;
    showWeight?: boolean;
  }) {
    const profile = await prisma.userProfile.update({
      where: { userId },
      data,
      select: {
        isProfilePublic: true,
        showAge: true,
        showWeight: true,
      },
    });

    return profile;
  }
}



