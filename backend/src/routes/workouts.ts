import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()

// Получение программ тренировок
router.get('/plans', authenticateToken, async (req: any, res) => {
  try {
    const { trainerId, userId } = req.query

    const plans = await prisma.workoutPlan.findMany({
      where: {
        ...(trainerId && { trainerId: trainerId as string }),
        ...(userId && { userId: userId as string }),
      },
      include: {
        trainer: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        exercises: {
          include: {
            exercise: true,
          },
        },
      },
    })

    res.json(plans)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка получения программ', error: error.message })
  }
})

// Создание записи о тренировке
router.post('/records', authenticateToken, async (req: any, res) => {
  try {
    const { planId, exerciseId, sets, reps, weight, duration, calories, notes } = req.body

    const record = await prisma.workoutRecord.create({
      data: {
        userId: req.user.id,
        planId,
        exerciseId,
        sets,
        reps,
        weight,
        duration,
        calories,
        notes,
      },
    })

    res.status(201).json(record)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка создания записи', error: error.message })
  }
})

export default router

