import { prisma } from '../utils/prisma.js';
import { NotFoundError, ForbiddenError, AppError } from '../middleware/errorHandler.js';

export class WorkoutService {
  async getPrograms(params: any) {
    const { page, limit, difficulty, trainerId, search, isFree, userId } = params;
    const skip = (page - 1) * limit;

    const where: any = { isPublished: true };
    if (difficulty) where.difficulty = difficulty;
    if (trainerId) where.trainerId = trainerId;
    if (isFree) where.isFree = true;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [programs, total] = await Promise.all([
      prisma.workoutProgram.findMany({
        where,
        skip,
        take: limit,
        include: {
          trainer: {
            include: {
              user: { include: { profile: { select: { firstName: true, lastName: true, avatarUrl: true } } } },
            },
          },
          _count: { select: { exercises: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.workoutProgram.count({ where }),
    ]);

    return {
      programs,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async getProgramById(id: string, userId?: string) {
    const program = await prisma.workoutProgram.findUnique({
      where: { id },
      include: {
        trainer: { include: { user: { include: { profile: true } } } },
        exercises: true,
        workoutDays: { include: { exercises: { include: { exercise: true } } } },
      },
    });

    if (!program) throw new NotFoundError('Программа');
    return program;
  }

  async getExercises(params: any) {
    const { page, limit, muscle, difficulty, search, equipment } = params;
    const skip = (page - 1) * limit;

    const where: any = { isPublic: true };
    if (difficulty) where.difficulty = difficulty;
    if (muscle) where.targetMuscles = { has: muscle };
    if (equipment) where.equipment = { has: equipment };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [exercises, total] = await Promise.all([
      prisma.exercise.findMany({ where, skip, take: limit, orderBy: { name: 'asc' } }),
      prisma.exercise.count({ where }),
    ]);

    return { exercises, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getExerciseById(id: string) {
    const exercise = await prisma.exercise.findUnique({ where: { id } });
    if (!exercise) throw new NotFoundError('Упражнение');
    return exercise;
  }

  async createProgram(userId: string, data: any) {
    const trainerProfile = await prisma.trainerProfile.findUnique({ where: { userId } });
    if (!trainerProfile) throw new ForbiddenError('Только тренеры могут создавать программы');

    return prisma.workoutProgram.create({
      data: { ...data, trainerId: trainerProfile.id },
    });
  }

  async updateProgram(id: string, userId: string, data: any) {
    const program = await prisma.workoutProgram.findUnique({
      where: { id },
      include: { trainer: true },
    });
    if (!program) throw new NotFoundError('Программа');
    if (program.trainer.userId !== userId) throw new ForbiddenError('Нет доступа');

    return prisma.workoutProgram.update({ where: { id }, data });
  }

  async deleteProgram(id: string, userId: string) {
    const program = await prisma.workoutProgram.findUnique({
      where: { id },
      include: { trainer: true },
    });
    if (!program) throw new NotFoundError('Программа');
    if (program.trainer.userId !== userId) throw new ForbiddenError('Нет доступа');

    await prisma.workoutProgram.delete({ where: { id } });
  }

  async createExercise(data: any) {
    return prisma.exercise.create({ data });
  }

  async enrollInProgram(userId: string, data: { programId: string; startDate?: string }) {
    const program = await prisma.workoutProgram.findUnique({ where: { id: data.programId } });
    if (!program) throw new NotFoundError('Программа');

    return prisma.userWorkoutProgram.create({
      data: {
        userId,
        programId: data.programId,
        startDate: data.startDate ? new Date(data.startDate) : new Date(),
      },
    });
  }

  async getUserPrograms(userId: string) {
    return prisma.userWorkoutProgram.findMany({
      where: { userId },
      include: {
        program: {
          include: { trainer: { include: { user: { include: { profile: true } } } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async logWorkout(userId: string, data: any) {
    const record = await prisma.workoutRecord.create({
      data: {
        userId,
        exerciseId: data.exerciseId,
        date: new Date(data.date),
        duration: data.duration,
        sets: data.sets,
        reps: data.reps,
        weight: data.weight,
        distance: data.distance,
        caloriesBurned: data.caloriesBurned,
        heartRateAvg: data.heartRateAvg,
        heartRateMax: data.heartRateMax,
        notes: data.notes,
        mood: data.mood,
        difficulty: data.difficulty,
        deviceData: data.deviceData,
        tokensEarned: 0.1, // Base reward
      },
    });

    // Update user token balance
    await prisma.user.update({
      where: { id: userId },
      data: { tokenBalance: { increment: 0.1 } },
    });

    return record;
  }

  async getWorkoutHistory(userId: string, params: any) {
    const { startDate, endDate, page, limit } = params;
    const skip = (page - 1) * limit;

    const where: any = { userId };
    if (startDate) where.date = { gte: new Date(startDate) };
    if (endDate) where.date = { ...where.date, lte: new Date(endDate) };

    const [records, total] = await Promise.all([
      prisma.workoutRecord.findMany({
        where,
        skip,
        take: limit,
        include: { exercise: true },
        orderBy: { date: 'desc' },
      }),
      prisma.workoutRecord.count({ where }),
    ]);

    return { records, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getWorkoutStats(userId: string, period?: string) {
    const startDate = new Date();
    if (period === 'week') startDate.setDate(startDate.getDate() - 7);
    else if (period === 'month') startDate.setMonth(startDate.getMonth() - 1);
    else if (period === 'year') startDate.setFullYear(startDate.getFullYear() - 1);
    else startDate.setFullYear(2000);

    const records = await prisma.workoutRecord.findMany({
      where: { userId, date: { gte: startDate } },
    });

    const totalWorkouts = records.length;
    const totalDuration = records.reduce((sum, r) => sum + r.duration, 0);
    const totalCalories = records.reduce((sum, r) => sum + (r.caloriesBurned || 0), 0);
    const avgDuration = totalWorkouts > 0 ? totalDuration / totalWorkouts : 0;

    return {
      totalWorkouts,
      totalDuration,
      totalCalories,
      avgDuration,
      period,
    };
  }

  async getRecommendations(userId: string) {
    // Get user's goals and preferences
    const bodyAvatar = await prisma.bodyAvatar.findUnique({ where: { userId } });
    const goals = (bodyAvatar?.goals as any)?.primary || [];

    // Find matching programs
    const programs = await prisma.workoutProgram.findMany({
      where: {
        isPublished: true,
        targetGoals: { hasSome: goals },
      },
      take: 10,
      include: {
        trainer: { include: { user: { include: { profile: true } } } },
      },
      orderBy: { rating: 'desc' },
    });

    return programs;
  }
}

