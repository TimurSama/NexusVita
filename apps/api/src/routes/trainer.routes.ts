import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { authMiddleware, optionalAuth, AuthRequest, requireTrainer } from '../middleware/auth.js';
import { TrainerService } from '../services/trainer.service.js';

const router = Router();
const trainerService = new TrainerService();

// Validation schemas
const createTrainerProfileSchema = z.object({
  specializations: z.array(z.string()).min(1),
  experience: z.number().int().nonnegative(),
  bio: z.string().max(5000).optional(),
  isAvailableOnline: z.boolean().optional(),
  isAvailableOffline: z.boolean().optional(),
  hourlyRate: z.number().positive().optional(),
  hourlyRateTokens: z.number().positive().optional(),
});

const createTrainerPageSchema = z.object({
  slug: z.string().min(3).max(50).regex(/^[a-z0-9-]+$/),
  title: z.string().min(3).max(200),
  description: z.string().max(5000).optional(),
  themeId: z.string().uuid().optional(),
  modulesConfig: z.record(z.any()).optional(),
});

const scheduleSessionSchema = z.object({
  trainerId: z.string().uuid(),
  date: z.string().datetime(),
  duration: z.number().int().min(15).max(180),
  type: z.enum(['online', 'offline']),
  locationId: z.string().uuid().optional(),
  notes: z.string().max(1000).optional(),
});

/**
 * @route GET /api/trainers
 * @desc Get all trainers
 */
router.get('/', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const { specialization, rating, priceMin, priceMax, isOnline, isOffline, search, page, limit, sort } = req.query;
    const trainers = await trainerService.getTrainers({
      specialization: specialization as string,
      minRating: rating ? parseFloat(rating as string) : undefined,
      minPrice: priceMin ? parseFloat(priceMin as string) : undefined,
      maxPrice: priceMax ? parseFloat(priceMax as string) : undefined,
      isOnline: isOnline === 'true',
      isOffline: isOffline === 'true',
      search: search as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
      sort: sort as string,
    });
    res.json(trainers);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/trainers/top
 * @desc Get top trainers
 */
router.get('/top', async (req, res, next) => {
  try {
    const { limit, specialization } = req.query;
    const trainers = await trainerService.getTopTrainers({
      limit: parseInt(limit as string) || 10,
      specialization: specialization as string,
    });
    res.json(trainers);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/trainers/:id
 * @desc Get trainer by ID
 */
router.get('/:id', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const trainer = await trainerService.getTrainerById(req.params.id, req.user?.id);
    res.json(trainer);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/trainers/page/:slug
 * @desc Get trainer page by slug
 */
router.get('/page/:slug', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const page = await trainerService.getTrainerPageBySlug(req.params.slug, req.user?.id);
    res.json(page);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/trainers/become
 * @desc Become a trainer
 */
router.post(
  '/become',
  authMiddleware,
  validate(createTrainerProfileSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const profile = await trainerService.becomeTrainer(req.user!.id, req.body);
      res.status(201).json(profile);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route PATCH /api/trainers/profile
 * @desc Update trainer profile
 */
router.patch('/profile', authMiddleware, requireTrainer, async (req: AuthRequest, res, next) => {
  try {
    const profile = await trainerService.updateTrainerProfile(req.user!.id, req.body);
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/trainers/page
 * @desc Create trainer page
 */
router.post(
  '/page',
  authMiddleware,
  requireTrainer,
  validate(createTrainerPageSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const page = await trainerService.createTrainerPage(req.user!.id, req.body);
      res.status(201).json(page);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route PATCH /api/trainers/page
 * @desc Update trainer page
 */
router.patch('/page', authMiddleware, requireTrainer, async (req: AuthRequest, res, next) => {
  try {
    const page = await trainerService.updateTrainerPage(req.user!.id, req.body);
    res.json(page);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/trainers/page/publish
 * @desc Publish trainer page
 */
router.post('/page/publish', authMiddleware, requireTrainer, async (req: AuthRequest, res, next) => {
  try {
    const page = await trainerService.publishTrainerPage(req.user!.id);
    res.json(page);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/trainers/certifications
 * @desc Add certification
 */
router.post('/certifications', authMiddleware, requireTrainer, async (req: AuthRequest, res, next) => {
  try {
    const certification = await trainerService.addCertification(req.user!.id, req.body);
    res.status(201).json(certification);
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/trainers/certifications/:id
 * @desc Delete certification
 */
router.delete('/certifications/:id', authMiddleware, requireTrainer, async (req: AuthRequest, res, next) => {
  try {
    await trainerService.deleteCertification(req.params.id, req.user!.id);
    res.json({ message: 'Сертификат удален' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/trainers/:id/schedule
 * @desc Get trainer's schedule
 */
router.get('/:id/schedule', async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const schedule = await trainerService.getTrainerSchedule(req.params.id, {
      startDate: startDate as string,
      endDate: endDate as string,
    });
    res.json(schedule);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/trainers/sessions/book
 * @desc Book training session
 */
router.post(
  '/sessions/book',
  authMiddleware,
  validate(scheduleSessionSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const session = await trainerService.bookSession(req.user!.id, req.body);
      res.status(201).json(session);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route GET /api/trainers/sessions/my
 * @desc Get user's sessions with trainers
 */
router.get('/sessions/my', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { status, page, limit } = req.query;
    const sessions = await trainerService.getUserSessions(req.user!.id, {
      status: status as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
    });
    res.json(sessions);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/trainers/dashboard
 * @desc Get trainer dashboard (for trainers)
 */
router.get('/dashboard', authMiddleware, requireTrainer, async (req: AuthRequest, res, next) => {
  try {
    const dashboard = await trainerService.getTrainerDashboard(req.user!.id);
    res.json(dashboard);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/trainers/clients
 * @desc Get trainer's clients
 */
router.get('/clients', authMiddleware, requireTrainer, async (req: AuthRequest, res, next) => {
  try {
    const { page, limit, search } = req.query;
    const clients = await trainerService.getTrainerClients(req.user!.id, {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 50,
      search: search as string,
    });
    res.json(clients);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/trainers/:id/reviews
 * @desc Get trainer reviews
 */
router.get('/:id/reviews', async (req, res, next) => {
  try {
    const { page, limit, sort } = req.query;
    const reviews = await trainerService.getTrainerReviews(req.params.id, {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
      sort: sort as string,
    });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/trainers/:id/review
 * @desc Add trainer review
 */
router.post('/:id/review', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { rating, title, content } = req.body;
    const review = await trainerService.addReview(req.params.id, req.user!.id, {
      rating,
      title,
      content,
    });
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/trainers/:id/follow
 * @desc Follow trainer (free subscription)
 */
router.post('/:id/follow', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    await trainerService.followTrainer(req.user!.id, req.params.id);
    res.json({ message: 'Вы подписались на тренера' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/trainers/:id/subscribe
 * @desc Subscribe to trainer (paid)
 */
router.post('/:id/subscribe', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { tier, paymentMethod } = req.body;
    const subscription = await trainerService.subscribeToTrainer(
      req.user!.id,
      req.params.id,
      tier,
      paymentMethod
    );
    res.json(subscription);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/trainers/specializations
 * @desc Get all specializations
 */
router.get('/specializations/all', async (req, res, next) => {
  try {
    const specializations = await trainerService.getSpecializations();
    res.json(specializations);
  } catch (error) {
    next(error);
  }
});

export default router;



