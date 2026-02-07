'use client'

import { useEffect, useMemo, useState } from 'react'
import { FileText, Download, Upload, Shield, Pill, Syringe, Plus } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import Link from 'next/link'

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
      const data = await fetch(`/api/medical-profile?userId=${me.user.id}`).then((res) =>
        res.json()
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
        value: profile?.allergies?.length ? profile.allergies.join(', ') : '—',
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
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-fadeIn">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800">
              Единая медкарта
            </h1>
            <p className="text-base sm:text-lg text-warmGraphite-600 mt-2">
              История анализов, диагнозов, визитов и персональных протоколов.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <NeumorphicButton primary>
              <Plus className="w-4 h-4 mr-2" />
              Добавить запись
            </NeumorphicButton>
            <Link href="/imports">
              <NeumorphicButton>
                <Upload className="w-4 h-4 mr-2" />
                Импорт данных
              </NeumorphicButton>
            </Link>
            <NeumorphicButton>
              <Download className="w-4 h-4 mr-2" />
              Экспорт PDF
            </NeumorphicButton>
          </div>
        </header>

        {/* Краткая сводка */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summary.map((item, index) => (
            <NeumorphicCard
              key={item.label}
              className="p-4 sm:p-6 animate-fadeIn"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="text-xs uppercase tracking-widest text-warmGray-600 mb-2">
                {item.label}
              </div>
              <div className="text-base sm:text-lg font-semibold text-warmGraphite-800">
                {item.value}
              </div>
            </NeumorphicCard>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-4 sm:gap-6">
          {/* Лекарства */}
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-2 mb-4">
              <Pill className="w-5 h-5 text-warmBlue-600" />
              <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
                Лекарства
              </h2>
            </div>
            {medications.length === 0 ? (
              <div className="text-sm text-warmGray-600 text-center py-8">
                Лекарств пока нет. Добавьте первое лекарство.
              </div>
            ) : (
              <div className="space-y-3">
                {medications.map((med, index) => (
                  <NeumorphicCard
                    key={index}
                    soft
                    className="p-3 hover:scale-[1.01] transition-transform animate-fadeIn"
                    style={{ animationDelay: `${0.6 + index * 0.05}s` }}
                  >
                    <div className="font-semibold text-warmGraphite-800 text-sm sm:text-base">
                      {med.name}
                    </div>
                    <div className="text-xs text-warmGray-600 mt-1">
                      {med.dose && `Доза: ${med.dose}`}
                      {med.timing && ` · ${med.timing}`}
                    </div>
                  </NeumorphicCard>
                ))}
              </div>
            )}
          </NeumorphicCard>

          {/* Вакцинации */}
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
            <div className="flex items-center gap-2 mb-4">
              <Syringe className="w-5 h-5 text-warmGreen-600" />
              <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
                Вакцинации
              </h2>
            </div>
            {vaccinations.length === 0 ? (
              <div className="text-sm text-warmGray-600 text-center py-8">
                Вакцинаций пока нет. Добавьте первую вакцинацию.
              </div>
            ) : (
              <div className="space-y-3">
                {vaccinations.map((vac, index) => (
                  <NeumorphicCard
                    key={index}
                    soft
                    className="p-3 hover:scale-[1.01] transition-transform animate-fadeIn"
                    style={{ animationDelay: `${0.8 + index * 0.05}s` }}
                  >
                    <div className="font-semibold text-warmGraphite-800 text-sm sm:text-base">
                      {vac.name}
                    </div>
                    {vac.date && (
                      <div className="text-xs text-warmGray-600 mt-1">
                        {new Date(vac.date).toLocaleDateString('ru-RU')}
                      </div>
                    )}
                  </NeumorphicCard>
                ))}
              </div>
            )}
          </NeumorphicCard>
        </section>

        {/* Согласия */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.9s' }}>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-warmPink-600" />
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
              Согласия и доступы
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {consents.map((consent, index) => (
              <NeumorphicCard
                key={consent.name}
                soft
                className="p-4 hover:scale-[1.01] transition-transform animate-fadeIn"
                style={{ animationDelay: `${1 + index * 0.1}s` }}
              >
                <div className="font-semibold text-warmGraphite-800 text-sm sm:text-base mb-1">
                  {consent.name}
                </div>
                <NeumorphicBadge
                  variant={consent.status === 'Активно' ? 'success' : 'warning'}
                  size="sm"
                  className="mt-2"
                >
                  {consent.status}
                </NeumorphicBadge>
              </NeumorphicCard>
            ))}
          </div>
        </NeumorphicCard>
      </div>
    </div>
  )
}
