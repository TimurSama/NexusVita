import { Server as SocketIOServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma.js';
import { logger } from '../utils/logger.js';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userRole?: string;
}

export function setupSocketHandlers(io: SocketIOServer) {
  // Authentication middleware
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];

      if (!token) {
        return next(new Error('Authentication required'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
        userId: string;
        role: string;
      };

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, role: true, isActive: true },
      });

      if (!user || !user.isActive) {
        return next(new Error('User not found or inactive'));
      }

      socket.userId = user.id;
      socket.userRole = user.role;

      next();
    } catch (error) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    logger.info(`User connected: ${socket.userId}`);

    // Join personal room
    socket.join(`user:${socket.userId}`);

    // Chat handlers
    socket.on('chat:join', async (chatId: string) => {
      try {
        // Verify user is member of chat
        const member = await prisma.chatMember.findUnique({
          where: {
            chatId_userId: {
              chatId,
              userId: socket.userId!,
            },
          },
        });

        if (member) {
          socket.join(`chat:${chatId}`);
          logger.debug(`User ${socket.userId} joined chat ${chatId}`);
        }
      } catch (error) {
        logger.error('Error joining chat:', error);
      }
    });

    socket.on('chat:leave', (chatId: string) => {
      socket.leave(`chat:${chatId}`);
      logger.debug(`User ${socket.userId} left chat ${chatId}`);
    });

    socket.on('chat:message', async (data: { chatId: string; content: string; attachments?: any[] }) => {
      try {
        // Save message to database
        const message = await prisma.message.create({
          data: {
            chatId: data.chatId,
            senderId: socket.userId!,
            content: data.content,
            attachments: data.attachments ? JSON.parse(JSON.stringify(data.attachments)) : undefined,
          },
          include: {
            sender: {
              include: {
                profile: {
                  select: {
                    firstName: true,
                    lastName: true,
                    avatarUrl: true,
                  },
                },
              },
            },
          },
        });

        // Update chat last message time
        await prisma.chat.update({
          where: { id: data.chatId },
          data: { lastMessageAt: new Date() },
        });

        // Update unread count for other members
        await prisma.chatMember.updateMany({
          where: {
            chatId: data.chatId,
            userId: { not: socket.userId! },
          },
          data: {
            unreadCount: { increment: 1 },
          },
        });

        // Broadcast to chat room
        io.to(`chat:${data.chatId}`).emit('chat:message', message);

        // Send notification to offline members
        const offlineMembers = await prisma.chatMember.findMany({
          where: {
            chatId: data.chatId,
            userId: { not: socket.userId! },
          },
          select: { userId: true },
        });

        for (const member of offlineMembers) {
          io.to(`user:${member.userId}`).emit('notification:new', {
            type: 'MESSAGE',
            title: 'Новое сообщение',
            body: data.content.substring(0, 100),
            data: { chatId: data.chatId, messageId: message.id },
          });
        }
      } catch (error) {
        logger.error('Error sending message:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    socket.on('chat:typing', (chatId: string) => {
      socket.to(`chat:${chatId}`).emit('chat:typing', {
        userId: socket.userId,
        chatId,
      });
    });

    socket.on('chat:read', async (chatId: string) => {
      try {
        await prisma.chatMember.update({
          where: {
            chatId_userId: {
              chatId,
              userId: socket.userId!,
            },
          },
          data: {
            lastReadAt: new Date(),
            unreadCount: 0,
          },
        });

        socket.to(`chat:${chatId}`).emit('chat:read', {
          userId: socket.userId,
          chatId,
        });
      } catch (error) {
        logger.error('Error marking chat as read:', error);
      }
    });

    // Workout live tracking
    socket.on('workout:start', (workoutId: string) => {
      socket.join(`workout:${workoutId}`);
      io.to(`user:${socket.userId}`).emit('workout:started', { workoutId });
    });

    socket.on('workout:update', (data: { workoutId: string; stats: any }) => {
      io.to(`workout:${data.workoutId}`).emit('workout:update', {
        userId: socket.userId,
        stats: data.stats,
      });
    });

    socket.on('workout:end', async (data: { workoutId: string; summary: any }) => {
      socket.leave(`workout:${data.workoutId}`);
      io.to(`workout:${data.workoutId}`).emit('workout:ended', {
        userId: socket.userId,
        summary: data.summary,
      });
    });

    // Challenge updates
    socket.on('challenge:join', (challengeId: string) => {
      socket.join(`challenge:${challengeId}`);
    });

    socket.on('challenge:leave', (challengeId: string) => {
      socket.leave(`challenge:${challengeId}`);
    });

    socket.on('challenge:progress', (data: { challengeId: string; progress: number }) => {
      io.to(`challenge:${data.challengeId}`).emit('challenge:progress', {
        userId: socket.userId,
        progress: data.progress,
      });
    });

    // Video call signaling
    socket.on('call:initiate', async (data: { recipientId: string; type: 'video' | 'audio' }) => {
      io.to(`user:${data.recipientId}`).emit('call:incoming', {
        callerId: socket.userId,
        type: data.type,
      });
    });

    socket.on('call:accept', (data: { callerId: string }) => {
      io.to(`user:${data.callerId}`).emit('call:accepted', {
        recipientId: socket.userId,
      });
    });

    socket.on('call:reject', (data: { callerId: string }) => {
      io.to(`user:${data.callerId}`).emit('call:rejected', {
        recipientId: socket.userId,
      });
    });

    socket.on('call:signal', (data: { recipientId: string; signal: any }) => {
      io.to(`user:${data.recipientId}`).emit('call:signal', {
        senderId: socket.userId,
        signal: data.signal,
      });
    });

    socket.on('call:end', (data: { recipientId: string }) => {
      io.to(`user:${data.recipientId}`).emit('call:ended', {
        senderId: socket.userId,
      });
    });

    // Presence
    socket.on('presence:online', () => {
      socket.broadcast.emit('presence:update', {
        userId: socket.userId,
        status: 'online',
      });
    });

    // Disconnect
    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.userId}`);
      socket.broadcast.emit('presence:update', {
        userId: socket.userId,
        status: 'offline',
      });
    });
  });

  // Utility function to emit to specific user
  (io as any).emitToUser = (userId: string, event: string, data: any) => {
    io.to(`user:${userId}`).emit(event, data);
  };

  // Utility function to emit to all users in a chat
  (io as any).emitToChat = (chatId: string, event: string, data: any) => {
    io.to(`chat:${chatId}`).emit(event, data);
  };

  logger.info('Socket.IO handlers initialized');
}


