import express from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()

// Получение товаров
router.get('/products', async (req, res) => {
  try {
    const { sellerId, category, type } = req.query

    const products = await prisma.product.findMany({
      where: {
        ...(sellerId && { sellerId: sellerId as string }),
        ...(category && { category: category as string }),
        ...(type && { type: type as any }),
        isActive: true,
      },
    })

    res.json(products)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка получения товаров', error: error.message })
  }
})

// Создание заказа
router.post('/orders', authenticateToken, async (req: any, res) => {
  try {
    const { items, passId, paymentMethod, tokenAmount } = req.body

    // Подсчёт общей суммы
    let total = 0
    const orderItems = []

    if (items) {
      for (const item of items) {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        })
        if (product) {
          total += product.price * item.quantity
          orderItems.push({
            productId: item.productId,
            name: product.name,
            quantity: item.quantity,
            price: product.price,
            tokenPrice: product.tokenPrice,
          })
        }
      }
    }

    if (passId) {
      const pass = await prisma.locationPass.findUnique({
        where: { id: passId },
      })
      if (pass) {
        total += pass.price
      }
    }

    // Создание заказа
    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        orderType: passId ? 'pass' : 'product',
        passId,
        total,
        currency: 'RUB',
        tokenAmount,
        paymentMethod,
        status: 'PENDING',
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    })

    // Если использованы токены - списание
    if (tokenAmount && tokenAmount > 0) {
      await prisma.tokenTransaction.create({
        data: {
          userId: req.user.id,
          type: 'SPENT',
          amount: -tokenAmount,
          reason: 'purchase',
          relatedId: order.id,
          relatedType: 'order',
          balance: 0, // TODO: рассчитать баланс
        },
      })
    }

    res.status(201).json(order)
  } catch (error: any) {
    res.status(500).json({ message: 'Ошибка создания заказа', error: error.message })
  }
})

export default router

