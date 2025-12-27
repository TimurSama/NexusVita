'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, Button, Avatar, Badge, Input } from '@/components/ui';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'file';
}

interface Chat {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
    isOnline: boolean;
  };
  lastMessage?: Message;
  unreadCount: number;
}

const mockChats: Chat[] = [
  {
    id: '1',
    participant: {
      id: 'u1',
      name: 'Алекс Петров',
      role: 'Тренер',
      isOnline: true,
    },
    lastMessage: {
      id: 'm1',
      senderId: 'u1',
      content: 'Отличная тренировка сегодня! Продолжаем в том же духе 💪',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isRead: false,
      type: 'text',
    },
    unreadCount: 2,
  },
  {
    id: '2',
    participant: {
      id: 'u2',
      name: 'Мария Козлова',
      role: 'Нутрициолог',
      isOnline: true,
    },
    lastMessage: {
      id: 'm2',
      senderId: 'me',
      content: 'Спасибо за план питания!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isRead: true,
      type: 'text',
    },
    unreadCount: 0,
  },
  {
    id: '3',
    participant: {
      id: 'u3',
      name: 'Елена Смирнова',
      role: 'Психолог',
      isOnline: false,
    },
    lastMessage: {
      id: 'm3',
      senderId: 'u3',
      content: 'Жду вас на консультации в пятницу',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      isRead: true,
      type: 'text',
    },
    unreadCount: 0,
  },
  {
    id: '4',
    participant: {
      id: 'u4',
      name: 'Nexus Vita Support',
      role: 'Поддержка',
      isOnline: true,
    },
    lastMessage: {
      id: 'm4',
      senderId: 'u4',
      content: 'Ваша заявка на сертификацию одобрена!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
      isRead: true,
      type: 'text',
    },
    unreadCount: 0,
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'u1',
    content: 'Привет! Как прошла сегодняшняя тренировка?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    isRead: true,
    type: 'text',
  },
  {
    id: '2',
    senderId: 'me',
    content: 'Привет! Было тяжело, но я справился со всеми упражнениями',
    timestamp: new Date(Date.now() - 1000 * 60 * 55),
    isRead: true,
    type: 'text',
  },
  {
    id: '3',
    senderId: 'u1',
    content: 'Отлично! Я заметил, что ты увеличил веса на приседаниях. Как ощущения?',
    timestamp: new Date(Date.now() - 1000 * 60 * 50),
    isRead: true,
    type: 'text',
  },
  {
    id: '4',
    senderId: 'me',
    content: 'Немного сложно, но терпимо. Думаю, через пару недель можно будет ещё добавить',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    isRead: true,
    type: 'text',
  },
  {
    id: '5',
    senderId: 'u1',
    content: 'Отличная тренировка сегодня! Продолжаем в том же духе 💪',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    isRead: false,
    type: 'text',
  },
];

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'только что';
  if (minutes < 60) return `${minutes} мин.`;
  if (hours < 24) return `${hours} ч.`;
  if (days === 1) return 'вчера';
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isMobileListOpen, setIsMobileListOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      content: newMessage.trim(),
      timestamp: new Date(),
      isRead: false,
      type: 'text',
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="heading-2">Сообщения 💬</h1>
        <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMobileListOpen(!isMobileListOpen)}>
          {isMobileListOpen ? 'Скрыть' : 'Чаты'}
        </Button>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Chat List */}
        <div className={`w-full lg:w-80 flex-shrink-0 ${isMobileListOpen ? 'block' : 'hidden'} lg:block`}>
          <Card className="h-full overflow-hidden flex flex-col">
            <div className="p-4 border-b border-[var(--border-subtle)]">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  placeholder="Поиск..."
                  className="w-full pl-9 pr-4 py-2 text-sm bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-lg"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {mockChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => {
                    setSelectedChat(chat);
                    setIsMobileListOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-4 hover:bg-[var(--bg-tertiary)] transition-colors text-left ${
                    selectedChat?.id === chat.id ? 'bg-[var(--bg-tertiary)]' : ''
                  }`}
                >
                  <Avatar
                    name={chat.participant.name}
                    size="md"
                    status={chat.participant.isOnline ? 'online' : 'offline'}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate">{chat.participant.name}</span>
                      {chat.lastMessage && (
                        <span className="text-xs text-[var(--text-tertiary)]">
                          {formatTime(chat.lastMessage.timestamp)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm text-[var(--text-secondary)] truncate">
                        {chat.lastMessage?.senderId === 'me' && 'Вы: '}
                        {chat.lastMessage?.content}
                      </p>
                      {chat.unreadCount > 0 && (
                        <Badge variant="primary" size="sm">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Chat Window */}
        <Card className={`flex-1 flex flex-col overflow-hidden ${!isMobileListOpen || selectedChat ? 'flex' : 'hidden'} lg:flex`}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 p-4 border-b border-[var(--border-subtle)]">
                <button className="lg:hidden" onClick={() => setIsMobileListOpen(true)}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <Avatar
                  name={selectedChat.participant.name}
                  size="md"
                  status={selectedChat.participant.isOnline ? 'online' : 'offline'}
                />
                <div className="flex-1">
                  <div className="font-medium">{selectedChat.participant.name}</div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    {selectedChat.participant.role} • {selectedChat.participant.isOnline ? 'онлайн' : 'был(а) недавно'}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => {
                  const isOwn = message.senderId === 'me';
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-2xl ${
                          isOwn
                            ? 'bg-gradient-to-r from-violet-600 to-violet-500 text-white rounded-br-none'
                            : 'bg-[var(--bg-tertiary)] rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className={`text-xs mt-1 ${isOwn ? 'text-white/70' : 'text-[var(--text-tertiary)]'}`}>
                          {message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                          {isOwn && (
                            <span className="ml-1">
                              {message.isRead ? '✓✓' : '✓'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-[var(--border-subtle)]">
                <div className="flex items-center gap-3">
                  <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Написать сообщение..."
                    className="flex-1 px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-xl"
                  />
                  <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[var(--text-secondary)]">
              <div className="text-center">
                <span className="text-6xl mb-4 block">💬</span>
                <p>Выберите чат для начала общения</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

