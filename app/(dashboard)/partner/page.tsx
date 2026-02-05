'use client'

import { useEffect, useState } from 'react'

type Offer = {
  id: string
  title: string
  description?: string | null
  percent: number
  referralCode: string
  active: boolean
}

export default function PartnerPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [purchases, setPurchases] = useState<
    Array<{ id: string; amountNXT: number; createdAt: string }>
  >([])
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
    percent: 5,
    referralCode: '',
  })

  useEffect(() => {
    const load = async () => {
      const data = await fetch('/api/cashback/offers').then((res) => res.json())
      setOffers(Array.isArray(data) ? data : [])
      const me = await fetch('/api/auth/me').then((res) => res.json())
      if (me?.user?.id) {
        const list = await fetch(
          `/api/purchases?merchantId=${me.user.id}`
        ).then((res) => res.json())
        setPurchases(Array.isArray(list) ? list : [])
      }
    }
    load()
  }, [])

  const handleCreate = async () => {
    const response = await fetch('/api/cashback/offers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось создать оффер')
      return
    }
    const offer = await response.json()
    setOffers((prev) => [offer, ...prev])
    setForm({ title: '', description: '', percent: 5, referralCode: '' })
  }

  const toggleActive = async (offerId: string, active: boolean) => {
    const response = await fetch(`/api/cashback/offers/${offerId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active }),
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось обновить оффер')
      return
    }
    const updated = await response.json()
    setOffers((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-ink-800">Кабинет партнера</h1>
          <p className="text-ink-600">
            Настройте кэшбэк, реферальные ссылки и кампании.
          </p>
        </header>

        {error && (
          <div className="sketch-card p-4 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <section className="sketch-card p-6 space-y-3">
          <h2 className="text-xl font-semibold text-ink-800">Новый оффер</h2>
          <input
            className="sketch-input"
            placeholder="Название"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="sketch-input"
            placeholder="Описание"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            className="sketch-input"
            placeholder="Процент кэшбэка"
            type="number"
            value={form.percent}
            onChange={(e) => setForm({ ...form, percent: Number(e.target.value) })}
          />
          <input
            className="sketch-input"
            placeholder="Реферальный код"
            value={form.referralCode}
            onChange={(e) => setForm({ ...form, referralCode: e.target.value })}
          />
          <button className="sketch-button" onClick={handleCreate}>
            Создать
          </button>
        </section>

        <section className="sketch-card p-6">
          <h2 className="text-xl font-semibold text-ink-800 mb-4">Мои офферы</h2>
          <div className="space-y-3">
            {offers.length === 0 && (
              <div className="text-sm text-ink-600">Офферов пока нет.</div>
            )}
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
              >
                <div className="font-semibold text-ink-800">{offer.title}</div>
                <div className="text-xs text-ink-500">
                  Кэшбэк {offer.percent}% · код {offer.referralCode}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="px-3 py-1 rounded-md border border-ink-300 text-xs text-ink-700 hover:bg-parchment-200"
                    onClick={() => toggleActive(offer.id, !offer.active)}
                  >
                    {offer.active ? 'Отключить' : 'Активировать'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="sketch-card p-6">
          <h2 className="text-xl font-semibold text-ink-800 mb-4">
            Покупки и кэшбэк
          </h2>
          <div className="space-y-3">
            {purchases.length === 0 && (
              <div className="text-sm text-ink-600">Покупок пока нет.</div>
            )}
            {purchases.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
              >
                <div className="text-sm text-ink-500">
                  {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                </div>
                <div className="text-sm text-ink-800">
                  Сумма: {item.amountNXT} NVT
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
