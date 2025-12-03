'use client'

import Header from '@/components/layout/Header'
import { useDemo } from '@/contexts/DemoContext'
import DemoBanner from '@/components/demo/DemoBanner'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function TrainersListPage() {
  const { isDemoMode, currentDemoRole } = useDemo()

  const trainers = [
    {
      id: 'demo',
      slug: 'demo',
      name: 'Дмитрий',
      specialties: ['Силовые тренировки', 'Функциональный тренинг'],
      followers: 1250,
      subscribers: 89,
      theme: 'dmitry',
    },
    {
      id: 'oleg',
      slug: 'oleg',
      name: 'Олег',
      specialties: ['Велоспорт', 'Выносливость'],
      followers: 890,
      subscribers: 56,
      theme: 'oleg',
    },
  ]

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />
      
      {isDemoMode && (
        <DemoBanner 
          role={currentDemoRole || 'user'} 
          feature="trainers"
        />
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Тренеры</h1>
          <p className="text-xl text-ink-600">
            Найдите своего идеального тренера
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer, index) => (
            <Link key={trainer.id} href={`/trainers/${trainer.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card card-sketch cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-accent-turquoise flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  {trainer.name[0]}
                </div>
                <h3 className="text-2xl font-bold text-center mb-2">{trainer.name}</h3>
                <div className="text-center mb-4">
                  {trainer.specialties.map((spec, idx) => (
                    <span key={idx} className="inline-block px-3 py-1 bg-ink-100 rounded text-sm mr-2 mb-2">
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center gap-4 text-sm text-ink-600">
                  <span>👥 {trainer.followers}</span>
                  <span>⭐ {trainer.subscribers}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

