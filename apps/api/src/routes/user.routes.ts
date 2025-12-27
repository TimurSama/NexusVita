import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { AuthRequest, requireAdmin } from '../middleware/auth.js';
import { UserService } from '../services/user.service.js';

const router = Router();
const userService = new UserService();

// Validation schemas
const updateUserSchema = z.object({
  isActive: z.boolean().optional(),
  role: z.enum(['USER', 'TRAINER', 'DOCTOR', 'NUTRITIONIST', 'PSYCHOLOGIST', 'SEXOLOGIST', 'SPECIALIST', 'ADMIN']).optional(),
});

const paginationSchema = z.object({
  page: z.string().optional().transform(val => parseInt(val || '1')),
  limit: z.string().optional().transform(val => parseInt(val || '20')),
  search: z.string().optional(),
  role: z.string().optional(),
  isActive: z.string().optional().transform(val => val === 'true'),
});

/**
 * @route GET /api/users
 * @desc Get all users (admin only)
 */
router.get('/', requireAdmin, async (req: AuthRequest, res, next) => {
  try {
    const { page, limit, search, role, isActive } = paginationSchema.parse(req.query);
    const result = await userService.getUsers({ page, limit, search, role, isActive });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/users/:id
 * @desc Get user by ID
 */
router.get('/:id', async (req: AuthRequest, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id, req.user!.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PATCH /api/users/:id
 * @desc Update user (admin only)
 */
router.patch('/:id', requireAdmin, validate(updateUserSchema), async (req: AuthRequest, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/users/:id
 * @desc Deactivate user (admin only)
 */
router.delete('/:id', requireAdmin, async (req: AuthRequest, res, next) => {
  try {
    await userService.deactivateUser(req.params.id);
    res.json({ message: 'Пользователь деактивирован' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/users/:id/stats
 * @desc Get user statistics
 */
router.get('/:id/stats', async (req: AuthRequest, res, next) => {
  try {
    const stats = await userService.getUserStats(req.params.id, req.user!.id);
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/users/:id/achievements
 * @desc Get user achievements
 */
router.get('/:id/achievements', async (req: AuthRequest, res, next) => {
  try {
    const achievements = await userService.getUserAchievements(req.params.id);
    res.json(achievements);
  } catch (error) {
    next(error);
  }
});

export default router;

