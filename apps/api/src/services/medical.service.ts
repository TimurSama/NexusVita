import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../utils/prisma';
import { logger } from '../utils/logger';

// @desc    Create medical record
// @route   POST /api/medical
// @access  Private
export const createMedicalRecord = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const userId = req.user.id;
  const { type, title, date, doctor, clinic, description, files, isImportant } = req.body;

  try {
    const medicalRecord = await prisma.medicalRecord.create({
      data: {
        userId,
        type,
        title,
        date: date ? new Date(date) : new Date(),
        doctor,
        clinic,
        description,
        files: files || [],
        isImportant: isImportant || false,
      },
    });

    res.status(201).json(medicalRecord);
  } catch (error: any) {
    logger.error(`Error creating medical record: ${error.message}`);
    next(error);
  }
};

// @desc    Get medical records
// @route   GET /api/medical
// @access  Private
export const getMedicalRecords = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const userId = req.user.id;
  const { type, startDate, endDate } = req.query;

  try {
    const where: any = { userId };
    
    if (type) {
      where.type = type;
    }
    
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(String(startDate));
      if (endDate) where.date.lte = new Date(String(endDate));
    }

    const records = await prisma.medicalRecord.findMany({
      where,
      orderBy: {
        date: 'desc',
      },
    });

    res.status(200).json(records);
  } catch (error: any) {
    logger.error(`Error getting medical records: ${error.message}`);
    next(error);
  }
};

// @desc    Get single medical record
// @route   GET /api/medical/:id
// @access  Private
export const getMedicalRecord = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const record = await prisma.medicalRecord.findUnique({
      where: { id },
    });

    if (!record) {
      res.status(404);
      throw new Error('Medical record not found');
    }

    if (record.userId !== userId) {
      res.status(403);
      throw new Error('Not authorized to view this record');
    }

    res.status(200).json(record);
  } catch (error: any) {
    logger.error(`Error getting medical record: ${error.message}`);
    next(error);
  }
};

// @desc    Update medical record
// @route   PUT /api/medical/:id
// @access  Private
export const updateMedicalRecord = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const userId = req.user.id;
  const { id } = req.params;
  const { type, title, date, doctor, clinic, description, files, isImportant } = req.body;

  try {
    const existingRecord = await prisma.medicalRecord.findUnique({ where: { id } });

    if (!existingRecord) {
      res.status(404);
      throw new Error('Medical record not found');
    }

    if (existingRecord.userId !== userId) {
      res.status(403);
      throw new Error('Not authorized to update this record');
    }

    const updatedRecord = await prisma.medicalRecord.update({
      where: { id },
      data: {
        type,
        title,
        date: date ? new Date(date) : undefined,
        doctor,
        clinic,
        description,
        files,
        isImportant,
      },
    });

    res.status(200).json(updatedRecord);
  } catch (error: any) {
    logger.error(`Error updating medical record: ${error.message}`);
    next(error);
  }
};

// @desc    Delete medical record
// @route   DELETE /api/medical/:id
// @access  Private
export const deleteMedicalRecord = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authenticated');
  }
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const existingRecord = await prisma.medicalRecord.findUnique({ where: { id } });

    if (!existingRecord) {
      res.status(404);
      throw new Error('Medical record not found');
    }

    if (existingRecord.userId !== userId) {
      res.status(403);
      throw new Error('Not authorized to delete this record');
    }

    await prisma.medicalRecord.delete({ where: { id } });
    res.status(200).json({ message: 'Medical record deleted successfully' });
  } catch (error: any) {
    logger.error(`Error deleting medical record: ${error.message}`);
    next(error);
  }
};

