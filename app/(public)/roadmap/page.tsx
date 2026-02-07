'use client'

import { useState } from 'react'
import {
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  CheckCircle,
  Clock,
  Rocket,
  BarChart3,
  PieChart,
  ArrowRight,
  Download,
  Presentation,
} from 'lucide-react'
import { motion } from 'framer-motion'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { cn } from '@/lib/utils/cn'

export default function RoadmapPage() {
  const [activeTab, setActiveTab] = useState<'development' | 'marketing' | 'finance' | 'pitch'>('development')

  const developmentPhases = [
    {
      phase: 'Фаза 1: MVP (Текущая)',
      status: 'completed',
      duration: '3 месяца',
      items: [
        'Базовая инфраструктура и архитектура',
        'Система аутентификации',
        'Основные страницы и компоненты',
        'База данных и API',
        'Деплой на Vercel',
      ],
    },
    {
      phase: 'Фаза 2: Альфа-версия',
      status: 'in-progress',
      duration: '4 месяца',
      items: [
        'Полная интеграция всех модулей',
        'AI Health+ с реальными рекомендациями',
        'Платежная система (Stripe)',
        'Интеграции с устройствами (Garmin, Oura)',
        'Мобильное приложение (React Native)',
        'Система уведомлений',
      ],
    },
    {
      phase: 'Фаза 3: Бета-версия',
      status: 'planned',
      duration: '3 месяца',
      items: [
        'Оптимизация производительности',
        'Расширенная аналитика',
        'Социальные функции',
        'DAO голосования',
        'Маркетплейс с реальными партнерами',
        'Система рефералов',
      ],
    },
    {
      phase: 'Фаза 4: Продакшен',
      status: 'planned',
      duration: '2 месяца',
      items: [
        'Финальное тестирование',
        'Масштабирование инфраструктуры',
        'Маркетинговая кампания',
        'Запуск токенов NVT',
        'Партнерства с клиниками',
      ],
    },
  ]

  const marketingPlan = {
    channels: [
      { name: 'Контент-маркетинг', budget: '30%', description: 'Блог, статьи, кейсы, видео' },
      { name: 'Социальные сети', budget: '25%', description: 'Instagram, Telegram, YouTube' },
      { name: 'Партнерства', budget: '20%', description: 'Клиники, фитнес-центры, специалисты' },
      { name: 'Реклама', budget: '15%', description: 'Контекстная, таргетированная' },
      { name: 'События', budget: '10%', description: 'Конференции, вебинары, митапы' },
    ],
    milestones: [
      { month: 'Месяц 1-2', goal: '1000 регистраций', tactics: 'Запуск блога, первые партнерства' },
      { month: 'Месяц 3-4', goal: '5000 пользователей', tactics: 'Реклама, контент-маркетинг' },
      { month: 'Месяц 5-6', goal: '15000 активных', tactics: 'Вирусный маркетинг, рефералы' },
      { month: 'Месяц 7-12', goal: '50000 пользователей', tactics: 'Масштабирование, партнерства' },
    ],
  }

  const financialProjection = {
    revenue: [
      { period: 'Год 1', subscriptions: 50000, avgPrice: 1500, total: 75000000 },
      { period: 'Год 2', subscriptions: 200000, avgPrice: 1800, total: 360000000 },
      { period: 'Год 3', subscriptions: 500000, avgPrice: 2000, total: 1000000000 },
    ],
    costs: [
      { category: 'Разработка', year1: 15000000, year2: 20000000, year3: 25000000 },
      { category: 'Маркетинг', year1: 10000000, year2: 30000000, year3: 50000000 },
      { category: 'Инфраструктура', year1: 2000000, year2: 5000000, year3: 10000000 },
      { category: 'Команда', year1: 25000000, year2: 40000000, year3: 60000000 },
      { category: 'Операционные', year1: 5000000, year2: 10000000, year3: 20000000 },
    ],
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <NeumorphicBadge variant="info" className="mb-6 text-lg px-6 py-3">
            ✦ Дорожная карта проекта
          </NeumorphicBadge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-warmGraphite-800 mb-4">
            Nexus Vita Roadmap
          </h1>
          <p className="text-xl sm:text-2xl text-warmGraphite-600 max-w-3xl mx-auto">
            План разработки, маркетинга и финансовые прогнозы
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {[
            { id: 'development', label: 'Разработка', icon: Rocket },
            { id: 'marketing', label: 'Маркетинг', icon: Users },
            { id: 'finance', label: 'Финансы', icon: DollarSign },
            { id: 'pitch', label: 'Презентация', icon: Presentation },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <NeumorphicButton
                key={tab.id}
                primary={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="px-6 py-3"
              >
                <Icon className="w-5 h-5 mr-2" />
                {tab.label}
              </NeumorphicButton>
            )
          })}
        </div>

        {/* Development Tab */}
        {activeTab === 'development' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {developmentPhases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NeumorphicCard className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                      <NeumorphicBadge
                        variant={
                          phase.status === 'completed'
                            ? 'success'
                            : phase.status === 'in-progress'
                            ? 'info'
                            : 'default'
                        }
                      >
                        {phase.status === 'completed' && <CheckCircle className="w-4 h-4 mr-1" />}
                        {phase.status === 'in-progress' && <Clock className="w-4 h-4 mr-1" />}
                        {phase.status === 'planned' && <Calendar className="w-4 h-4 mr-1" />}
                        {phase.phase}
                      </NeumorphicBadge>
                      <span className="text-warmGraphite-600 font-medium">{phase.duration}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {phase.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-warmGraphite-700">
                        <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </NeumorphicCard>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Marketing Tab */}
        {activeTab === 'marketing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <NeumorphicCard className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-warmGraphite-800 mb-6">
                Каналы маркетинга
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {marketingPlan.channels.map((channel, index) => (
                  <NeumorphicCard key={channel.name} soft className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-warmGraphite-800">{channel.name}</h3>
                      <NeumorphicBadge variant="info">{channel.budget}</NeumorphicBadge>
                    </div>
                    <p className="text-sm text-warmGraphite-600">{channel.description}</p>
                  </NeumorphicCard>
                ))}
              </div>
            </NeumorphicCard>

            <NeumorphicCard className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-warmGraphite-800 mb-6">
                Маркетинговые вехи
              </h2>
              <div className="space-y-4">
                {marketingPlan.milestones.map((milestone, index) => (
                  <NeumorphicCard key={index} soft className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="font-semibold text-warmGraphite-800">{milestone.month}</h3>
                      <NeumorphicBadge variant="success">{milestone.goal}</NeumorphicBadge>
                    </div>
                    <p className="text-sm text-warmGraphite-600">{milestone.tactics}</p>
                  </NeumorphicCard>
                ))}
              </div>
            </NeumorphicCard>
          </motion.div>
        )}

        {/* Finance Tab */}
        {activeTab === 'finance' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <NeumorphicCard className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-warmGraphite-800 mb-6">
                Прогноз выручки
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-warmGray-300">
                      <th className="text-left p-3 text-warmGraphite-800 font-semibold">Период</th>
                      <th className="text-right p-3 text-warmGraphite-800 font-semibold">Подписки</th>
                      <th className="text-right p-3 text-warmGraphite-800 font-semibold">Средний чек</th>
                      <th className="text-right p-3 text-warmGraphite-800 font-semibold">Выручка</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialProjection.revenue.map((row, index) => (
                      <tr key={index} className="border-b border-warmGray-200">
                        <td className="p-3 text-warmGraphite-700 font-medium">{row.period}</td>
                        <td className="p-3 text-right text-warmGraphite-700">{row.subscriptions.toLocaleString()}</td>
                        <td className="p-3 text-right text-warmGraphite-700">{row.avgPrice.toLocaleString()} ₽</td>
                        <td className="p-3 text-right text-warmGraphite-800 font-bold">{row.total.toLocaleString()} ₽</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </NeumorphicCard>

            <NeumorphicCard className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-warmGraphite-800 mb-6">
                Структура затрат
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-warmGray-300">
                      <th className="text-left p-3 text-warmGraphite-800 font-semibold">Категория</th>
                      <th className="text-right p-3 text-warmGraphite-800 font-semibold">Год 1</th>
                      <th className="text-right p-3 text-warmGraphite-800 font-semibold">Год 2</th>
                      <th className="text-right p-3 text-warmGraphite-800 font-semibold">Год 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialProjection.costs.map((row, index) => (
                      <tr key={index} className="border-b border-warmGray-200">
                        <td className="p-3 text-warmGraphite-700 font-medium">{row.category}</td>
                        <td className="p-3 text-right text-warmGraphite-700">{row.year1.toLocaleString()} ₽</td>
                        <td className="p-3 text-right text-warmGraphite-700">{row.year2.toLocaleString()} ₽</td>
                        <td className="p-3 text-right text-warmGraphite-700">{row.year3.toLocaleString()} ₽</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </NeumorphicCard>
          </motion.div>
        )}

        {/* Pitch Tab */}
        {activeTab === 'pitch' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <NeumorphicCard className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-warmGraphite-800 mb-6">
                Инвестиционное предложение
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">Проблема</h3>
                  <p className="text-warmGraphite-600 leading-relaxed">
                    Люди тратят много времени и денег на управление здоровьем через множество разрозненных сервисов.
                    Нет единой платформы, которая объединяет медицинские данные, фитнес, питание, психологию и AI-коучинг.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">Решение</h3>
                  <p className="text-warmGraphite-600 leading-relaxed">
                    Nexus Vita - унифицированная экосистема здоровья, которая объединяет все аспекты здоровья
                    в одной платформе с AI-персонализацией, доступом к специалистам и DAO-управлением.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">Рынок</h3>
                  <p className="text-warmGraphite-600 leading-relaxed">
                    Рынок цифрового здоровья растет на 25% в год и достигнет $600 млрд к 2027 году.
                    Целевая аудитория: 50+ млн человек в России, заинтересованных в здоровом образе жизни.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">Монетизация</h3>
                  <p className="text-warmGraphite-600 leading-relaxed">
                    Подписки (от 990₽/мес), комиссии с маркетплейса (10-15%), платные консультации специалистов,
                    премиум функции AI Health+, токены NVT для DAO-управления.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">Запрос на инвестиции</h3>
                  <p className="text-warmGraphite-600 leading-relaxed mb-4">
                    Мы ищем инвестиции в размере <strong className="text-warmGraphite-800">50-100 млн ₽</strong> для:
                  </p>
                  <ul className="space-y-2 text-warmGraphite-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      <span>Завершения разработки альфа-версии</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      <span>Маркетинговой кампании и привлечения первых 10,000 пользователей</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      <span>Расширения команды (разработка, маркетинг, продажи)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      <span>Партнерств с клиниками и специалистами</span>
                    </li>
                  </ul>
                </div>
              </div>
            </NeumorphicCard>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeumorphicButton primary className="px-8 py-4">
                <Download className="w-5 h-5 mr-2" />
                Скачать презентацию
              </NeumorphicButton>
              <NeumorphicButton className="px-8 py-4">
                <Presentation className="w-5 h-5 mr-2" />
                Запросить встречу
              </NeumorphicButton>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
