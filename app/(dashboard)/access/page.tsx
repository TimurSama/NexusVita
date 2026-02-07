'use client'

import { useEffect, useState } from 'react'
import { CreditCard, FileText, Shield, Wallet, Plus, Download, Upload } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { cn } from '@/lib/utils/cn'

const accessCards = [
  {
    title: 'Единая медкарта',
    description:
      'История анализов, диагнозов, назначений и телемедицинских консультаций.',
    actions: ['Открыть карту', 'Импорт из клиник', 'Экспорт PDF'],
    icon: FileText,
    color: 'warmBlue',
  },
  {
    title: 'Абонементы и пропуска',
    description:
      'QR-пропуск в клубы, бассейны, бани, студии и групповые классы.',
    actions: ['Добавить абонемент', 'Поделиться доступом', 'Проверить срок'],
    icon: CreditCard,
    color: 'warmGreen',
  },
  {
    title: 'Страхование и чек-апы',
    description:
      'Управление страховыми планами, годовые осмотры и напоминания.',
    actions: ['Подключить страхование', 'Запланировать чек-ап', 'История'],
    icon: Shield,
    color: 'warmPink',
  },
  {
    title: 'Доступ DAO',
    description:
      'NFT-пропуск, голосования и участники, подтвержденные токеном.',
    actions: ['Привязать кошелек', 'Получить пропуск', 'Войти в DAO'],
    icon: Wallet,
    color: 'warmRed',
  },
]

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
      const data = await fetch(`/api/access-passes?userId=${me.user.id}`).then((res) =>
        res.json()
      )
      setPasses(Array.isArray(data) ? data : [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-fadeIn">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800">
              Карты и пропуска
            </h1>
            <p className="text-base sm:text-lg text-warmGraphite-600 mt-2">
              Управление медицинской картой, абонементами, страховкой и доступом DAO.
            </p>
          </div>
          <NeumorphicButton primary>
            <Plus className="w-4 h-4 mr-2" />
            Добавить документ
          </NeumorphicButton>
        </header>

        <NeumorphicCard
          soft
          className="p-4 sm:p-6 bg-warmPink-50/50 border-2 border-warmPink-200/50 animate-fadeIn"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-warmPink-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-warmGraphite-700">
              ⚠️ Абонементы и пропуска в разработке. Сейчас отображается визуальная модель, а
              синхронизация с клубами и QR-доступом появится позже.
            </p>
          </div>
        </NeumorphicCard>

        {/* Карточки доступа */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {accessCards.map((card, index) => {
            const Icon = card.icon
            return (
              <NeumorphicCard
                key={card.title}
                className="p-4 sm:p-6 hover:scale-[1.02] transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 neumorphic-card-soft rounded-neumorphic-sm">
                    <Icon className="w-5 h-5 text-warmBlue-600" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
                    {card.title}
                  </h2>
                </div>
                <p className="text-sm text-warmGraphite-600 mb-4">{card.description}</p>
                <div className="flex flex-wrap gap-2">
                  {card.actions.map((action) => (
                    <NeumorphicButton key={action} className="text-xs sm:text-sm px-3 py-1.5">
                      {action}
                    </NeumorphicButton>
                  ))}
                </div>
              </NeumorphicCard>
            )
          })}
        </section>

        {/* Активные пропуска */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-4">
            Активные пропуска
          </h2>
          {loading ? (
            <div className="text-sm text-warmGray-600 text-center py-8">Загрузка...</div>
          ) : passes.length === 0 ? (
            <div className="text-sm text-warmGray-600 text-center py-8">
              Пропусков пока нет. Добавьте первый пропуск выше.
            </div>
          ) : (
            <div className="space-y-3">
              {passes.map((pass, index) => (
                <NeumorphicCard
                  key={pass.id}
                  soft
                  className="p-4 flex items-center justify-between hover:scale-[1.01] transition-transform animate-fadeIn"
                  style={{ animationDelay: `${0.7 + index * 0.05}s` }}
                >
                  <div>
                    <div className="font-semibold text-warmGraphite-800 text-sm sm:text-base">
                      {pass.providerName}
                    </div>
                    <div className="text-xs text-warmGray-600 mt-1">
                      {pass.expiresAt
                        ? `До ${new Date(pass.expiresAt).toLocaleDateString('ru-RU')}`
                        : 'Без срока'}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <NeumorphicBadge
                      variant={
                        pass.status === 'ACTIVE'
                          ? 'success'
                          : pass.status === 'PAUSED'
                            ? 'warning'
                            : 'error'
                      }
                      size="sm"
                    >
                      {pass.status === 'ACTIVE'
                        ? 'Активен'
                        : pass.status === 'PAUSED'
                          ? 'Приостановлен'
                          : 'Истек'}
                    </NeumorphicBadge>
                    <NeumorphicButton className="text-xs px-3 py-1">
                      <Download className="w-3 h-3" />
                    </NeumorphicButton>
                  </div>
                </NeumorphicCard>
              ))}
            </div>
          )}
        </NeumorphicCard>
      </div>
    </div>
  )
}
