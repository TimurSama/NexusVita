'use client'

import { useEffect, useState } from 'react'
import { Wallet, Vote, TrendingUp, CheckCircle, XCircle, Plus } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicTextarea from '@/components/ui/NeumorphicTextarea'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import NeumorphicModal from '@/components/ui/NeumorphicModal'
import { cn } from '@/lib/utils/cn'

const purchaseSteps = [
  {
    title: '1. Подключите кошелек',
    description: 'Поддерживаем Web3 кошельки, мультисиг и корпоративные счета.',
  },
  {
    title: '2. Пройдите KYC',
    description: 'Верификация для доступа к токенсейлу и подпискам.',
  },
  {
    title: '3. Выберите пакет',
    description: 'Ранний доступ, public или стратегический пакет.',
  },
  {
    title: '4. Получите токены',
    description: 'Выпуск по графику, гибкое управление в личном кабинете.',
  },
]

const salePackages = [
  {
    name: 'Early Health',
    price: 'от 500 USDT',
    bonus: '+35% токенов',
    perks: ['Доступ к AI', 'Закрытые коммьюнити', 'Голосование DAO'],
    popular: true,
  },
  {
    name: 'Growth Partner',
    price: 'от 2 500 USDT',
    bonus: '+25% токенов',
    perks: ['Личный аккаунт-менеджер', 'Доступ к аналитике', 'Грантовый пул'],
    popular: false,
  },
  {
    name: 'Public',
    price: 'от 100 USDT',
    bonus: '+15% токенов',
    perks: ['Публичный сейл', 'Бонусы за рефералов', 'Личный профиль'],
    popular: false,
  },
]

