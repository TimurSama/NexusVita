import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()

// Получение событий
router.get('/', async (req, res) => {
  try {
    const { organizerId, type, startDate, endDate } = req.query

    const events = await prisma.event.findMany({
      where: {
        ...(organizerId && { organizerId: organizerId as string }),
        ...(type && { type: type as any }),
        ...(startDate && { startDate: { gte: new Date(startDate as string) } }),
        ...(endDate && { endDate: { lte: new Date(endDate as string) } }),
        isPublic: true,
      },
      include: {
        location: true,
        registrations: true,
      },
      orderBy: { startDate: 'asc' },
    })

    res.json(events)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка получения событий', error: error.message })
  }
})

// Регистрация на событие
router.post('/:eventId/register', authenticateToken, async (req: any, res) => {
  try {
    const { eventId } = req.params

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { registrations: true },
    })

    if (!event) {
      return res.status(404).json({ message: 'Событие не найдено' })
    }

    // Проверка лимита участников
    if (event.maxParticipants && event.registrations.length >= event.maxParticipants) {
      return res.status(400).json({ message: 'Места закончились' })
    }

    const registration = await prisma.eventRegistration.create({
      data: {
        eventId,
        userId: req.user.id,
      },
    })

    res.status(201).json(registration)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка регистрации', error: error.message })
  }
})

export default router

