'use client'

import { useEffect, useState } from 'react'
import { Users, Gift, Copy, CheckCircle, Link2 } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { cn } from '@/lib/utils/cn'

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
  const [copied, setCopied] = useState(false)

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

  const handleCopyLink = () => {
    if (publicLink) {
      navigator.clipboard.writeText(window.location.origin + publicLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const totalRewards = items.reduce((sum, item) => sum + (item.rewardNXT || 0), 0)
  const activeReferrals = items.filter((item) => item.status === 'ACTIVE').length

  return (
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <header className="animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800">Рефералы</h1>
          <p className="text-base sm:text-lg text-warmGraphite-600 mt-2">
            Приглашайте друзей и получайте токены за их активность.
          </p>
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
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-warmBlue-600" />
              <div className="text-xs uppercase tracking-widest text-warmGray-600">
                Рефералов
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-warmGraphite-800">
              {activeReferrals}
            </div>
          </NeumorphicCard>
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-5 h-5 text-warmPink-600" />
              <div className="text-xs uppercase tracking-widest text-warmGray-600">
                Награды
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-warmGraphite-800">
              {totalRewards} NVT
            </div>
          </NeumorphicCard>
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 mb-2">
              <Link2 className="w-5 h-5 text-warmGreen-600" />
              <div className="text-xs uppercase tracking-widest text-warmGray-600">
                Коды
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-warmGraphite-800">
              {codes.length}
            </div>
          </NeumorphicCard>
        </section>

        {/* Реферальная ссылка */}
        {publicLink && (
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-3">
              Ваша реферальная ссылка
            </h2>
            <div className="flex items-center gap-3">
              <NeumorphicInput
                value={window.location.origin + publicLink}
                readOnly
                className="flex-1 font-mono text-xs sm:text-sm"
              />
              <NeumorphicButton
                primary={copied}
                onClick={handleCopyLink}
                className="flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Скопировано
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Копировать
                  </>
                )}
              </NeumorphicButton>
            </div>
          </NeumorphicCard>
        )}

        {/* Создание кода */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-3">
            Создать реферальный код
          </h2>
          <div className="flex items-center gap-3">
            <NeumorphicInput
              placeholder="Название кода"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              className="flex-1"
            />
            <NeumorphicButton onClick={handleCreateCode} disabled={!newCode.trim()}>
              Создать
            </NeumorphicButton>
          </div>
        </NeumorphicCard>

        {/* Применить код */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-3">
            Применить реферальный код
          </h2>
          <div className="flex items-center gap-3">
            <NeumorphicInput
              placeholder="Введите код"
              value={redeemCode}
              onChange={(e) => setRedeemCode(e.target.value)}
              className="flex-1"
            />
            <NeumorphicButton primary onClick={handleRedeem} disabled={!redeemCode.trim()}>
              Применить
            </NeumorphicButton>
          </div>
        </NeumorphicCard>

        {/* Список рефералов */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
          <h2 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-4">
            История рефералов
          </h2>
          <div className="space-y-3">
            {items.length === 0 && (
              <div className="text-sm text-warmGray-600 text-center py-8">
                Пока нет рефералов. Пригласите друзей!
              </div>
            )}
            {items.map((item, index) => (
              <NeumorphicCard
                key={item.id}
                soft
                className="p-4 flex items-center justify-between hover:scale-[1.01] transition-transform animate-fadeIn"
                style={{ animationDelay: `${0.8 + index * 0.05}s` }}
              >
                <div>
                  <div className="font-semibold text-warmGraphite-800 text-sm sm:text-base">
                    {item.referred?.username || 'Пользователь'}
                  </div>
                  <div className="text-xs text-warmGray-600 mt-1">
                    {item.type} ·{' '}
                    {item.completedAt
                      ? new Date(item.completedAt).toLocaleDateString('ru-RU')
                      : 'В процессе'}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <NeumorphicBadge
                    variant={item.status === 'COMPLETED' ? 'success' : 'warning'}
                    size="sm"
                  >
                    {item.status === 'COMPLETED' ? 'Завершено' : 'Активно'}
                  </NeumorphicBadge>
                  {item.rewardNXT > 0 && (
                    <NeumorphicBadge variant="info" size="sm">
                      +{item.rewardNXT} NVT
                    </NeumorphicBadge>
                  )}
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </NeumorphicCard>
      </div>
    </div>
  )
}
