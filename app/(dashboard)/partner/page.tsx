'use client'

import { useEffect, useState } from 'react'
import { Building2, Plus, TrendingUp, ShoppingCart, ToggleLeft, ToggleRight } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import NeumorphicModal from '@/components/ui/NeumorphicModal'
import { cn } from '@/lib/utils/cn'

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
  const [showCreateModal, setShowCreateModal] = useState(false)
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
        const list = await fetch(`/api/purchases?merchantId=${me.user.id}`).then((res) =>
          res.json()
        )
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
    setShowCreateModal(false)
    setError(null)
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

  const totalRevenue = purchases.reduce((sum, p) => sum + p.amountNXT, 0)

  return (
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-fadeIn">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800">
              Кабинет партнера
            </h1>
            <p className="text-base sm:text-lg text-warmGraphite-600 mt-2">
              Настройте кэшбэк, реферальные ссылки и кампании.
            </p>
          </div>
          <NeumorphicButton primary onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Новый оффер
          </NeumorphicButton>
        </header>

        {error && (
          <NeumorphicCard
            soft
            className="p-4 bg-warmRed-50 border-2 border-warmRed-200 animate-shake"
          >
            <p className="text-sm text-warmRed-700">{error}</p>
          </NeumorphicCard>
        )}

        {/* Статистика */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-warmBlue-600" />
              <div className="text-xs uppercase tracking-widest text-warmGray-600">
                Активных офферов
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-warmGraphite-800">
              {offers.filter((o) => o.active).length}
            </div>
          </NeumorphicCard>
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-warmGreen-600" />
              <div className="text-xs uppercase tracking-widest text-warmGray-600">
                Общий доход
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-warmGraphite-800">
              {totalRevenue} NVT
            </div>
          </NeumorphicCard>
        </section>

        {/* Мои офферы */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
            Мои офферы
          </h2>
          <div className="space-y-3">
            {offers.length === 0 && (
              <div className="text-sm text-warmGray-600 text-center py-8">
                Офферов пока нет. Создайте первый оффер!
              </div>
            )}
            {offers.map((offer, index) => (
              <NeumorphicCard
                key={offer.id}
                soft
                className="p-4 flex items-center justify-between hover:scale-[1.01] transition-transform animate-fadeIn"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="flex-1">
                  <div className="font-semibold text-warmGraphite-800 text-sm sm:text-base mb-1">
                    {offer.title}
                  </div>
                  {offer.description && (
                    <div className="text-xs sm:text-sm text-warmGraphite-600 mb-2">
                      {offer.description}
                    </div>
                  )}
                  <div className="flex items-center gap-2 flex-wrap">
                    <NeumorphicBadge variant="info" size="sm">
                      Кэшбэк {offer.percent}%
                    </NeumorphicBadge>
                    <NeumorphicBadge variant="default" size="sm" className="font-mono">
                      Код: {offer.referralCode}
                    </NeumorphicBadge>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <NeumorphicButton
                    className={cn(
                      'text-xs px-3 py-1.5 flex items-center gap-1',
                      offer.active && 'primary'
                    )}
                    onClick={() => toggleActive(offer.id, !offer.active)}
                  >
                    {offer.active ? (
                      <>
                        <ToggleRight className="w-3 h-3" />
                        Активен
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="w-3 h-3" />
                        Неактивен
                      </>
                    )}
                  </NeumorphicButton>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </NeumorphicCard>

        {/* Покупки и кэшбэк */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
            Покупки и кэшбэк
          </h2>
          <div className="space-y-3">
            {purchases.length === 0 && (
              <div className="text-sm text-warmGray-600 text-center py-8">
                Покупок пока нет.
              </div>
            )}
            {purchases.map((item, index) => (
              <NeumorphicCard
                key={item.id}
                soft
                className="p-4 flex items-center justify-between hover:scale-[1.01] transition-transform animate-fadeIn"
                style={{ animationDelay: `${0.6 + index * 0.05}s` }}
              >
                <div>
                  <div className="text-xs text-warmGray-600 mb-1">
                    {new Date(item.createdAt).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-warmGraphite-800">
                    Сумма: {item.amountNXT} NVT
                  </div>
                </div>
                <ShoppingCart className="w-5 h-5 text-warmBlue-600" />
              </NeumorphicCard>
            ))}
          </div>
        </NeumorphicCard>

        {/* Модальное окно создания */}
        <NeumorphicModal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false)
            setError(null)
          }}
          title="Новый оффер"
          size="md"
        >
          <div className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-warmRed-50 border border-warmRed-200 text-sm text-warmRed-700">
                {error}
              </div>
            )}
            <NeumorphicInput
              label="Название"
              placeholder="Название оффера"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <NeumorphicInput
              label="Описание"
              placeholder="Описание оффера"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <NeumorphicInput
              label="Процент кэшбэка"
              type="number"
              placeholder="5"
              value={form.percent}
              onChange={(e) => setForm({ ...form, percent: Number(e.target.value) })}
            />
            <NeumorphicInput
              label="Реферальный код"
              placeholder="Уникальный код"
              value={form.referralCode}
              onChange={(e) => setForm({ ...form, referralCode: e.target.value })}
            />
            <div className="flex items-center gap-3">
              <NeumorphicButton
                primary
                onClick={handleCreate}
                disabled={!form.title.trim()}
                className="flex-1"
              >
                Создать
              </NeumorphicButton>
              <NeumorphicButton
                onClick={() => {
                  setShowCreateModal(false)
                  setError(null)
                }}
              >
                Отмена
              </NeumorphicButton>
            </div>
          </div>
        </NeumorphicModal>
      </div>
    </div>
  )
}
