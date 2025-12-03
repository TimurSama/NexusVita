'use client'

import Header from '@/components/layout/Header'
import { useDemo } from '@/contexts/DemoContext'
import DemoBanner from '@/components/demo/DemoBanner'
import { motion } from 'framer-motion'

export default function ChallengesPage() {
  const { isDemoMode, currentDemoRole } = useDemo()

  const challenges = [
    {
      id: '1',
      name: '30 дней активности',
      description: 'Ежедневные тренировки в течение месяца',
      participants: 1250,
      tokenReward: 500,
      endDate: '2024-12-31',
      joined: true,
      progress: 15,
    },
    {
      id: '2',
      name: '10 000 шагов',
      description: 'Проходите 10 000 шагов каждый день',
      participants: 890,
      tokenReward: 300,
      endDate: '2024-12-25',
      joined: false,
      progress: 0,
    },
  ]

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />
      
      {isDemoMode && (
        <DemoBanner 
          role={currentDemoRole || 'user'} 
          feature="challenges"
        />
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Челленджи</h1>
          <p className="text-xl text-ink-600">
            Участвуйте в соревнованиях и получайте награды
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card card-sketch"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{challenge.name}</h3>
                  <p className="text-ink-600 mb-2">{challenge.description}</p>
                  <div className="flex items-center gap-4 text-sm text-ink-600">
                    <span>👥 {challenge.participants} участников</span>
                    <span>💰 {challenge.tokenReward} токенов</span>
                  </div>
                </div>
                {challenge.joined && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Участвую
                  </span>
                )}
              </div>

              {challenge.joined && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Прогресс</span>
                    <span>{challenge.progress}%</span>
                  </div>
                  <div className="w-full bg-ink-200 rounded-full h-2">
                    <div
                      className="bg-accent-turquoise h-2 rounded-full"
                      style={{ width: `${challenge.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <button className={challenge.joined ? 'button-secondary w-full' : 'button-primary w-full'}>
                {challenge.joined ? 'Открыть челлендж' : 'Присоединиться'}
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}

