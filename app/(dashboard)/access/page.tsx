const accessCards = [
  {
    title: 'Единая медкарта',
    description:
      'История анализов, диагнозов, назначений и телемедицинских консультаций.',
    actions: ['Открыть карту', 'Импорт из клиник', 'Экспорт PDF'],
  },
  {
    title: 'Абонементы и пропуска',
    description:
      'QR-пропуск в клубы, бассейны, бани, студии и групповые классы.',
    actions: ['Добавить абонемент', 'Поделиться доступом', 'Проверить срок'],
  },
  {
    title: 'Страхование и чек-апы',
    description:
      'Управление страховыми планами, годовые осмотры и напоминания.',
    actions: ['Подключить страхование', 'Запланировать чек-ап', 'История'],
  },
  {
    title: 'Доступ DAO',
    description:
      'NFT-пропуск, голосования и участники, подтвержденные токеном.',
    actions: ['Привязать кошелек', 'Получить пропуск', 'Войти в DAO'],
  },
]

'use client'

import { useEffect, useState } from 'react'

type Pass = {
  id: string
  providerName: string
  status: 'ACTIVE' | 'PAUSED' | 'EXPIRED'
  expiresAt?: string | null
}

export default function AccessPage() {
  const [passes, setPasses] = useState<Pass[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthed, setIsAuthed] = useState(false)

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
      const data = await fetch(`/api/access-passes?userId=${me.user.id}`).then(
        (res) => res.json()
      )
      setPasses(Array.isArray(data) ? data : [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-ink-800">Карты и пропуска</h1>
            <p className="text-ink-600">
              Управление медицинской картой, абонементами, страховкой и доступом
              DAO.
            </p>
          </div>
          <button className="sketch-button">Добавить документ</button>
        </header>

        <div className="sketch-card p-4 text-sm text-ink-700">
          ⚠️ Абонементы и пропуска в разработке. Сейчас отображается визуальная
          модель, а синхронизация с клубами и QR-доступом появится позже.
        </div>

        {!isAuthed && !loading && (
          <div className="sketch-card p-4 text-sm text-ink-700">
            Войдите в аккаунт, чтобы увидеть ваши абонементы.
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accessCards.map((card) => (
            <div key={card.title} className="sketch-card p-6">
              <h2 className="text-2xl font-semibold text-ink-800 mb-2">
                {card.title}
              </h2>
              <p className="text-ink-600 mb-4">{card.description}</p>
              <div className="flex flex-wrap gap-2">
                {card.actions.map((action) => (
                  <button
                    key={action}
                    className="px-3 py-1 rounded-full border border-ink-300 text-xs text-ink-700 hover:bg-parchment-200"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="sketch-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-ink-800">Активные абонементы</h3>
            <button className="ink-link text-sm">Все пропуска</button>
          </div>
          {passes.length === 0 ? (
            <div className="text-sm text-ink-600">
              Пока нет активных абонементов. Они появятся после подключения
              поставщиков.
            </div>
          ) : (
            <div className="space-y-3">
              {passes.map((pass) => (
                <div
                  key={pass.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-ink-200 bg-parchment-100"
                >
                  <div>
                    <div className="font-semibold text-ink-800">
                      {pass.providerName}
                    </div>
                    <div className="text-xs text-ink-500">
                      {pass.expiresAt
                        ? `До ${new Date(pass.expiresAt).toLocaleDateString('ru-RU')}`
                        : 'Без срока'}
                    </div>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      pass.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-800'
                        : pass.status === 'PAUSED'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {pass.status === 'ACTIVE'
                      ? 'Активен'
                      : pass.status === 'PAUSED'
                      ? 'Пауза'
                      : 'Истек'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
