'use client'

import Header from '@/components/layout/Header'
import { useDemo } from '@/contexts/DemoContext'
import DemoBanner from '@/components/demo/DemoBanner'
import { motion } from 'framer-motion'

export default function WorkoutsPage() {
  const { isDemoMode, currentDemoRole } = useDemo()

  const workouts = [
    {
      id: '1',
      name: 'Силовая тренировка',
      trainer: 'Дмитрий',
      duration: '60 мин',
      exercises: 8,
      completed: false,
    },
    {
      id: '2',
      name: 'Кардио интервалы',
      trainer: 'Олег',
      duration: '45 мин',
      exercises: 6,
      completed: true,
    },
    {
      id: '3',
      name: 'Йога для восстановления',
      trainer: 'Анна',
      duration: '30 мин',
      exercises: 5,
      completed: false,
    },
  ]

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />
      
      {isDemoMode && (
        <DemoBanner 
          role={currentDemoRole || 'user'} 
          feature="workouts"
        />
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Тренировки</h1>
          <p className="text-xl text-ink-600">
            Ваши программы и записи тренировок
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout, index) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card card-sketch"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">{workout.name}</h3>
                  <p className="text-ink-600">Тренер: {workout.trainer}</p>
                </div>
                {workout.completed && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    ✓ Выполнено
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 mb-4 text-sm text-ink-600">
                <span>⏱️ {workout.duration}</span>
                <span>💪 {workout.exercises} упражнений</span>
              </div>

              <button className="button-primary w-full">
                {workout.completed ? 'Повторить' : 'Начать тренировку'}
              </button>
            </motion.div>
          ))}
        </div>

        {isDemoMode && (
          <div className="mt-8 card bg-yellow-50 border-yellow-200">
            <p className="text-sm text-ink-600">
              💡 В демо-режиме вы видите примеры тренировок. В реальном приложении здесь будут ваши программы от тренеров.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

