'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function ReferralLandingPage() {
  const params = useParams<{ code: string }>()
  const [status, setStatus] = useState<string>('loading')
  const code = params?.code || ''
  const [info, setInfo] = useState<{ type: string; rewardNXT: number; referrer: string | null } | null>(null)

  useEffect(() => {
    const redeem = async () => {
      const details = await fetch(`/api/referrals/code?code=${code}`).then((res) =>
        res.ok ? res.json() : null
      )
      setInfo(details)
      const me = await fetch('/api/auth/me').then((res) => res.json())
      if (!me?.user?.id) {
        setStatus('auth')
        return
      }
      const response = await fetch('/api/referrals/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      setStatus(response.ok ? 'ok' : 'error')
    }
    if (code) redeem()
  }, [code])

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-xl mx-auto sketch-card p-6 text-center space-y-4">
        <h1 className="text-3xl font-bold text-ink-800">Реферальный код</h1>
        {info && (
          <p className="text-ink-600">
            Код от {info.referrer || 'партнера'} · тип {info.type} · бонус{' '}
            {info.rewardNXT} NVT
          </p>
        )}
        {status === 'loading' && <p className="text-ink-600">Проверяем код...</p>}
        {status === 'auth' && (
          <p className="text-ink-600">
            Войдите или зарегистрируйтесь, чтобы активировать приглашение.
          </p>
        )}
        {status === 'ok' && (
          <p className="text-ink-600">Код успешно активирован. Добро пожаловать!</p>
        )}
        {status === 'error' && (
          <p className="text-ink-600">Не удалось активировать код.</p>
        )}
        <div className="flex items-center justify-center gap-3">
          <a className="sketch-button" href="/login">
            Войти
          </a>
          <a className="px-4 py-2 rounded-lg border border-ink-300 text-ink-700" href="/register">
            Регистрация
          </a>
        </div>
      </div>
    </div>
  )
}
