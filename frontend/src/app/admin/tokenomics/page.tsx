'use client'

import Header from '@/components/layout/Header'
import { useDemo } from '@/contexts/DemoContext'
import DemoBanner from '@/components/demo/DemoBanner'

export default function TokenomicsAdminPage() {
  const { isDemoMode, currentDemoRole } = useDemo()

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />
      
      {isDemoMode && (
        <DemoBanner 
          role={currentDemoRole || 'admin'} 
          feature="tokenomics"
        />
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Токеномика</h1>
          <p className="text-xl text-ink-600">
            Настройка системы токенов и наград
          </p>
        </div>

        <div className="card card-sketch">
          <p className="text-ink-600">
            Страница настройки токеномики. Здесь администраторы могут управлять правилами начисления токенов, курсами обмена и распределением наград.
          </p>
        </div>
      </main>
    </div>
  )
}

