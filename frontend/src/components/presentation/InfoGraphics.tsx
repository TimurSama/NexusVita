'use client'

import { motion } from 'framer-motion'

export default function InfoGraphics() {
  return (
    <section className="mb-16">
      <h2 className="text-4xl font-bold text-center mb-12">Визуализация экосистемы</h2>
      
      {/* Схема взаимодействия ролей */}
      <div className="card card-sketch mb-8">
        <h3 className="text-2xl font-bold mb-6 text-center">Взаимодействие ролей</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { role: 'Пользователь', icon: '👤', connections: ['Тренер', 'Локация'] },
            { role: 'Тренер', icon: '💪', connections: ['Пользователь', 'Локация'] },
            { role: 'Локация', icon: '🏢', connections: ['Пользователь', 'Тренер'] },
            { role: 'Врач', icon: '👨‍⚕️', connections: ['Пользователь'] },
            { role: 'Администратор', icon: '⚙️', connections: ['Все'] },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4"
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="font-bold mb-1">{item.role}</div>
              <div className="text-xs text-ink-600">
                {item.connections.join(', ')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Схема потока данных */}
      <div className="card card-sketch mb-8">
        <h3 className="text-2xl font-bold mb-6 text-center">Поток данных</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            'Регистрация',
            'Профиль',
            'Аватар тела',
            'Тренировки',
            'Питание',
            'Прогресс',
            'Токены',
            'Социальные',
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center"
            >
              <div className="px-4 py-2 bg-accent-turquoise text-white rounded-lg font-medium">
                {step}
              </div>
              {index < 7 && (
                <div className="mx-2 text-ink-400">→</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Статистика использования */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: 'Активных пользователей', value: '10K+', trend: '+25%' },
          { label: 'Тренеров на платформе', value: '500+', trend: '+15%' },
          { label: 'Локаций', value: '200+', trend: '+10%' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card card-sketch text-center"
          >
            <div className="text-4xl font-bold text-accent-turquoise mb-2">
              {stat.value}
            </div>
            <div className="text-ink-600 mb-2">{stat.label}</div>
            <div className="text-sm text-green-600 font-medium">{stat.trend}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

