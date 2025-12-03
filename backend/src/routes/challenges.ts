import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()

// Получение челленджей
router.get('/', async (req, res) => {
  try {
    const challenges = await prisma.challenge.findMany({
      where: {
        isPublic: true,
        endDate: { gte: new Date() },
      },
      include: {
        participants: true,
      },
      orderBy: { startDate: 'desc' },
    })

    res.json(challenges)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка получения челленджей', error: error.message })
  }
})

// Участие в челлендже
router.post('/:challengeId/join', authenticateToken, async (req: any, res) => {
  try {
    const { challengeId } = req.params

    const participant = await prisma.challengeParticipant.create({
      data: {
        challengeId,
        userId: req.user.id,
        progress: {},
      },
    })

    res.status(201).json(participant)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка участия в челлендже', error: error.message })
  }
})

export default router

