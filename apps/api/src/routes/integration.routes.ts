import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { AuthRequest } from '../middleware/auth.js';
import { IntegrationService } from '../services/integration.service.js';

const router = Router();
const integrationService = new IntegrationService();

// Validation schemas
const connectIntegrationSchema = z.object({
  provider: z.enum(['apple_health', 'google_fit', 'fitbit', 'garmin', 'whoop', 'strava', 'oura']),
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  expiresAt: z.string().datetime().optional(),
});

const updateSyncSettingsSchema = z.object({
  syncSteps: z.boolean().optional(),
  syncWorkouts: z.boolean().optional(),
  syncSleep: z.boolean().optional(),
  syncHeartRate: z.boolean().optional(),
  syncNutrition: z.boolean().optional(),
  syncEnabled: z.boolean().optional(),
});

/**
 * @route GET /api/integrations
 * @desc Get user's integrations
 */
router.get('/', async (req: AuthRequest, res, next) => {
  try {
    const integrations = await integrationService.getUserIntegrations(req.user!.id);
    res.json(integrations);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/integrations/available
 * @desc Get available integrations
 */
router.get('/available', async (req, res, next) => {
  try {
    const available = await integrationService.getAvailableIntegrations();
    res.json(available);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/integrations/:provider/auth-url
 * @desc Get OAuth URL for provider
 */
router.get('/:provider/auth-url', async (req: AuthRequest, res, next) => {
  try {
    const { redirectUri } = req.query;
    const url = await integrationService.getAuthUrl(
      req.params.provider,
      req.user!.id,
      redirectUri as string
    );
    res.json({ url });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/integrations/:provider/callback
 * @desc Handle OAuth callback
 */
router.post('/:provider/callback', async (req: AuthRequest, res, next) => {
  try {
    const { code, state } = req.body;
    const integration = await integrationService.handleCallback(
      req.params.provider,
      req.user!.id,
      code,
      state
    );
    res.json(integration);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/integrations/connect
 * @desc Connect integration manually
 */
router.post(
  '/connect',
  validate(connectIntegrationSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const integration = await integrationService.connectIntegration(req.user!.id, req.body);
      res.status(201).json(integration);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route DELETE /api/integrations/:provider
 * @desc Disconnect integration
 */
router.delete('/:provider', async (req: AuthRequest, res, next) => {
  try {
    await integrationService.disconnectIntegration(req.user!.id, req.params.provider);
    res.json({ message: 'Интеграция отключена' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route PATCH /api/integrations/:provider/settings
 * @desc Update sync settings
 */
router.patch(
  '/:provider/settings',
  validate(updateSyncSettingsSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const integration = await integrationService.updateSyncSettings(
        req.user!.id,
        req.params.provider,
        req.body
      );
      res.json(integration);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route POST /api/integrations/:provider/sync
 * @desc Trigger manual sync
 */
router.post('/:provider/sync', async (req: AuthRequest, res, next) => {
  try {
    const result = await integrationService.syncData(req.user!.id, req.params.provider);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/integrations/:provider/status
 * @desc Get integration status
 */
router.get('/:provider/status', async (req: AuthRequest, res, next) => {
  try {
    const status = await integrationService.getIntegrationStatus(req.user!.id, req.params.provider);
    res.json(status);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/integrations/:provider/data
 * @desc Get synced data from provider
 */
router.get('/:provider/data', async (req: AuthRequest, res, next) => {
  try {
    const { type, startDate, endDate, page, limit } = req.query;
    const data = await integrationService.getSyncedData(req.user!.id, req.params.provider, {
      type: type as string,
      startDate: startDate as string,
      endDate: endDate as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 30,
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/integrations/devices
 * @desc Get connected devices
 */
router.get('/devices', async (req: AuthRequest, res, next) => {
  try {
    const devices = await integrationService.getConnectedDevices(req.user!.id);
    res.json(devices);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/integrations/import
 * @desc Import data from file (CSV, etc.)
 */
router.post('/import', async (req: AuthRequest, res, next) => {
  try {
    const { type, data, source } = req.body;
    const result = await integrationService.importData(req.user!.id, type, data, source);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/integrations/export
 * @desc Export user data
 */
router.get('/export', async (req: AuthRequest, res, next) => {
  try {
    const { format, types, startDate, endDate } = req.query;
    const exportData = await integrationService.exportData(req.user!.id, {
      format: format as string,
      types: types ? (types as string).split(',') : undefined,
      startDate: startDate as string,
      endDate: endDate as string,
    });
    res.json(exportData);
  } catch (error) {
    next(error);
  }
});

export default router;

