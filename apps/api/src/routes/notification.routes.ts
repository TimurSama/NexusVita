import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { AuthRequest } from '../middleware/auth.js';
import { NotificationService } from '../services/notification.service.js';

const router = Router();
const notificationService = new NotificationService();

// Validation schemas
const updateSettingsSchema = z.object({
  emailEnabled: z.boolean().optional(),
  pushEnabled: z.boolean().optional(),
  telegramEnabled: z.boolean().optional(),
  socialEnabled: z.boolean().optional(),
  workoutReminders: z.boolean().optional(),
  healthAlerts: z.boolean().optional(),
  achievementAlerts: z.boolean().optional(),
  challengeUpdates: z.boolean().optional(),
  messageAlerts: z.boolean().optional(),
  promotions: z.boolean().optional(),
  quietHoursEnabled: z.boolean().optional(),
  quietHoursStart: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  quietHoursEnd: z.string().regex(/^\d{2}:\d{2}$/).optional(),
});

/**
 * @route GET /api/notifications
 * @desc Get user's notifications
 */
router.get('/', async (req: AuthRequest, res, next) => {
  try {
    const { type, isRead, page, limit } = req.query;
    const notifications = await notificationService.getNotifications(req.user!.id, {
      type: type as string,
      isRead: isRead === 'true' ? true : isRead === 'false' ? false : undefined,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 30,
    });
    res.json(notifications);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/notifications/unread-count
 * @desc Get unread notifications count
 */
router.get('/unread-count', async (req: AuthRequest, res, next) => {
  try {
    const count = await notificationService.getUnreadCount(req.user!.id);
    res.json({ count });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/notifications/:id/read
 * @desc Mark notification as read
 */
router.post('/:id/read', async (req: AuthRequest, res, next) => {
  try {
    await notificationService.markAsRead(req.params.id, req.user!.id);
    res.json({ message: 'Уведомление прочитано' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/notifications/read-all
 * @desc Mark all notifications as read
 */
router.post('/read-all', async (req: AuthRequest, res, next) => {
  try {
    await notificationService.markAllAsRead(req.user!.id);
    res.json({ message: 'Все уведомления прочитаны' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/notifications/:id
 * @desc Delete notification
 */
router.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    await notificationService.deleteNotification(req.params.id, req.user!.id);
    res.json({ message: 'Уведомление удалено' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/notifications/all
 * @desc Clear all notifications
 */
router.delete('/all/clear', async (req: AuthRequest, res, next) => {
  try {
    await notificationService.clearAllNotifications(req.user!.id);
    res.json({ message: 'Все уведомления удалены' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/notifications/settings
 * @desc Get notification settings
 */
router.get('/settings', async (req: AuthRequest, res, next) => {
  try {
    const settings = await notificationService.getSettings(req.user!.id);
    res.json(settings);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PATCH /api/notifications/settings
 * @desc Update notification settings
 */
router.patch('/settings', validate(updateSettingsSchema), async (req: AuthRequest, res, next) => {
  try {
    const settings = await notificationService.updateSettings(req.user!.id, req.body);
    res.json(settings);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/notifications/register-push
 * @desc Register push token
 */
router.post('/register-push', async (req: AuthRequest, res, next) => {
  try {
    const { token, platform } = req.body;
    await notificationService.registerPushToken(req.user!.id, token, platform);
    res.json({ message: 'Push токен зарегистрирован' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/notifications/unregister-push
 * @desc Unregister push token
 */
router.post('/unregister-push', async (req: AuthRequest, res, next) => {
  try {
    const { token } = req.body;
    await notificationService.unregisterPushToken(req.user!.id, token);
    res.json({ message: 'Push токен удален' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/notifications/test
 * @desc Send test notification
 */
router.post('/test', async (req: AuthRequest, res, next) => {
  try {
    const { channel } = req.body; // 'push', 'email', 'telegram'
    await notificationService.sendTestNotification(req.user!.id, channel);
    res.json({ message: 'Тестовое уведомление отправлено' });
  } catch (error) {
    next(error);
  }
});

export default router;


