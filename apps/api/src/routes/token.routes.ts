import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { AuthRequest } from '../middleware/auth.js';
import { TokenService } from '../services/token.service.js';

const router = Router();
const tokenService = new TokenService();

// Validation schemas
const transferSchema = z.object({
  toAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  amount: z.number().positive(),
});

const transferToUserSchema = z.object({
  toUserId: z.string().uuid(),
  amount: z.number().positive(),
  description: z.string().max(500).optional(),
});

const purchaseSchema = z.object({
  amount: z.number().positive(),
  paymentMethod: z.enum(['card', 'crypto']),
});

/**
 * @route GET /api/tokens/balance
 * @desc Get user's token balance
 */
router.get('/balance', async (req: AuthRequest, res, next) => {
  try {
    const balance = await tokenService.getBalance(req.user!.id);
    res.json(balance);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/tokens/history
 * @desc Get token transaction history
 */
router.get('/history', async (req: AuthRequest, res, next) => {
  try {
    const { type, page, limit, startDate, endDate } = req.query;
    const history = await tokenService.getTransactionHistory(req.user!.id, {
      type: type as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 30,
      startDate: startDate as string,
      endDate: endDate as string,
    });
    res.json(history);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/tokens/transfer
 * @desc Transfer tokens to wallet address
 */
router.post('/transfer', validate(transferSchema), async (req: AuthRequest, res, next) => {
  try {
    const result = await tokenService.transferToAddress(req.user!.id, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/tokens/send
 * @desc Send tokens to another user
 */
router.post('/send', validate(transferToUserSchema), async (req: AuthRequest, res, next) => {
  try {
    const result = await tokenService.sendToUser(req.user!.id, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/tokens/purchase
 * @desc Purchase tokens
 */
router.post('/purchase', validate(purchaseSchema), async (req: AuthRequest, res, next) => {
  try {
    const result = await tokenService.purchaseTokens(req.user!.id, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/tokens/price
 * @desc Get current token price
 */
router.get('/price', async (req, res, next) => {
  try {
    const { currency } = req.query;
    const price = await tokenService.getTokenPrice(currency as string);
    res.json(price);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/tokens/stats
 * @desc Get token statistics
 */
router.get('/stats', async (req, res, next) => {
  try {
    const stats = await tokenService.getTokenStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/tokens/rewards
 * @desc Get user's pending rewards
 */
router.get('/rewards', async (req: AuthRequest, res, next) => {
  try {
    const rewards = await tokenService.getPendingRewards(req.user!.id);
    res.json(rewards);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/tokens/claim-rewards
 * @desc Claim pending rewards
 */
router.post('/claim-rewards', async (req: AuthRequest, res, next) => {
  try {
    const result = await tokenService.claimRewards(req.user!.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/tokens/nfts
 * @desc Get user's NFTs
 */
router.get('/nfts', async (req: AuthRequest, res, next) => {
  try {
    const { page, limit, collectionId } = req.query;
    const nfts = await tokenService.getUserNfts(req.user!.id, {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
      collectionId: collectionId as string,
    });
    res.json(nfts);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/tokens/nft-collections
 * @desc Get NFT collections
 */
router.get('/nft-collections', async (req, res, next) => {
  try {
    const collections = await tokenService.getNftCollections();
    res.json(collections);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/tokens/sbts
 * @desc Get user's Soulbound Tokens
 */
router.get('/sbts', async (req: AuthRequest, res, next) => {
  try {
    const { type } = req.query;
    const sbts = await tokenService.getUserSbts(req.user!.id, type as string);
    res.json(sbts);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/tokens/referral
 * @desc Get referral information
 */
router.get('/referral', async (req: AuthRequest, res, next) => {
  try {
    const referral = await tokenService.getReferralInfo(req.user!.id);
    res.json(referral);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/tokens/referral/earnings
 * @desc Get referral earnings
 */
router.get('/referral/earnings', async (req: AuthRequest, res, next) => {
  try {
    const { page, limit } = req.query;
    const earnings = await tokenService.getReferralEarnings(req.user!.id, {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
    });
    res.json(earnings);
  } catch (error) {
    next(error);
  }
});

export default router;


