'use client'

import { useParams } from 'next/navigation'
import Header from '@/components/layout/Header'
import { motion } from 'framer-motion'

export default function ProfilePage() {
  const params = useParams()
  const userId = params?.id as string

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="card card-sketch">
          <div className="text-center mb-6">
            <div className="w-24 h-24 rounded-full bg-accent-turquoise flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
              П
            </div>
            <h1 className="text-3xl font-bold mb-2">Профиль пользователя</h1>
            <p className="text-ink-600">ID: {userId}</p>
          </div>
        </div>
      </main>
    </div>
  )
}

