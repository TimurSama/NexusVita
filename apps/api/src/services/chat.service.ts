import { prisma } from '../utils/prisma.js';

interface ChatFilters {
  type?: string;
  page?: number;
  limit?: number;
}

interface MessageFilters {
  page?: number;
  limit?: number;
  before?: string;
}

export class ChatService {
  /**
   * Get user's chats
   */
  async getUserChats(userId: string, filters: ChatFilters = {}) {
    const { type, page = 1, limit = 50 } = filters;
    const skip = (page - 1) * limit;

    const where: any = {
      members: {
        some: {
          userId,
        },
      },
    };

    if (type) {
      where.type = type;
    }

    const chats = await prisma.chat.findMany({
      where,
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
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
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            sender: {
              select: {
                id: true,
                profile: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            messages: {
              where: {
                readBy: {
                  none: {
                    userId,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
      skip,
      take: limit,
    });

    return {
      chats,
      pagination: {
        page,
        limit,
        total: await prisma.chat.count({ where }),
      },
    };
  }

  /**
   * Get chat by ID
   */
  async getChatById(chatId: string, userId: string) {
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
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
        },
      },
    });

    if (!chat) {
      throw new Error('Чат не найден');
    }

    return chat;
  }

  /**
   * Create new chat
   */
  async createChat(userId: string, data: {
    type: 'PRIVATE' | 'GROUP' | 'SUPPORT' | 'CONSULTATION';
    participantIds?: string[];
    name?: string;
    avatarUrl?: string;
  }) {
    const { type, participantIds = [], name, avatarUrl } = data;

    const chat = await prisma.chat.create({
      data: {
        type,
        name,
        avatarUrl,
        members: {
          create: [
            { userId, role: 'OWNER' },
            ...participantIds.map(id => ({ userId: id, role: 'MEMBER' })),
          ],
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
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
        },
      },
    });

    return chat;
  }

  /**
   * Get or create private chat
   */
  async getOrCreatePrivateChat(userId1: string, userId2: string) {
    // Check if private chat already exists
    const existingChat = await prisma.chat.findFirst({
      where: {
        type: 'PRIVATE',
        members: {
          every: {
            userId: {
              in: [userId1, userId2],
            },
          },
        },
        _count: {
          select: {
            members: true,
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
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
        },
      },
    });

    // Filter chats with exactly 2 members
    const privateChats = await prisma.chat.findMany({
      where: {
        type: 'PRIVATE',
        members: {
          some: {
            userId: userId1,
          },
        },
      },
      include: {
        members: true,
      },
    });

    const chat = privateChats.find(
      c => c.members.length === 2 && c.members.some(m => m.userId === userId2)
    );

    if (chat) {
      return await this.getChatById(chat.id, userId1);
    }

    // Create new private chat
    return await this.createChat(userId1, {
      type: 'PRIVATE',
      participantIds: [userId2],
    });
  }

  /**
   * Create group chat
   */
  async createGroupChat(userId: string, data: {
    name: string;
    avatarUrl?: string;
    participantIds: string[];
  }) {
    return await this.createChat(userId, {
      type: 'GROUP',
      name: data.name,
      avatarUrl: data.avatarUrl,
      participantIds: data.participantIds,
    });
  }

  /**
   * Get chat messages
   */
  async getChatMessages(chatId: string, userId: string, filters: MessageFilters = {}) {
    const { page = 1, limit = 50, before } = filters;
    const skip = (page - 1) * limit;

    // Verify user is member of chat
    const member = await prisma.chatMember.findFirst({
      where: {
        chatId,
        userId,
      },
    });

    if (!member) {
      throw new Error('Доступ запрещен');
    }

    const where: any = {
      chatId,
    };

    if (before) {
      where.createdAt = {
        lt: new Date(before),
      };
    }

    const messages = await prisma.message.findMany({
      where,
      include: {
        sender: {
          select: {
            id: true,
            profile: {
              select: {
                firstName: true,
                lastName: true,
                avatarUrl: true,
              },
            },
          },
        },
        attachments: true,
        readBy: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    return {
      messages: messages.reverse(),
      pagination: {
        page,
        limit,
        total: await prisma.message.count({ where: { chatId } }),
      },
    };
  }

  /**
   * Send message
   */
  async sendMessage(userId: string, data: {
    chatId: string;
    content: string;
    attachments?: Array<{
      type: string;
      url: string;
      name?: string;
      size?: number;
    }>;
  }) {
    const { chatId, content, attachments = [] } = data;

    // Verify user is member of chat
    const member = await prisma.chatMember.findFirst({
      where: {
        chatId,
        userId,
      },
    });

    if (!member) {
      throw new Error('Доступ запрещен');
    }

    const message = await prisma.message.create({
      data: {
        chatId,
        senderId: userId,
        content,
        attachments: {
          create: attachments,
        },
      },
      include: {
        sender: {
          select: {
            id: true,
            profile: {
              select: {
                firstName: true,
                lastName: true,
                avatarUrl: true,
              },
            },
          },
        },
        attachments: true,
      },
    });

    // Update chat updatedAt
    await prisma.chat.update({
      where: { id: chatId },
      data: { updatedAt: new Date() },
    });

    return message;
  }

  /**
   * Edit message
   */
  async editMessage(messageId: string, userId: string, content: string) {
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      throw new Error('Сообщение не найдено');
    }

    if (message.senderId !== userId) {
      throw new Error('Нет прав на редактирование');
    }

    return await prisma.message.update({
      where: { id: messageId },
      data: {
        content,
        editedAt: new Date(),
      },
      include: {
        sender: {
          select: {
            id: true,
            profile: {
              select: {
                firstName: true,
                lastName: true,
                avatarUrl: true,
              },
            },
          },
        },
        attachments: true,
      },
    });
  }

  /**
   * Delete message
   */
  async deleteMessage(messageId: string, userId: string) {
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });

    if (!message) {
      throw new Error('Сообщение не найдено');
    }

    if (message.senderId !== userId) {
      throw new Error('Нет прав на удаление');
    }

    await prisma.message.delete({
      where: { id: messageId },
    });

    return { success: true };
  }

  /**
   * Mark chat as read
   */
  async markAsRead(chatId: string, userId: string) {
    // Verify user is member
    const member = await prisma.chatMember.findFirst({
      where: {
        chatId,
        userId,
      },
    });

    if (!member) {
      throw new Error('Доступ запрещен');
    }

    // Mark all unread messages as read
    const unreadMessages = await prisma.message.findMany({
      where: {
        chatId,
        readBy: {
          none: {
            userId,
          },
        },
      },
    });

    await prisma.messageRead.createMany({
      data: unreadMessages.map(msg => ({
        messageId: msg.id,
        userId,
      })),
      skipDuplicates: true,
    });

    return { success: true };
  }

  /**
   * Mute chat
   */
  async muteChat(chatId: string, userId: string) {
    await prisma.chatMember.updateMany({
      where: {
        chatId,
        userId,
      },
      data: {
        isMuted: true,
      },
    });

    return { success: true };
  }

  /**
   * Unmute chat
   */
  async unmuteChat(chatId: string, userId: string) {
    await prisma.chatMember.updateMany({
      where: {
        chatId,
        userId,
      },
      data: {
        isMuted: false,
      },
    });

    return { success: true };
  }

  /**
   * Leave chat
   */
  async leaveChat(chatId: string, userId: string) {
    const member = await prisma.chatMember.findFirst({
      where: {
        chatId,
        userId,
      },
    });

    if (!member) {
      throw new Error('Вы не являетесь участником чата');
    }

    if (member.role === 'OWNER') {
      throw new Error('Владелец не может покинуть чат');
    }

    await prisma.chatMember.delete({
      where: {
        id: member.id,
      },
    });

    return { success: true };
  }

  /**
   * Add member to chat
   */
  async addMember(chatId: string, userId: string, newMemberId: string) {
    const member = await prisma.chatMember.findFirst({
      where: {
        chatId,
        userId,
      },
    });

    if (!member || (member.role !== 'OWNER' && member.role !== 'ADMIN')) {
      throw new Error('Нет прав на добавление участников');
    }

    await prisma.chatMember.create({
      data: {
        chatId,
        userId: newMemberId,
        role: 'MEMBER',
      },
    });

    return { success: true };
  }

  /**
   * Remove member from chat
   */
  async removeMember(chatId: string, userId: string, memberIdToRemove: string) {
    const member = await prisma.chatMember.findFirst({
      where: {
        chatId,
        userId,
      },
    });

    if (!member || (member.role !== 'OWNER' && member.role !== 'ADMIN')) {
      throw new Error('Нет прав на удаление участников');
    }

    const memberToRemove = await prisma.chatMember.findFirst({
      where: {
        chatId,
        userId: memberIdToRemove,
      },
    });

    if (!memberToRemove) {
      throw new Error('Участник не найден');
    }

    if (memberToRemove.role === 'OWNER') {
      throw new Error('Нельзя удалить владельца');
    }

    await prisma.chatMember.delete({
      where: {
        id: memberToRemove.id,
      },
    });

    return { success: true };
  }

  /**
   * Get unread count
   */
  async getUnreadCount(userId: string) {
    const chats = await prisma.chat.findMany({
      where: {
        members: {
          some: {
            userId,
            isMuted: false,
          },
        },
      },
      include: {
        messages: {
          where: {
            readBy: {
              none: {
                userId,
              },
            },
          },
        },
      },
    });

    return chats.reduce((count, chat) => count + chat.messages.length, 0);
  }
}
