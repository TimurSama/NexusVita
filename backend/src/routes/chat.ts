import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()

// Получение чатов пользователя
router.get('/', authenticateToken, async (req: any, res) => {
  try {
    const chats = await prisma.chat.findMany({
      where: {
        members: {
          some: {
            userId: req.user.id,
          },
        },
      },
      include: {
        members: {
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
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    })

    res.json(chats)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка получения чатов', error: error.message })
  }
})

// Создание сообщения
router.post('/:chatId/messages', authenticateToken, async (req: any, res) => {
  try {
    const { chatId } = req.params
    const { content, type = 'text', mediaUrl } = req.body

    const message = await prisma.message.create({
      data: {
        chatId,
        senderId: req.user.id,
        content,
        type,
        mediaUrl,
      },
    })

    // TODO: Отправка в Telegram если настроено

    res.status(201).json(message)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка создания сообщения', error: error.message })
  }
})

export default router

