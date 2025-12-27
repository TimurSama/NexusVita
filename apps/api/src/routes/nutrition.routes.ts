import { Router } from 'express';
import { authMiddleware, requireSpecialist } from '../middleware/auth';
import {
  createMealPlan,
  getMealPlans,
  getMealPlan,
  updateMealPlan,
  deleteMealPlan,
  addMealItem,
  updateMealItem,
  deleteMealItem,
  logMeal,
  getMealLogs,
} from '../services/nutrition.service';

const router = Router();

// Meal Plans
router.route('/plans')
  .get(authMiddleware, getMealPlans)
  .post(authMiddleware, requireSpecialist, createMealPlan);

router.route('/plans/:id')
  .get(authMiddleware, getMealPlan)
  .put(authMiddleware, requireSpecialist, updateMealPlan)
  .delete(authMiddleware, requireSpecialist, deleteMealPlan);

// Meal Items
router.route('/plans/:planId/items')
  .post(authMiddleware, requireSpecialist, addMealItem);

router.route('/plans/:planId/items/:itemId')
  .put(authMiddleware, requireSpecialist, updateMealItem)
  .delete(authMiddleware, requireSpecialist, deleteMealItem);

// Meal Logs
router.route('/logs')
  .post(authMiddleware, logMeal)
  .get(authMiddleware, getMealLogs);

export default router;

