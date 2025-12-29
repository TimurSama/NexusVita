import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { authMiddleware, optionalAuth, AuthRequest, requireSpecialist } from '../middleware/auth.js';
import { PsychologyService } from '../services/psychology.service.js';

const router = Router();
const psychologyService = new PsychologyService();

// Validation schemas
const logMoodSchema = z.object({
  date: z.string().datetime(),
  mood: z.enum(['VERY_BAD', 'BAD', 'NEUTRAL', 'GOOD', 'VERY_GOOD']),
  moodScore: z.number().int().min(1).max(10),
  emotions: z.array(z.string()),
  triggers: z.array(z.string()).optional(),
  sleepQuality: z.number().int().min(1).max(5).optional(),
  energyLevel: z.number().int().min(1).max(5).optional(),
  stressLevel: z.number().int().min(1).max(5).optional(),
  activities: z.array(z.string()).optional(),
  notes: z.string().max(5000).optional(),
  isPrivate: z.boolean().optional(),
});

const logMeditationSchema = z.object({
  programId: z.string().uuid().optional(),
  date: z.string().datetime(),
  duration: z.number().int().positive(),
  type: z.string(),
  calmnessBefore: z.number().int().min(1).max(10).optional(),
  calmnessAfter: z.number().int().min(1).max(10).optional(),
  focusLevel: z.number().int().min(1).max(10).optional(),
  notes: z.string().max(1000).optional(),
  completed: z.boolean().optional(),
});

const scheduleTherapySchema = z.object({
  psychologistId: z.string().uuid(),
  scheduledAt: z.string().datetime(),
  duration: z.number().int().min(30).max(120),
  isOnline: z.boolean().optional(),
  topic: z.string().max(500).optional(),
});

// Public routes
/**
 * @route GET /api/psychology/psychologists
 * @desc Get available psychologists
 */
router.get('/psychologists', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const { specialization, approach, page, limit, search } = req.query;
    const psychologists = await psychologyService.getPsychologists({
      specialization: specialization as string,
      approach: approach as string,
      search: search as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
    });
    res.json(psychologists);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/psychology/psychologists/:id
 * @desc Get psychologist by ID
 */
router.get('/psychologists/:id', async (req, res, next) => {
  try {
    const psychologist = await psychologyService.getPsychologistById(req.params.id);
    res.json(psychologist);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/psychology/meditations
 * @desc Get meditation programs
 */
router.get('/meditations', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const { type, duration, difficulty, page, limit } = req.query;
    const meditations = await psychologyService.getMeditationPrograms({
      type: type as string,
      maxDuration: duration ? parseInt(duration as string) : undefined,
      difficulty: difficulty as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
    });
    res.json(meditations);
  } catch (error) {
    next(error);
  }
});

// Protected routes
/**
 * @route POST /api/psychology/mood
 * @desc Log mood entry
 */
router.post('/mood', authMiddleware, validate(logMoodSchema), async (req: AuthRequest, res, next) => {
  try {
    const log = await psychologyService.logMood(req.user!.id, req.body);
    res.status(201).json(log);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/psychology/mood
 * @desc Get mood logs
 */
router.get('/mood', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { startDate, endDate, page, limit } = req.query;
    const logs = await psychologyService.getMoodLogs(req.user!.id, {
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
 * @route GET /api/psychology/mood/stats
 * @desc Get mood statistics
 */
router.get('/mood/stats', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { period } = req.query;
    const stats = await psychologyService.getMoodStats(req.user!.id, period as string);
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/psychology/meditation/log
 * @desc Log meditation session
 */
router.post(
  '/meditation/log',
  authMiddleware,
  validate(logMeditationSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const session = await psychologyService.logMeditation(req.user!.id, req.body);
      res.status(201).json(session);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route GET /api/psychology/meditation/history
 * @desc Get meditation history
 */
router.get('/meditation/history', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { startDate, endDate, page, limit } = req.query;
    const history = await psychologyService.getMeditationHistory(req.user!.id, {
      startDate: startDate as string,
      endDate: endDate as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 30,
    });
    res.json(history);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/psychology/meditation/stats
 * @desc Get meditation statistics
 */
router.get('/meditation/stats', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { period } = req.query;
    const stats = await psychologyService.getMeditationStats(req.user!.id, period as string);
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/psychology/therapy/sessions
 * @desc Schedule therapy session
 */
router.post(
  '/therapy/sessions',
  authMiddleware,
  validate(scheduleTherapySchema),
  async (req: AuthRequest, res, next) => {
    try {
      const session = await psychologyService.scheduleTherapySession(req.user!.id, req.body);
      res.status(201).json(session);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route GET /api/psychology/therapy/sessions
 * @desc Get therapy sessions
 */
router.get('/therapy/sessions', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { status, page, limit } = req.query;
    const sessions = await psychologyService.getTherapySessions(req.user!.id, {
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
 * @route POST /api/psychology/therapy/sessions/:id/cancel
 * @desc Cancel therapy session
 */
router.post('/therapy/sessions/:id/cancel', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    await psychologyService.cancelTherapySession(req.params.id, req.user!.id);
    res.json({ message: 'Сессия отменена' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/psychology/stress-assessment
 * @desc Get stress level assessment
 */
router.get('/stress-assessment', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const assessment = await psychologyService.getStressAssessment(req.user!.id);
    res.json(assessment);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/psychology/recommendations
 * @desc Get mental health recommendations
 */
router.get('/recommendations', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const recommendations = await psychologyService.getRecommendations(req.user!.id);
    res.json(recommendations);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/psychology/journal
 * @desc Get gratitude/reflection journal
 */
router.get('/journal', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { page, limit } = req.query;
    const entries = await psychologyService.getJournalEntries(req.user!.id, {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
    });
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/psychology/journal
 * @desc Add journal entry
 */
router.post('/journal', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const entry = await psychologyService.addJournalEntry(req.user!.id, req.body);
    res.status(201).json(entry);
  } catch (error) {
    next(error);
  }
});

// Psychologist routes
/**
 * @route GET /api/psychology/clients
 * @desc Get psychologist's clients
 */
router.get('/clients', authMiddleware, requireSpecialist, async (req: AuthRequest, res, next) => {
  try {
    const clients = await psychologyService.getClients(req.user!.id);
    res.json(clients);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/psychology/therapy/sessions/:id/notes
 * @desc Add session notes (psychologist only)
 */
router.post(
  '/therapy/sessions/:id/notes',
  authMiddleware,
  requireSpecialist,
  async (req: AuthRequest, res, next) => {
    try {
      const session = await psychologyService.addSessionNotes(
        req.params.id,
        req.user!.id,
        req.body
      );
      res.json(session);
    } catch (error) {
      next(error);
    }
  }
);

export default router;