export default function DaoPage() {
  const [proposals, setProposals] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const load = async () => {
    const me = await fetch('/api/auth/me').then((res) => res.json())
    setUserId(me?.user?.id || null)
    const data = await fetch('/api/dao/proposals').then((res) => res.json())
    setProposals(Array.isArray(data) ? data : [])
  }

  useEffect(() => {
    load()
  }, [])

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!userId) {
      setError('Нужно войти для создания предложения.')
      return
    }
    setLoading(true)
    setError(null)
    const response = await fetch('/api/dao/proposals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        createdById: userId,
      }),
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось создать предложение.')
      setLoading(false)
      return
    }
    const proposal = await response.json()
    setProposals((prev) => [proposal, ...prev])
    setTitle('')
    setDescription('')
    setShowCreateModal(false)
    setLoading(false)
  }

  const handleVote = async (proposalId: string, vote: 'FOR' | 'AGAINST') => {
    if (!userId) {
      setError('Нужно войти для голосования.')
      return
    }
    const response = await fetch('/api/dao/votes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        proposalId,
        userId,
        vote,
      }),
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось проголосовать.')
      return
    }
    load()
  }

  return (
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-fadeIn">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800">
              DAO / Токены
            </h1>
            <p className="text-base sm:text-lg text-warmGraphite-600 mt-2">
              Голосования, токенсейл, гранты и управление экосистемой.
            </p>
          </div>
          <NeumorphicButton primary onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Создать предложение
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

        {/* Токены и баланс */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5 text-warmBlue-600" />
              <div className="text-xs uppercase tracking-widest text-warmGray-600">
                Баланс NVT
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-warmGraphite-800">
              12 400
            </div>
          </NeumorphicCard>
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2 mb-2">
              <Vote className="w-5 h-5 text-warmGreen-600" />
              <div className="text-xs uppercase tracking-widest text-warmGray-600">
                Голосований
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-warmGraphite-800">
              {proposals.length}
            </div>
          </NeumorphicCard>
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-warmPink-600" />
              <div className="text-xs uppercase tracking-widest text-warmGray-600">
                Участие
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-warmGraphite-800">4/7</div>
          </NeumorphicCard>
        </section>

        {/* Пакеты токенсейла */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
            Пакеты токенсейла
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {salePackages.map((pkg, index) => (
              <NeumorphicCard
                key={pkg.name}
                soft={!pkg.popular}
                className={cn(
                  'p-4 hover:scale-105 transition-all duration-300 animate-fadeIn',
                  pkg.popular && 'ring-2 ring-warmBlue-500'
                )}
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-warmGraphite-800 text-base sm:text-lg">
                    {pkg.name}
                  </h3>
                  {pkg.popular && (
                    <NeumorphicBadge variant="warning" size="sm">
                      Популярно
                    </NeumorphicBadge>
                  )}
                </div>
                <div className="text-sm font-bold text-warmGraphite-800 mb-1">
                  {pkg.price}
                </div>
                <NeumorphicBadge variant="success" size="sm" className="mb-3">
                  {pkg.bonus}
                </NeumorphicBadge>
                <ul className="space-y-2 mb-4">
                  {pkg.perks.map((perk, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-warmGraphite-600 flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-warmGreen-600 flex-shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <NeumorphicButton primary={pkg.popular} className="w-full text-sm">
                  Выбрать
                </NeumorphicButton>
              </NeumorphicCard>
            ))}
          </div>
        </NeumorphicCard>

        {/* Шаги покупки */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
          <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
            Как купить токены
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {purchaseSteps.map((step, index) => (
              <NeumorphicCard
                key={step.title}
                soft
                className="p-4 hover:scale-[1.02] transition-transform animate-fadeIn"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <h3 className="font-semibold text-warmGraphite-800 text-sm sm:text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-warmGraphite-600">{step.description}</p>
              </NeumorphicCard>
            ))}
          </div>
        </NeumorphicCard>

        {/* Предложения */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '1.1s' }}>
          <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
            Активные предложения
          </h2>
          <div className="space-y-4">
            {proposals.length === 0 && (
              <div className="text-sm text-warmGray-600 text-center py-8">
                Пока нет активных предложений. Создайте первое!
              </div>
            )}
            {proposals.map((proposal, index) => (
              <NeumorphicCard
                key={proposal.id}
                soft
                className="p-4 sm:p-6 hover:scale-[1.01] transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${1.2 + index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-warmGraphite-800 text-base sm:text-lg mb-1">
                      {proposal.title}
                    </h3>
                    <p className="text-sm text-warmGraphite-600">{proposal.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-warmGray-300/50">
                  <NeumorphicButton
                    className="text-xs px-3 py-1.5"
                    onClick={() => handleVote(proposal.id, 'FOR')}
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    За
                  </NeumorphicButton>
                  <NeumorphicButton
                    className="text-xs px-3 py-1.5"
                    onClick={() => handleVote(proposal.id, 'AGAINST')}
                  >
                    <XCircle className="w-3 h-3 mr-1" />
                    Против
                  </NeumorphicButton>
                  <div className="ml-auto text-xs text-warmGray-600">
                    Голосов: {proposal.votesFor || 0} / {proposal.votesAgainst || 0}
                  </div>
                </div>
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
          title="Создать предложение"
          size="md"
        >
          <form onSubmit={handleCreate} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-warmRed-50 border border-warmRed-200 text-sm text-warmRed-700">
                {error}
              </div>
            )}
            <NeumorphicInput
              label="Название"
              placeholder="Название предложения"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <NeumorphicTextarea
              label="Описание"
              placeholder="Подробное описание предложения"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              required
            />
            <div className="flex items-center gap-3">
              <NeumorphicButton
                type="submit"
                primary
                disabled={loading || !title.trim() || !description.trim()}
                className="flex-1"
              >
                {loading ? 'Создание...' : 'Создать'}
              </NeumorphicButton>
              <NeumorphicButton
                type="button"
                onClick={() => {
                  setShowCreateModal(false)
                  setError(null)
                }}
              >
                Отмена
              </NeumorphicButton>
            </div>
          </form>
        </NeumorphicModal>
      </div>
    </div>
  )
}
