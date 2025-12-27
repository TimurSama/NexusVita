import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';

// @desc    Create challenge
// @route   POST /api/challenges
// @access  Private/Admin, Trainer
export const createChallenge = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const creatorId = req.user.id;
  const { title, description, type, startDate, endDate, goal, rewardTokens, rewardFiat, imageUrl } = req.body;

  try {
    const challenge = await prisma.challenge.create({
      data: {
        creatorId,
        title,
        description,
        type,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        goal,
        rewardTokens,
        rewardFiat,
        imageUrl,
      },
    });

    res.status(201).json(challenge);
  } catch (error: any) {
    logger.error(`Error creating challenge: ${error.message}`);
    next(error);
  }
};

// @desc    Get challenges
// @route   GET /api/challenges
// @access  Private
export const getChallenges = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { type, status, page = 1, limit = 20 } = req.query;

  try {
    const where: any = {};
    
    if (type) {
      where.type = type;
    }
    
    if (status) {
      const now = new Date();
      if (status === 'active') {
        where.startDate = { lte: now };
        where.endDate = { gte: now };
      } else if (status === 'upcoming') {
        where.startDate = { gt: now };
      } else if (status === 'completed') {
        where.endDate = { lt: now };
      }
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [challenges, total] = await Promise.all([
      prisma.challenge.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { startDate: 'desc' },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              participants: true,
            },
          },
        },
      }),
      prisma.challenge.count({ where }),
    ]);

    res.status(200).json({
      challenges,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    logger.error(`Error getting challenges: ${error.message}`);
    next(error);
  }
};

// @desc    Get single challenge
// @route   GET /api/challenges/:id
// @access  Private
export const getChallenge = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const challenge = await prisma.challenge.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            profile: {
              select: {
                avatarUrl: true,
              },
            },
          },
        },
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                profile: {
                  select: {
                    avatarUrl: true,
                  },
                },
              },
            },
          },
          orderBy: {
            progress: 'desc',
          },
          take: 10,
        },
        _count: {
          select: {
            participants: true,
          },
        },
      },
    });

    if (!challenge) {
      res.status(404);
      throw new Error('Challenge not found');
    }

    res.status(200).json(challenge);
  } catch (error: any) {
    logger.error(`Error getting challenge: ${error.message}`);
    next(error);
  }
};

// @desc    Join challenge
// @route   POST /api/challenges/:id/join
// @access  Private
export const joinChallenge = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const challenge = await prisma.challenge.findUnique({ where: { id } });

    if (!challenge) {
      res.status(404);
      throw new Error('Challenge not found');
    }

    // Check if already joined
    const existingParticipation = await prisma.challengeParticipant.findUnique({
      where: {
        userId_challengeId: {
          userId,
          challengeId: id,
        },
      },
    });

    if (existingParticipation) {
      res.status(400);
      throw new Error('Already joined this challenge');
    }

    // Check if challenge is active
    const now = new Date();
    if (challenge.startDate > now) {
      res.status(400);
      throw new Error('Challenge has not started yet');
    }
    if (challenge.endDate < now) {
      res.status(400);
      throw new Error('Challenge has already ended');
    }

    const participation = await prisma.challengeParticipant.create({
      data: {
        userId,
        challengeId: id,
        progress: 0,
      },
      include: {
        challenge: true,
      },
    });

    res.status(201).json(participation);
  } catch (error: any) {
    logger.error(`Error joining challenge: ${error.message}`);
    next(error);
  }
};

// @desc    Update challenge progress
// @route   PUT /api/challenges/:id/progress
// @access  Private
export const updateChallengeProgress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const userId = req.user.id;
  const { id } = req.params;
  const { progress } = req.body;

  try {
    const participation = await prisma.challengeParticipant.findUnique({
      where: {
        userId_challengeId: {
          userId,
          challengeId: id,
        },
      },
      include: {
        challenge: true,
      },
    });

    if (!participation) {
      res.status(404);
      throw new Error('Not participating in this challenge');
    }

    const updatedParticipation = await prisma.challengeParticipant.update({
      where: {
        userId_challengeId: {
          userId,
          challengeId: id,
        },
      },
      data: {
        progress: Number(progress),
        lastUpdated: new Date(),
      },
    });

    // Check if goal reached
    if (updatedParticipation.progress >= participation.challenge.goal) {
      // Mark as completed and potentially reward
      await prisma.challengeParticipant.update({
        where: {
          userId_challengeId: {
            userId,
            challengeId: id,
          },
        },
        data: {
          completedAt: new Date(),
        },
      });
    }

    res.status(200).json(updatedParticipation);
  } catch (error: any) {
    logger.error(`Error updating challenge progress: ${error.message}`);
    next(error);
  }
};

// @desc    Get challenge participants
// @route   GET /api/challenges/:id/participants
// @access  Private
export const getChallengeParticipants = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { page = 1, limit = 50 } = req.query;

  try {
    const skip = (Number(page) - 1) * Number(limit);

    const [participants, total] = await Promise.all([
      prisma.challengeParticipant.findMany({
        where: { challengeId: id },
        skip,
        take: Number(limit),
        orderBy: { progress: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profile: {
                select: {
                  avatarUrl: true,
                },
              },
            },
          },
        },
      }),
      prisma.challengeParticipant.count({ where: { challengeId: id } }),
    ]);

    res.status(200).json({
      participants,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error: any) {
    logger.error(`Error getting challenge participants: ${error.message}`);
    next(error);
  }
};

// @desc    Update challenge
// @route   PUT /api/challenges/:id
// @access  Private/Admin, Trainer
export const updateChallenge = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const userId = req.user.id;
  const userRole = req.user.role;
  const { id } = req.params;
  const { title, description, type, startDate, endDate, goal, rewardTokens, rewardFiat, imageUrl } = req.body;

  try {
    const existingChallenge = await prisma.challenge.findUnique({ where: { id } });

    if (!existingChallenge) {
      res.status(404);
      throw new Error('Challenge not found');
    }

    if (existingChallenge.creatorId !== userId && userRole !== 'ADMIN') {
      res.status(403);
      throw new Error('Not authorized to update this challenge');
    }

    const updatedChallenge = await prisma.challenge.update({
      where: { id },
      data: {
        title,
        description,
        type,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        goal,
        rewardTokens,
        rewardFiat,
        imageUrl,
      },
    });

    res.status(200).json(updatedChallenge);
  } catch (error: any) {
    logger.error(`Error updating challenge: ${error.message}`);
    next(error);
  }
};

// @desc    Delete challenge
// @route   DELETE /api/challenges/:id
// @access  Private/Admin, Trainer
export const deleteChallenge = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const userId = req.user.id;
  const userRole = req.user.role;
  const { id } = req.params;

  try {
    const existingChallenge = await prisma.challenge.findUnique({ where: { id } });

    if (!existingChallenge) {
      res.status(404);
      throw new Error('Challenge not found');
    }

    if (existingChallenge.creatorId !== userId && userRole !== 'ADMIN') {
      res.status(403);
      throw new Error('Not authorized to delete this challenge');
    }

    await prisma.challenge.delete({ where: { id } });
    res.status(200).json({ message: 'Challenge deleted successfully' });
  } catch (error: any) {
    logger.error(`Error deleting challenge: ${error.message}`);
    next(error);
  }
};

