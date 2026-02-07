'use client'

import { useEffect, useState } from 'react'
import { CreditCard, Sparkles, TrendingUp, CheckCircle, XCircle, Clock } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { cn } from '@/lib/utils/cn'

const plans = [
  {
    name: 'AI Health+',
    desc: 'ИИ-коуч, аналитика, персональные протоколы.',
    price: '990 ₽/мес',
    amount: 990,
    highlight: 'Лучший выбор',
    popular: true,
  },
  {
    name: 'Pro Team',
    desc: 'Семейный доступ, телемедицина и приоритетные слоты.',
    price: '2 490 ₽/мес',
    amount: 2490,
    popular: false,
  },
  {
    name: 'Research+',
    desc: 'Доступ к исследованиям, грантам и закрытым сообществам.',
    price: '1 590 ₽/мес',
    amount: 1590,
    popular: false,
  },
]

const tokenPayments = [
  { label: 'Баланс NVT', value: '12 400', icon: TrendingUp },
  { label: 'Бонусные токены', value: '1 200', icon: Sparkles },
  { label: 'Доступный кешбэк', value: '5%', icon: CreditCard },
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
      const data = await fetch(`/api/subscriptions?userId=${me.user.id}`).then((res) =>
        res.json()
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
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-fadeIn">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800">
              Подписки и оплаты
            </h1>
            <p className="text-base sm:text-lg text-warmGraphite-600 mt-2">
              Управляйте подписками, абонементами и оплатой токенами NVT.
            </p>
          </div>
          <NeumorphicButton primary>
            <CreditCard className="w-4 h-4 mr-2" />
            Добавить карту
          </NeumorphicButton>
        </header>

        <NeumorphicCard
          soft
          className="p-4 sm:p-6 bg-warmBlue-50/50 border-2 border-warmBlue-200/50 animate-fadeIn"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-warmBlue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-warmGraphite-700">
              AI Health+ — платная функция. Доступен бесплатный тестовый период на 7 дней.
            </p>
          </div>
        </NeumorphicCard>

        {error && (
          <NeumorphicCard
            soft
            className="p-4 bg-warmRed-50 border-2 border-warmRed-200 animate-shake"
          >
            <p className="text-sm text-warmRed-700">{error}</p>
          </NeumorphicCard>
        )}

        {!isAuthed && !loading && (
          <NeumorphicCard soft className="p-4 sm:p-6">
            <p className="text-sm text-warmGray-600">
              Войдите в аккаунт, чтобы увидеть ваши подписки.
            </p>
          </NeumorphicCard>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tokenPayments.map((item, index) => {
            const Icon = item.icon
            return (
              <NeumorphicCard
                key={item.label}
                className="p-4 sm:p-6 animate-fadeIn"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-warmBlue-600" />
                  <div className="text-xs uppercase tracking-widest text-warmGray-600">
                    {item.label}
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-semibold text-warmGraphite-800">
                  {item.value}
                </div>
              </NeumorphicCard>
            )
          })}
        </section>

        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
            Активные подписки
          </h2>
          {subscriptions.length === 0 ? (
            <div className="text-sm text-warmGray-600 text-center py-8">
              Подписок пока нет. Они появятся после подключения биллинга и специалистов.
            </div>
          ) : (
            <div className="space-y-3">
              {subscriptions.map((sub, index) => (
                <NeumorphicCard
                  key={sub.id}
                  soft
                  className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:scale-[1.01] transition-transform animate-fadeIn"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div>
                    <div className="font-semibold text-warmGraphite-800 text-sm sm:text-base">
                      {sub.provider?.username || 'Подписка'}
                    </div>
                    <div className="text-xs text-warmGray-600 mt-1">
                      {sub.expiresAt
                        ? `До ${new Date(sub.expiresAt).toLocaleDateString('ru-RU')}`
                        : 'Без срока'}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm flex-wrap">
                    <span className="text-warmGraphite-700 font-medium">
                      {sub.priceNXTMonthly} NVT/мес
                    </span>
                    <NeumorphicBadge
                      variant={
                        sub.status === 'ACTIVE'
                          ? 'success'
                          : sub.status === 'CANCELED'
                            ? 'warning'
                            : 'error'
                      }
                      size="sm"
                    >
                      {sub.status === 'ACTIVE'
                        ? 'Активна'
                        : sub.status === 'CANCELED'
                          ? 'Отменена'
                          : 'Истекла'}
                    </NeumorphicBadge>
                    <button className="text-xs text-warmBlue-600 hover:text-warmBlue-700 font-medium transition-colors">
                      Управлять →
                    </button>
                  </div>
                </NeumorphicCard>
              ))}
            </div>
          )}
        </NeumorphicCard>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-4 sm:gap-6">
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
              Тарифы
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {plans.map((plan, index) => (
                <NeumorphicCard
                  key={plan.name}
                  soft={!plan.popular}
                  className={cn(
                    'p-4 hover:scale-105 transition-all duration-300 animate-fadeIn',
                    plan.popular && 'ring-2 ring-warmBlue-500'
                  )}
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-warmGraphite-800 text-sm sm:text-base">
                      {plan.name}
                    </div>
                    {plan.highlight && (
                      <NeumorphicBadge variant="warning" size="sm">
                        {plan.highlight}
                      </NeumorphicBadge>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-warmGraphite-600 mt-2 mb-3">
                    {plan.desc}
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-warmGraphite-800 mb-4">
                    {plan.price}
                  </div>
                  <NeumorphicButton
                    primary={plan.popular}
                    className="w-full text-sm"
                    onClick={() => handleCheckout(plan)}
                  >
                    Выбрать
                  </NeumorphicButton>
                </NeumorphicCard>
              ))}
            </div>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6 space-y-4 animate-fadeIn" style={{ animationDelay: '1s' }}>
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
              Ранняя поддержка
            </h2>
            <p className="text-sm text-warmGraphite-600">
              Для ранних пользователей — скидка и дополнительные токены за оплату подписок
              на 6-12 месяцев вперед.
            </p>
            <NeumorphicCard soft className="p-4 bg-warmPink-50/50 border border-warmPink-200">
              <p className="text-sm text-warmGraphite-700">
                -20% на AI Health+ и +15% токенов NVT при оплате годового плана.
              </p>
            </NeumorphicCard>
            <NeumorphicButton primary className="w-full">
              Активировать скидку
            </NeumorphicButton>
          </NeumorphicCard>
        </section>
      </div>
    </div>
  )
}
