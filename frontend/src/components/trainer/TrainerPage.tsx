'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import TrainerHeader from '@/components/trainer/TrainerHeader'
import TrainerFeed from '@/components/trainer/TrainerFeed'
import TrainerSidebar from '@/components/trainer/TrainerSidebar'
import { useDemo } from '@/contexts/DemoContext'
import DemoBanner from '@/components/demo/DemoBanner'

interface Trainer {
  id: string
  firstName: string
  lastName?: string
  bio?: string
  specialties: string[]
  followersCount: number
  subscribersCount: number
  theme?: {
    slug: string
    name: string
  }
}

export default function TrainerPage() {
  const params = useParams()
  const trainerSlug = params?.slug as string
  const { isDemoMode, currentDemoRole } = useDemo()
  const [trainer, setTrainer] = useState<Trainer | null>(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    // Загрузка данных тренера
    // В реальном приложении здесь будет API запрос
    if (trainerSlug === 'demo' || isDemoMode) {
      setTrainer({
        id: 'demo-trainer',
        firstName: 'Дмитрий',
        lastName: 'Тренер',
        bio: 'Опытный тренер по силовым тренировкам и функциональному тренингу. Специализируюсь на восстановлении после травм.',
        specialties: ['Силовые тренировки', 'Функциональный тренинг', 'Восстановление'],
        followersCount: 1250,
        subscribersCount: 89,
        theme: { slug: 'dmitry', name: 'Лес, грибы, Dune' },
      })
    }
  }, [trainerSlug, isDemoMode])

  if (!trainer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" data-theme={trainer.theme?.slug || 'default'}>
      <Header />
      
      {isDemoMode && (
        <DemoBanner 
          role={currentDemoRole || 'trainer'} 
          feature="trainer_page"
        />
      )}

      <main className="container mx-auto px-4 py-8">
        {/* Хэдер страницы тренера */}
        <TrainerHeader
          trainer={trainer}
          isFollowing={isFollowing}
          isSubscribed={isSubscribed}
          onFollow={() => setIsFollowing(!isFollowing)}
          onSubscribe={() => setIsSubscribed(!isSubscribed)}
        />

        {/* Основной контент */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* Левая колонка - фото/аватар и кнопка сообщения */}
          <div className="lg:col-span-1">
            <div className="card text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-accent-turquoise flex items-center justify-center text-white text-4xl font-bold">
                {trainer.firstName[0]}
              </div>
              <button className="button-primary w-full mb-4">
                💬 Сообщение
              </button>
              <div className="text-sm text-ink-600 space-y-1">
                <div>Отслеживают: {trainer.followersCount}</div>
                <div>Подписчиков: {trainer.subscribersCount}</div>
              </div>
            </div>
          </div>

          {/* Центральная колонка - лента публикаций */}
          <div className="lg:col-span-1">
            <TrainerFeed trainerId={trainer.id} />
          </div>

          {/* Правая колонка - календарь и модули */}
          <div className="lg:col-span-1">
            <TrainerSidebar trainerId={trainer.id} />
          </div>
        </div>
      </main>
    </div>
  )
}

