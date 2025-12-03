'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useDemo } from '@/contexts/DemoContext'
import HomePage from '@/components/pages/HomePage'
import LandingPage from '@/components/pages/LandingPage'

export default function Page() {
  const { user, isLoading } = useAuth()
  const { isDemoMode } = useDemo()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Загрузка...</div>
      </div>
    )
  }

  // Если пользователь авторизован или в демо-режиме, показываем главную страницу
  if (user || isDemoMode) {
    return <HomePage />
  }

  // Иначе показываем лендинг
  return <LandingPage />
}
