import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { AuthService } from '../services/auth.service.js';

const router = Router();
const authService = new AuthService();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(8, 'Пароль должен быть не менее 8 символов'),
  firstName: z.string().min(2, 'Имя должно быть не менее 2 символов'),
  lastName: z.string().min(2, 'Фамилия должна быть не менее 2 символов'),
  phone: z.string().optional(),
  referralCode: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(1, 'Введите пароль'),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Токен обязателен'),
});

const forgotPasswordSchema = z.object({
  email: z.string().email('Некорректный email'),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Токен обязателен'),
  password: z.string().min(8, 'Пароль должен быть не менее 8 символов'),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Введите текущий пароль'),
  newPassword: z.string().min(8, 'Новый пароль должен быть не менее 8 символов'),
});

const telegramAuthSchema = z.object({
  id: z.number(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  username: z.string().optional(),
  auth_date: z.number(),
  hash: z.string(),
});

// Routes

/**
 * @route POST /api/auth/register
 * @desc Register new user
 */
router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/auth/login
 * @desc Login user
 */
router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/auth/refresh
 * @desc Refresh access token
 */
router.post('/refresh', validate(refreshTokenSchema), async (req, res, next) => {
  try {
    const result = await authService.refreshToken(req.body.refreshToken);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/auth/logout
 * @desc Logout user
 */
router.post('/logout', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    await authService.logout(req.user!.id);
    res.json({ message: 'Вы успешно вышли из системы' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/auth/forgot-password
 * @desc Send password reset email
 */
router.post('/forgot-password', validate(forgotPasswordSchema), async (req, res, next) => {
  try {
    await authService.forgotPassword(req.body.email);
    res.json({ message: 'Инструкции по сбросу пароля отправлены на email' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/auth/reset-password
 * @desc Reset password with token
 */
router.post('/reset-password', validate(resetPasswordSchema), async (req, res, next) => {
  try {
    await authService.resetPassword(req.body.token, req.body.password);
    res.json({ message: 'Пароль успешно изменен' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/auth/change-password
 * @desc Change password (authenticated)
 */
router.post(
  '/change-password',
  authMiddleware,
  validate(changePasswordSchema),
  async (req: AuthRequest, res, next) => {
    try {
      await authService.changePassword(
        req.user!.id,
        req.body.currentPassword,
        req.body.newPassword
      );
      res.json({ message: 'Пароль успешно изменен' });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route POST /api/auth/verify-email
 * @desc Verify email with token
 */
router.post('/verify-email', async (req, res, next) => {
  try {
    const { token } = req.body;
    await authService.verifyEmail(token);
    res.json({ message: 'Email подтвержден' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/auth/resend-verification
 * @desc Resend verification email
 */
router.post('/resend-verification', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    await authService.resendVerificationEmail(req.user!.id);
    res.json({ message: 'Письмо с подтверждением отправлено' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/auth/telegram
 * @desc Authenticate via Telegram
 */
router.post('/telegram', validate(telegramAuthSchema), async (req, res, next) => {
  try {
    const result = await authService.telegramAuth(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/auth/me
 * @desc Get current user
 */
router.get('/me', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.user!.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;

