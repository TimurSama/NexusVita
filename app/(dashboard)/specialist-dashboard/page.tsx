'use client'

import { useEffect, useState } from 'react'
import { Briefcase, Calendar, Clock, Plus, CheckCircle, XCircle, DollarSign } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicTextarea from '@/components/ui/NeumorphicTextarea'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import NeumorphicModal from '@/components/ui/NeumorphicModal'
import { cn } from '@/lib/utils/cn'

type EventItem = {
  id: string
  title: string
  startsAt: string
  status: string
  userId: string
}

export default function SpecialistDashboardPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [slots, setSlots] = useState<any[]>([])
  const [showSlotModal, setShowSlotModal] = useState(false)
  const [slotForm, setSlotForm] = useState({ startsAt: '', endsAt: '' })
  const [services, setServices] = useState<any[]>([])
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [serviceForm, setServiceForm] = useState({
    title: '',
    type: '',
    description: '',
    priceNXT: 0,
    durationMin: 60,
  })

  useEffect(() => {
    const load = async () => {
      const me = await fetch('/api/auth/me').then((res) => res.json())
      if (!me?.user?.id) {
        setError('Войдите, чтобы видеть запросы.')
        return
      }
      setUserId(me.user.id)
      const data = await fetch(`/api/calendar/events?specialistId=${me.user.id}`).then((res) =>
        res.json()
      )
      setEvents(Array.isArray(data) ? data : [])
      const list = await fetch(`/api/specialists/slots?specialistId=${me.user.id}`).then((res) =>
        res.json()
      )
      setSlots(Array.isArray(list) ? list : [])
      const svc = await fetch(`/api/specialists/services?specialistId=${me.user.id}`).then((res) =>
        res.json()
      )
      setServices(Array.isArray(svc) ? svc : [])
    }
    load()
  }, [])

  const handleStatus = async (eventId: string, status: string) => {
    const response = await fetch(`/api/calendar/events/${eventId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось обновить статус')
      return
    }
    const updated = await response.json()
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)))
  }

  const handleCreateSlot = async () => {
    const response = await fetch('/api/specialists/slots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startsAt: new Date(slotForm.startsAt).toISOString(),
        endsAt: new Date(slotForm.endsAt).toISOString(),
      }),
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось создать слот')
      return
    }
    const slot = await response.json()
    setSlots((prev) => [slot, ...prev])
    setSlotForm({ startsAt: '', endsAt: '' })
    setShowSlotModal(false)
    setError(null)
  }

  const handleCreateService = async () => {
    const response = await fetch('/api/specialists/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(serviceForm),
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось добавить услугу')
      return
    }
    const service = await response.json()
    setServices((prev) => [service, ...prev])
    setServiceForm({
      title: '',
      type: '',
      description: '',
      priceNXT: 0,
      durationMin: 60,
    })
    setShowServiceModal(false)
    setError(null)
  }

  const requestedEvents = events.filter((e) => e.status === 'REQUESTED')

  return (
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <header className="animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800">
            Панель специалиста
          </h1>
          <p className="text-base sm:text-lg text-warmGraphite-600 mt-2">
            Управление заявками, расписанием и подтверждениями.
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
              <Calendar className="w-5 h-5 text-warmBlue-600" />
              <div className="text-xs uppercase tracking-widest text-warmGray-600">
                Запросов
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-warmGraphite-800">
              {requestedEvents.length}
            </div>
          </NeumorphicCard>
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-warmGreen-600" />
              <div className="text-xs uppercase tracking-widest text-warmGray-600">
                Свободных слотов
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-warmGraphite-800">
              {slots.length}
            </div>
          </NeumorphicCard>
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5 text-warmPink-600" />
              <div className="text-xs uppercase tracking-widest text-warmGray-600">
                Услуг
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-warmGraphite-800">
              {services.length}
            </div>
          </NeumorphicCard>
        </section>

        {/* Запросы на занятия */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
            Запросы на занятия
          </h2>
          <div className="space-y-3">
            {requestedEvents.length === 0 && (
              <div className="text-sm text-warmGray-600 text-center py-8">
                Запросов пока нет.
              </div>
            )}
            {requestedEvents.map((event, index) => (
              <NeumorphicCard
                key={event.id}
                soft
                className="p-4 hover:scale-[1.01] transition-transform animate-fadeIn"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className="font-semibold text-warmGraphite-800 text-sm sm:text-base mb-1">
                  {event.title}
                </div>
                <div className="text-xs sm:text-sm text-warmGraphite-600 mb-2">
                  {new Date(event.startsAt).toLocaleString('ru-RU')}
                </div>
                <div className="text-xs text-warmGray-600 mb-3">
                  Пользователь: {event.userId}
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-warmGray-300/50">
                  <NeumorphicButton
                    className="text-xs px-3 py-1.5"
                    onClick={() => handleStatus(event.id, 'CONFIRMED')}
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Подтвердить
                  </NeumorphicButton>
                  <NeumorphicButton
                    className="text-xs px-3 py-1.5"
                    onClick={() => handleStatus(event.id, 'DECLINED')}
                  >
                    <XCircle className="w-3 h-3 mr-1" />
                    Отклонить
                  </NeumorphicButton>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </NeumorphicCard>

        {/* Свободные слоты */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
              Свободные слоты
            </h2>
            <NeumorphicButton primary onClick={() => setShowSlotModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить слот
            </NeumorphicButton>
          </div>
          <div className="space-y-3">
            {slots.length === 0 && (
              <div className="text-sm text-warmGray-600 text-center py-8">
                Слотов пока нет. Добавьте первый слот!
              </div>
            )}
            {slots.map((slot, index) => (
              <NeumorphicCard
                key={slot.id}
                soft
                className="p-3 text-xs sm:text-sm text-warmGraphite-700 hover:scale-[1.01] transition-transform animate-fadeIn"
                style={{ animationDelay: `${0.7 + index * 0.05}s` }}
              >
                {new Date(slot.startsAt).toLocaleString('ru-RU')} —{' '}
                {new Date(slot.endsAt).toLocaleString('ru-RU')}
              </NeumorphicCard>
            ))}
          </div>
        </NeumorphicCard>

        {/* Мои услуги */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
              Мои услуги
            </h2>
            <NeumorphicButton primary onClick={() => setShowServiceModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить услугу
            </NeumorphicButton>
          </div>
          <div className="space-y-3">
            {services.length === 0 && (
              <div className="text-sm text-warmGray-600 text-center py-8">
                Услуг пока нет. Добавьте первую услугу!
              </div>
            )}
            {services.map((service, index) => (
              <NeumorphicCard
                key={service.id}
                soft
                className="p-4 hover:scale-[1.01] transition-transform animate-fadeIn"
                style={{ animationDelay: `${0.9 + index * 0.05}s` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-warmGraphite-800 text-sm sm:text-base mb-1">
                      {service.title}
                    </div>
                    <div className="text-xs text-warmGray-600">{service.type}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <NeumorphicBadge variant="info" size="sm">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {service.priceNXT} NVT
                    </NeumorphicBadge>
                    <NeumorphicBadge variant="default" size="sm">
                      <Clock className="w-3 h-3 mr-1" />
                      {service.durationMin} мин
                    </NeumorphicBadge>
                  </div>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </NeumorphicCard>

        {/* Модальное окно создания слота */}
        <NeumorphicModal
          isOpen={showSlotModal}
          onClose={() => {
            setShowSlotModal(false)
            setError(null)
          }}
          title="Добавить слот"
          size="md"
        >
          <div className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-warmRed-50 border border-warmRed-200 text-sm text-warmRed-700">
                {error}
              </div>
            )}
            <NeumorphicInput
              label="Начало"
              type="datetime-local"
              value={slotForm.startsAt}
              onChange={(e) => setSlotForm({ ...slotForm, startsAt: e.target.value })}
            />
            <NeumorphicInput
              label="Конец"
              type="datetime-local"
              value={slotForm.endsAt}
              onChange={(e) => setSlotForm({ ...slotForm, endsAt: e.target.value })}
            />
            <div className="flex items-center gap-3">
              <NeumorphicButton
                primary
                onClick={handleCreateSlot}
                disabled={!slotForm.startsAt || !slotForm.endsAt}
                className="flex-1"
              >
                Добавить
              </NeumorphicButton>
              <NeumorphicButton
                onClick={() => {
                  setShowSlotModal(false)
                  setError(null)
                }}
              >
                Отмена
              </NeumorphicButton>
            </div>
          </div>
        </NeumorphicModal>

        {/* Модальное окно создания услуги */}
        <NeumorphicModal
          isOpen={showServiceModal}
          onClose={() => {
            setShowServiceModal(false)
            setError(null)
          }}
          title="Добавить услугу"
          size="md"
        >
          <div className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-warmRed-50 border border-warmRed-200 text-sm text-warmRed-700">
                {error}
              </div>
            )}
            <NeumorphicInput
              label="Название услуги"
              placeholder="Консультация"
              value={serviceForm.title}
              onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
            />
            <NeumorphicInput
              label="Тип"
              placeholder="тренировка, массаж, консультация"
              value={serviceForm.type}
              onChange={(e) => setServiceForm({ ...serviceForm, type: e.target.value })}
            />
            <NeumorphicTextarea
              label="Описание"
              placeholder="Описание услуги"
              value={serviceForm.description}
              onChange={(e) =>
                setServiceForm({ ...serviceForm, description: e.target.value })
              }
              rows={4}
            />
            <div className="grid grid-cols-2 gap-3">
              <NeumorphicInput
                label="Цена (NVT)"
                type="number"
                placeholder="0"
                value={serviceForm.priceNXT}
                onChange={(e) =>
                  setServiceForm({ ...serviceForm, priceNXT: Number(e.target.value) })
                }
              />
              <NeumorphicInput
                label="Длительность (мин)"
                type="number"
                placeholder="60"
                value={serviceForm.durationMin}
                onChange={(e) =>
                  setServiceForm({ ...serviceForm, durationMin: Number(e.target.value) })
                }
              />
            </div>
            <div className="flex items-center gap-3">
              <NeumorphicButton
                primary
                onClick={handleCreateService}
                disabled={!serviceForm.title.trim()}
                className="flex-1"
              >
                Добавить
              </NeumorphicButton>
              <NeumorphicButton
                onClick={() => {
                  setShowServiceModal(false)
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
