'use client'

import { useEffect, useState } from 'react'

type ReferralItem = {
  id: string
  type: string
  status: string
  rewardNXT: number
  completedAt?: string | null
  referred?: { username?: string | null; role?: string | null }
}

export default function ReferralsPage() {
  const [items, setItems] = useState<ReferralItem[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [referredId, setReferredId] = useState('')
  const [type, setType] = useState('FRIEND')
  const [error, setError] = useState<string | null>(null)
  const [codes, setCodes] = useState<Array<{ id: string; code: string; type: string }>>([])
  const [newCode, setNewCode] = useState('')
  const [redeemCode, setRedeemCode] = useState('')
  const [publicLink, setPublicLink] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      const me = await fetch('/api/auth/me').then((res) => res.json())
      if (!me?.user?.id) {
        setError('Войдите для доступа к рефералам.')
        return
      }
      setUserId(me.user.id)
      const data = await fetch('/api/referrals').then((res) => res.json())
      setItems(Array.isArray(data) ? data : [])
      const codesData = await fetch('/api/referrals/codes').then((res) => res.json())
      setCodes(Array.isArray(codesData) ? codesData : [])
      const defaultCode = await fetch('/api/referrals/codes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'FRIEND' }),
      }).then((res) => res.json())
      if (defaultCode?.code) {
        setPublicLink(`/r/${defaultCode.code}`)
      }
    }
    load()
  }, [])

  const handleInvite = async () => {
    if (!referredId) return
    const response = await fetch('/api/referrals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ referredId, type }),
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось создать реферал')
      return
    }
    const item = await response.json()
    setItems((prev) => [item, ...prev])
    setReferredId('')
  }

  const handleCreateCode = async () => {
    if (!newCode) return
    const response = await fetch('/api/referrals/codes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: newCode, type }),
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось создать код')
      return
    }
    const code = await response.json()
    setCodes((prev) => [code, ...prev])
    setNewCode('')
  }

  const handleRedeem = async () => {
    if (!redeemCode) return
    const response = await fetch('/api/referrals/redeem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: redeemCode }),
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось применить код')
      return
    }
    setRedeemCode('')
  }

  const handleComplete = async (referralId: string) => {
    const response = await fetch('/api/referrals/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ referralId }),
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось завершить реферал')
      return
    }
    const updated = await response.json()
    setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-ink-800">Рефералы и кэшбэк</h1>
            <p className="text-ink-600">
              Приглашайте друзей, специалистов и партнеров — получайте бонусы.
            </p>
          </div>
        </header>

        {error && (
          <div className="sketch-card p-4 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <section className="sketch-card p-6 space-y-3">
          <h2 className="text-xl font-semibold text-ink-800">
            Пригласить пользователя
          </h2>
          <input
            className="sketch-input"
            placeholder="UUID пользователя"
            value={referredId}
            onChange={(e) => setReferredId(e.target.value)}
          />
          <select
            className="sketch-input"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="FRIEND">Друг</option>
            <option value="SPECIALIST">Специалист</option>
            <option value="MERCHANT">Партнер/магазин</option>
          </select>
          <button className="sketch-button" onClick={handleInvite}>
            Создать приглашение
          </button>
        </section>

        <section className="sketch-card p-6 space-y-3">
          <h2 className="text-xl font-semibold text-ink-800">Реферальные коды</h2>
          {publicLink && (
            <div className="text-sm text-ink-600">
              Публичная ссылка:{' '}
              <a className="ink-link" href={publicLink}>
                {publicLink}
              </a>
            </div>
          )}
          <div className="flex items-center gap-3">
            <input
              className="sketch-input"
              placeholder="Новый код"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
            />
            <button className="sketch-button" onClick={handleCreateCode}>
              Создать код
            </button>
          </div>
          <div className="space-y-2">
            {codes.length === 0 && (
              <div className="text-sm text-ink-600">Кодов пока нет.</div>
            )}
            {codes.map((code) => (
              <div
                key={code.id}
                className="p-3 rounded-lg border border-ink-200 bg-parchment-100 text-sm text-ink-700"
              >
                {code.code} · {code.type}
              </div>
            ))}
          </div>
        </section>

        <section className="sketch-card p-6 space-y-3">
          <h2 className="text-xl font-semibold text-ink-800">Ввести код</h2>
          <div className="flex items-center gap-3">
            <input
              className="sketch-input"
              placeholder="Код"
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value)}
            />
            <button className="sketch-button" onClick={handleRedeem}>
              Применить
            </button>
          </div>
        </section>

        <section className="sketch-card p-6">
          <h2 className="text-xl font-semibold text-ink-800 mb-3">
            Мои рефералы
          </h2>
          <div className="space-y-3">
            {items.length === 0 && (
              <div className="text-sm text-ink-600">Рефералов пока нет.</div>
            )}
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
              >
                <div className="font-semibold text-ink-800">
                  {item.type} · {item.referred?.username || 'Пользователь'}
                </div>
                <div className="text-xs text-ink-500">Статус: {item.status}</div>
                <div className="text-xs text-ink-700 mt-1">
                  Награда: {item.rewardNXT} NVT
                </div>
                {item.status !== 'COMPLETED' && (
                  <button
                    className="mt-2 px-3 py-1 rounded-md border border-ink-300 text-xs text-ink-700 hover:bg-parchment-200"
                    onClick={() => handleComplete(item.id)}
                  >
                    Отметить как выполнено
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
