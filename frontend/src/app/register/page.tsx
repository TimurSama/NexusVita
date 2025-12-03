'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'USER' as 'USER' | 'TRAINER',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await register(formData)
      router.push('/')
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment-50 py-12">
      <div className="card w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Регистрация в Nexus Vita</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-1">
              Имя *
            </label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              className="w-full px-4 py-2 border border-ink-300 rounded focus:outline-none focus:ring-2 focus:ring-accent-turquoise"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-1">
              Фамилия
            </label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="w-full px-4 py-2 border border-ink-300 rounded focus:outline-none focus:ring-2 focus:ring-accent-turquoise"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-2 border border-ink-300 rounded focus:outline-none focus:ring-2 focus:ring-accent-turquoise"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Пароль *
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-ink-300 rounded focus:outline-none focus:ring-2 focus:ring-accent-turquoise"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Роль
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as 'USER' | 'TRAINER' })}
              className="w-full px-4 py-2 border border-ink-300 rounded focus:outline-none focus:ring-2 focus:ring-accent-turquoise"
            >
              <option value="USER">Пользователь</option>
              <option value="TRAINER">Тренер</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="button-primary w-full"
          >
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-ink-600">
            Уже есть аккаунт?{' '}
            <Link href="/login" className="text-accent-turquoise hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

