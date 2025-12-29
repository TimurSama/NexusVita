import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { AuthRequest } from '../middleware/auth.js';
import { DaoService } from '../services/dao.service.js';

const router = Router();
const daoService = new DaoService();

// Validation schemas
const createProposalSchema = z.object({
  title: z.string().min(10).max(200),
  description: z.string().min(50).max(50000),
  category: z.enum(['feature', 'budget', 'policy', 'other']),
  votingDurationDays: z.number().int().min(1).max(30),
  executionData: z.record(z.any()).optional(),
});

const voteSchema = z.object({
  vote: z.enum(['for', 'against', 'abstain']),
});

const stakeSchema = z.object({
  amount: z.number().positive(),
  stakingType: z.enum(['governance', 'premium_access', 'pool']),
  lockPeriodDays: z.number().int().min(7).max(365),
});

/**
 * @route GET /api/dao/proposals
 * @desc Get all proposals
 */
router.get('/proposals', async (req: AuthRequest, res, next) => {
  try {
    const { status, category, page, limit, sort } = req.query;
    const proposals = await daoService.getProposals({
      status: status as string,
      category: category as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
      sort: sort as string,
      userId: req.user?.id,
    });
    res.json(proposals);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/dao/proposals/active
 * @desc Get active proposals
 */
router.get('/proposals/active', async (req: AuthRequest, res, next) => {
  try {
    const proposals = await daoService.getActiveProposals(req.user?.id);
    res.json(proposals);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/dao/proposals/:id
 * @desc Get proposal by ID
 */
router.get('/proposals/:id', async (req: AuthRequest, res, next) => {
  try {
    const proposal = await daoService.getProposalById(req.params.id, req.user?.id);
    res.json(proposal);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/dao/proposals
 * @desc Create proposal
 */
router.post(
  '/proposals',
  validate(createProposalSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const proposal = await daoService.createProposal(req.user!.id, req.body);
      res.status(201).json(proposal);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route POST /api/dao/proposals/:id/vote
 * @desc Vote on proposal
 */
router.post(
  '/proposals/:id/vote',
  validate(voteSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const vote = await daoService.vote(req.params.id, req.user!.id, req.body.vote);
      res.json(vote);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route GET /api/dao/proposals/:id/votes
 * @desc Get proposal votes
 */
router.get('/proposals/:id/votes', async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const votes = await daoService.getProposalVotes(req.params.id, {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 50,
    });
    res.json(votes);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/dao/my-votes
 * @desc Get user's votes
 */
router.get('/my-votes', async (req: AuthRequest, res, next) => {
  try {
    const votes = await daoService.getUserVotes(req.user!.id);
    res.json(votes);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/dao/voting-power
 * @desc Get user's voting power
 */
router.get('/voting-power', async (req: AuthRequest, res, next) => {
  try {
    const power = await daoService.getVotingPower(req.user!.id);
    res.json(power);
  } catch (error) {
    next(error);
  }
});

// Staking routes
/**
 * @route POST /api/dao/stake
 * @desc Stake tokens
 */
router.post('/stake', validate(stakeSchema), async (req: AuthRequest, res, next) => {
  try {
    const stake = await daoService.stake(req.user!.id, req.body);
    res.status(201).json(stake);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/dao/unstake/:id
 * @desc Unstake tokens
 */
router.post('/unstake/:id', async (req: AuthRequest, res, next) => {
  try {
    const result = await daoService.unstake(req.params.id, req.user!.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/dao/my-stakes
 * @desc Get user's stakes
 */
router.get('/my-stakes', async (req: AuthRequest, res, next) => {
  try {
    const { status } = req.query;
    const stakes = await daoService.getUserStakes(req.user!.id, status as string);
    res.json(stakes);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/dao/claim-rewards
 * @desc Claim staking rewards
 */
router.post('/claim-rewards', async (req: AuthRequest, res, next) => {
  try {
    const result = await daoService.claimRewards(req.user!.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/dao/staking-stats
 * @desc Get staking statistics
 */
router.get('/staking-stats', async (req, res, next) => {
  try {
    const stats = await daoService.getStakingStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/dao/treasury
 * @desc Get treasury information
 */
router.get('/treasury', async (req, res, next) => {
  try {
    const treasury = await daoService.getTreasury();
    res.json(treasury);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/dao/governance-stats
 * @desc Get governance statistics
 */
router.get('/governance-stats', async (req, res, next) => {
  try {
    const stats = await daoService.getGovernanceStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/dao/leaderboard
 * @desc Get governance leaderboard
 */
router.get('/leaderboard', async (req, res, next) => {
  try {
    const { page, limit, type } = req.query;
    const leaderboard = await daoService.getLeaderboard({
      type: type as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 50,
    });
    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

export default router;



