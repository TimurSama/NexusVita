import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()

// Получение профиля пользователя
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        bodyAvatar: true,
        trainerProfile: true,
      },
    })

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' })
    }

    res.json(user)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка получения пользователя', error: error.message })
  }
})

// Обновление профиля
router.put('/:id', authenticateToken, async (req: any, res) => {
  try {
    const { id } = req.params

    // Проверка прав
    if (req.user.id !== id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Недостаточно прав' })
    }

    const { firstName, lastName, profile, bodyAvatar } = req.body

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        profile: profile
          ? {
              update: profile,
            }
          : undefined,
        bodyAvatar: bodyAvatar
          ? {
              update: bodyAvatar,
            }
          : undefined,
      },
      include: {
        profile: true,
        bodyAvatar: true,
      },
    })

    res.json(updatedUser)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка обновления профиля', error: error.message })
  }
})

export default router

