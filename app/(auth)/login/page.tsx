'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

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
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-md mx-auto sketch-card p-6">
        <h1 className="text-3xl font-bold text-ink-800 mb-2">Вход</h1>
        <p className="text-ink-600 mb-6">
          Войдите, чтобы управлять медкартой и подписками.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className="sketch-input"
            placeholder="Email или username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <input
            className="sketch-input"
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}
          <button className="sketch-button w-full" type="submit" disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
        <div className="text-sm text-ink-600 mt-4">
          Нет аккаунта?{' '}
          <a className="ink-link" href="/register">
            Зарегистрироваться
          </a>
        </div>
      </div>
    </div>
  )
}
