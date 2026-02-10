'use client'

import { useEffect, useState } from 'react'
import { Calendar as CalendarIcon, Users, MapPin, Download, Upload, Clock, CheckCircle, XCircle, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import NeumorphicCalendar from '@/components/ui/NeumorphicCalendar'
import NeumorphicTabs from '@/components/ui/NeumorphicTabs'
import { generateMockEvents } from '@/lib/mocks/data-generators'
import { cn } from '@/lib/utils/cn'

type EventItem = {
  id: string
  title: string
  type: string
  startsAt: string
  endsAt?: string | null
  location?: string | null
  status?: string | null
  specialist?: {
    username?: string | null
    role?: string | null
    id?: string | null
  } | null
}

const eventTypeColors: Record<string, string> = {
  CONSULTATION: 'warmBlue',
  TRAINING: 'warmRed',
  NUTRITION: 'warmGreen',
  ANALYSIS: 'warmPink',
  PERSONAL: 'warmGray',
  REMINDER: 'warmGraphite',
}

export default function CalendarPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [mockEvents, setMockEvents] = useState(generateMockEvents(20))
  const [userId, setUserId] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [importFile, setImportFile] = useState<File | null>(null)
  const [view, setView] = useState<'calendar' | 'list'>('calendar')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [requestForm, setRequestForm] = useState({
    specialistId: '',
    title: '',
    startsAt: '',
    endsAt: '',
  })

  useEffect(() => {
    const load = async () => {
      try {
        const me = await fetch('/api/auth/me').then((res) => res.json())
        if (!me?.user?.id) {
          // Используем моки для демо
          setEvents(
            mockEvents.map((e) => ({
              id: e.id,
              title: e.title,
              type: e.type.toUpperCase(),
              startsAt: e.date.toISOString(),
              endsAt: e.duration ? new Date(e.date.getTime() + e.duration * 60000).toISOString() : null,
              location: null,
              status: 'CONFIRMED',
              specialist: null,
            }))
          )
          return
        }
        setUserId(me.user.id)
        setRole(me.user.role)
        const query =
          me.user.role === 'TRAINER' || me.user.role === 'DOCTOR'
            ? `/api/calendar/events?specialistId=${me.user.id}`
            : `/api/calendar/events?userId=${me.user.id}`
        const data = await fetch(query).then((res) => res.json())
        setEvents(Array.isArray(data) && data.length > 0 ? data : mockEvents.map((e) => ({
          id: e.id,
          title: e.title,
          type: e.type.toUpperCase(),
          startsAt: e.date.toISOString(),
          endsAt: e.duration ? new Date(e.date.getTime() + e.duration * 60000).toISOString() : null,
          location: null,
          status: 'CONFIRMED',
          specialist: null,
        })))
      } catch (err) {
        // Используем моки при ошибке
        setEvents(
          mockEvents.map((e) => ({
            id: e.id,
            title: e.title,
            type: e.type.toUpperCase(),
            startsAt: e.date.toISOString(),
            endsAt: e.duration ? new Date(e.date.getTime() + e.duration * 60000).toISOString() : null,
            location: null,
            status: 'CONFIRMED',
            specialist: null,
          }))
        )
      }
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
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-fadeIn">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800">Календарь</h1>
            <p className="text-base sm:text-lg text-warmGraphite-600 mt-2">
              Синхронизация занятий с тренерами, специалистами и группами.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {userId && (
              <a
                href={`/api/calendar/ics?userId=${userId}`}
                className="neumorphic-button text-sm px-4 py-2"
              >
                <Download className="w-4 h-4 mr-2" />
                Экспорт iCal
              </a>
            )}
            <NeumorphicButton primary>Запланировать</NeumorphicButton>
          </div>
        </header>

        {error && (
          <NeumorphicCard className="p-4 bg-warmRed-50 border-2 border-warmRed-200 animate-shake">
            <p className="text-sm text-warmRed-700">{error}</p>
          </NeumorphicCard>
        )}

        {/* Статистика */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3">
              <div className="p-3 neumorphic-card-soft rounded-neumorphic-sm">
                <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-warmBlue-600" />
              </div>
              <div>
                <div className="text-xs sm:text-sm text-warmGray-600">Сегодня</div>
                <div className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
                  {events.filter((e) => {
                    const today = new Date().toDateString()
                    return new Date(e.startsAt).toDateString() === today
                  }).length}{' '}
                  событий
                </div>
              </div>
            </div>
          </NeumorphicCard>
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3">
              <div className="p-3 neumorphic-card-soft rounded-neumorphic-sm">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-warmGreen-600" />
              </div>
              <div>
                <div className="text-xs sm:text-sm text-warmGray-600">Специалисты</div>
                <div className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
                  {new Set(events.map((e) => e.specialist?.id).filter(Boolean)).size} активных
                </div>
              </div>
            </div>
          </NeumorphicCard>
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3">
              <div className="p-3 neumorphic-card-soft rounded-neumorphic-sm">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-warmPink-600" />
              </div>
              <div>
                <div className="text-xs sm:text-sm text-warmGray-600">Локации</div>
                <div className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
                  {new Set(events.map((e) => e.location).filter(Boolean)).size} мест
                </div>
              </div>
            </div>
          </NeumorphicCard>
        </section>

        {/* Календарь и события */}
        <NeumorphicTabs
          tabs={[
            {
              id: 'calendar',
              label: 'Календарь',
              icon: <CalendarIcon className="w-4 h-4" />,
              content: (
                <div className="mt-4">
                  <NeumorphicCalendar
                    events={events.map((e) => ({
                      id: e.id,
                      date: new Date(e.startsAt),
                      title: e.title,
                      type: e.type.toLowerCase() as any,
                    }))}
                    onDateClick={(date) => {
                      setSelectedDate(date)
                      setView('list')
                    }}
                    onEventClick={(event) => {
                      const fullEvent = events.find((e) => e.id === event.id)
                      if (fullEvent) {
                        // Можно открыть модальное окно с деталями
                      }
                    }}
                    view="month"
                  />
                </div>
              ),
            },
            {
              id: 'list',
              label: 'Список',
              icon: <Clock className="w-4 h-4" />,
              content: (
                <div className="mt-4">
                  <NeumorphicCard className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
                        {selectedDate
                          ? `События на ${selectedDate.toLocaleDateString('ru-RU')}`
                          : 'Ближайшие события'}
                      </h2>
                      {selectedDate && (
                        <NeumorphicButton onClick={() => setSelectedDate(null)} className="text-xs">
                          Показать все
                        </NeumorphicButton>
                      )}
                    </div>
                    <div className="space-y-3">
            {events.length === 0 && (
              <div className="text-sm text-warmGray-600 text-center py-8">
                Событий пока нет. Добавьте занятия или синхронизируйте календарь со
                специалистом.
              </div>
            )}
                      {events
                        .filter((e) => {
                          if (!selectedDate) return true
                          const eventDate = new Date(e.startsAt)
                          return (
                            eventDate.getDate() === selectedDate.getDate() &&
                            eventDate.getMonth() === selectedDate.getMonth() &&
                            eventDate.getFullYear() === selectedDate.getFullYear()
                          )
                        })
                        .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
                        .map((event, index) => {
                          const typeColor = eventTypeColors[event.type] || 'warmGray'
                          return (
                            <motion.div
                              key={event.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <NeumorphicCard
                                soft
                                className="p-4 hover:scale-[1.01] transition-all duration-300"
                              >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-warmGraphite-800 text-base sm:text-lg">
                          {event.title}
                        </h3>
                        <NeumorphicBadge
                          variant={typeColor as any}
                          size="sm"
                          className="text-xs"
                        >
                          {event.type}
                        </NeumorphicBadge>
                      </div>
                      <div className="flex items-center gap-4 text-xs sm:text-sm text-warmGray-600 mb-1">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(event.startsAt).toLocaleString('ru-RU', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                        {event.specialist?.username && (
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {event.specialist.username}
                          </div>
                        )}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1 text-xs text-warmGray-600 mt-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                      )}
                      {event.status && (
                        <NeumorphicBadge
                          variant={
                            event.status === 'CONFIRMED'
                              ? 'success'
                              : event.status === 'DECLINED'
                                ? 'error'
                                : 'warning'
                          }
                          size="sm"
                          className="mt-2"
                        >
                          {event.status}
                        </NeumorphicBadge>
                      )}
                    </div>
                  </div>
                  {role && event.specialist?.id === userId && (
                    <div className="mt-3 flex items-center gap-2 pt-3 border-t border-warmGray-300/50">
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
                            )}
                          </NeumorphicCard>
                            </motion.div>
                          )
                        })}
                    </div>
                  </NeumorphicCard>
                </div>
              ),
            },
          ]}
          defaultTab={view === 'calendar' ? 'calendar' : 'list'}
          onTabChange={(tabId) => setView(tabId === 'calendar' ? 'calendar' : 'list')}
        />

        {/* Запросы на занятия (для специалистов) */}
        {role && (role === 'TRAINER' || role === 'DOCTOR') && (
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
              Запросы на занятия
            </h2>
            <div className="space-y-3">
              {events.filter((e) => e.status === 'REQUESTED').length === 0 && (
                <div className="text-sm text-warmGray-600 text-center py-8">
                  Нет новых запросов.
                </div>
              )}
              {events
                .filter((e) => e.status === 'REQUESTED')
                .map((event, index) => (
                  <NeumorphicCard
                    key={event.id}
                    soft
                    className="p-4 hover:scale-[1.01] transition-all duration-300 animate-fadeIn"
                    style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                  >
                    <div className="font-semibold text-warmGraphite-800 mb-1">{event.title}</div>
                    <div className="text-sm text-warmGraphite-600 mb-3">
                      {new Date(event.startsAt).toLocaleString('ru-RU')}
                    </div>
                    <div className="flex items-center gap-2">
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
        )}

        {/* Импорт iCal */}
        <NeumorphicCard className="p-4 sm:p-6 space-y-3 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
          <h2 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">Импорт iCal</h2>
          <input
            type="file"
            accept=".ics"
            onChange={(e) => setImportFile(e.target.files?.[0] || null)}
            className="neumorphic-input w-full"
          />
          <NeumorphicButton
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
            disabled={!importFile}
            className="w-full sm:w-auto"
          >
            <Upload className="w-4 h-4 mr-2" />
            Импортировать
          </NeumorphicButton>
        </NeumorphicCard>

        {/* Запрос занятия */}
        <NeumorphicCard className="p-4 sm:p-6 space-y-3 animate-fadeIn" style={{ animationDelay: '0.9s' }}>
          <h2 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
            Запросить занятие у специалиста
          </h2>
          <NeumorphicInput
            placeholder="UUID специалиста"
            value={requestForm.specialistId}
            onChange={(e) =>
              setRequestForm({ ...requestForm, specialistId: e.target.value })
            }
          />
          <NeumorphicInput
            placeholder="Название занятия"
            value={requestForm.title}
            onChange={(e) => setRequestForm({ ...requestForm, title: e.target.value })}
          />
          <NeumorphicInput
            type="datetime-local"
            placeholder="Начало"
            value={requestForm.startsAt}
            onChange={(e) => setRequestForm({ ...requestForm, startsAt: e.target.value })}
          />
          <NeumorphicInput
            type="datetime-local"
            placeholder="Конец"
            value={requestForm.endsAt}
            onChange={(e) => setRequestForm({ ...requestForm, endsAt: e.target.value })}
          />
          <NeumorphicButton
            primary
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
            disabled={
              !requestForm.specialistId || !requestForm.title || !requestForm.startsAt
            }
            className="w-full sm:w-auto"
          >
            Отправить запрос
          </NeumorphicButton>
        </NeumorphicCard>
      </div>
    </div>
  )
}
