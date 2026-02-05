'use client'

import { useEffect, useState } from 'react'

const plans = [
  {
    name: 'AI Health+',
    desc: 'ИИ-коуч, аналитика, персональные протоколы.',
    price: '990 ₽/мес',
    amount: 990,
    highlight: 'Лучший выбор',
  },
  {
    name: 'Pro Team',
    desc: 'Семейный доступ, телемедицина и приоритетные слоты.',
    price: '2 490 ₽/мес',
    amount: 2490,
  },
  {
    name: 'Research+',
    desc: 'Доступ к исследованиям, грантам и закрытым сообществам.',
    price: '1 590 ₽/мес',
    amount: 1590,
  },
]

const tokenPayments = [
  { label: 'Баланс NVT', value: '12 400' },
  { label: 'Бонусные токены', value: '1 200' },
  { label: 'Доступный кешбэк', value: '5%' },
]

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<
    Array<{
      id: string
      provider?: { username: string | null }
      priceNXTMonthly: number
      status: 'ACTIVE' | 'CANCELED' | 'EXPIRED'
      expiresAt?: string | null
    }>
  >([])
  const [loading, setLoading] = useState(true)
  const [isAuthed, setIsAuthed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const me = await fetch('/api/auth/me').then((res) => res.json())
      if (!me?.user) {
        setIsAuthed(false)
        setLoading(false)
        return
      }
      setIsAuthed(true)
      const data = await fetch(`/api/subscriptions?userId=${me.user.id}`).then(
        (res) => res.json()
      )
      setSubscriptions(Array.isArray(data) ? data : [])
      setLoading(false)
    }
    load()
  }, [])

  const handleCheckout = async (plan: (typeof plans)[number]) => {
    if (!isAuthed) {
      setError('Войдите в аккаунт для оплаты.')
      return
    }
    const me = await fetch('/api/auth/me').then((res) => res.json())
    if (!me?.user?.id) {
      setError('Не удалось определить пользователя.')
      return
    }
    setError(null)
    const response = await fetch('/api/payments/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: me.user.id,
        planId: plan.name,
        amount: plan.amount,
        currency: 'RUB',
      }),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok || !data.checkoutUrl) {
      setError(data.error || 'Не удалось создать оплату.')
      return
    }
    window.location.href = data.checkoutUrl
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-ink-800">Подписки и оплаты</h1>
            <p className="text-ink-600">
              Управляйте подписками, абонементами и оплатой токенами NVT.
            </p>
          </div>
          <button className="sketch-button">Добавить карту</button>
        </header>

        <div className="sketch-card p-4 text-sm text-ink-700">
          AI Health+ — платная функция. Доступен бесплатный тестовый период на 7 дней.
        </div>

        {error && (
          <div className="sketch-card p-4 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {!isAuthed && !loading && (
          <div className="sketch-card p-4 text-sm text-ink-700">
            Войдите в аккаунт, чтобы увидеть ваши подписки.
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tokenPayments.map((item) => (
            <div key={item.label} className="sketch-card p-4">
              <div className="text-xs uppercase tracking-widest text-ink-500">
                {item.label}
              </div>
              <div className="text-lg font-semibold text-ink-800 mt-2">
                {item.value}
              </div>
            </div>
          ))}
        </section>

        <section className="sketch-card p-6">
          <h2 className="text-2xl font-semibold text-ink-800 mb-4">
            Активные подписки
          </h2>
          {subscriptions.length === 0 ? (
            <div className="text-sm text-ink-600">
              Подписок пока нет. Они появятся после подключения биллинга и
              специалистов.
            </div>
          ) : (
            <div className="space-y-3">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 rounded-lg border border-ink-200 bg-parchment-100"
                >
                  <div>
                    <div className="font-semibold text-ink-800">
                      {sub.provider?.username || 'Подписка'}
                    </div>
                    <div className="text-xs text-ink-500">
                      {sub.expiresAt
                        ? `До ${new Date(sub.expiresAt).toLocaleDateString('ru-RU')}`
                        : 'Без срока'}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-ink-700">
                      {sub.priceNXTMonthly} NVT/мес
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        sub.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : sub.status === 'CANCELED'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {sub.status === 'ACTIVE'
                        ? 'Активна'
                        : sub.status === 'CANCELED'
                        ? 'Отменена'
                        : 'Истекла'}
                    </span>
                    <button className="ink-link text-xs">Управлять</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-6">
          <div className="sketch-card p-6">
            <h2 className="text-2xl font-semibold text-ink-800 mb-4">Тарифы</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-ink-800">{plan.name}</div>
                    {plan.highlight && (
                      <span className="text-xs px-2 py-1 rounded-full bg-ink-700 text-white">
                        {plan.highlight}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-ink-600 mt-2">{plan.desc}</div>
                  <div className="text-sm font-semibold text-ink-800 mt-3">
                    {plan.price}
                  </div>
                  <button
                    className="mt-4 w-full sketch-button"
                    onClick={() => handleCheckout(plan)}
                  >
                    Выбрать
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="sketch-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-ink-800">
              Ранняя поддержка
            </h2>
            <p className="text-sm text-ink-600">
              Для ранних пользователей — скидка и дополнительные токены за оплату
              подписок на 6-12 месяцев вперед.
            </p>
            <div className="p-4 rounded-lg border border-ink-200 bg-parchment-100 text-sm text-ink-700">
              -20% на AI Health+ и +15% токенов NVT при оплате годового плана.
            </div>
            <button className="sketch-button w-full">Активировать скидку</button>
          </div>
        </section>
      </div>
    </div>
  )
}
