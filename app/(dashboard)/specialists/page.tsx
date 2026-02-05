'use client'

import { useEffect, useState } from 'react'

const categories = [
  {
    title: 'Врачи и клиники',
    description: 'Терапевты, кардиологи, эндокринологи, клиники и лаборатории.',
    actions: ['Записаться', 'Телемедицина', 'Электронная карта'],
  },
  {
    title: 'Тренеры и реабилитация',
    description: 'Силовой, функциональный, реабилитация травм, LFK и массаж.',
    actions: ['Подбор тренера', 'Протокол травм', 'Восстановление'],
  },
  {
    title: 'Питание и нутрициология',
    description: 'Рационы, нутрицевтики, план питания, микробиом.',
    actions: ['Консультация', 'Меню на неделю', 'Анализ дефицитов'],
  },
  {
    title: 'Психическое здоровье',
    description: 'Психологи, психотерапевты, группы поддержки.',
    actions: ['Запись на сессию', 'Дневник эмоций', 'Группы поддержки'],
  },
  {
    title: 'Сексуальное и репродуктивное здоровье',
    description: 'Гинекология, урология, семейное планирование, либидо.',
    actions: ['Анонимные консультации', 'Программы', 'Безопасность'],
  },
  {
    title: 'Образ жизни',
    description: 'Сон, стресс, привычки, детокс, профилактика выгорания.',
    actions: ['Аудит сна', 'Антистресс протокол', 'Трекер привычек'],
  },
]

const topExperts = [
  {
    name: 'Доктор Левицкая',
    role: 'Эндокринолог',
    rating: '4.9',
    format: 'Онлайн · 45 мин',
  },
  {
    name: 'Илья Воронцов',
    role: 'Спортивный врач',
    rating: '4.8',
    format: 'Очно · клиника',
  },
  {
    name: 'Мария Грин',
    role: 'Нутрициолог',
    rating: '5.0',
    format: 'Онлайн · 30 мин',
  },
  {
    name: 'Павел К.',
    role: 'Психотерапевт',
    rating: '4.9',
    format: 'Онлайн · 50 мин',
  },
]

