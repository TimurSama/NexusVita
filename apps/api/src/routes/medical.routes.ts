import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import {
  createMedicalRecord,
  getMedicalRecords,
  getMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
} from '../services/medical.service';

const router = Router();

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
router.post('/share', validate(shareAccessSchema), async (req: AuthRequest, res, next) => {
  try {
    const result = await medicalService.shareAccess(req.user!.id, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/medical/share/:specialistId
 * @desc Revoke access from specialist
 */
router.delete('/share/:specialistId', async (req: AuthRequest, res, next) => {
  try {
    await medicalService.revokeAccess(req.user!.id, req.params.specialistId);
    res.json({ message: 'Доступ отозван' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/medical/doctors
 * @desc Get available doctors
 */
router.get('/doctors', async (req: AuthRequest, res, next) => {
  try {
    const { specialization, page, limit, search } = req.query;
    const doctors = await medicalService.getDoctors({
      specialization: specialization as string,
      search: search as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
    });
    res.json(doctors);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/medical/doctors/:id
 * @desc Get doctor by ID
 */
router.get('/doctors/:id', async (req: AuthRequest, res, next) => {
  try {
    const doctor = await medicalService.getDoctorById(req.params.id);
    res.json(doctor);
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
  validate(scheduleConsultationSchema),
  async (req: AuthRequest, res, next) => {
    try {
      const consultation = await medicalService.scheduleConsultation(req.user!.id, req.body);
      res.status(201).json(consultation);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @route GET /api/medical/consultations
 * @desc Get user's consultations
 */
router.get('/consultations', async (req: AuthRequest, res, next) => {
  try {
    const { status, page, limit } = req.query;
    const consultations = await medicalService.getUserConsultations(req.user!.id, {
      status: status as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 20,
    });
    res.json(consultations);
  } catch (error) {
    next(error);
  }
});

/**
 * @route PATCH /api/medical/consultations/:id
 * @desc Update consultation
 */
router.patch('/consultations/:id', async (req: AuthRequest, res, next) => {
  try {
    const consultation = await medicalService.updateConsultation(
      req.params.id,
      req.user!.id,
      req.body
    );
    res.json(consultation);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/medical/consultations/:id/cancel
 * @desc Cancel consultation
 */
router.post('/consultations/:id/cancel', async (req: AuthRequest, res, next) => {
  try {
    await medicalService.cancelConsultation(req.params.id, req.user!.id);
    res.json({ message: 'Консультация отменена' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/medical/health-summary
 * @desc Get health summary with all metrics
 */
router.get('/health-summary', async (req: AuthRequest, res, next) => {
  try {
    const summary = await medicalService.getHealthSummary(req.user!.id);
    res.json(summary);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/medical/trends
 * @desc Get health trends over time
 */
router.get('/trends', async (req: AuthRequest, res, next) => {
  try {
    const { metric, period } = req.query;
    const trends = await medicalService.getHealthTrends(
      req.user!.id,
      metric as string,
      period as string
    );
    res.json(trends);
  } catch (error) {
    next(error);
  }
});

// Doctor/Specialist routes
/**
 * @route GET /api/medical/patients
 * @desc Get doctor's patients (specialist only)
 */
router.get('/patients', requireSpecialist, async (req: AuthRequest, res, next) => {
  try {
    const patients = await medicalService.getDoctorPatients(req.user!.id);
    res.json(patients);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/medical/patients/:id/records
 * @desc Get patient's shared records (specialist only)
 */
router.get('/patients/:id/records', requireSpecialist, async (req: AuthRequest, res, next) => {
  try {
    const records = await medicalService.getPatientRecords(req.user!.id, req.params.id);
    res.json(records);
  } catch (error) {
    next(error);
  }
});

export default router;

