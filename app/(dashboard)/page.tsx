'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import VitruvianMan from '@/components/vitruvian/VitruvianMan'
import MetricLabel from '@/components/dashboard/MetricLabel'
import { DashboardMetric } from '@/types'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { cn } from '@/lib/utils/cn'

// Моковые данные - в реальном приложении будут загружаться из API
const mockMetrics: DashboardMetric[] = [
  {
    id: 'health',
    label: 'Здоровье',
    value: 'Сон 7ч 10м',
    unit: 'пульс 62',
    link: '/medical-card',
    position: { x: 50, y: 20 }, // Верх
  },
  {
    id: 'sport',
    label: 'Спорт',
    value: 'Тренировка',
    unit: 'силовая 40м',
    link: '/training',
    position: { x: 15, y: 50 }, // Лево
  },
  {
    id: 'nutrition',
    label: 'Питание',
    value: '1,840',
    unit: 'ккал на день',
    link: '/nutrition',
    position: { x: 85, y: 50 }, // Право
  },
  {
    id: 'psyche',
    label: 'Психика',
    value: 'Стресс',
    unit: 'умеренный',
    link: '/journal',
    position: { x: 50, y: 80 }, // Низ
  },
  {
    id: 'social',
    label: 'Социальное',
    value: 'Группы',
    unit: '2 занятия',
    link: '/social',
    position: { x: 50, y: 5 }, // Над головой
  },
]

