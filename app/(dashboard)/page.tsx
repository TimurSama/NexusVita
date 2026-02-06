'use client'

import { useState, useEffect } from 'react'
import VitruvianMan from '@/components/vitruvian/VitruvianMan'
import MetricLabel from '@/components/dashboard/MetricLabel'
import { DashboardMetric } from '@/types'

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
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-ink-300 bg-parchment-100 text-sm text-ink-600">
            ✦ Личный хаб здоровья и DAO-профиль
          </div>
          <h1 className="text-5xl font-bold text-ink-800 mt-4 mb-3">
            Витрувианский профиль
          </h1>
          <p className="text-xl text-ink-600">
            Визуализация метрик, целей и сервисов экосистемы
          </p>
        </header>

        {/* Центральная область с Витрувианским человеком */}
        <div className="relative flex items-center justify-center min-h-[640px] bg-parchment-100/50 rounded-2xl border-2 border-ink-200 shadow-2xl p-12">
          <div className="absolute inset-10 border-2 border-dashed border-ink-200 rounded-full" />
          <div className="absolute inset-24 border border-ink-200 rounded-full" />

          {/* Витрувианский человек */}
          <div className="relative z-10">
            <VitruvianMan width={500} height={500} />
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
        </div>

        {/* Краткий план на день по сегментам */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(dailyPlan.length ? dailyPlan : dailyModules).map((module) => (
            <div key={module.title} className="sketch-card p-6">
              <div className="text-xs uppercase tracking-widest text-ink-500">
                {module.title}
              </div>
              <div className="text-lg font-semibold text-ink-800 mt-2">
                {'metric' in module ? module.metric : module.detail}
              </div>
              {'plan' in module ? (
                <>
                  <div className="text-sm text-ink-600 mt-1">{module.plan}</div>
                  <a className="ink-link text-sm mt-3 inline-block" href={module.link}>
                    Открыть модуль
                  </a>
                </>
              ) : (
                <div className="text-sm text-ink-600 mt-1">AI план на день</div>
              )}
            </div>
          ))}
        </section>

        {/* Быстрые действия */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickActionCard
            title="Добавить замер"
            description="Зафиксируйте текущие параметры тела"
            link="/metrics/add"
            icon="📏"
          />
          <QuickActionCard
            title="Новая тренировка"
            description="Начните тренировку по программе"
            link="/training/start"
            icon="💪"
          />
          <QuickActionCard
            title="Записать питание"
            description="Внесите данные о приеме пищи"
            link="/nutrition/add"
            icon="🍎"
          />
        </div>

        <section className="mt-12 grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-6">
          <div className="sketch-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-ink-800">
                Инсайты и рекомендации
              </h2>
              <a className="ink-link text-sm" href="/ecosystem">
                AI Health+
              </a>
            </div>
            <div className="space-y-3 text-sm text-ink-700">
              <div className="p-4 rounded-lg border border-ink-200 bg-parchment-100">
                Сон ниже нормы 3 дня подряд. Рекомендуется сдвинуть время отбоя
                на 30 минут и снизить кофеин после 16:00.
              </div>
              <div className="p-4 rounded-lg border border-ink-200 bg-parchment-100">
                Уровень стресса повышен. Запланируйте дыхательную практику на 10
                минут и прогулку 2 км.
              </div>
              <div className="p-4 rounded-lg border border-ink-200 bg-parchment-100">
                У вас активна скидка для ранних пользователей: -20% на подписку
                AI Health+ и консультации специалистов.
              </div>
            </div>
          </div>

          <div className="sketch-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-ink-800">
              Расписание и события
            </h2>
            <div className="space-y-3 text-sm text-ink-700">
              <div className="flex items-center justify-between p-3 rounded-lg border border-ink-200 bg-parchment-100">
                <div>
                  <div className="font-semibold text-ink-800">
                    Чек-ап крови
                  </div>
                  <div className="text-xs text-ink-500">Пт, 10:30</div>
                </div>
                <button className="ink-link text-xs">Перенести</button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-ink-200 bg-parchment-100">
                <div>
                  <div className="font-semibold text-ink-800">
                    Групповая йога
                  </div>
                  <div className="text-xs text-ink-500">Сб, 09:00</div>
                </div>
                <button className="ink-link text-xs">Открыть</button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-ink-200 bg-parchment-100">
                <div>
                  <div className="font-semibold text-ink-800">
                    Сессия с психологом
                  </div>
                  <div className="text-xs text-ink-500">Вс, 19:00</div>
                </div>
                <button className="ink-link text-xs">Видеосвязь</button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="sketch-card p-6">
            <h3 className="text-xl font-semibold text-ink-800 mb-3">
              Команда здоровья
            </h3>
            <div className="space-y-3 text-sm text-ink-700">
              <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                Доктор Левицкая · эндокринолог
                <div className="text-xs text-ink-500">Следующая встреча: 12.02</div>
              </div>
              <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                Мария Грин · нутрициолог
                <div className="text-xs text-ink-500">План питания обновлен</div>
              </div>
              <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                Алексей Т. · тренер
                <div className="text-xs text-ink-500">Новая программа</div>
              </div>
            </div>
            <div className="mt-4">
              <a className="ink-link text-sm" href="/specialists">
                Смотреть всех специалистов
              </a>
            </div>
          </div>

          <div className="sketch-card p-6">
            <h3 className="text-xl font-semibold text-ink-800 mb-3">
              Библиотека протоколов
            </h3>
            <div className="space-y-3 text-sm text-ink-700">
              <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                Протокол восстановления после травмы колена
              </div>
              <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                План нормализации сна и циркадных ритмов
              </div>
              <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                Гайд по микронутриентам для спортсменов
              </div>
            </div>
            <div className="mt-4">
              <a className="ink-link text-sm" href="/ecosystem">
                Подключить AI Health+ для персонализации
              </a>
            </div>
          </div>

          <div className="sketch-card p-6">
            <h3 className="text-xl font-semibold text-ink-800 mb-3">
              DAO активность
            </h3>
            <div className="space-y-3 text-sm text-ink-700">
              <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                Голосование: гранты на исследования микробиома
              </div>
              <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                Уровень участия: 4/7 голосований
              </div>
              <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                Баланс NVT: 12 400 · доступ к премиум исследованию
              </div>
            </div>
            <div className="mt-4">
              <a className="ink-link text-sm" href="/dao">
                Перейти в DAO кабинет
              </a>
            </div>
          </div>
        </section>

        <section className="mt-12 grid grid-cols-1 lg:grid-cols-[1.3fr,1fr] gap-6">
          <div className="sketch-card p-6">
            <h2 className="text-2xl font-semibold text-ink-800 mb-4">
              Настройка и персонализация
            </h2>
            <div className="space-y-3 text-sm text-ink-700">
              <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                Подключить устройства и интеграции
              </div>
              <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                Настроить цели и награды
              </div>
              <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                Выбрать специалистов и расписание
              </div>
              <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                Личный дневник и планирование дня
              </div>
            </div>
            <div className="mt-4">
              <a className="ink-link text-sm" href="/profile">
                Перейти в профиль
              </a>
            </div>
          </div>

          <div className="sketch-card p-6">
            <h2 className="text-2xl font-semibold text-ink-800 mb-4">
              Инструменты и функции
            </h2>
            <div className="space-y-3 text-sm text-ink-700">
              <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                AI агент и персональные планы
              </div>
              <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                Маркетплейс абонементов и услуг
              </div>
              <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                DAO голосования и гранты
              </div>
            </div>
          </div>
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
}: {
  title: string
  description: string
  link: string
  icon: string
}) {
  return (
    <a
      href={link}
      className="block p-6 sketch-card hover:bg-parchment-300/90 hover:scale-[1.02] transition-all duration-300"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-ink-800 mb-2">{title}</h3>
      <p className="text-ink-600">{description}</p>
    </a>
  )
}


