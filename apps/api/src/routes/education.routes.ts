import { Router } from 'express';
import { authMiddleware, requireSpecialist, AuthRequest } from '../middleware/auth';
import {
  createEducationContent,
  getEducationContent,
  getEducationContentById,
  updateEducationContent,
  deleteEducationContent,
  createCourse,
  getCourses,
  getCourse,
  enrollInCourse,
} from '../services/education.service';

const router = Router();

// Education Content
router.route('/content')
  .get(getEducationContent)
  .post(authMiddleware, requireSpecialist, createEducationContent);

router.route('/content/:id')
  .get(getEducationContentById)
  .put(authMiddleware, requireSpecialist, updateEducationContent)
  .delete(authMiddleware, requireSpecialist, deleteEducationContent);

// Courses
router.route('/courses')
  .get(getCourses)
  .post(authMiddleware, requireSpecialist, createCourse);

router.route('/courses/:id')
  .get(getCourse);

router.route('/courses/:id/enroll')
  .post(authMiddleware, enrollInCourse);

export default router;

