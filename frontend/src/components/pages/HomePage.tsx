'use client'

import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/layout/Header'
import BodyAvatar from '@/components/body-avatar/BodyAvatar'
import HomeWidgets from '@/components/home/HomeWidgets'
import { useDemo } from '@/contexts/DemoContext'
import DemoBanner from '@/components/demo/DemoBanner'

export default function HomePage() {
  const { user } = useAuth()
  const { isDemoMode, currentDemoRole } = useDemo()

  // В демо-режиме используем демо-данные
  const displayName = isDemoMode 
    ? (currentDemoRole === 'trainer' ? 'Дмитрий' : currentDemoRole === 'admin' ? 'Администратор' : 'Пользователь')
    : user?.firstName || 'Пользователь'

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />
      
      {isDemoMode && (
        <DemoBanner 
          role={currentDemoRole || 'user'} 
          feature="home"
        />
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-ink-900">
            Добро пожаловать, {displayName}!
          </h1>
          <p className="text-ink-600 mt-2">
            {isDemoMode 
              ? 'Демо-режим: Изучите все возможности приложения'
              : 'Ваш персональный центр здоровья и тренировок'
            }
          </p>
        </div>

        {/* Центральная область с аватаром тела */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Левая колонка - виджеты */}
          <div className="lg:col-span-1 space-y-4">
            <HomeWidgets />
          </div>

          {/* Центральная колонка - аватар тела */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-xl font-bold mb-4 text-center">
                Интерактивный аватар тела
              </h2>
              <BodyAvatar userId={user?.id || (isDemoMode ? 'demo-user' : '')} />
            </div>
          </div>

          {/* Правая колонка - дополнительные виджеты */}
          <div className="lg:col-span-1 space-y-4">
            <div className="card">
              <h3 className="font-bold mb-2">Быстрые действия</h3>
              <div className="space-y-2">
                <button className="button-primary w-full text-left">
                  Начать тренировку
                </button>
                <button className="button-secondary w-full text-left">
                  Записаться к тренеру
                </button>
                <button className="button-secondary w-full text-left">
                  Посмотреть программы
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

