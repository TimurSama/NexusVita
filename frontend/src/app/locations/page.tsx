'use client'

import Header from '@/components/layout/Header'
import { useDemo } from '@/contexts/DemoContext'
import DemoBanner from '@/components/demo/DemoBanner'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LocationsPage() {
  const { isDemoMode, currentDemoRole } = useDemo()

  const locations = [
    {
      id: '1',
      name: 'Фитнес-клуб "Сила"',
      type: 'gym',
      address: 'ул. Примерная, 10',
      city: 'Москва',
      trainers: ['Дмитрий', 'Олег'],
      passes: [
        { name: 'Месячный', price: 3000 },
        { name: 'Годовой', price: 25000 },
      ],
    },
    {
      id: '2',
      name: 'SPA Центр "Релакс"',
      type: 'spa',
      address: 'пр. Мира, 25',
      city: 'Москва',
      trainers: ['Анна'],
      passes: [
        { name: 'Разовое посещение', price: 2000 },
        { name: 'Абонемент 10 посещений', price: 15000 },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />
      
      {isDemoMode && (
        <DemoBanner 
          role={currentDemoRole || 'user'} 
          feature="locations"
        />
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Локации</h1>
          <p className="text-xl text-ink-600">
            Фитнес-клубы, студии, медицинские центры
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card card-sketch"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{location.name}</h3>
                  <p className="text-ink-600">{location.address}, {location.city}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-ink-100 rounded text-sm">
                    {location.type === 'gym' ? '🏋️ Зал' : '🧘 SPA'}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-bold mb-2">Тренеры:</div>
                <div className="flex gap-2">
                  {location.trainers.map((trainer, idx) => (
                    <Link
                      key={idx}
                      href={`/trainers/${trainer.toLowerCase()}`}
                      className="px-3 py-1 bg-accent-turquoise bg-opacity-20 rounded text-sm hover:bg-opacity-30"
                    >
                      {trainer}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-bold mb-2">Абонементы:</div>
                <div className="space-y-2">
                  {location.passes.map((pass, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-ink-50 rounded">
                      <span>{pass.name}</span>
                      <span className="font-bold">{pass.price} ₽</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="button-primary w-full">
                Купить абонемент
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}