const dailyModules = [
  {
    title: 'Здоровье',
    metric: 'Пульс 62 · Сон 7ч 10м',
    plan: 'Чек-ап крови, 10:30',
    link: '/medical-card',
  },
  {
    title: 'Спорт',
    metric: 'Силовая 40м · растяжка 10м',
    plan: 'Тренировка в 18:00',
    link: '/training',
  },
  {
    title: 'Питание',
    metric: '1 840/2 100 ккал',
    plan: 'Добавить белок в ужин',
    link: '/nutrition',
  },
  {
    title: 'Психика',
    metric: 'Стресс умеренный',
    plan: 'Дыхательная практика 10 мин',
    link: '/journal',
  },
  {
    title: 'Социальное',
    metric: '2 групповых занятия',
    plan: 'Йога в субботу 09:00',
    link: '/social',
  },
]

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([])
  const [dailyPlan, setDailyPlan] = useState<
    Array<{ title: string; detail: string }>
  >([])

  useEffect(() => {
    // В реальном приложении здесь будет загрузка данных из API
    setMetrics(mockMetrics)
    const loadPlan = async () => {
      const response = await fetch('/api/ai-agent/plan')
      if (!response.ok) return
      const data = await response.json().catch(() => null)
      if (data?.items?.length) {
        setDailyPlan(data.items)
      }
    }
    loadPlan()
  }, [])

  return (
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 sm:mb-12 animate-fadeIn">
          <NeumorphicBadge variant="info" className="mb-4">
            ✦ Личный хаб здоровья и DAO-профиль
          </NeumorphicBadge>
          <h1 className="text-4xl sm:text-5xl font-bold text-warmGraphite-800 mt-4 mb-3">
            Витрувианский профиль
          </h1>
          <p className="text-lg sm:text-xl text-warmGraphite-600">
            Визуализация метрик, целей и сервисов экосистемы
          </p>
        </header>

        {/* Центральная область с Витрувианским человеком */}
        <NeumorphicCard className="relative flex items-center justify-center min-h-[500px] sm:min-h-[640px] p-8 sm:p-12 mb-8 sm:mb-10 animate-scaleIn">
          <div className="absolute inset-10 border-2 border-dashed border-warmGray-300/50 rounded-full opacity-50" />
          <div className="absolute inset-24 border border-warmGray-300/30 rounded-full opacity-30" />

          {/* Витрувианский человек */}
          <div className="relative z-10">
            <VitruvianMan width={400} height={400} className="sm:w-[500px] sm:h-[500px]" />
          </div>

          {/* Интерактивные метки */}
          {metrics.map((metric, index) => (
            <MetricLabel
              key={metric.id}
              label={metric.label}
              value={metric.value}
              unit={metric.unit}
              link={metric.link}
              position={metric.position}
              delay={index * 0.1}
            />
          ))}
        </NeumorphicCard>

        {/* Краткий план на день по сегментам */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {(dailyPlan.length ? dailyPlan : dailyModules).map((module, index) => (
            <NeumorphicCard
              key={module.title}
              className={cn(
                'p-4 sm:p-6 hover:scale-[1.02] transition-all duration-300',
                'animate-fadeIn'
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-xs uppercase tracking-widest text-warmGray-600 font-semibold">
                {module.title}
              </div>
              <div className="text-base sm:text-lg font-semibold text-warmGraphite-800 mt-2">
                {'metric' in module ? module.metric : module.detail}
              </div>
              {'plan' in module ? (
                <>
                  <div className="text-sm text-warmGraphite-600 mt-1">{module.plan}</div>
                  <Link
                    href={module.link}
                    className="text-sm text-warmBlue-600 hover:text-warmBlue-700 mt-3 inline-block font-medium transition-colors"
                  >
                    Открыть модуль →
                  </Link>
                </>
              ) : (
                <div className="text-sm text-warmGraphite-600 mt-1">AI план на день</div>
              )}
            </NeumorphicCard>
          ))}
        </section>

        {/* Быстрые действия */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <QuickActionCard
            title="Добавить замер"
            description="Зафиксируйте текущие параметры тела"
            link="/metrics/add"
            icon="📏"
            delay={0}
          />
          <QuickActionCard
            title="Новая тренировка"
            description="Начните тренировку по программе"
            link="/training/start"
            icon="💪"
            delay={0.1}
          />
          <QuickActionCard
            title="Записать питание"
            description="Внесите данные о приеме пищи"
            link="/nutrition/add"
            icon="🍎"
            delay={0.2}
          />
        </div>

        <section className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-4 sm:gap-6">
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
                Инсайты и рекомендации
              </h2>
              <Link
                href="/ecosystem"
                className="text-sm text-warmBlue-600 hover:text-warmBlue-700 font-medium transition-colors"
              >
                AI Health+
              </Link>
            </div>
            <div className="space-y-3 text-sm text-warmGraphite-700">
              <NeumorphicCard
                soft
                className="p-4 hover:scale-[1.01] transition-transform"
              >
                Сон ниже нормы 3 дня подряд. Рекомендуется сдвинуть время отбоя
                на 30 минут и снизить кофеин после 16:00.
              </NeumorphicCard>
              <NeumorphicCard
                soft
                className="p-4 hover:scale-[1.01] transition-transform"
              >
                Уровень стресса повышен. Запланируйте дыхательную практику на 10
                минут и прогулку 2 км.
              </NeumorphicCard>
              <NeumorphicCard
                soft
                className="p-4 hover:scale-[1.01] transition-transform bg-warmPink-50/50"
              >
                <span className="font-semibold text-warmPink-700">Скидка -20%</span> для ранних пользователей на подписку
                AI Health+ и консультации специалистов.
              </NeumorphicCard>
            </div>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6 space-y-4 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
              Расписание и события
            </h2>
            <div className="space-y-3 text-sm text-warmGraphite-700">
              <NeumorphicCard
                soft
                className="p-3 flex items-center justify-between hover:scale-[1.01] transition-transform"
              >
                <div>
                  <div className="font-semibold text-warmGraphite-800">
                    Чек-ап крови
                  </div>
                  <div className="text-xs text-warmGray-600">Пт, 10:30</div>
                </div>
                <button className="text-xs text-warmBlue-600 hover:text-warmBlue-700 font-medium transition-colors">
                  Перенести
                </button>
              </NeumorphicCard>
              <NeumorphicCard
                soft
                className="p-3 flex items-center justify-between hover:scale-[1.01] transition-transform"
              >
                <div>
                  <div className="font-semibold text-warmGraphite-800">
                    Групповая йога
                  </div>
                  <div className="text-xs text-warmGray-600">Сб, 09:00</div>
                </div>
                <button className="text-xs text-warmBlue-600 hover:text-warmBlue-700 font-medium transition-colors">
                  Открыть
                </button>
              </NeumorphicCard>
              <NeumorphicCard
                soft
                className="p-3 flex items-center justify-between hover:scale-[1.01] transition-transform"
              >
                <div>
                  <div className="font-semibold text-warmGraphite-800">
                    Сессия с психологом
                  </div>
                  <div className="text-xs text-warmGray-600">Вс, 19:00</div>
                </div>
                <button className="text-xs text-warmBlue-600 hover:text-warmBlue-700 font-medium transition-colors">
                  Видеосвязь
                </button>
              </NeumorphicCard>
            </div>
          </NeumorphicCard>
        </section>

        <section className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-3">
              Команда здоровья
            </h3>
            <div className="space-y-3 text-sm text-warmGraphite-700">
              <NeumorphicCard soft className="p-3 hover:scale-[1.01] transition-transform">
                <div className="font-medium text-warmGraphite-800">
                  Доктор Левицкая · эндокринолог
                </div>
                <div className="text-xs text-warmGray-600 mt-1">Следующая встреча: 12.02</div>
              </NeumorphicCard>
              <NeumorphicCard soft className="p-3 hover:scale-[1.01] transition-transform">
                <div className="font-medium text-warmGraphite-800">
                  Мария Грин · нутрициолог
                </div>
                <div className="text-xs text-warmGray-600 mt-1">План питания обновлен</div>
              </NeumorphicCard>
              <NeumorphicCard soft className="p-3 hover:scale-[1.01] transition-transform">
                <div className="font-medium text-warmGraphite-800">
                  Алексей Т. · тренер
                </div>
                <div className="text-xs text-warmGray-600 mt-1">Новая программа</div>
              </NeumorphicCard>
            </div>
            <div className="mt-4">
              <Link
                href="/specialists"
                className="text-sm text-warmBlue-600 hover:text-warmBlue-700 font-medium transition-colors"
              >
                Смотреть всех специалистов →
              </Link>
            </div>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-3">
              Библиотека протоколов
            </h3>
            <div className="space-y-3 text-sm text-warmGraphite-700">
              <NeumorphicCard soft className="p-3 hover:scale-[1.01] transition-transform">
                Протокол восстановления после травмы колена
              </NeumorphicCard>
              <NeumorphicCard soft className="p-3 hover:scale-[1.01] transition-transform">
                План нормализации сна и циркадных ритмов
              </NeumorphicCard>
              <NeumorphicCard soft className="p-3 hover:scale-[1.01] transition-transform">
                Гайд по микронутриентам для спортсменов
              </NeumorphicCard>
            </div>
            <div className="mt-4">
              <Link
                href="/ecosystem"
                className="text-sm text-warmBlue-600 hover:text-warmBlue-700 font-medium transition-colors"
              >
                Подключить AI Health+ →
              </Link>
            </div>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-3">
              DAO активность
            </h3>
            <div className="space-y-3 text-sm text-warmGraphite-700">
              <NeumorphicCard soft className="p-3 hover:scale-[1.01] transition-transform">
                Голосование: гранты на исследования микробиома
              </NeumorphicCard>
              <NeumorphicCard soft className="p-3 hover:scale-[1.01] transition-transform">
                Уровень участия: 4/7 голосований
              </NeumorphicCard>
              <NeumorphicCard soft className="p-3 hover:scale-[1.01] transition-transform bg-warmBlue-50/50">
                <span className="font-semibold text-warmBlue-700">Баланс NVT: 12 400</span> · доступ к премиум исследованию
              </NeumorphicCard>
            </div>
            <div className="mt-4">
              <Link
                href="/dao"
                className="text-sm text-warmBlue-600 hover:text-warmBlue-700 font-medium transition-colors"
              >
                Перейти в DAO кабинет →
              </Link>
            </div>
          </NeumorphicCard>
        </section>

        <section className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-[1.3fr,1fr] gap-4 sm:gap-6">
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
              Настройка и персонализация
            </h2>
            <div className="space-y-3 text-sm text-warmGraphite-700">
              <NeumorphicCard soft className="p-3 hover:scale-[1.01] transition-transform cursor-pointer">
                Подключить устройства и интеграции
              </NeumorphicCard>
              <NeumorphicCard soft className="p-3 hover:scale-[1.01] transition-transform cursor-pointer">
                Настроить цели и награды
              </NeumorphicCard>
              <NeumorphicCard soft className="p-3 hover:scale-[1.01] transition-transform cursor-pointer">
                Выбрать специалистов и расписание
              </NeumorphicCard>
              <NeumorphicCard soft className="p-3 hover:scale-[1.01] transition-transform cursor-pointer">
                Личный дневник и планирование дня
              </NeumorphicCard>
            </div>
            <div className="mt-4">
              <Link
                href="/profile"
                className="text-sm text-warmBlue-600 hover:text-warmBlue-700 font-medium transition-colors"
              >
                Перейти в профиль →
              </Link>
            </div>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
              Инструменты и функции
            </h2>
            <div className="space-y-3 text-sm text-warmGraphite-700">
              <NeumorphicCard soft className="p-3 hover:scale-[1.01] transition-transform cursor-pointer">
                AI агент и персональные планы
              </NeumorphicCard>
              <NeumorphicCard soft className="p-3 hover:scale-[1.01] transition-transform cursor-pointer">
                Маркетплейс абонементов и услуг
              </NeumorphicCard>
              <NeumorphicCard soft className="p-3 hover:scale-[1.01] transition-transform cursor-pointer">
                DAO голосования и гранты
              </NeumorphicCard>
            </div>
          </NeumorphicCard>
        </section>
      </div>
    </div>
  )
}

function QuickActionCard({
  title,
  description,
  link,
  icon,
  delay = 0,
}: {
  title: string
  description: string
  link: string
  icon: string
  delay?: number
}) {
  return (
    <Link
      href={link}
      className="block neumorphic-card p-4 sm:p-6 hover:scale-[1.02] transition-all duration-300 animate-fadeIn group"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-warmGraphite-800 mb-2">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-warmGraphite-600">{description}</p>
    </Link>
  )
}


