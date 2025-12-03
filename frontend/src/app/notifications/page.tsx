'use client'

import Header from '@/components/layout/Header'
import { motion } from 'framer-motion'

export default function NotificationsPage() {
  const notifications = [
    {
      id: '1',
      type: 'workout',
      title: 'Напоминание о тренировке',
      message: 'У вас запланирована тренировка через 1 час',
      time: '10 минут назад',
      read: false,
    },
    {
      id: '2',
      type: 'token',
      title: 'Получены токены',
      message: 'Вы получили 50 токенов за завершение тренировки',
      time: '2 часа назад',
      read: false,
    },
    {
      id: '3',
      type: 'challenge',
      title: 'Новый челлендж',
      message: 'Доступен новый челлендж "30 дней активности"',
      time: '1 день назад',
      read: true,
    },
  ]

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Уведомления</h1>
        </div>

        <div className="space-y-4">
          {notifications.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card card-sketch ${!notif.read ? 'border-2 border-accent-turquoise' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl">
                  {notif.type === 'workout' ? '🏋️' : 
                   notif.type === 'token' ? '💰' : '🏆'}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{notif.title}</h3>
                  <p className="text-ink-600 mb-2">{notif.message}</p>
                  <p className="text-sm text-ink-500">{notif.time}</p>
                </div>
                {!notif.read && (
                  <div className="w-3 h-3 rounded-full bg-accent-turquoise"></div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}

