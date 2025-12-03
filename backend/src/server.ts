import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Роуты
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import trainerRoutes from './routes/trainers'
import postRoutes from './routes/posts'
import workoutRoutes from './routes/workouts'
import nutritionRoutes from './routes/nutrition'
import locationRoutes from './routes/locations'
import shopRoutes from './routes/shop'
import chatRoutes from './routes/chat'
import eventRoutes from './routes/events'
import challengeRoutes from './routes/challenges'
import tokenRoutes from './routes/tokens'
import themeRoutes from './routes/themes'

dotenv.config()

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/trainers', trainerRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/workouts', workoutRoutes)
app.use('/api/nutrition', nutritionRoutes)
app.use('/api/locations', locationRoutes)
app.use('/api/shop', shopRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/challenges', challengeRoutes)
app.use('/api/tokens', tokenRoutes)
app.use('/api/themes', themeRoutes)

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect()
  process.exit(0)
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📚 API docs: http://localhost:${PORT}/health`)
})

export default app

