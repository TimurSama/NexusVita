import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { authMiddleware, optionalAuth, AuthRequest, requireTrainer } from '../middleware/auth.js';
import { WorkoutService } from '../services/workout.service.js';

const router = Router();
const workoutService = new WorkoutService();

// Validation schemas
const createProgramSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(5000).optional(),
  coverImageUrl: z.string().url().optional(),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  duration: z.number().int().positive(),
  workoutsPerWeek: z.number().int().min(1).max(7),
  targetGoals: z.array(z.string()),
  targetMuscles: z.array(z.enum([
    'CHEST', 'BACK', 'SHOULDERS', 'BICEPS', 'TRICEPS', 'FOREARMS',
    'ABS', 'OBLIQUES', 'LOWER_BACK', 'GLUTES', 'QUADRICEPS', 'HAMSTRINGS',
    'CALVES', 'FULL_BODY', 'CARDIO'
  ])),
  equipment: z.array(z.string()).optional(),
  isFree: z.boolean().optional(),
  priceFiat: z.number().positive().optional(),
  priceTokens: z.number().positive().optional(),
});

const createExerciseSchema = z.object({
  name: z.string().min(3).max(200),
  description: z.string().max(2000).optional(),
  instructions: z.string().max(5000).optional(),
  targetMuscles: z.array(z.string()),
  secondaryMuscles: z.array(z.string()).optional(),
  equipment: z.array(z.string()).optional(),
  imageUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  defaultSets: z.number().int().positive().optional(),
  defaultReps: z.number().int().positive().optional(),
  defaultDuration: z.number().int().positive().optional(),
  defaultRestTime: z.number().int().positive().optional(),
});

const logWorkoutSchema = z.object({
  exerciseId: z.string().uuid().optional(),
  date: z.string().datetime(),
  duration: z.number().int().positive(),
  sets: z.number().int().positive().optional(),
  reps: z.number().int().positive().optional(),
  weight: z.number().positive().optional(),
  distance: z.number().positive().optional(),
  caloriesBurned: z.number().int().positive().optional(),
  heartRateAvg: z.number().int().positive().optional(),
  heartRateMax: z.number().int().positive().optional(),
  notes: z.string().max(1000).optional(),
  mood: z.number().int().min(1).max(5).optional(),
  difficulty: z.number().int().min(1).max(5).optional(),
  deviceData: z.record(z.any()).optional(),
});

const enrollProgramSchema = z.object({
  programId: z.string().uuid(),
  startDate: z.string().datetime().optional(),
});

// Public routes
/**
 * @route GET /api/workouts/programs
 * @desc Get all workout programs
 */
router.get('/programs', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const { page, limit, difficulty, trainerId, search, isFree } = req.query;
    const programs = await workoutService.getPrograms({
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
      difficulty: difficulty as string,
      trainerId: trainerId as string,
      search: search as string,
      isFree: isFree === 'true',
      userId: req.user?.id,
    });
    res.json(programs);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/workouts/programs/:id
 * @desc Get workout program by ID
 */
router.get('/programs/:id', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const program = await workoutService.getProgramById(req.params.id, req.user?.id);
    res.json(program);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/workouts/exercises
 * @desc Get all exercises
 */
router.get('/exercises', async (req, res, next) => {
  try {
    const { page, limit, muscle, difficulty, search, equipment } = req.query;
    const exercises = await workoutService.getExercises({
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 50,
      muscle: muscle as string,
      difficulty: difficulty as string,
      search: search as string,
      equipment: equipment as string,
    });
    res.json(exercises);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/workouts/exercises/:id
 * @desc Get exercise by ID
 */
router.get('/exercises/:id', async (req, res, next) => {
  try {
    const exercise = await workoutService.getExerciseById(req.params.id);
    res.json(exercise);
  } catch (error) {
    next(error);
  }
});

// Protected routes
/**
 * @route POST /api/workouts/programs
 * @desc Create workout program (trainer only)
 */
router.post(
  '/programs',
  authMiddleware,
  requireTrainer,
  validate(createProgramSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const program = await workoutService.createProgram(req.user!.id, req.body);
      res.status(201).json(program);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route PATCH /api/workouts/programs/:id
 * @desc Update workout program
 */
router.patch(
  '/programs/:id',
  authMiddleware,
  requireTrainer,
  async (req: AuthRequest, res, next) => {
    try {
      const program = await workoutService.updateProgram(req.params.id, req.user!.id, req.body);
      res.json(program);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route DELETE /api/workouts/programs/:id
 * @desc Delete workout program
 */
router.delete('/programs/:id', authMiddleware, requireTrainer, async (req: AuthRequest, res, next) => {
  try {
    await workoutService.deleteProgram(req.params.id, req.user!.id);
    res.json({ message: 'Программа удалена' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/workouts/exercises
 * @desc Create exercise (trainer only)
 */
router.post(
  '/exercises',
  authMiddleware,
  requireTrainer,
  validate(createExerciseSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const exercise = await workoutService.createExercise(req.body);
      res.status(201).json(exercise);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route POST /api/workouts/enroll
 * @desc Enroll in a workout program
 */
router.post(
  '/enroll',
  authMiddleware,
  validate(enrollProgramSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const enrollment = await workoutService.enrollInProgram(req.user!.id, req.body);
      res.status(201).json(enrollment);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route GET /api/workouts/my-programs
 * @desc Get user's enrolled programs
 */
router.get('/my-programs', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const programs = await workoutService.getUserPrograms(req.user!.id);
    res.json(programs);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/workouts/log
 * @desc Log a workout
 */
router.post('/log', authMiddleware, validate(logWorkoutSchema), async (req: AuthRequest, res, next) => {
  try {
    const record = await workoutService.logWorkout(req.user!.id, req.body);
    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/workouts/history
 * @desc Get workout history
 */
router.get('/history', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { startDate, endDate, page, limit } = req.query;
    const history = await workoutService.getWorkoutHistory(req.user!.id, {
      startDate: startDate as string,
      endDate: endDate as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
    });
    res.json(history);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/workouts/stats
 * @desc Get workout statistics
 */
router.get('/stats', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { period } = req.query; // week, month, year, all
    const stats = await workoutService.getWorkoutStats(req.user!.id, period as string);
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/workouts/recommendations
 * @desc Get personalized workout recommendations
 */
router.get('/recommendations', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const recommendations = await workoutService.getRecommendations(req.user!.id);
    res.json(recommendations);
  } catch (error) {
    next(error);
  }
});

export default router;

