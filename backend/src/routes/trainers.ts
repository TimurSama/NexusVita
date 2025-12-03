import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()

// Получение всех тренеров
router.get('/', async (req, res) => {
  try {
    const trainers = await prisma.trainerProfile.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        trainerPage: {
          include: {
            theme: true,
          },
        },
      },
    })

    res.json(trainers)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка получения тренеров', error: error.message })
  }
})

// Получение тренера по slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params

    const trainerPage = await prisma.trainerPage.findUnique({
      where: { slug },
      include: {
        trainer: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
        theme: true,
        modules: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!trainerPage) {
      return res.status(404).json({ message: 'Страница тренера не найдена' })
    }

    res.json(trainerPage)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка получения страницы тренера', error: error.message })
  }
})

// Создание/обновление страницы тренера
router.post('/:trainerId/page', authenticateToken, async (req: any, res) => {
  try {
    const { trainerId } = req.params
    const { title, description, themeId, modules } = req.body

    // Проверка прав
    if (req.user.role !== 'TRAINER' && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Недостаточно прав' })
    }

    const trainer = await prisma.trainerProfile.findUnique({
      where: { userId: trainerId },
    })

    if (!trainer) {
      return res.status(404).json({ message: 'Тренер не найден' })
    }

    // Создание или обновление страницы
    const slug = title.toLowerCase().replace(/\s+/g, '-')
    const trainerPage = await prisma.trainerPage.upsert({
      where: { trainerId: trainer.id },
      update: {
        title,
        description,
        themeId,
        updatedAt: new Date(),
      },
      create: {
        trainerId: trainer.id,
        slug,
        title,
        description,
        themeId,
      },
    })

    // Обновление модулей
    if (modules) {
      await prisma.trainerPageModule.deleteMany({
        where: { pageId: trainerPage.id },
      })

      await prisma.trainerPageModule.createMany({
        data: modules.map((module: any, index: number) => ({
          pageId: trainerPage.id,
          moduleType: module.type,
          config: module.config || {},
          order: index,
        })),
      })
    }

    res.json(trainerPage)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка создания страницы', error: error.message })
  }
})

export default router

