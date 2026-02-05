'use client'

import { useEffect, useState } from 'react'

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
  },
  {
    name: 'Growth Partner',
    price: 'от 2 500 USDT',
    bonus: '+25% токенов',
    perks: ['Личный аккаунт-менеджер', 'Доступ к аналитике', 'Грантовый пул'],
  },
  {
    name: 'Public',
    price: 'от 100 USDT',
    bonus: '+15% токенов',
    perks: ['Публичный сейл', 'Бонусы за рефералов', 'Личный профиль'],
  },
]

export default function DaoPage() {
  const [proposals, setProposals] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    setLoading(false)
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось создать предложение')
      return
    }
    setTitle('')
    setDescription('')
    load()
  }

  const handleVote = async (proposalId: string, support: boolean) => {
    if (!userId) {
      setError('Нужно войти для голосования.')
      return
    }
    await fetch('/api/dao/votes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ proposalId, userId, support }),
    })
    load()
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-ink-800">DAO и токены NVT</h1>
            <p className="text-ink-600">
              Управление, экономика и доступ к экосистеме через токен NVT.
            </p>
          </div>
          <button className="sketch-button">Подключить кошелек</button>
        </header>

        <section className="sketch-card p-6">
          <h2 className="text-2xl font-semibold text-ink-800 mb-4">
            Как работает токенсейл
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {purchaseSteps.map((step) => (
              <div
                key={step.title}
                className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
              >
                <div className="font-semibold text-ink-800">{step.title}</div>
                <div className="text-sm text-ink-600">{step.description}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {salePackages.map((pkg) => (
            <div key={pkg.name} className="sketch-card p-6 space-y-4">
              <div className="text-xl font-semibold text-ink-800">{pkg.name}</div>
              <div className="text-sm text-ink-600">{pkg.price}</div>
              <div className="text-sm font-semibold text-ink-800">{pkg.bonus}</div>
              <div className="space-y-2 text-sm text-ink-600">
                {pkg.perks.map((perk) => (
                  <div key={perk}>• {perk}</div>
                ))}
              </div>
              <button className="sketch-button w-full">Выбрать пакет</button>
            </div>
          ))}
        </section>

        <section className="sketch-card p-6">
          <h2 className="text-2xl font-semibold text-ink-800 mb-4">
            Распределение доходов
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-ink-700">
            <div className="p-4 rounded-lg border border-ink-200 bg-parchment-100">
              40% — казначейство DAO и гранты на исследования.
            </div>
            <div className="p-4 rounded-lg border border-ink-200 bg-parchment-100">
              35% — развитие продукта и партнёрские программы.
            </div>
            <div className="p-4 rounded-lg border border-ink-200 bg-parchment-100">
              25% — вознаграждения пользователям и специалистам.
            </div>
          </div>
        </section>

        <section className="sketch-card p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-ink-800">
              DAO предложения и голосования
            </h2>
            <button className="ink-link text-sm" onClick={load}>
              Обновить
            </button>
          </div>

          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-3">
            <input
              className="sketch-input"
              placeholder="Название предложения"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className="sketch-input min-h-[120px]"
              placeholder="Описание и обоснование"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button className="sketch-button" type="submit" disabled={loading}>
              {loading ? 'Создание...' : 'Создать предложение'}
            </button>
          </form>

          <div className="space-y-4">
            {proposals.length === 0 ? (
              <div className="text-sm text-ink-600">
                Пока нет активных предложений.
              </div>
            ) : (
              proposals.map((proposal) => (
                <div
                  key={proposal.id}
                  className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
                >
                  <div className="text-lg font-semibold text-ink-800">
                    {proposal.title}
                  </div>
                  <div className="text-sm text-ink-600 mt-1">
                    {proposal.description}
                  </div>
                  <div className="text-xs text-ink-500 mt-2">
                    Автор: {proposal.creator?.username || '—'} · Статус:{' '}
                    {proposal.status}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      className="px-3 py-1 rounded-md border border-ink-300 text-xs text-ink-700 hover:bg-parchment-200"
                      onClick={() => handleVote(proposal.id, true)}
                    >
                      За
                    </button>
                    <button
                      className="px-3 py-1 rounded-md border border-ink-300 text-xs text-ink-700 hover:bg-parchment-200"
                      onClick={() => handleVote(proposal.id, false)}
                    >
                      Против
                    </button>
                    <span className="text-xs text-ink-500">
                      Голосов: {proposal.votes?.length || 0}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
