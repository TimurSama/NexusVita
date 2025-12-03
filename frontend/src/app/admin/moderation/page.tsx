'use client'

import Header from '@/components/layout/Header'
import { useDemo } from '@/contexts/DemoContext'
import DemoBanner from '@/components/demo/DemoBanner'
import { motion } from 'framer-motion'

export default function ModerationPage() {
  const { isDemoMode, currentDemoRole } = useDemo()

  const items = [
    {
      id: '1',
      type: 'post',
      author: 'Тренер Дмитрий',
      content: 'Новая программа тренировок...',
      status: 'pending',
      reported: false,
    },
    {
      id: '2',
      type: 'user',
      author: 'Пользователь Иван',
      content: 'Профиль пользователя',
      status: 'approved',
      reported: true,
    },
  ]

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />
      
      {isDemoMode && (
        <DemoBanner 
          role={currentDemoRole || 'admin'} 
          feature="moderation"
        />
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Модерация</h1>
          <p className="text-xl text-ink-600">
            Управление контентом и пользователями
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card card-sketch"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-ink-100 rounded text-sm">
                      {item.type === 'post' ? '📝 Пост' : '👤 Пользователь'}
                    </span>
                    <span className={`px-3 py-1 rounded text-sm ${
                      item.status === 'approved' 
                        ? 'bg-green-100 text-green-700'
                        : item.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {item.status === 'approved' ? 'Одобрено' : 
                       item.status === 'pending' ? 'На проверке' : 'Отклонено'}
                    </span>
                    {item.reported && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm">
                        ⚠️ Жалоба
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold mb-1">{item.author}</h3>
                  <p className="text-ink-600">{item.content}</p>
                </div>
                <div className="flex gap-2">
                  <button className="button-secondary px-4 py-2">
                    Просмотр
                  </button>
                  {item.status === 'pending' && (
                    <>
                      <button className="button-primary px-4 py-2 bg-green-600">
                        Одобрить
                      </button>
                      <button className="button-secondary px-4 py-2 bg-red-600 text-white">
                        Отклонить
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}

