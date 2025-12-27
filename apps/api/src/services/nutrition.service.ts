import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';

// @desc    Create meal plan
// @route   POST /api/nutrition/plans
// @access  Private/Trainer, Nutritionist, Admin
export const createMealPlan = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const trainerId = req.user.id;
  const { title, description, calories, meals } = req.body;

  try {
    const mealPlan = await prisma.mealPlan.create({
      data: {
        trainerId,
        title,
        description,
        calories,
        meals: {
          create: meals || [],
        },
      },
      include: {
        meals: true,
        trainer: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(201).json(mealPlan);
  } catch (error: any) {
    logger.error(`Error creating meal plan: ${error.message}`);
    next(error);
  }
};

// @desc    Get meal plans
// @route   GET /api/nutrition/plans
// @access  Private
export const getMealPlans = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { trainerId } = req.query;

  try {
    const mealPlans = await prisma.mealPlan.findMany({
      where: trainerId ? { trainerId: String(trainerId) } : {},
      include: {
        meals: true,
        trainer: {
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
        createdAt: 'desc',
      },
    });

    res.status(200).json(mealPlans);
  } catch (error: any) {
    logger.error(`Error getting meal plans: ${error.message}`);
    next(error);
  }
};

// @desc    Get single meal plan
// @route   GET /api/nutrition/plans/:id
// @access  Private
export const getMealPlan = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const mealPlan = await prisma.mealPlan.findUnique({
      where: { id },
      include: {
        meals: true,
        trainer: {
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
    });

    if (!mealPlan) {
      res.status(404);
      throw new Error('Meal plan not found');
    }

    res.status(200).json(mealPlan);
  } catch (error: any) {
    logger.error(`Error getting meal plan: ${error.message}`);
    next(error);
  }
};

// @desc    Update meal plan
// @route   PUT /api/nutrition/plans/:id
// @access  Private/Trainer, Nutritionist, Admin
export const updateMealPlan = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const userId = req.user.id;
  const userRole = req.user.role;
  const { id } = req.params;
  const { title, description, calories, meals } = req.body;

  try {
    const existingPlan = await prisma.mealPlan.findUnique({ where: { id } });

    if (!existingPlan) {
      res.status(404);
      throw new Error('Meal plan not found');
    }

    if (existingPlan.trainerId !== userId && userRole !== 'ADMIN') {
      res.status(403);
      throw new Error('Not authorized to update this meal plan');
    }

    const updatedPlan = await prisma.mealPlan.update({
      where: { id },
      data: {
        title,
        description,
        calories,
      },
      include: {
        meals: true,
      },
    });

    res.status(200).json(updatedPlan);
  } catch (error: any) {
    logger.error(`Error updating meal plan: ${error.message}`);
    next(error);
  }
};

// @desc    Delete meal plan
// @route   DELETE /api/nutrition/plans/:id
// @access  Private/Trainer, Nutritionist, Admin
export const deleteMealPlan = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const userId = req.user.id;
  const userRole = req.user.role;
  const { id } = req.params;

  try {
    const existingPlan = await prisma.mealPlan.findUnique({ where: { id } });

    if (!existingPlan) {
      res.status(404);
      throw new Error('Meal plan not found');
    }

    if (existingPlan.trainerId !== userId && userRole !== 'ADMIN') {
      res.status(403);
      throw new Error('Not authorized to delete this meal plan');
    }

    await prisma.mealPlan.delete({ where: { id } });
    res.status(200).json({ message: 'Meal plan deleted successfully' });
  } catch (error: any) {
    logger.error(`Error deleting meal plan: ${error.message}`);
    next(error);
  }
};

// @desc    Add meal item to plan
// @route   POST /api/nutrition/plans/:planId/items
// @access  Private/Trainer, Nutritionist, Admin
export const addMealItem = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const userId = req.user.id;
  const userRole = req.user.role;
  const { planId } = req.params;
  const { name, calories, protein, carbs, fat, time } = req.body;

  try {
    const plan = await prisma.mealPlan.findUnique({ where: { id: planId } });

    if (!plan) {
      res.status(404);
      throw new Error('Meal plan not found');
    }

    if (plan.trainerId !== userId && userRole !== 'ADMIN') {
      res.status(403);
      throw new Error('Not authorized to add items to this meal plan');
    }

    const mealItem = await prisma.mealItem.create({
      data: {
        planId,
        name,
        calories,
        protein,
        carbs,
        fat,
        time,
      },
    });

    res.status(201).json(mealItem);
  } catch (error: any) {
    logger.error(`Error adding meal item: ${error.message}`);
    next(error);
  }
};

// @desc    Update meal item
// @route   PUT /api/nutrition/plans/:planId/items/:itemId
// @access  Private/Trainer, Nutritionist, Admin
export const updateMealItem = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const userId = req.user.id;
  const userRole = req.user.role;
  const { planId, itemId } = req.params;
  const { name, calories, protein, carbs, fat, time } = req.body;

  try {
    const plan = await prisma.mealPlan.findUnique({ where: { id: planId } });

    if (!plan) {
      res.status(404);
      throw new Error('Meal plan not found');
    }

    if (plan.trainerId !== userId && userRole !== 'ADMIN') {
      res.status(403);
      throw new Error('Not authorized to update items in this meal plan');
    }

    const mealItem = await prisma.mealItem.update({
      where: { id: itemId },
      data: {
        name,
        calories,
        protein,
        carbs,
        fat,
        time,
      },
    });

    res.status(200).json(mealItem);
  } catch (error: any) {
    logger.error(`Error updating meal item: ${error.message}`);
    next(error);
  }
};

// @desc    Delete meal item
// @route   DELETE /api/nutrition/plans/:planId/items/:itemId
// @access  Private/Trainer, Nutritionist, Admin
export const deleteMealItem = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const userId = req.user.id;
  const userRole = req.user.role;
  const { planId, itemId } = req.params;

  try {
    const plan = await prisma.mealPlan.findUnique({ where: { id: planId } });

    if (!plan) {
      res.status(404);
      throw new Error('Meal plan not found');
    }

    if (plan.trainerId !== userId && userRole !== 'ADMIN') {
      res.status(403);
      throw new Error('Not authorized to delete items from this meal plan');
    }

    await prisma.mealItem.delete({ where: { id: itemId } });
    res.status(200).json({ message: 'Meal item deleted successfully' });
  } catch (error: any) {
    logger.error(`Error deleting meal item: ${error.message}`);
    next(error);
  }
};

// @desc    Log meal
// @route   POST /api/nutrition/logs
// @access  Private
export const logMeal = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const userId = req.user.id;
  const { name, calories, protein, carbs, fat, time, date } = req.body;

  try {
    const mealLog = await prisma.mealLog.create({
      data: {
        userId,
        name,
        calories,
        protein,
        carbs,
        fat,
        time,
        date: date ? new Date(date) : new Date(),
      },
    });

    res.status(201).json(mealLog);
  } catch (error: any) {
    logger.error(`Error logging meal: ${error.message}`);
    next(error);
  }
};

// @desc    Get meal logs
// @route   GET /api/nutrition/logs
// @access  Private
export const getMealLogs = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const userId = req.user.id;
  const { startDate, endDate } = req.query;

  try {
    const where: any = { userId };
    
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(String(startDate));
      if (endDate) where.date.lte = new Date(String(endDate));
    }

    const mealLogs = await prisma.mealLog.findMany({
      where,
      orderBy: {
        date: 'desc',
      },
    });

    res.status(200).json(mealLogs);
  } catch (error: any) {
    logger.error(`Error getting meal logs: ${error.message}`);
    next(error);
  }
};

