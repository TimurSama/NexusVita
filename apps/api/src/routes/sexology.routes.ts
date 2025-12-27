import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { AuthRequest, requireSpecialist } from '../middleware/auth.js';
import { SexologyService } from '../services/sexology.service.js';

const router = Router();
const sexologyService = new SexologyService();

// Validation schemas
const logSexHealthSchema = z.object({
  date: z.string().datetime(),
  libidoLevel: z.number().int().min(1).max(10).optional(),
  satisfaction: z.number().int().min(1).max(10).optional(),
  concerns: z.array(z.string()).optional(),
  menstrualCycleDay: z.number().int().positive().optional(),
  menstrualPhase: z.string().optional(),
  contraceptionType: z.string().optional(),
  erectileHealth: z.number().int().min(1).max(10).optional(),
  hormonalSymptoms: z.array(z.string()).optional(),
  notes: z.string().max(5000).optional(),
  isPrivate: z.boolean().optional(),
});

const logIntimacySchema = z.object({
  date: z.string().datetime(),
  activityType: z.string().optional(),
  duration: z.number().int().positive().optional(),
  satisfaction: z.number().int().min(1).max(10).optional(),
  emotionalConnection: z.number().int().min(1).max(10).optional(),
  communication: z.number().int().min(1).max(10).optional(),
  protection: z.boolean().optional(),
  concerns: z.array(z.string()).optional(),
  notes: z.string().max(5000).optional(),
});

const scheduleConsultationSchema = z.object({
  sexologistId: z.string().uuid(),
  scheduledAt: z.string().datetime(),
  duration: z.number().int().min(30).max(120),
  isOnline: z.boolean().optional(),
  concerns: z.string().max(5000).optional(),
});

/**
 * @route GET /api/sexology/specialists
 * @desc Get available sexologists
 */
router.get('/specialists', async (req: AuthRequest, res, next) => {
  try {
    const { specialization, page, limit, search } = req.query;
    const specialists = await sexologyService.getSexologists({
      specialization: specialization as string,
      search: search as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
    });
    res.json(specialists);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/sexology/specialists/:id
 * @desc Get sexologist by ID
 */
router.get('/specialists/:id', async (req: AuthRequest, res, next) => {
  try {
    const specialist = await sexologyService.getSexologistById(req.params.id);
    res.json(specialist);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/sexology/health
 * @desc Log sex health record
 */
router.post('/health', validate(logSexHealthSchema), async (req: AuthRequest, res, next) => {
  try {
    const record = await sexologyService.logSexHealth(req.user!.id, req.body);
    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/sexology/health
 * @desc Get sex health records
 */
router.get('/health', async (req: AuthRequest, res, next) => {
  try {
    const { startDate, endDate, page, limit } = req.query;
    const records = await sexologyService.getSexHealthRecords(req.user!.id, {
      startDate: startDate as string,
      endDate: endDate as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 30,
    });
    res.json(records);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/sexology/intimacy
 * @desc Log intimacy record
 */
router.post('/intimacy', validate(logIntimacySchema), async (req: AuthRequest, res, next) => {
  try {
    const log = await sexologyService.logIntimacy(req.user!.id, req.body);
    res.status(201).json(log);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/sexology/intimacy
 * @desc Get intimacy logs
 */
router.get('/intimacy', async (req: AuthRequest, res, next) => {
  try {
    const { startDate, endDate, page, limit } = req.query;
    const logs = await sexologyService.getIntimacyLogs(req.user!.id, {
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
 * @route POST /api/sexology/consultations
 * @desc Schedule consultation
 */
router.post(
  '/consultations',
  validate(scheduleConsultationSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const consultation = await sexologyService.scheduleConsultation(req.user!.id, req.body);
      res.status(201).json(consultation);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route GET /api/sexology/consultations
 * @desc Get user's consultations
 */
router.get('/consultations', async (req: AuthRequest, res, next) => {
  try {
    const { status, page, limit } = req.query;
    const consultations = await sexologyService.getUserConsultations(req.user!.id, {
      status: status as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
    });
    res.json(consultations);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/sexology/consultations/:id/cancel
 * @desc Cancel consultation
 */
router.post('/consultations/:id/cancel', async (req: AuthRequest, res, next) => {
  try {
    await sexologyService.cancelConsultation(req.params.id, req.user!.id);
    res.json({ message: 'Консультация отменена' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/sexology/cycle
 * @desc Get menstrual cycle data (women)
 */
router.get('/cycle', async (req: AuthRequest, res, next) => {
  try {
    const { months } = req.query;
    const cycleData = await sexologyService.getCycleData(
      req.user!.id,
      parseInt(months as string) || 6
    );
    res.json(cycleData);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/sexology/stats
 * @desc Get sexual health statistics
 */
router.get('/stats', async (req: AuthRequest, res, next) => {
  try {
    const { period } = req.query;
    const stats = await sexologyService.getStats(req.user!.id, period as string);
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/sexology/recommendations
 * @desc Get sexual health recommendations
 */
router.get('/recommendations', async (req: AuthRequest, res, next) => {
  try {
    const recommendations = await sexologyService.getRecommendations(req.user!.id);
    res.json(recommendations);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/sexology/resources
 * @desc Get educational resources
 */
router.get('/resources', async (req: AuthRequest, res, next) => {
  try {
    const { category, page, limit } = req.query;
    const resources = await sexologyService.getResources({
      category: category as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
    });
    res.json(resources);
  } catch (error) {
    next(error);
  }
});

// Specialist routes
/**
 * @route GET /api/sexology/clients
 * @desc Get sexologist's clients
 */
router.get('/clients', requireSpecialist, async (req: AuthRequest, res, next) => {
  try {
    const clients = await sexologyService.getClients(req.user!.id);
    res.json(clients);
  } catch (error) {
    next(error);
  }
});

export default router;

