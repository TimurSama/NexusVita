import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { AuthRequest } from '../middleware/auth.js';
import { ProfileService } from '../services/profile.service.js';

const router = Router();
const profileService = new ProfileService();

// Validation schemas
const updateProfileSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  displayName: z.string().min(2).optional(),
  bio: z.string().max(2000).optional(),
  avatarUrl: z.string().url().optional().nullable(),
  coverImageUrl: z.string().url().optional().nullable(),
  dateOfBirth: z.string().datetime().optional().nullable(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']).optional(),
  height: z.number().positive().optional().nullable(),
  weight: z.number().positive().optional().nullable(),
  bodyFatPercent: z.number().min(0).max(100).optional().nullable(),
  language: z.string().optional(),
  timezone: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  isProfilePublic: z.boolean().optional(),
  showAge: z.boolean().optional(),
  showWeight: z.boolean().optional(),
  themeId: z.string().uuid().optional().nullable(),
});

const updateBodyAvatarSchema = z.object({
  bodyShape: z.record(z.any()).optional(),
  muscleGroups: z.record(z.any()).optional(),
  injuries: z.record(z.any()).optional().nullable(),
  goals: z.object({
    primary: z.array(z.string()),
    secondary: z.array(z.string()).optional(),
  }).optional(),
  targetWeight: z.number().positive().optional().nullable(),
  targetBodyFat: z.number().min(0).max(100).optional().nullable(),
  targetMuscle: z.number().positive().optional().nullable(),
});

const connectWalletSchema = z.object({
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Некорректный адрес кошелька'),
  signature: z.string(),
  message: z.string(),
});

/**
 * @route GET /api/profile
 * @desc Get current user profile
 */
router.get('/', async (req: AuthRequest, res, next) => {
  try {
    const profile = await profileService.getProfile(req.user!.id);
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PATCH /api/profile
 * @desc Update current user profile
 */
router.patch('/', validate(updateProfileSchema), async (req: AuthRequest, res, next) => {
  try {
    const profile = await profileService.updateProfile(req.user!.id, req.body);
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/profile/body-avatar
 * @desc Get body avatar
 */
router.get('/body-avatar', async (req: AuthRequest, res, next) => {
  try {
    const bodyAvatar = await profileService.getBodyAvatar(req.user!.id);
    res.json(bodyAvatar);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PATCH /api/profile/body-avatar
 * @desc Update body avatar
 */
router.patch('/body-avatar', validate(updateBodyAvatarSchema), async (req: AuthRequest, res, next) => {
  try {
    const bodyAvatar = await profileService.updateBodyAvatar(req.user!.id, req.body);
    res.json(bodyAvatar);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/profile/connect-wallet
 * @desc Connect crypto wallet
 */
router.post('/connect-wallet', validate(connectWalletSchema), async (req: AuthRequest, res, next) => {
  try {
    const result = await profileService.connectWallet(req.user!.id, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/profile/disconnect-wallet
 * @desc Disconnect crypto wallet
 */
router.delete('/disconnect-wallet', async (req: AuthRequest, res, next) => {
  try {
    await profileService.disconnectWallet(req.user!.id);
    res.json({ message: 'Кошелек отключен' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/profile/upload-avatar
 * @desc Upload avatar image
 */
router.post('/upload-avatar', async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement file upload with multer
    const avatarUrl = await profileService.uploadAvatar(req.user!.id, req.body.file);
    res.json({ avatarUrl });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/profile/privacy
 * @desc Get privacy settings
 */
router.get('/privacy', async (req: AuthRequest, res, next) => {
  try {
    const settings = await profileService.getPrivacySettings(req.user!.id);
    res.json(settings);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PATCH /api/profile/privacy
 * @desc Update privacy settings
 */
router.patch('/privacy', async (req: AuthRequest, res, next) => {
  try {
    const settings = await profileService.updatePrivacySettings(req.user!.id, req.body);
    res.json(settings);
  } catch (error) {
    next(error);
  }
});

export default router;


