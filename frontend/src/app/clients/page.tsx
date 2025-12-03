'use client'

import Header from '@/components/layout/Header'
import { useDemo } from '@/contexts/DemoContext'
import DemoBanner from '@/components/demo/DemoBanner'
import { motion } from 'framer-motion'

export default function ClientsPage() {
  const { isDemoMode, currentDemoRole } = useDemo()

  const clients = [
    {
      id: '1',
      name: 'Иван Петров',
      avatar: 'И',
      subscription: 'Премиум',
      progress: 75,
      lastActivity: '2 дня назад',
    },
    {
      id: '2',
      name: 'Мария Сидорова',
      avatar: 'М',
      subscription: 'Базовый',
      progress: 45,
      lastActivity: '5 дней назад',
    },
    {
      id: '3',
      name: 'Алексей Иванов',
      avatar: 'А',
      subscription: 'Премиум',
      progress: 90,
      lastActivity: 'Сегодня',
    },
  ]

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />
      
      {isDemoMode && (
        <DemoBanner 
          role={currentDemoRole || 'trainer'} 
          feature="clients"
        />
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Клиенты</h1>
          <p className="text-xl text-ink-600">
            Управление вашими клиентами и подписчиками
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card card-sketch"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-accent-turquoise flex items-center justify-center text-white text-2xl font-bold">
                  {client.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{client.name}</h3>
                  <p className="text-sm text-ink-600">{client.subscription}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Прогресс</span>
                  <span>{client.progress}%</span>
                </div>
                <div className="w-full bg-ink-200 rounded-full h-2">
                  <div
                    className="bg-accent-turquoise h-2 rounded-full"
                    style={{ width: `${client.progress}%` }}
                  />
                </div>
              </div>

              <div className="text-sm text-ink-600 mb-4">
                Последняя активность: {client.lastActivity}
              </div>

              <div className="flex gap-2">
                <button className="button-secondary flex-1">
                  Чат
                </button>
                <button className="button-primary flex-1">
                  Прогресс
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 card bg-ink-50">
          <h3 className="text-xl font-bold mb-4">Статистика</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-turquoise mb-2">
                {clients.length}
              </div>
              <div className="text-ink-600">Всего клиентов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-turquoise mb-2">
                {clients.filter(c => c.subscription === 'Премиум').length}
              </div>
              <div className="text-ink-600">Премиум подписчиков</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-turquoise mb-2">
                {Math.round(clients.reduce((acc, c) => acc + c.progress, 0) / clients.length)}%
              </div>
              <div className="text-ink-600">Средний прогресс</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

