import { Router } from 'express';
import { authMiddleware, requireTrainer, AuthRequest } from '../middleware/auth';
import {
  createChallenge,
  getChallenges,
  getChallenge,
  joinChallenge,
  updateChallengeProgress,
  getChallengeParticipants,
  updateChallenge,
  deleteChallenge,
} from '../services/challenge.service';

const router = Router();

// Challenges
router.route('/')
  .get(authMiddleware, getChallenges)
  .post(authMiddleware, requireTrainer, createChallenge);

router.route('/:id')
  .get(authMiddleware, getChallenge)
  .put(authMiddleware, requireTrainer, updateChallenge)
  .delete(authMiddleware, requireTrainer, deleteChallenge);

router.route('/:id/join')
  .post(authMiddleware, joinChallenge);

router.route('/:id/progress')
  .put(authMiddleware, updateChallengeProgress);

router.route('/:id/participants')
  .get(authMiddleware, getChallengeParticipants);

export default router;

