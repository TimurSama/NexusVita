'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'

export default function LoginPage() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setLoading(true)
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    })
    setLoading(false)

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось войти')
      return
    }
    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <NeumorphicCard className="w-full max-w-md p-8 sm:p-10 animate-fadeIn">
        <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800 mb-3">
          Вход
        </h1>
        <p className="text-base sm:text-lg text-warmGraphite-600 mb-8">
          Войдите, чтобы управлять медкартой и подписками.
        </p>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <NeumorphicInput
            placeholder="Email или username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="w-full"
          />
          <NeumorphicInput
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
          />
          {error && (
            <NeumorphicCard
              soft
              className="p-4 bg-warmRed-50 border-2 border-warmRed-200 animate-shake"
            >
              <p className="text-sm text-warmRed-700">{error}</p>
            </NeumorphicCard>
          )}
          <NeumorphicButton
            primary
            type="submit"
            disabled={loading}
            className="w-full text-base sm:text-lg py-4"
          >
            {loading ? 'Вход...' : 'Войти'}
          </NeumorphicButton>
        </form>
        <div className="text-sm sm:text-base text-warmGraphite-600 mt-6 text-center">
          Нет аккаунта?{' '}
          <Link
            href="/register"
            className="text-warmBlue-600 hover:text-warmBlue-700 font-medium transition-colors"
          >
            Зарегистрироваться
          </Link>
        </div>
      </NeumorphicCard>
    </div>
  )
}
