import { prisma } from '../utils/prisma.js';
import { NotFoundError, ForbiddenError } from '../middleware/errorHandler.js';
import { UserRole } from '@prisma/client';

interface GetUsersParams {
  page: number;
  limit: number;
  search?: string;
  role?: string;
  isActive?: boolean;
}

export class UserService {
  async getUsers(params: GetUsersParams) {
    const { page, limit, search, role, isActive } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { profile: { firstName: { contains: search, mode: 'insensitive' } } },
        { profile: { lastName: { contains: search, mode: 'insensitive' } } },
      ];
    }

    if (role) {
      where.role = role as UserRole;
    }

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        include: {
          profile: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users: users.map(user => ({
        id: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        profile: user.profile,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(userId: string, requesterId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        bodyAvatar: true,
        trainerProfile: true,
        achievements: {
          include: {
            achievement: true,
          },
          take: 10,
          orderBy: { earnedAt: 'desc' },
        },
      },
    });

    if (!user) {
      throw new NotFoundError('Пользователь');
    }

    // Check privacy settings
    const isOwner = userId === requesterId;
    const profile = user.profile;

    if (!isOwner && profile && !profile.isProfilePublic) {
      return {
        id: user.id,
        profile: {
          displayName: profile.displayName,
          avatarUrl: profile.avatarUrl,
        },
        isPrivate: true,
      };
    }

    return {
      id: user.id,
      email: isOwner ? user.email : undefined,
      role: user.role,
      profile: {
        ...profile,
        dateOfBirth: profile?.showAge ? profile.dateOfBirth : undefined,
        weight: profile?.showWeight ? profile.weight : undefined,
      },
      bodyAvatar: isOwner ? user.bodyAvatar : undefined,
      trainerProfile: user.trainerProfile,
      achievements: user.achievements,
      tokenBalance: isOwner ? user.tokenBalance : undefined,
      createdAt: user.createdAt,
    };
  }

  async updateUser(userId: string, data: { isActive?: boolean; role?: UserRole }) {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
      include: { profile: true },
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      profile: user.profile,
    };
  }

  async deactivateUser(userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
    });
  }

  async getUserStats(userId: string, requesterId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
      },
    });

    if (!user) {
      throw new NotFoundError('Пользователь');
    }

    // Check if requester can view stats
    const isOwner = userId === requesterId;
    if (!isOwner && user.profile && !user.profile.isProfilePublic) {
      throw new ForbiddenError('Профиль закрыт');
    }

    const [
      workoutsCount,
      totalWorkoutMinutes,
      challengesCompleted,
      achievementsCount,
      followersCount,
      followingCount,
    ] = await Promise.all([
      prisma.workoutRecord.count({ where: { userId } }),
      prisma.workoutRecord.aggregate({
        where: { userId },
        _sum: { duration: true },
      }),
      prisma.challengeParticipant.count({
        where: { userId, isCompleted: true },
      }),
      prisma.userAchievement.count({ where: { userId } }),
      prisma.follow.count({ where: { followingId: userId } }),
      prisma.follow.count({ where: { followerId: userId } }),
    ]);

    // Get current streak
    const recentWorkouts = await prisma.workoutRecord.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 30,
      select: { date: true },
    });

    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);

      const hasWorkout = recentWorkouts.some(w => {
        const workoutDate = new Date(w.date);
        workoutDate.setHours(0, 0, 0, 0);
        return workoutDate.getTime() === checkDate.getTime();
      });

      if (hasWorkout) {
        currentStreak++;
      } else if (i > 0) {
        break;
      }
    }

    return {
      workouts: {
        total: workoutsCount,
        totalMinutes: totalWorkoutMinutes._sum.duration || 0,
        currentStreak,
      },
      challenges: {
        completed: challengesCompleted,
      },
      achievements: {
        total: achievementsCount,
      },
      social: {
        followers: followersCount,
        following: followingCount,
      },
      tokens: isOwner ? user.tokenBalance : undefined,
    };
  }

  async getUserAchievements(userId: string) {
    const achievements = await prisma.userAchievement.findMany({
      where: { userId },
      include: {
        achievement: true,
      },
      orderBy: { earnedAt: 'desc' },
    });

    return achievements.map(ua => ({
      id: ua.achievement.id,
      name: ua.achievement.name,
      description: ua.achievement.description,
      iconUrl: ua.achievement.iconUrl,
      badgeImageUrl: ua.achievement.badgeImageUrl,
      rarity: ua.achievement.rarity,
      earnedAt: ua.earnedAt,
      isNft: ua.achievement.isNft,
      nftMinted: ua.nftMinted,
    }));
  }
}

