'use client'

import Header from '@/components/layout/Header'
import { useDemo } from '@/contexts/DemoContext'
import DemoBanner from '@/components/demo/DemoBanner'
import { motion } from 'framer-motion'

export default function ProgramsPage() {
  const { isDemoMode, currentDemoRole } = useDemo()

  const programs = [
    {
      id: '1',
      name: 'Программа "Сила и выносливость"',
      description: '4-недельная программа для развития силы',
      trainer: 'Дмитрий',
      price: 1500,
      tokenPrice: 75,
      duration: '28 дней',
    },
    {
      id: '2',
      name: 'Восстановление после травм',
      description: 'Комплексная программа реабилитации',
      trainer: 'Анна',
      price: 2000,
      tokenPrice: 100,
      duration: '42 дня',
    },
  ]

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />
      
      {isDemoMode && (
        <DemoBanner 
          role={currentDemoRole || 'trainer'} 
          feature="programs"
        />
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Программы</h1>
          <p className="text-xl text-ink-600">
            {currentDemoRole === 'trainer' 
              ? 'Создавайте и управляйте программами тренировок'
              : 'Доступные программы от тренеров'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card card-sketch"
            >
              <h3 className="text-2xl font-bold mb-2">{program.name}</h3>
              <p className="text-ink-600 mb-4">{program.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-ink-600">Тренер: {program.trainer}</div>
                  <div className="text-sm text-ink-600">Длительность: {program.duration}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{program.price} ₽</div>
                  <div className="text-sm text-accent-turquoise">
                    или {program.tokenPrice} токенов
                  </div>
                </div>
              </div>

              {currentDemoRole === 'trainer' ? (
                <button className="button-secondary w-full">
                  Редактировать программу
                </button>
              ) : (
                <button className="button-primary w-full">
                  Купить программу
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {currentDemoRole === 'trainer' && (
          <div className="mt-8">
            <button className="button-primary">
              + Создать новую программу
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

