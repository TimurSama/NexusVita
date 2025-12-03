'use client'

import Header from '@/components/layout/Header'
import { useDemo } from '@/contexts/DemoContext'
import DemoBanner from '@/components/demo/DemoBanner'
import { motion } from 'framer-motion'

export default function AnalyticsPage() {
  const { isDemoMode, currentDemoRole } = useDemo()

  const stats = [
    { label: 'Всего пользователей', value: '10,234', change: '+12%' },
    { label: 'Активных тренеров', value: '456', change: '+8%' },
    { label: 'Выручка за месяц', value: '2.5M ₽', change: '+25%' },
    { label: 'Токенов выдано', value: '1.2M', change: '+15%' },
  ]

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />
      
      {isDemoMode && (
        <DemoBanner 
          role={currentDemoRole || 'admin'} 
          feature="analytics"
        />
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Аналитика</h1>
          <p className="text-xl text-ink-600">
            Статистика и отчёты системы
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card card-sketch text-center"
            >
              <div className="text-3xl font-bold text-accent-turquoise mb-2">
                {stat.value}
              </div>
              <div className="text-ink-600 mb-2">{stat.label}</div>
              <div className="text-sm text-green-600 font-medium">
                {stat.change}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="card card-sketch">
          <h2 className="text-2xl font-bold mb-4">Графики и отчёты</h2>
          <p className="text-ink-600">
            Здесь будут графики роста пользователей, активности, доходов и других метрик.
          </p>
        </div>
      </main>
    </div>
  )
}

