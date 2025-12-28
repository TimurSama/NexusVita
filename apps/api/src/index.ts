import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';

import { logger } from './utils/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authMiddleware } from './middleware/auth.js';

// Routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import profileRoutes from './routes/profile.routes.js';
import trainerRoutes from './routes/trainer.routes.js';
import workoutRoutes from './routes/workout.routes.js';
import nutritionRoutes from './routes/nutrition.routes.js';
import medicalRoutes from './routes/medical.routes.js';
import psychologyRoutes from './routes/psychology.routes.js';
import sexologyRoutes from './routes/sexology.routes.js';
import habitRoutes from './routes/habit.routes.js';
import lifestyleRoutes from './routes/lifestyle.routes.js';
import educationRoutes from './routes/education.routes.js';
import socialRoutes from './routes/social.routes.js';
import challengeRoutes from './routes/challenge.routes.js';
import marketplaceRoutes from './routes/marketplace.routes.js';
import locationRoutes from './routes/location.routes.js';
import daoRoutes from './routes/dao.routes.js';
import tokenRoutes from './routes/token.routes.js';
import chatRoutes from './routes/chat.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import telegramRoutes from './routes/telegram.routes.js';
import integrationRoutes from './routes/integration.routes.js';

// Socket handlers
import { setupSocketHandlers } from './sockets/index.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Socket.IO setup
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Make io accessible to routes
app.set('io', io);

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: { error: 'Слишком много запросов, попробуйте позже' },
});
app.use('/api', limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'Nexus Vita API'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/profile', authMiddleware, profileRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/medical', authMiddleware, medicalRoutes);
app.use('/api/psychology', psychologyRoutes);
app.use('/api/sexology', authMiddleware, sexologyRoutes);
app.use('/api/habits', authMiddleware, habitRoutes);
app.use('/api/lifestyle', authMiddleware, lifestyleRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/dao', authMiddleware, daoRoutes);
app.use('/api/tokens', authMiddleware, tokenRoutes);
app.use('/api/chat', authMiddleware, chatRoutes);
app.use('/api/notifications', authMiddleware, notificationRoutes);
app.use('/api/telegram', telegramRoutes);
app.use('/api/integrations', authMiddleware, integrationRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint не найден' });
});

// Setup Socket.IO handlers
setupSocketHandlers(io);

// Start server
const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  logger.info(`🚀 Nexus Vita API запущен на порту ${PORT}`);
  logger.info(`📡 WebSocket сервер готов к подключениям`);
  logger.info(`🔧 Режим: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM получен, закрываем сервер...');
  httpServer.close(() => {
    logger.info('Сервер остановлен');
    process.exit(0);
  });
});

export { app, io };


