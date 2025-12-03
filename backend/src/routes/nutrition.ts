import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()

// Получение планов питания
router.get('/plans', authenticateToken, async (req: any, res) => {
  try {
    const { trainerId, userId } = req.query

    const plans = await prisma.nutritionPlan.findMany({
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
        meals: true,
      },
    })

    res.json(plans)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка получения планов питания', error: error.message })
  }
})

export default router

