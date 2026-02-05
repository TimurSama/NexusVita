'use client'

import { useEffect, useMemo, useState } from 'react'

type MedicalProfile = {
  bloodType?: string | null
  allergies?: string[]
  chronicConditions?: string[]
  emergencyContactName?: string | null
  emergencyContactPhone?: string | null
  medications?: Array<{ name: string; dose?: string; timing?: string }>
  vaccinations?: Array<{ name: string; date?: string }>
}

type User = {
  id: string
  role: string
}

const consents = [
  { name: 'Обмен данными с клиниками', status: 'Активно' },
  { name: 'Доступ AI к анализам', status: 'Активно' },
  { name: 'Публикация обезличенных данных', status: 'Приостановлено' },
]

export default function MedicalCardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<MedicalProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const me = await fetch('/api/auth/me').then((res) => res.json())
      if (!me?.user) {
        setUser(null)
        setLoading(false)
        return
      }
      setUser(me.user)
      const data = await fetch(`/api/medical-profile?userId=${me.user.id}`).then(
        (res) => res.json()
      )
      setProfile(data || null)
      setLoading(false)
    }
    load()
  }, [])

  const summary = useMemo(
    () => [
      { label: 'Группа крови', value: profile?.bloodType || '—' },
      {
        label: 'Аллергии',
        value: profile?.allergies?.length
          ? profile.allergies.join(', ')
          : '—',
      },
      {
        label: 'Хронические',
        value: profile?.chronicConditions?.length
          ? profile.chronicConditions.join(', ')
          : '—',
      },
      {
        label: 'Экстренный контакт',
        value:
          profile?.emergencyContactName || profile?.emergencyContactPhone
            ? `${profile?.emergencyContactName || 'Контакт'} · ${
                profile?.emergencyContactPhone || '—'
              }`
            : '—',
      },
    ],
    [profile]
  )

  const medications = profile?.medications ?? []
  const vaccinations = profile?.vaccinations ?? []

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-ink-800">Единая медкарта</h1>
            <p className="text-ink-600">
              История анализов, диагнозов, визитов и персональных протоколов.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="sketch-button">Добавить запись</button>
            <a
              href="/imports"
              className="px-5 py-2.5 rounded-lg border-2 border-ink-300 text-ink-700 hover:bg-parchment-200"
            >
              Импорт данных
            </a>
            <button className="px-5 py-2.5 rounded-lg border-2 border-ink-300 text-ink-700 hover:bg-parchment-200">
              Экспорт PDF
            </button>
          </div>
        </header>

        <div className="sketch-card p-4 text-sm text-ink-700">
          ⚠️ Функции медкарты находятся в разработке. Сейчас это визуальный
          прототип: данные, экспорт и интеграции будут подключены позже.
        </div>

        {!user && !loading && (
          <div className="sketch-card p-4 text-sm text-ink-700">
            Войдите в аккаунт, чтобы увидеть персональную медкарту.
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summary.map((item) => (
            <div key={item.label} className="sketch-card p-4">
              <div className="text-xs uppercase tracking-widest text-ink-500">
                {item.label}
              </div>
              <div className="text-lg font-semibold text-ink-800 mt-2">
                {item.value}
              </div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.3fr,1fr] gap-6">
          <div className="sketch-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-ink-800">История записей</h2>
              <button className="ink-link text-sm">Фильтры</button>
            </div>
            <div className="space-y-3 text-sm text-ink-600">
              Пока нет синхронизированных записей. История визитов и анализов
              будет отображаться после подключения клиник и лабораторий.
            </div>
          </div>

          <div className="space-y-6">
            <div className="sketch-card p-6">
              <h3 className="text-xl font-semibold text-ink-800 mb-3">
                Текущие назначения
              </h3>
              {medications.length === 0 ? (
                <div className="text-sm text-ink-600">
                  Назначения появятся после подключения данных врача.
                </div>
              ) : (
                <div className="space-y-3 text-sm text-ink-700">
                  {medications.map((med) => (
                    <div
                      key={med.name}
                      className="flex items-center justify-between p-3 rounded-lg border border-ink-200 bg-parchment-100"
                    >
                      <div>
                        <div className="font-semibold text-ink-800">{med.name}</div>
                        <div className="text-xs text-ink-500">
                          {med.timing || '—'}
                        </div>
                      </div>
                      <span className="text-xs text-ink-700">{med.dose || '—'}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="sketch-card p-6">
              <h3 className="text-xl font-semibold text-ink-800 mb-3">Вакцинации</h3>
              {vaccinations.length === 0 ? (
                <div className="text-sm text-ink-600">
                  Список появится после загрузки данных.
                </div>
              ) : (
                <div className="space-y-3 text-sm text-ink-700">
                  {vaccinations.map((vac) => (
                    <div
                      key={vac.name}
                      className="flex items-center justify-between p-3 rounded-lg border border-ink-200 bg-parchment-100"
                    >
                      <span>{vac.name}</span>
                      <span className="text-xs text-ink-500">{vac.date || '—'}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="sketch-card p-6">
          <h2 className="text-2xl font-semibold text-ink-800 mb-4">
            Согласия и доступы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-ink-700">
            {consents.map((consent) => (
              <div
                key={consent.name}
                className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
              >
                <div className="font-semibold text-ink-800">{consent.name}</div>
                <div className="text-xs text-ink-500 mt-1">
                  Статус: {consent.status}
                </div>
                <button className="mt-3 text-xs ink-link">Изменить</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
