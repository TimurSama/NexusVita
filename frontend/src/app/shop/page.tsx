'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import { useDemo } from '@/contexts/DemoContext'
import DemoBanner from '@/components/demo/DemoBanner'

interface Product {
  id: string
  name: string
  description?: string
  type: 'SERVICE' | 'PHYSICAL' | 'DIGITAL'
  price: number
  tokenPrice?: number
  images: string[]
}

export default function ShopPage() {
  const { isDemoMode, currentDemoRole } = useDemo()
  const [products, setProducts] = useState<Product[]>([])
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    // Моковые данные
    setProducts([
      {
        id: '1',
        name: 'Персональная консультация',
        description: 'Индивидуальная консультация с тренером',
        type: 'SERVICE',
        price: 2000,
        tokenPrice: 100,
        images: [],
      },
      {
        id: '2',
        name: 'Программа тренировок "Сила и выносливость"',
        description: '4-недельная программа для развития силы',
        type: 'DIGITAL',
        price: 1500,
        tokenPrice: 75,
        images: [],
      },
    ])
    setBalance(250)
  }, [])

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />
      
      {isDemoMode && (
        <DemoBanner 
          role={currentDemoRole || 'user'} 
          feature="shop"
        />
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Магазин</h1>
          <div className="flex items-center gap-4">
            <div className="text-lg">
              Ваш баланс токенов: <span className="font-bold text-accent-turquoise">{balance}</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card">
              <div className="mb-4 h-48 bg-ink-100 rounded flex items-center justify-center">
                {product.type === 'SERVICE' ? '💼' : 
                 product.type === 'DIGITAL' ? '📱' : '📦'}
              </div>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              {product.description && (
                <p className="text-ink-600 mb-4">{product.description}</p>
              )}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-bold">{product.price} ₽</div>
                  {product.tokenPrice && (
                    <div className="text-sm text-accent-turquoise">
                      или {product.tokenPrice} токенов
                    </div>
                  )}
                </div>
              </div>
              <button className="button-primary w-full">
                Купить
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

