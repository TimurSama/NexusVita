import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { TelegramService } from '../services/telegram.service.js';
import { prisma } from '../utils/prisma.js';
import crypto from 'crypto';

const router = Router();
const telegramService = new TelegramService();

// Validation schemas
const webhookSchema = z.object({
  update_id: z.number(),
  message: z.object({
    message_id: z.number(),
    from: z.object({
      id: z.number(),
      first_name: z.string(),
      last_name: z.string().optional(),
      username: z.string().optional(),
    }),
    chat: z.object({
      id: z.number(),
      type: z.string(),
    }),
    text: z.string().optional(),
  }).optional(),
  callback_query: z.object({
    id: z.string(),
    from: z.object({
      id: z.number(),
    }),
    data: z.string(),
  }).optional(),
  pre_checkout_query: z.any().optional(),
  successful_payment: z.any().optional(),
}).passthrough();

const miniAppInitSchema = z.object({
  initData: z.string(),
});

// Verify Telegram webhook secret
const verifyWebhook = (req: any, res: any, next: any) => {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret) return next();

  const providedSecret = req.headers['x-telegram-bot-api-secret-token'];
  if (providedSecret !== secret) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
};

/**
 * @route POST /api/telegram/webhook
 * @desc Telegram Bot webhook handler
 */
router.post('/webhook', verifyWebhook, validate(webhookSchema), async (req, res, next) => {
  try {
    await telegramService.handleWebhook(req.body);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/telegram/mini-app/init
 * @desc Initialize Mini App session
 */
router.post('/mini-app/init', validate(miniAppInitSchema), async (req, res, next) => {
  try {
    const result = await telegramService.initMiniApp(req.body.initData);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/telegram/mini-app/auth
 * @desc Authenticate via Telegram Mini App
 */
router.post('/mini-app/auth', validate(miniAppInitSchema), async (req, res, next) => {
  try {
    const { TelegramService } = await import('../services/telegram.service.js');
    const service = new TelegramService();
    const result = await service.authenticateMiniApp(req.body.initData);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/telegram/invite/send
 * @desc Send invite card via Telegram
 */
router.post('/invite/send', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { TelegramService } = await import('../services/telegram.service.js');
    const service = new TelegramService();
    const { telegramId, chatId } = req.body;
    
    const telegramUser = await prisma.telegramUser.findUnique({
      where: { userId: req.user!.id },
    });

    if (!telegramUser) {
      res.status(404);
      throw new Error('Telegram account not connected');
    }

    const result = await service.sendInviteCard(
      telegramId || telegramUser.telegramId,
      req.user!.id,
      chatId
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/telegram/referral-link
 * @desc Get referral link for sharing
 */
router.get('/referral-link', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { TelegramService } = await import('../services/telegram.service.js');
    const service = new TelegramService();
    const result = await service.getReferralLink(req.user!.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/telegram/mini-app/user
 * @desc Get Mini App user data
 */
router.get('/mini-app/user', async (req, res, next) => {
  try {
    const initData = req.headers['x-telegram-init-data'] as string;
    if (!initData) {
      return res.status(401).json({ error: 'Init data required' });
    }

    const user = await telegramService.getMiniAppUser(initData);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/telegram/connect
 * @desc Connect Telegram account to user
 */
router.post('/connect', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { initData } = req.body;
    const result = await telegramService.connectAccount(req.user!.id, initData);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/telegram/disconnect
 * @desc Disconnect Telegram account
 */
router.delete('/disconnect', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    await telegramService.disconnectAccount(req.user!.id);
    res.json({ message: 'Telegram отключен' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/telegram/status
 * @desc Get Telegram connection status
 */
router.get('/status', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const status = await telegramService.getConnectionStatus(req.user!.id);
    res.json(status);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/telegram/notifications/enable
 * @desc Enable Telegram notifications
 */
router.post('/notifications/enable', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    await telegramService.enableNotifications(req.user!.id);
    res.json({ message: 'Уведомления включены' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/telegram/notifications/disable
 * @desc Disable Telegram notifications
 */
router.post('/notifications/disable', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    await telegramService.disableNotifications(req.user!.id);
    res.json({ message: 'Уведомления отключены' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/telegram/payment/invoice
 * @desc Create Telegram Stars invoice
 */
router.post('/payment/invoice', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { title, description, amount, payload } = req.body;
    const invoice = await telegramService.createInvoice(req.user!.id, {
      title,
      description,
      amount,
      payload,
    });
    res.json(invoice);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/telegram/trainer/:slug
 * @desc Get trainer page data for Mini App
 */
router.get('/trainer/:slug', async (req, res, next) => {
  try {
    const trainerPage = await telegramService.getTrainerPageForMiniApp(req.params.slug);
    res.json(trainerPage);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/telegram/trainer/:trainerId/book
 * @desc Book session via Mini App
 */
router.post('/trainer/:trainerId/book', async (req, res, next) => {
  try {
    const initData = req.headers['x-telegram-init-data'] as string;
    const { sessionType, date, time } = req.body;
    
    const booking = await telegramService.bookSessionViaMiniApp(
      initData,
      req.params.trainerId,
      { sessionType, date, time }
    );
    res.json(booking);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/telegram/bot-info
 * @desc Get bot information
 */
router.get('/bot-info', async (req, res, next) => {
  try {
    const { TelegramBotService } = await import('../services/telegram-bot.service.js');
    const botService = new TelegramBotService();
    const botInfo = await botService.getBotInfo();
    res.json(botInfo);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/telegram/webhook/setup
 * @desc Setup webhook (admin only)
 */
router.post('/webhook/setup', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    // @ts-ignore
    if (req.user.role !== 'ADMIN') {
      res.status(403);
      throw new Error('Admin only');
    }

    const { TelegramBotService } = await import('../services/telegram-bot.service.js');
    const botService = new TelegramBotService();
    const { url, secretToken } = req.body;
    const result = await botService.setWebhook(url, secretToken);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;

