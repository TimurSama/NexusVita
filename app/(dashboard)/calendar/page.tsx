'use client'

import { useEffect, useState } from 'react'
import { Calendar, Users, MapPin } from 'lucide-react'

type EventItem = {
  id: string
  title: string
  type: string
  startsAt: string
  endsAt?: string | null
  location?: string | null
  specialist?: { username?: string | null; role?: string | null } | null
}

export default function CalendarPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [importFile, setImportFile] = useState<File | null>(null)
  const [requestForm, setRequestForm] = useState({
    specialistId: '',
    title: '',
    startsAt: '',
    endsAt: '',
  })

  useEffect(() => {
    const load = async () => {
      const me = await fetch('/api/auth/me').then((res) => res.json())
      if (!me?.user?.id) {
        setError('Войдите, чтобы видеть календарь.')
        return
      }
      setUserId(me.user.id)
      setRole(me.user.role)
      const query =
        me.user.role === 'TRAINER' || me.user.role === 'DOCTOR'
          ? `/api/calendar/events?specialistId=${me.user.id}`
          : `/api/calendar/events?userId=${me.user.id}`
      const data = await fetch(query).then((res) => res.json())
      setEvents(Array.isArray(data) ? data : [])
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
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-ink-800">Календарь</h1>
            <p className="text-ink-600">
              Синхронизация занятий с тренерами, специалистами и группами.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {userId && (
              <a
                className="px-4 py-2 rounded-lg border border-ink-300 text-sm text-ink-700 hover:bg-parchment-200"
                href={`/api/calendar/ics?userId=${userId}`}
              >
                Экспорт iCal
              </a>
            )}
            <button className="sketch-button">Запланировать</button>
          </div>
        </header>

        {error && (
          <div className="sketch-card p-4 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="sketch-card p-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-ink-700" />
              <div>
                <div className="text-sm text-ink-500">Сегодня</div>
                <div className="text-xl font-semibold text-ink-800">3 события</div>
              </div>
            </div>
          </div>
          <div className="sketch-card p-6">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-ink-700" />
              <div>
                <div className="text-sm text-ink-500">Специалисты</div>
                <div className="text-xl font-semibold text-ink-800">2 активных</div>
              </div>
            </div>
          </div>
          <div className="sketch-card p-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-ink-700" />
              <div>
                <div className="text-sm text-ink-500">Локации</div>
                <div className="text-xl font-semibold text-ink-800">5 мест</div>
              </div>
            </div>
          </div>
        </section>

        <section className="sketch-card p-6">
          <h2 className="text-2xl font-semibold text-ink-800 mb-4">
            Ближайшие события
          </h2>
          <div className="space-y-3">
            {events.length === 0 && (
              <div className="text-sm text-ink-600">
                Событий пока нет. Добавьте занятия или синхронизируйте календарь
                со специалистом.
              </div>
            )}
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
              >
                <div className="font-semibold text-ink-800">{event.title}</div>
                <div className="text-sm text-ink-600">
                  {new Date(event.startsAt).toLocaleString('ru-RU')}
                </div>
                <div className="text-xs text-ink-500">
                  {event.type}
                  {event.specialist?.username
                    ? ` · ${event.specialist.username}`
                    : ''}
                </div>
                <div className="text-xs text-ink-500 mt-1">Статус: {event.status}</div>
                {event.location && (
                  <div className="text-xs text-ink-500">{event.location}</div>
                )}
                {role && event.specialist?.id === userId && (
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
                )}
              </div>
            ))}
          </div>
        </section>

        {role && (role === 'TRAINER' || role === 'DOCTOR') && (
          <section className="sketch-card p-6">
            <h2 className="text-2xl font-semibold text-ink-800 mb-4">
              Запросы на занятия
            </h2>
            <div className="space-y-3">
              {events.filter((e) => e.status === 'REQUESTED').length === 0 && (
                <div className="text-sm text-ink-600">
                  Нет новых запросов.
                </div>
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
        )}

        <section className="sketch-card p-6 space-y-3">
          <h2 className="text-xl font-semibold text-ink-800">Импорт iCal</h2>
          <input
            className="sketch-input"
            type="file"
            accept=".ics"
            onChange={(e) => setImportFile(e.target.files?.[0] || null)}
          />
          <button
            className="sketch-button"
            onClick={async () => {
              if (!importFile) return
              const formData = new FormData()
              formData.append('file', importFile)
              const response = await fetch('/api/calendar/ics/import', {
                method: 'POST',
                body: formData,
              })
              if (!response.ok) {
                const data = await response.json().catch(() => ({}))
                setError(data.error || 'Не удалось импортировать')
                return
              }
              setImportFile(null)
            }}
          >
            Импортировать
          </button>
        </section>

        <section className="sketch-card p-6 space-y-3">
          <h2 className="text-xl font-semibold text-ink-800">
            Запросить занятие у специалиста
          </h2>
          <input
            className="sketch-input"
            placeholder="UUID специалиста"
            value={requestForm.specialistId}
            onChange={(e) =>
              setRequestForm({ ...requestForm, specialistId: e.target.value })
            }
          />
          <input
            className="sketch-input"
            placeholder="Название занятия"
            value={requestForm.title}
            onChange={(e) => setRequestForm({ ...requestForm, title: e.target.value })}
          />
          <input
            className="sketch-input"
            type="datetime-local"
            value={requestForm.startsAt}
            onChange={(e) =>
              setRequestForm({ ...requestForm, startsAt: e.target.value })
            }
          />
          <input
            className="sketch-input"
            type="datetime-local"
            value={requestForm.endsAt}
            onChange={(e) =>
              setRequestForm({ ...requestForm, endsAt: e.target.value })
            }
          />
          <button
            className="sketch-button"
            onClick={async () => {
              const response = await fetch('/api/calendar/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  specialistId: requestForm.specialistId,
                  title: requestForm.title,
                  startsAt: new Date(requestForm.startsAt).toISOString(),
                  endsAt: requestForm.endsAt
                    ? new Date(requestForm.endsAt).toISOString()
                    : undefined,
                }),
              })
              if (!response.ok) {
                const data = await response.json().catch(() => ({}))
                setError(data.error || 'Не удалось отправить запрос')
                return
              }
              const event = await response.json()
              setEvents((prev) => [...prev, event])
              setRequestForm({ specialistId: '', title: '', startsAt: '', endsAt: '' })
            }}
          >
            Отправить запрос
          </button>
        </section>
      </div>
    </div>
  )
}
