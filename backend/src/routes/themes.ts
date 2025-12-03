import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()

// Получение всех тем
router.get('/', async (req, res) => {
  try {
    const themes = await prisma.theme.findMany({
      where: {
        OR: [
          { isPublic: true },
          { isDefault: true },
        ],
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    })

    res.json(themes)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка получения тем', error: error.message })
  }
})

// Создание темы
router.post('/', authenticateToken, async (req: any, res) => {
  try {
    const { name, slug, description, config, isPublic } = req.body

    const theme = await prisma.theme.create({
      data: {
        name,
        slug,
        description,
        config,
        authorId: req.user.id,
        isPublic: isPublic || false,
      },
    })

    res.status(201).json(theme)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка создания темы', error: error.message })
  }
})

export default router

