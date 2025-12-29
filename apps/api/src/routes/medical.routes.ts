import { Router } from 'express';
import { z } from 'zod';
import { authMiddleware, AuthRequest, requireRole } from '../middleware/auth.js';
import { UserRole } from '@prisma/client';
import { validate } from '../middleware/validate.js';
import {
  createMedicalRecord,
  getMedicalRecords,
  getMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
} from '../services/medical.service.js';

const router = Router();

// Validation schemas
const shareAccessSchema = z.object({
  specialistId: z.string().uuid(),
  recordIds: z.array(z.string().uuid()).optional(),
  permissions: z.array(z.enum(['read', 'write'])).default(['read']),
});

const scheduleConsultationSchema = z.object({
  doctorId: z.string().uuid(),
  date: z.string().datetime(),
  type: z.enum(['IN_PERSON', 'ONLINE', 'PHONE']),
  reason: z.string().min(10).max(1000),
  notes: z.string().max(2000).optional(),
});

const requireSpecialist = requireRole(UserRole.SPECIALIST, UserRole.DOCTOR);

// Medical Records
router.route('/')
  .post(authMiddleware, createMedicalRecord)
  .get(authMiddleware, getMedicalRecords);

router.route('/:id')
  .get(authMiddleware, getMedicalRecord)
  .put(authMiddleware, updateMedicalRecord)
  .delete(authMiddleware, deleteMedicalRecord);

/**
 * @route POST /api/medical/share
 * @desc Share medical records with specialist
 */
router.post('/share', authMiddleware, validate(shareAccessSchema), async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement shareAccess in medical service
    res.json({ message: 'Share access functionality to be implemented' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/medical/share/:specialistId
 * @desc Revoke access from specialist
 */
router.delete('/share/:specialistId', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement revokeAccess in medical service
    res.json({ message: 'Доступ отозван' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/medical/doctors
 * @desc Get available doctors
 */
router.get('/doctors', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement getDoctors in medical service
    res.json({ doctors: [], total: 0, page: 1, limit: 20 });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/medical/doctors/:id
 * @desc Get doctor by ID
 */
router.get('/doctors/:id', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement getDoctorById in medical service
    res.json({ message: 'Doctor details to be implemented' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/medical/consultations
 * @desc Schedule consultation
 */
router.post(
  '/consultations',
  authMiddleware,
  validate(scheduleConsultationSchema),
  async (req: AuthRequest, res, next) => {
    try {
      // TODO: Implement scheduleConsultation in medical service
      res.status(201).json({ message: 'Consultation scheduling to be implemented' });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route GET /api/medical/consultations
 * @desc Get user's consultations
 */
router.get('/consultations', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement getUserConsultations in medical service
    res.json({ consultations: [], total: 0, page: 1, limit: 20 });
  } catch (error) {
    next(error);
  }
});

/**
 * @route PATCH /api/medical/consultations/:id
 * @desc Update consultation
 */
router.patch('/consultations/:id', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement updateConsultation in medical service
    res.json({ message: 'Consultation update to be implemented' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/medical/consultations/:id/cancel
 * @desc Cancel consultation
 */
router.post('/consultations/:id/cancel', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement cancelConsultation in medical service
    res.json({ message: 'Консультация отменена' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/medical/health-summary
 * @desc Get health summary with all metrics
 */
router.get('/health-summary', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement getHealthSummary in medical service
    res.json({ message: 'Health summary to be implemented' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/medical/trends
 * @desc Get health trends over time
 */
router.get('/trends', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement getHealthTrends in medical service
    res.json({ message: 'Health trends to be implemented' });
  } catch (error) {
    next(error);
  }
});

// Doctor/Specialist routes
/**
 * @route GET /api/medical/patients
 * @desc Get doctor's patients (specialist only)
 */
router.get('/patients', authMiddleware, requireSpecialist, async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement getDoctorPatients in medical service
    res.json({ patients: [] });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/medical/patients/:id/records
 * @desc Get patient's shared records (specialist only)
 */
router.get('/patients/:id/records', authMiddleware, requireSpecialist, async (req: AuthRequest, res, next) => {
  try {
    // TODO: Implement getPatientRecords in medical service
    res.json({ records: [] });
  } catch (error) {
    next(error);
  }
});

export default router;

