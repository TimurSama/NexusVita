'use client'

import Header from '@/components/layout/Header'
import { motion } from 'framer-motion'

export default function MessagesPage() {
  const chats = [
    {
      id: '1',
      name: 'Дмитрий Тренер',
      avatar: 'Д',
      lastMessage: 'Привет! Как дела с тренировками?',
      time: '10:30',
      unread: 2,
    },
    {
      id: '2',
      name: 'Группа "30 дней активности"',
      avatar: 'Г',
      lastMessage: 'Иван: Отличная тренировка сегодня!',
      time: 'Вчера',
      unread: 0,
    },
  ]

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Сообщения</h1>
        </div>

        <div className="space-y-4">
          {chats.map((chat, index) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card card-sketch cursor-pointer hover:border-accent-turquoise transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-turquoise flex items-center justify-center text-white text-xl font-bold">
                  {chat.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold">{chat.name}</h3>
                    <span className="text-sm text-ink-500">{chat.time}</span>
                  </div>
                  <p className="text-ink-600 text-sm">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-6 h-6 rounded-full bg-accent-turquoise text-white flex items-center justify-center text-xs font-bold">
                    {chat.unread}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}

