'use client'

import Header from '@/components/layout/Header'
import { useDemo } from '@/contexts/DemoContext'
import DemoBanner from '@/components/demo/DemoBanner'

export default function ThemesAdminPage() {
  const { isDemoMode, currentDemoRole } = useDemo()

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />
      
      {isDemoMode && (
        <DemoBanner 
          role={currentDemoRole || 'admin'} 
          feature="themes"
        />
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Каталог тем</h1>
          <p className="text-xl text-ink-600">
            Управление темами оформления
          </p>
        </div>

        <div className="card card-sketch">
          <p className="text-ink-600">
            Страница управления темами. Здесь администраторы могут модерировать, одобрять и публиковать темы от пользователей.
          </p>
        </div>
      </main>
    </div>
  )
}

