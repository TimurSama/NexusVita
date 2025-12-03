import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()

// Получение всех локаций
router.get('/', async (req, res) => {
  try {
    const { type, city } = req.query

    const locations = await prisma.location.findMany({
      where: {
        ...(type && { type: type as string }),
        ...(city && { city: city as string }),
        isActive: true,
      },
      include: {
        passes: {
          where: { isActive: true },
        },
        trainers: {
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
          },
        },
      },
    })

    res.json(locations)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка получения локаций', error: error.message })
  }
})

export default router