export default function SpecialistsPage() {
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [offers, setOffers] = useState<any[]>([])
  const [specialists, setSpecialists] = useState<any[]>([])
  const [query, setQuery] = useState('')
  const [selectedSpecialist, setSelectedSpecialist] = useState<any | null>(null)
  const [slots, setSlots] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [selectedService, setSelectedService] = useState<any | null>(null)
  const [bookingTitle, setBookingTitle] = useState('Консультация')
  const [error, setError] = useState<string | null>(null)
  const [newRec, setNewRec] = useState({
    name: '',
    category: '',
    description: '',
    cashbackOfferId: '',
  })

  useEffect(() => {
    const load = async () => {
      const recs = await fetch('/api/partners/recommendations').then((res) =>
        res.json()
      )
      setRecommendations(Array.isArray(recs) ? recs : [])
      const list = await fetch('/api/cashback/offers').then((res) => res.json())
      setOffers(Array.isArray(list) ? list : [])
      const people = await fetch('/api/specialists').then((res) => res.json())
      setSpecialists(Array.isArray(people) ? people : [])
    }
    load()
  }, [])

  const handleSearch = async () => {
    const people = await fetch(`/api/specialists?q=${encodeURIComponent(query)}`).then(
      (res) => res.json()
    )
    setSpecialists(Array.isArray(people) ? people : [])
  }

  const handleSelect = async (specialist: any) => {
    setSelectedSpecialist(specialist)
    const list = await fetch(`/api/specialists/slots?specialistId=${specialist.id}`).then(
      (res) => res.json()
    )
    setSlots(Array.isArray(list) ? list : [])
    const svc = await fetch(`/api/specialists/services?specialistId=${specialist.id}`).then(
      (res) => res.json()
    )
    setServices(Array.isArray(svc) ? svc : [])
    setSelectedService(null)
  }

  const handleBook = async (slotId: string) => {
    if (!selectedSpecialist) return
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        specialistId: selectedSpecialist.id,
        slotId,
        title: bookingTitle,
        serviceId: selectedService?.id,
      }),
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось создать запись')
      return
    }
    setSlots((prev) => prev.filter((s) => s.id !== slotId))
  }

  const handleCreate = async () => {
    setError(null)
    const response = await fetch('/api/partners/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newRec.name,
        category: newRec.category,
        description: newRec.description || undefined,
        cashbackOfferId: newRec.cashbackOfferId || undefined,
      }),
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось добавить рекомендацию')
      return
    }
    const rec = await response.json()
    setRecommendations((prev) => [rec, ...prev])
    setNewRec({ name: '', category: '', description: '', cashbackOfferId: '' })
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-ink-800">Специалисты</h1>
            <p className="text-ink-600">
              Каталог врачей, тренеров, нутрициологов и психологов с быстрым
              доступом к услугам.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="sketch-button">Создать запрос</button>
            <button className="px-5 py-2.5 rounded-lg border-2 border-ink-300 text-ink-700 hover:bg-parchment-200">
              Мои специалисты
            </button>
          </div>
        </header>

        <section className="sketch-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input className="sketch-input" placeholder="Поиск по специализации" />
            <input className="sketch-input" placeholder="Город или онлайн" />
            <input className="sketch-input" placeholder="Цель: сон, гормоны, спорт" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink-600">
            <span className="px-3 py-1 rounded-full border border-ink-300 bg-parchment-100">
              ⭐ Топ-рейтинги
            </span>
            <span className="px-3 py-1 rounded-full border border-ink-300 bg-parchment-100">
              🧬 Генетические риски
            </span>
            <span className="px-3 py-1 rounded-full border border-ink-300 bg-parchment-100">
              🩺 Второе мнение
            </span>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-6">
          <div className="sketch-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <input
                className="sketch-input"
                placeholder="Найти специалиста"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="sketch-button" onClick={handleSearch}>
                Найти
              </button>
            </div>
            <div className="space-y-3">
              {specialists.length === 0 && (
                <div className="text-sm text-ink-600">Специалистов пока нет.</div>
              )}
              {specialists.map((spec) => (
                <div
                  key={spec.id}
                  className="p-4 rounded-lg border border-ink-200 bg-parchment-100 flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold text-ink-800">
                      {spec.firstName || ''} {spec.lastName || ''} {spec.username}
                    </div>
                    <div className="text-xs text-ink-500">{spec.role}</div>
                  </div>
                  <button
                    className="px-3 py-1 rounded-md border border-ink-300 text-xs text-ink-700 hover:bg-parchment-200"
                    onClick={() => handleSelect(spec)}
                  >
                    Слоты
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="sketch-card p-6 space-y-3">
            <h3 className="text-xl font-semibold text-ink-800">Записаться</h3>
            {selectedSpecialist ? (
              <>
                <div className="text-sm text-ink-600">
                  Специалист: {selectedSpecialist.username}
                </div>
                {services.length > 0 && (
                  <select
                    className="sketch-input"
                    value={selectedService?.id || ''}
                    onChange={(e) => {
                      const service = services.find((s) => s.id === e.target.value)
                      setSelectedService(service || null)
                      if (service) setBookingTitle(service.title)
                    }}
                  >
                    <option value="">Выберите услугу</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title} · {service.priceNXT} NVT · {service.durationMin} мин
                      </option>
                    ))}
                  </select>
                )}
                <input
                  className="sketch-input"
                  placeholder="Название визита"
                  value={bookingTitle}
                  onChange={(e) => setBookingTitle(e.target.value)}
                />
                <div className="space-y-2">
                  {slots.length === 0 && (
                    <div className="text-sm text-ink-600">Свободных слотов нет.</div>
                  )}
                  {slots.map((slot) => (
                    <div
                      key={slot.id}
                      className="p-3 rounded-lg border border-ink-200 bg-parchment-100 flex items-center justify-between"
                    >
                      <span className="text-xs text-ink-700">
                        {new Date(slot.startsAt).toLocaleString('ru-RU')}
                      </span>
                      <button
                        className="px-3 py-1 rounded-md border border-ink-300 text-xs text-ink-700 hover:bg-parchment-200"
                        onClick={() => handleBook(slot.id)}
                      >
                        Записаться
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-sm text-ink-600">
                Выберите специалиста, чтобы увидеть слоты.
              </div>
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div key={category.title} className="sketch-card p-6">
              <h2 className="text-2xl font-semibold text-ink-800 mb-2">
                {category.title}
              </h2>
              <p className="text-ink-600 mb-4">{category.description}</p>
              <div className="flex flex-wrap gap-2">
                {category.actions.map((action) => (
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
            <h3 className="text-xl font-semibold text-ink-800">Рекомендуемые эксперты</h3>
            <button className="ink-link text-sm">Смотреть всех</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topExperts.map((expert) => (
              <div
                key={expert.name}
                className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
              >
                <div className="text-lg font-semibold text-ink-800">
                  {expert.name}
                </div>
                <div className="text-sm text-ink-600">{expert.role}</div>
                <div className="text-xs text-ink-500 mt-1">{expert.format}</div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-ink-700">⭐ {expert.rating}</span>
                  <button className="px-3 py-1 rounded-md border border-ink-300 text-xs text-ink-700 hover:bg-parchment-200">
                    Записаться
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-6">
          <div className="sketch-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-ink-800">
                Рекомендации партнеров
              </h3>
            </div>
            {recommendations.length === 0 && (
              <div className="text-sm text-ink-600">
                Пока нет рекомендаций. Добавьте партнера, чтобы продвигать акции
                и кэшбэк.
              </div>
            )}
            <div className="space-y-3">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
                >
                  <div className="font-semibold text-ink-800">{rec.name}</div>
                  <div className="text-xs text-ink-500">{rec.category}</div>
                  {rec.description && (
                    <div className="text-sm text-ink-600 mt-1">
                      {rec.description}
                    </div>
                  )}
                  {rec.cashbackOffer && (
                    <div className="text-xs text-ink-700 mt-2">
                      Кэшбэк: {rec.cashbackOffer.percent}% · код{' '}
                      {rec.cashbackOffer.referralCode}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="sketch-card p-6 space-y-4">
            <h3 className="text-xl font-semibold text-ink-800">
              Добавить рекомендацию
            </h3>
            {error && (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </div>
            )}
            <input
              className="sketch-input"
              placeholder="Компания или площадка"
              value={newRec.name}
              onChange={(e) => setNewRec({ ...newRec, name: e.target.value })}
            />
            <input
              className="sketch-input"
              placeholder="Категория (клиника, зал, спа)"
              value={newRec.category}
              onChange={(e) => setNewRec({ ...newRec, category: e.target.value })}
            />
            <textarea
              className="sketch-input min-h-[120px]"
              placeholder="Описание и выгоды"
              value={newRec.description}
              onChange={(e) =>
                setNewRec({ ...newRec, description: e.target.value })
              }
            />
            <select
              className="sketch-input"
              value={newRec.cashbackOfferId}
              onChange={(e) =>
                setNewRec({ ...newRec, cashbackOfferId: e.target.value })
              }
            >
              <option value="">Без кэшбэка</option>
              {offers.map((offer) => (
                <option key={offer.id} value={offer.id}>
                  {offer.title} · {offer.percent}%
                </option>
              ))}
            </select>
            <button className="sketch-button" onClick={handleCreate}>
              Добавить
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
