import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()

// Получение постов
router.get('/', async (req, res) => {
  try {
    const { authorId, category, limit = 20, offset = 0 } = req.query

    const posts = await prisma.post.findMany({
      where: {
        ...(authorId && { authorId: authorId as string }),
        ...(category && { category: category as string }),
        isPublic: true,
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: { publishedAt: 'desc' },
      take: parseInt(limit as string),
      skip: parseInt(offset as string),
    })

    res.json(posts)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка получения постов', error: error.message })
  }
})

// Создание поста
router.post('/', authenticateToken, async (req: any, res) => {
  try {
    const { type, content, media, category, tags } = req.body

    const post = await prisma.post.create({
      data: {
        authorId: req.user.id,
        type: type as any,
        content,
        media: media || [],
        category,
        tags: tags || [],
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    })

    res.status(201).json(post)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка создания поста', error: error.message })
  }
})

export default router

