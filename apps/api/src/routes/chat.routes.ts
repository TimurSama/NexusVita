import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import { AuthRequest } from '../middleware/auth.js';
import { ChatService } from '../services/chat.service.js';

const router = Router();
const chatService = new ChatService();

// Validation schemas
const createChatSchema = z.object({
  type: z.enum(['PRIVATE', 'GROUP', 'SUPPORT', 'CONSULTATION']),
  participantIds: z.array(z.string().uuid()).optional(),
  name: z.string().max(100).optional(),
  avatarUrl: z.string().url().optional(),
});

const sendMessageSchema = z.object({
  chatId: z.string().uuid(),
  content: z.string().min(1).max(10000),
  attachments: z.array(z.object({
    type: z.enum(['image', 'video', 'audio', 'file']),
    url: z.string().url(),
    name: z.string().optional(),
    size: z.number().optional(),
  })).optional(),
});

const createGroupChatSchema = z.object({
  name: z.string().min(2).max(100),
  avatarUrl: z.string().url().optional(),
  participantIds: z.array(z.string().uuid()).min(1),
});

/**
 * @route GET /api/chat/list
 * @desc Get user's chats
 */
router.get('/list', async (req: AuthRequest, res, next) => {
  try {
    const { type, page, limit } = req.query;
    const chats = await chatService.getUserChats(req.user!.id, {
      type: type as string,
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 50,
    });
    res.json(chats);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/chat/:id
 * @desc Get chat by ID
 */
router.get('/:id', async (req: AuthRequest, res, next) => {
  try {
    const chat = await chatService.getChatById(req.params.id, req.user!.id);
    res.json(chat);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/chat/create
 * @desc Create new chat
 */
router.post('/create', validate(createChatSchema), async (req: AuthRequest, res, next) => {
  try {
    const chat = await chatService.createChat(req.user!.id, req.body);
    res.status(201).json(chat);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/chat/private/:userId
 * @desc Start or get private chat with user
 */
router.post('/private/:userId', async (req: AuthRequest, res, next) => {
  try {
    const chat = await chatService.getOrCreatePrivateChat(req.user!.id, req.params.userId);
    res.json(chat);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/chat/group
 * @desc Create group chat
 */
router.post('/group', validate(createGroupChatSchema), async (req: AuthRequest, res, next) => {
  try {
    const chat = await chatService.createGroupChat(req.user!.id, req.body);
    res.status(201).json(chat);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/chat/:id/messages
 * @desc Get chat messages
 */
router.get('/:id/messages', async (req: AuthRequest, res, next) => {
  try {
    const { page, limit, before } = req.query;
    const messages = await chatService.getChatMessages(req.params.id, req.user!.id, {
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 50,
      before: before as string,
    });
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/chat/message
 * @desc Send message
 */
router.post('/message', validate(sendMessageSchema), async (req: AuthRequest, res, next) => {
  try {
    const message = await chatService.sendMessage(req.user!.id, req.body);
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
});

/**
 * @route DELETE /api/chat/message/:id
 * @desc Delete message
 */
router.delete('/message/:id', async (req: AuthRequest, res, next) => {
  try {
    await chatService.deleteMessage(req.params.id, req.user!.id);
    res.json({ message: 'Сообщение удалено' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route PATCH /api/chat/message/:id
 * @desc Edit message
 */
router.patch('/message/:id', async (req: AuthRequest, res, next) => {
  try {
    const { content } = req.body;
    const message = await chatService.editMessage(req.params.id, req.user!.id, content);
    res.json(message);
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/chat/:id/read
 * @desc Mark chat as read
 */
router.post('/:id/read', async (req: AuthRequest, res, next) => {
  try {
    await chatService.markAsRead(req.params.id, req.user!.id);
    res.json({ message: 'Прочитано' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/chat/:id/mute
 * @desc Mute chat
 */
router.post('/:id/mute', async (req: AuthRequest, res, next) => {
  try {
    await chatService.muteChat(req.params.id, req.user!.id);
    res.json({ message: 'Чат заглушен' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/chat/:id/unmute
 * @desc Unmute chat
 */
router.post('/:id/unmute', async (req: AuthRequest, res, next) => {
  try {
    await chatService.unmuteChat(req.params.id, req.user!.id);
    res.json({ message: 'Уведомления включены' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/chat/:id/leave
 * @desc Leave group chat
 */
router.post('/:id/leave', async (req: AuthRequest, res, next) => {
  try {
    await chatService.leaveChat(req.params.id, req.user!.id);
    res.json({ message: 'Вы покинули чат' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/chat/:id/add-member
 * @desc Add member to group chat
 */
router.post('/:id/add-member', async (req: AuthRequest, res, next) => {
  try {
    const { userId } = req.body;
    await chatService.addMember(req.params.id, req.user!.id, userId);
    res.json({ message: 'Участник добавлен' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /api/chat/:id/remove-member
 * @desc Remove member from group chat
 */
router.post('/:id/remove-member', async (req: AuthRequest, res, next) => {
  try {
    const { userId } = req.body;
    await chatService.removeMember(req.params.id, req.user!.id, userId);
    res.json({ message: 'Участник удален' });
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /api/chat/unread-count
 * @desc Get total unread count
 */
router.get('/unread/count', async (req: AuthRequest, res, next) => {
  try {
    const count = await chatService.getUnreadCount(req.user!.id);
    res.json({ count });
  } catch (error) {
    next(error);
  }
});

export default router;



