'use client'

import { useEffect, useState } from 'react'
import { Search, Star, Clock, MapPin, Filter, Calendar, MessageCircle, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import NeumorphicModal from '@/components/ui/NeumorphicModal'
import NeumorphicCarousel from '@/components/ui/NeumorphicCarousel'
import { generateMockSpecialists } from '@/lib/mocks/data-generators'
import { cn } from '@/lib/utils/cn'

const categories = [
  {
    title: 'Врачи и клиники',
    description: 'Терапевты, кардиологи, эндокринологи, клиники и лаборатории.',
    actions: ['Записаться', 'Телемедицина', 'Электронная карта'],
    color: 'warmBlue',
  },
  {
    title: 'Тренеры и реабилитация',
    description: 'Силовой, функциональный, реабилитация травм, LFK и массаж.',
    actions: ['Подбор тренера', 'Протокол травм', 'Восстановление'],
    color: 'warmRed',
  },
  {
    title: 'Питание и нутрициология',
    description: 'Рационы, нутрицевтики, план питания, микробиом.',
    actions: ['Консультация', 'Меню на неделю', 'Анализ дефицитов'],
    color: 'warmGreen',
  },
  {
    title: 'Психическое здоровье',
    description: 'Психологи, психотерапевты, группы поддержки.',
    actions: ['Запись на сессию', 'Дневник эмоций', 'Группы поддержки'],
    color: 'warmPink',
  },
  {
    title: 'Сексуальное и репродуктивное здоровье',
    description: 'Гинекология, урология, семейное планирование, либидо.',
    actions: ['Анонимные консультации', 'Программы', 'Безопасность'],
    color: 'warmPink',
  },
  {
    title: 'Образ жизни',
    description: 'Сон, стресс, привычки, детокс, профилактика выгорания.',
    actions: ['Аудит сна', 'Антистресс протокол', 'Трекер привычек'],
    color: 'warmBlue',
  },
]

const topExperts = [
  {
    name: 'Доктор Левицкая',
    role: 'Эндокринолог',
    rating: '4.9',
    format: 'Онлайн · 45 мин',
    reviews: 127,
  },
  {
    name: 'Илья Воронцов',
    role: 'Спортивный врач',
    rating: '4.8',
    format: 'Очно · клиника',
    reviews: 89,
  },
  {
    name: 'Мария Грин',
    role: 'Нутрициолог',
    rating: '5.0',
    format: 'Онлайн · 30 мин',
    reviews: 203,
  },
  {
    name: 'Павел К.',
    role: 'Психотерапевт',
    rating: '4.9',
    format: 'Онлайн · 50 мин',
    reviews: 156,
  },
]

export default function SpecialistsPage() {
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [offers, setOffers] = useState<any[]>([])
  const [specialists, setSpecialists] = useState<any[]>([])
  const [mockSpecialists] = useState(generateMockSpecialists(20))
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSpecialist, setSelectedSpecialist] = useState<any | null>(null)
  const [slots, setSlots] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [selectedService, setSelectedService] = useState<any | null>(null)
  const [bookingTitle, setBookingTitle] = useState('Консультация')
  const [error, setError] = useState<string | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const recs = await fetch('/api/partners/recommendations').then((res) => res.json())
        setRecommendations(Array.isArray(recs) ? recs : [])
        const list = await fetch('/api/cashback/offers').then((res) => res.json())
        setOffers(Array.isArray(list) ? list : [])
        const people = await fetch('/api/specialists').then((res) => res.json())
        setSpecialists(Array.isArray(people) && people.length > 0 ? people : mockSpecialists)
      } catch (err) {
        // Используем моки при ошибке
        setSpecialists(mockSpecialists)
      }
    }
    load()
  }, [])

  const handleSearch = async () => {
    const people = await fetch(
      `/api/specialists?q=${encodeURIComponent(query)}`
    ).then((res) => res.json())
    setSpecialists(Array.isArray(people) ? people : [])
  }

  const handleSelect = async (specialist: any) => {
    setSelectedSpecialist(specialist)
    setShowBookingModal(true)
    const list = await fetch(
      `/api/specialists/slots?specialistId=${specialist.id}`
    ).then((res) => res.json())
    setSlots(Array.isArray(list) ? list : [])
    const svc = await fetch(
      `/api/specialists/services?specialistId=${specialist.id}`
    ).then((res) => res.json())
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
    setShowBookingModal(false)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-fadeIn">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800">
              Специалисты
            </h1>
            <p className="text-base sm:text-lg text-warmGraphite-600 mt-2">
              Каталог врачей, тренеров, нутрициологов и психологов с быстрым доступом к
              услугам.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <NeumorphicButton primary>Создать запрос</NeumorphicButton>
            <NeumorphicButton>Мои специалисты</NeumorphicButton>
          </div>
        </header>

        {/* Поиск и фильтры */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <NeumorphicInput placeholder="Поиск по специализации" />
            <NeumorphicInput placeholder="Город или онлайн" />
            <NeumorphicInput placeholder="Цель: сон, гормоны, спорт" />
          </div>
          <div className="flex flex-wrap gap-2">
            <NeumorphicBadge variant="info" size="sm">
              ⭐ Топ-рейтинги
            </NeumorphicBadge>
            <NeumorphicBadge variant="info" size="sm">
              🧬 Генетические риски
            </NeumorphicBadge>
            <NeumorphicBadge variant="info" size="sm">
              🩺 Второе мнение
            </NeumorphicBadge>
          </div>
        </NeumorphicCard>

        {/* Рекомендуемые эксперты */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
              Рекомендуемые эксперты
            </h3>
            <button className="text-sm text-warmBlue-600 hover:text-warmBlue-700 font-medium transition-colors">
              Смотреть всех
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(specialists.length > 0 ? specialists.slice(0, 4) : topExperts).map((expert, index) => {
              const spec = specialists.length > 0 ? expert : expert as any
              const name = spec.name || spec.firstName || spec.username || 'Специалист'
              const role = spec.role || spec.specialization || 'Специалист'
              const rating = spec.rating || parseFloat(expert.rating) || 4.5
              const reviews = spec.reviews || expert.reviews || 0
              const price = spec.price || Math.floor(Math.random() * 5000) + 1000

              return (
                <motion.div
                  key={spec.id || expert.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NeumorphicCard
                    soft
                    className="p-4 hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={() => handleSelect(spec)}
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full neumorphic-card-soft flex items-center justify-center text-lg sm:text-xl font-bold text-warmGraphite-700 mb-3 mx-auto">
                      {name[0]}
                    </div>
                    <div className="text-center mb-2">
                      <div className="text-base sm:text-lg font-semibold text-warmGraphite-800 mb-1">
                        {name}
                      </div>
                      <div className="text-xs sm:text-sm text-warmGraphite-600 mb-2">{role}</div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-warmPink-500 text-warmPink-500" />
                        <span className="text-sm font-semibold text-warmGraphite-800">
                          {rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-warmGray-600">({reviews})</span>
                      </div>
                      <div className="text-xs text-warmGray-600 mb-3 flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3" />
                        от {price} ₽
                      </div>
                    </div>
                    <NeumorphicButton
                      primary
                      className="w-full text-xs sm:text-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelect(spec)
                      }}
                    >
                      <Calendar className="w-3 h-3 mr-1" />
                      Записаться
                    </NeumorphicButton>
                  </NeumorphicCard>
                </motion.div>
              )
            })}
          </div>
        </NeumorphicCard>

        {/* Категории */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <NeumorphicCard
              key={category.title}
              className="p-4 sm:p-6 hover:scale-[1.02] transition-all duration-300 animate-fadeIn"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-2">
                {category.title}
              </h2>
              <p className="text-sm sm:text-base text-warmGraphite-600 mb-4">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.actions.map((action) => (
                  <NeumorphicButton
                    key={action}
                    className="text-xs sm:text-sm px-3 py-1.5"
                  >
                    {action}
                  </NeumorphicButton>
                ))}
              </div>
            </NeumorphicCard>
          ))}
        </section>

        {/* Поиск специалистов */}
        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-4 sm:gap-6">
          <NeumorphicCard className="p-4 sm:p-6 space-y-4 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-3">
              <NeumorphicInput
                placeholder="Найти специалиста"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1"
              />
              <NeumorphicButton onClick={handleSearch}>
                <Search className="w-4 h-4" />
              </NeumorphicButton>
            </div>
            <div className="space-y-3">
              {specialists.length === 0 && (
                <div className="text-sm text-warmGray-600 text-center py-8">
                  Специалистов пока нет.
                </div>
              )}
              {specialists.map((spec, index) => {
                const name = spec.name || spec.firstName || spec.username || 'Специалист'
                const role = spec.role || spec.specialization || 'Специалист'
                const rating = spec.rating || 4.5
                const reviews = spec.reviews || 0
                const price = spec.price || Math.floor(Math.random() * 5000) + 1000

                return (
                  <motion.div
                    key={spec.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <NeumorphicCard
                      soft
                      className="p-4 flex items-center gap-4 hover:scale-[1.01] transition-transform cursor-pointer"
                      onClick={() => handleSelect(spec)}
                    >
                      <div className="w-12 h-12 rounded-full neumorphic-card-soft flex items-center justify-center text-lg font-bold text-warmGraphite-700 flex-shrink-0">
                        {name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-warmGraphite-800 text-sm sm:text-base mb-1">
                          {name}
                        </div>
                        <div className="text-xs text-warmGraphite-600 mb-2">{role}</div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-warmPink-500 text-warmPink-500" />
                            <span className="text-xs font-semibold text-warmGraphite-800">
                              {rating.toFixed(1)}
                            </span>
                            <span className="text-xs text-warmGray-600">({reviews})</span>
                          </div>
                          <div className="text-xs text-warmGray-600 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            от {price} ₽
                          </div>
                        </div>
                      </div>
                      <NeumorphicButton
                        primary
                        className="text-xs px-3 py-1.5 flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelect(spec)
                        }}
                      >
                        <Calendar className="w-3 h-3 mr-1" />
                        Запись
                      </NeumorphicButton>
                    </NeumorphicCard>
                  </motion.div>
                )
              })}
            </div>
          </NeumorphicCard>

          {/* Рекомендации партнеров */}
          <NeumorphicCard className="p-4 sm:p-6 space-y-4 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
            <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
              Рекомендации партнеров
            </h3>
            {recommendations.length === 0 && (
              <div className="text-sm text-warmGray-600">
                Пока нет рекомендаций. Добавьте партнера, чтобы продвигать акции и
                кэшбэк.
              </div>
            )}
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <NeumorphicCard
                  key={rec.id}
                  soft
                  className="p-3 hover:scale-[1.01] transition-transform animate-fadeIn"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <div className="font-semibold text-warmGraphite-800 text-sm">
                    {rec.name}
                  </div>
                  <div className="text-xs text-warmGray-600 mt-1">{rec.category}</div>
                  {rec.description && (
                    <div className="text-xs text-warmGraphite-600 mt-2">
                      {rec.description}
                    </div>
                  )}
                  {rec.cashbackOffer && (
                    <NeumorphicBadge variant="success" size="sm" className="mt-2">
                      Кэшбэк {rec.cashbackOffer.percent}% · код{' '}
                      {rec.cashbackOffer.referralCode}
                    </NeumorphicBadge>
                  )}
                </NeumorphicCard>
              ))}
            </div>
          </NeumorphicCard>
        </section>

        {/* Модальное окно записи */}
        <NeumorphicModal
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false)
            setError(null)
          }}
          title="Записаться к специалисту"
          size="md"
        >
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-warmRed-50 border border-warmRed-200 text-sm text-warmRed-700">
              {error}
            </div>
          )}
          {selectedSpecialist && (
            <div className="space-y-4">
              <div className="text-sm text-warmGraphite-600">
                Специалист: {selectedSpecialist.username || selectedSpecialist.name}
              </div>
              {services.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-warmGraphite-700 mb-2">
                    Услуга
                  </label>
                  <select
                    className="neumorphic-input w-full"
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
                </div>
              )}
              <NeumorphicInput
                label="Название визита"
                placeholder="Консультация"
                value={bookingTitle}
                onChange={(e) => setBookingTitle(e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-warmGraphite-700 mb-2">
                  Доступные слоты
                </label>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {slots.length === 0 && (
                    <div className="text-sm text-warmGray-600 text-center py-4">
                      Свободных слотов нет.
                    </div>
                  )}
                  {slots.map((slot) => (
                    <NeumorphicCard
                      key={slot.id}
                      soft
                      className="p-3 flex items-center justify-between hover:scale-[1.01] transition-transform"
                    >
                      <span className="text-xs sm:text-sm text-warmGraphite-700">
                        {new Date(slot.startsAt).toLocaleString('ru-RU')}
                      </span>
                      <NeumorphicButton
                        className="text-xs px-3 py-1.5"
                        onClick={() => handleBook(slot.id)}
                      >
                        Записаться
                      </NeumorphicButton>
                    </NeumorphicCard>
                  ))}
                </div>
              </div>
            </div>
          )}
        </NeumorphicModal>
      </div>
    </div>
  )
}
