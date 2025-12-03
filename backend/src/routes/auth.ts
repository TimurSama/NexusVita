import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { authenticateToken } from '../middleware/auth'

const router = express.Router()
const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, role = 'USER' } = req.body

    if (!email || !password || !firstName) {
      return res.status(400).json({ message: 'Заполните все обязательные поля' })
    }

    // Проверка существующего пользователя
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' })
    }

    // Хеширование пароля
    const passwordHash = await bcrypt.hash(password, 10)

    // Создание пользователя
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        role: role as any,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
      },
    })

    // Создание профиля
    await prisma.userProfile.create({
      data: {
        userId: user.id,
      },
    })

    // Создание аватара тела
    await prisma.bodyAvatar.create({
      data: {
        userId: user.id,
        targetZones: [],
        painPoints: [],
      },
    })

    // Если тренер - создаём профиль тренера
    if (role === 'TRAINER') {
      await prisma.trainerProfile.create({
        data: {
          userId: user.id,
        },
      })
    }

    // Генерация токена
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({ token, user })
  } catch (error: any) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Ошибка регистрации', error: error.message })
  }
})

// Вход
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email и пароль обязательны' })
    }

    // Поиск пользователя
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return res.status(401).json({ message: 'Неверный email или пароль' })
    }

    // Проверка пароля
    const isValidPassword = await bcrypt.compare(password, user.passwordHash)

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Неверный email или пароль' })
    }

    // Генерация токена
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatar: user.avatar,
      },
    })
  } catch (error: any) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Ошибка входа', error: error.message })
  }
})

// Получение текущего пользователя
router.get('/me', authenticateToken, async (req: any, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        profile: true,
      },
    })

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' })
    }

    res.json(user)
  } catch (error: any) {
    console.error('Get user error:', error)
    res.status(500).json({ message: 'Ошибка получения пользователя', error: error.message })
  }
})

export default router

