'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setLoading(true)
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        username,
        password,
        firstName,
        lastName,
      }),
    })
    setLoading(false)

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось зарегистрироваться')
      return
    }
    router.push('/onboarding')
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-md mx-auto sketch-card p-6">
        <h1 className="text-3xl font-bold text-ink-800 mb-2">Регистрация</h1>
        <p className="text-ink-600 mb-6">
          Создайте учетную запись для доступа к экосистеме.
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className="sketch-input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="sketch-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="sketch-input"
            placeholder="Имя"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="sketch-input"
            placeholder="Фамилия"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            className="sketch-input"
            placeholder="Пароль (минимум 8 символов)"
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
            {loading ? 'Создание...' : 'Создать аккаунт'}
          </button>
        </form>
        <div className="text-sm text-ink-600 mt-4">
          Уже есть аккаунт?{' '}
          <a className="ink-link" href="/login">
            Войти
          </a>
        </div>
      </div>
    </div>
  )
}
