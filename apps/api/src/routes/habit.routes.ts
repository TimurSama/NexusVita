import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { AuthRequest } from '../middleware/auth.js';
import { HabitService } from '../services/habit.service.js';

const router = Router();
const habitService = new HabitService();

// Validation schemas
const createHabitSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().max(1000).optional(),
  icon: z.string().optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  frequency: z.enum(['DAILY', 'WEEKLY', 'SPECIFIC_DAYS', 'CUSTOM']),
  targetDays: z.array(z.number().int().min(0).max(6)).optional(),
  timesPerDay: z.number().int().positive().optional(),
  reminderTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  reminderEnabled: z.boolean().optional(),
  targetStreak: z.number().int().positive().optional(),
  targetTotal: z.number().int().positive().optional(),
  category: z.string().optional(),
  tokensPerCompletion: z.number().nonnegative().optional(),
});

const updateHabitSchema = createHabitSchema.partial();

const logHabitSchema = z.object({
  habitId: z.string().uuid(),
  date: z.string().datetime(),
  completionCount: z.number().int().nonnegative().optional(),
  isCompleted: z.boolean().optional(),
  notes: z.string().max(500).optional(),
  mood: z.number().int().min(1).max(5).optional(),
});

/**
 * @route GET /api/habits
 * @desc Get all user habits
 */
router.get('/', async (req: AuthRequest, res, next) => {
  try {
    const { isActive, category, archived } = req.query;
    const habits = await habitService.getHabits(req.user!.id, {
      isActive: isActive !== 'false',
      category: category as string,
      archived: archived === 'true',
    });
    res.json(habits);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/habits/:id
 * @desc Get habit by ID
 */
router.get('/:id', async (req: AuthRequest, res, next) => {
  try {
    const habit = await habitService.getHabitById(req.params.id, req.user!.id);
    res.json(habit);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/habits
 * @desc Create new habit
 */
router.post('/', validate(createHabitSchema), async (req: AuthRequest, res, next) => {
  try {
    const habit = await habitService.createHabit(req.user!.id, req.body);
    res.status(201).json(habit);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PATCH /api/habits/:id
 * @desc Update habit
 */
router.patch('/:id', validate(updateHabitSchema), async (req: AuthRequest, res, next) => {
  try {
    const habit = await habitService.updateHabit(req.params.id, req.user!.id, req.body);
    res.json(habit);
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/habits/:id
 * @desc Delete habit
 */
router.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    await habitService.deleteHabit(req.params.id, req.user!.id);
    res.json({ message: 'Привычка удалена' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/habits/:id/archive
 * @desc Archive habit
 */
router.post('/:id/archive', async (req: AuthRequest, res, next) => {
  try {
    const habit = await habitService.archiveHabit(req.params.id, req.user!.id);
    res.json(habit);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/habits/:id/unarchive
 * @desc Unarchive habit
 */
router.post('/:id/unarchive', async (req: AuthRequest, res, next) => {
  try {
    const habit = await habitService.unarchiveHabit(req.params.id, req.user!.id);
    res.json(habit);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/habits/log
 * @desc Log habit completion
 */
router.post('/log', validate(logHabitSchema), async (req: AuthRequest, res, next) => {
  try {
    const log = await habitService.logHabit(req.user!.id, req.body);
    res.status(201).json(log);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/habits/:id/complete
 * @desc Quick complete habit for today
 */
router.post('/:id/complete', async (req: AuthRequest, res, next) => {
  try {
    const log = await habitService.completeHabitToday(req.params.id, req.user!.id);
    res.json(log);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/habits/:id/uncomplete
 * @desc Uncomplete habit for today
 */
router.post('/:id/uncomplete', async (req: AuthRequest, res, next) => {
  try {
    const log = await habitService.uncompleteHabitToday(req.params.id, req.user!.id);
    res.json(log);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/habits/logs
 * @desc Get habit logs
 */
router.get('/logs/all', async (req: AuthRequest, res, next) => {
  try {
    const { startDate, endDate, habitId, page, limit } = req.query;
    const logs = await habitService.getHabitLogs(req.user!.id, {
      startDate: startDate as string,
      endDate: endDate as string,
      habitId: habitId as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 30,
    });
    res.json(logs);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/habits/today
 * @desc Get today's habits status
 */
router.get('/today/status', async (req: AuthRequest, res, next) => {
  try {
    const status = await habitService.getTodayStatus(req.user!.id);
    res.json(status);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/habits/stats
 * @desc Get habit statistics
 */
router.get('/stats/summary', async (req: AuthRequest, res, next) => {
  try {
    const { habitId, period } = req.query;
    const stats = await habitService.getHabitStats(req.user!.id, {
      habitId: habitId as string,
      period: period as string,
    });
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/habits/streaks
 * @desc Get current streaks
 */
router.get('/streaks/current', async (req: AuthRequest, res, next) => {
  try {
    const streaks = await habitService.getCurrentStreaks(req.user!.id);
    res.json(streaks);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/habits/calendar
 * @desc Get habits calendar view
 */
router.get('/calendar/view', async (req: AuthRequest, res, next) => {
  try {
    const { month, year } = req.query;
    const calendar = await habitService.getCalendarView(req.user!.id, {
      month: parseInt(month as string) || new Date().getMonth() + 1,
      year: parseInt(year as string) || new Date().getFullYear(),
    });
    res.json(calendar);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/habits/suggestions
 * @desc Get habit suggestions
 */
router.get('/suggestions/list', async (req: AuthRequest, res, next) => {
  try {
    const suggestions = await habitService.getHabitSuggestions(req.user!.id);
    res.json(suggestions);
  } catch (error) {
    next(error);
  }
});

export default router;

