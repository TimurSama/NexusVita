import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { AuthRequest } from '../middleware/auth.js';
import { LifestyleService } from '../services/lifestyle.service.js';

const router = Router();
const lifestyleService = new LifestyleService();

// Validation schemas
const logDailyRoutineSchema = z.object({
  date: z.string().datetime(),
  wakeUpTime: z.string().datetime().optional(),
  bedTime: z.string().datetime().optional(),
  workStartTime: z.string().datetime().optional(),
  workEndTime: z.string().datetime().optional(),
  activities: z.array(z.object({
    time: z.string(),
    activity: z.string(),
    duration: z.number().int().positive().optional(),
    category: z.string().optional(),
  })).optional(),
  productivityScore: z.number().int().min(1).max(10).optional(),
  energyScore: z.number().int().min(1).max(10).optional(),
  stressScore: z.number().int().min(1).max(10).optional(),
  balanceScore: z.number().int().min(1).max(10).optional(),
  screenTimeMinutes: z.number().int().nonnegative().optional(),
  outdoorMinutes: z.number().int().nonnegative().optional(),
  sunlightMinutes: z.number().int().nonnegative().optional(),
  socialInteractions: z.number().int().nonnegative().optional(),
  qualityTimeMinutes: z.number().int().nonnegative().optional(),
  notes: z.string().max(5000).optional(),
  highlights: z.array(z.string()).optional(),
});

const logSleepSchema = z.object({
  date: z.string().datetime(),
  bedTime: z.string().datetime(),
  wakeUpTime: z.string().datetime(),
  totalSleepMinutes: z.number().int().positive(),
  sleepQuality: z.number().int().min(1).max(10),
  deepSleepMinutes: z.number().int().nonnegative().optional(),
  lightSleepMinutes: z.number().int().nonnegative().optional(),
  remSleepMinutes: z.number().int().nonnegative().optional(),
  awakeMinutes: z.number().int().nonnegative().optional(),
  fellAsleepQuickly: z.boolean().optional(),
  wokeUpRested: z.boolean().optional(),
  hadDreams: z.boolean().optional(),
  nightmares: z.boolean().optional(),
  caffeine: z.boolean().optional(),
  alcohol: z.boolean().optional(),
  lateExercise: z.boolean().optional(),
  screenBefore: z.boolean().optional(),
  notes: z.string().max(1000).optional(),
  deviceData: z.record(z.any()).optional(),
  heartRateData: z.record(z.any()).optional(),
});

/**
 * @route POST /api/lifestyle/routine
 * @desc Log daily routine
 */
