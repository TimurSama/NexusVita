'use client'

import { useEffect, useState } from 'react'

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
  const [slotForm, setSlotForm] = useState({ startsAt: '', endsAt: '' })
  const [services, setServices] = useState<any[]>([])
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
      const data = await fetch(
        `/api/calendar/events?specialistId=${me.user.id}`
      ).then((res) => res.json())
      setEvents(Array.isArray(data) ? data : [])
      const list = await fetch(`/api/specialists/slots?specialistId=${me.user.id}`).then(
        (res) => res.json()
      )
      setSlots(Array.isArray(list) ? list : [])
      const svc = await fetch(`/api/specialists/services?specialistId=${me.user.id}`).then(
        (res) => res.json()
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

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-ink-800">Панель специалиста</h1>
          <p className="text-ink-600">
            Управление заявками, расписанием и подтверждениями.
          </p>
        </header>

        {error && (
          <div className="sketch-card p-4 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <section className="sketch-card p-6">
          <h2 className="text-xl font-semibold text-ink-800 mb-4">
            Запросы на занятия
          </h2>
          <div className="space-y-3">
            {events.filter((e) => e.status === 'REQUESTED').length === 0 && (
              <div className="text-sm text-ink-600">Запросов пока нет.</div>
            )}
            {events
              .filter((e) => e.status === 'REQUESTED')
              .map((event) => (
                <div
                  key={event.id}
                  className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
                >
                  <div className="font-semibold text-ink-800">{event.title}</div>
                  <div className="text-sm text-ink-600">
                    {new Date(event.startsAt).toLocaleString('ru-RU')}
                  </div>
                  <div className="text-xs text-ink-500">Пользователь: {event.userId}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      className="px-3 py-1 rounded-md border border-ink-300 text-xs text-ink-700 hover:bg-parchment-200"
                      onClick={() => handleStatus(event.id, 'CONFIRMED')}
                    >
                      Подтвердить
                    </button>
                    <button
                      className="px-3 py-1 rounded-md border border-ink-300 text-xs text-ink-700 hover:bg-parchment-200"
                      onClick={() => handleStatus(event.id, 'DECLINED')}
                    >
                      Отклонить
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </section>

        <section className="sketch-card p-6 space-y-3">
          <h2 className="text-xl font-semibold text-ink-800">Свободные слоты</h2>
          <div className="flex items-center gap-3">
            <input
              className="sketch-input"
              type="datetime-local"
              value={slotForm.startsAt}
              onChange={(e) => setSlotForm({ ...slotForm, startsAt: e.target.value })}
            />
            <input
              className="sketch-input"
              type="datetime-local"
              value={slotForm.endsAt}
              onChange={(e) => setSlotForm({ ...slotForm, endsAt: e.target.value })}
            />
            <button
              className="sketch-button"
              onClick={async () => {
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
              }}
            >
              Добавить слот
            </button>
          </div>
          <div className="space-y-2">
            {slots.length === 0 && (
              <div className="text-sm text-ink-600">Слотов пока нет.</div>
            )}
            {slots.map((slot) => (
              <div
                key={slot.id}
                className="p-3 rounded-lg border border-ink-200 bg-parchment-100 text-sm text-ink-700"
              >
                {new Date(slot.startsAt).toLocaleString('ru-RU')} —{' '}
                {new Date(slot.endsAt).toLocaleString('ru-RU')}
              </div>
            ))}
          </div>
        </section>

        <section className="sketch-card p-6 space-y-3">
          <h2 className="text-xl font-semibold text-ink-800">Мои услуги</h2>
          <input
            className="sketch-input"
            placeholder="Название услуги"
            value={serviceForm.title}
            onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
          />
          <input
            className="sketch-input"
            placeholder="Тип (тренировка, массаж, консультация)"
            value={serviceForm.type}
            onChange={(e) => setServiceForm({ ...serviceForm, type: e.target.value })}
          />
          <textarea
            className="sketch-input min-h-[100px]"
            placeholder="Описание"
            value={serviceForm.description}
            onChange={(e) =>
              setServiceForm({ ...serviceForm, description: e.target.value })
            }
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              className="sketch-input"
              type="number"
              placeholder="Цена (NVT)"
              value={serviceForm.priceNXT}
              onChange={(e) =>
                setServiceForm({ ...serviceForm, priceNXT: Number(e.target.value) })
              }
            />
            <input
              className="sketch-input"
              type="number"
              placeholder="Длительность (мин)"
              value={serviceForm.durationMin}
              onChange={(e) =>
                setServiceForm({ ...serviceForm, durationMin: Number(e.target.value) })
              }
            />
          </div>
          <button
            className="sketch-button"
            onClick={async () => {
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
            }}
          >
            Добавить услугу
          </button>
          <div className="space-y-2">
            {services.length === 0 && (
              <div className="text-sm text-ink-600">Услуг пока нет.</div>
            )}
            {services.map((service) => (
              <div
                key={service.id}
                className="p-3 rounded-lg border border-ink-200 bg-parchment-100 text-sm text-ink-700"
              >
                {service.title} · {service.priceNXT} NVT · {service.durationMin} мин
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
