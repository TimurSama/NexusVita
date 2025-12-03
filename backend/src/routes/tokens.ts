import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()

// Получение баланса токенов
router.get('/balance', authenticateToken, async (req: any, res) => {
  try {
    const transactions = await prisma.tokenTransaction.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 1,
    })

    const balance = transactions[0]?.balance || 0

    res.json({ balance })
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка получения баланса', error: error.message })
  }
})

// Получение истории транзакций
router.get('/transactions', authenticateToken, async (req: any, res) => {
  try {
    const transactions = await prisma.tokenTransaction.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    res.json(transactions)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка получения транзакций', error: error.message })
  }
})

export default router