router.post('/routine', validate(logDailyRoutineSchema), async (req: AuthRequest, res, next) => {
  try {
    const routine = await lifestyleService.logDailyRoutine(req.user!.id, req.body);
    res.status(201).json(routine);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/lifestyle/routine
 * @desc Get daily routines
 */
router.get('/routine', async (req: AuthRequest, res, next) => {
  try {
    const { startDate, endDate, page, limit } = req.query;
    const routines = await lifestyleService.getDailyRoutines(req.user!.id, {
      startDate: startDate as string,
      endDate: endDate as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 30,
    });
    res.json(routines);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/lifestyle/routine/today
 * @desc Get today's routine
 */
router.get('/routine/today', async (req: AuthRequest, res, next) => {
  try {
    const routine = await lifestyleService.getTodayRoutine(req.user!.id);
    res.json(routine);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PATCH /api/lifestyle/routine/:id
 * @desc Update daily routine
 */
router.patch('/routine/:id', async (req: AuthRequest, res, next) => {
  try {
    const routine = await lifestyleService.updateDailyRoutine(
      req.params.id,
      req.user!.id,
      req.body
    );
    res.json(routine);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/lifestyle/sleep
 * @desc Log sleep
 */
router.post('/sleep', validate(logSleepSchema), async (req: AuthRequest, res, next) => {
  try {
    const sleepLog = await lifestyleService.logSleep(req.user!.id, req.body);
    res.status(201).json(sleepLog);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/lifestyle/sleep
 * @desc Get sleep logs
 */
router.get('/sleep', async (req: AuthRequest, res, next) => {
  try {
    const { startDate, endDate, page, limit } = req.query;
    const logs = await lifestyleService.getSleepLogs(req.user!.id, {
      startDate: startDate as string,
      endDate: endDate as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 30,
    });
    res.json(logs);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/lifestyle/sleep/stats
 * @desc Get sleep statistics
 */
router.get('/sleep/stats', async (req: AuthRequest, res, next) => {
  try {
    const { period } = req.query;
    const stats = await lifestyleService.getSleepStats(req.user!.id, period as string);
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/lifestyle/sleep/last-night
 * @desc Get last night's sleep
 */
router.get('/sleep/last-night', async (req: AuthRequest, res, next) => {
  try {
    const sleep = await lifestyleService.getLastNightSleep(req.user!.id);
    res.json(sleep);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/lifestyle/balance
 * @desc Get work-life balance analysis
 */
router.get('/balance', async (req: AuthRequest, res, next) => {
  try {
    const { period } = req.query;
    const balance = await lifestyleService.getWorkLifeBalance(req.user!.id, period as string);
    res.json(balance);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/lifestyle/screen-time
 * @desc Get screen time analysis
 */
router.get('/screen-time', async (req: AuthRequest, res, next) => {
  try {
    const { period } = req.query;
    const screenTime = await lifestyleService.getScreenTimeAnalysis(
      req.user!.id,
      period as string
    );
    res.json(screenTime);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/lifestyle/energy
 * @desc Get energy levels analysis
 */
router.get('/energy', async (req: AuthRequest, res, next) => {
  try {
    const { period } = req.query;
    const energy = await lifestyleService.getEnergyAnalysis(req.user!.id, period as string);
    res.json(energy);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/lifestyle/productivity
 * @desc Get productivity analysis
 */
router.get('/productivity', async (req: AuthRequest, res, next) => {
  try {
    const { period } = req.query;
    const productivity = await lifestyleService.getProductivityAnalysis(
      req.user!.id,
      period as string
    );
    res.json(productivity);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/lifestyle/wellness-score
 * @desc Get overall wellness score
 */
router.get('/wellness-score', async (req: AuthRequest, res, next) => {
  try {
    const score = await lifestyleService.getWellnessScore(req.user!.id);
    res.json(score);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/lifestyle/recommendations
 * @desc Get lifestyle recommendations
 */
router.get('/recommendations', async (req: AuthRequest, res, next) => {
  try {
    const recommendations = await lifestyleService.getRecommendations(req.user!.id);
    res.json(recommendations);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/lifestyle/goals
 * @desc Get lifestyle goals
 */
router.get('/goals', async (req: AuthRequest, res, next) => {
  try {
    const goals = await lifestyleService.getLifestyleGoals(req.user!.id);
    res.json(goals);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/lifestyle/goals
 * @desc Set lifestyle goal
 */
router.post('/goals', async (req: AuthRequest, res, next) => {
  try {
    const goal = await lifestyleService.setLifestyleGoal(req.user!.id, req.body);
    res.status(201).json(goal);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/lifestyle/weekly-summary
 * @desc Get weekly lifestyle summary
 */
router.get('/weekly-summary', async (req: AuthRequest, res, next) => {
  try {
    const summary = await lifestyleService.getWeeklySummary(req.user!.id);
    res.json(summary);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/lifestyle/insights
 * @desc Get AI-powered lifestyle insights
 */
router.get('/insights', async (req: AuthRequest, res, next) => {
  try {
    const insights = await lifestyleService.getInsights(req.user!.id);
    res.json(insights);
  } catch (error) {
    next(error);
  }
});

export default router;

