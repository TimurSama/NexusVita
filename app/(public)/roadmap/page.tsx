'use client'

import { useState } from 'react'
import {
  Calendar,
  DollarSign,
  Users,
  CheckCircle,
  Clock,
  Rocket,
  BarChart3,
  Download,
  Presentation,
  Globe,
  MapPin,
  Building2,
  UserCheck,
} from 'lucide-react'
import { motion } from 'framer-motion'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { cn } from '@/lib/utils/cn'

// Конвертация: 1 USD = 95 RUB (примерный курс)
const USD_TO_RUB = 95

function formatUSD(amountRub: number) {
  return `$${(amountRub / USD_TO_RUB).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

function formatRUB(amount: number) {
  return `${amount.toLocaleString('ru-RU')} ₽`
}

export default function RoadmapPage() {
  const [activeTab, setActiveTab] = useState<'development' | 'marketing' | 'finance' | 'market' | 'pitch'>('development')

  const developmentPhases = [
    {
      phase: 'Фаза 1: MVP (Текущая)',
      status: 'completed',
      duration: '3 месяца',
      cost: 500000, // $5,000
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
      cost: 2000000, // $20,000
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
      cost: 1500000, // $15,000
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
      cost: 1000000, // $10,000
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
    totalBudget: 15000000, // $150,000
    channels: [
      { name: 'Контент-маркетинг', budget: 4500000, percent: '30%', description: 'Блог, статьи, кейсы, видео, SEO' },
      { name: 'Социальные сети', budget: 3750000, percent: '25%', description: 'Instagram, Telegram, YouTube, TikTok' },
      { name: 'Партнерства', budget: 3000000, percent: '20%', description: 'Клиники, фитнес-центры, специалисты, инфлюенсеры' },
      { name: 'Реклама', budget: 2250000, percent: '15%', description: 'Контекстная, таргетированная, ретаргетинг' },
      { name: 'События', budget: 1500000, percent: '10%', description: 'Конференции, вебинары, митапы, хакатоны' },
    ],
    milestones: [
      { month: 'Месяц 1-2', goal: '1,000 регистраций', budget: 2000000, tactics: 'Запуск блога, первые партнерства, контент-маркетинг' },
      { month: 'Месяц 3-4', goal: '5,000 пользователей', budget: 3000000, tactics: 'Реклама, контент-маркетинг, социальные сети' },
      { month: 'Месяц 5-6', goal: '15,000 активных', budget: 4000000, tactics: 'Вирусный маркетинг, рефералы, партнерства' },
      { month: 'Месяц 7-12', goal: '50,000 пользователей', budget: 6000000, tactics: 'Масштабирование, партнерства, события' },
    ],
  }

  const financialProjection = {
    revenue: [
      { 
        period: 'Год 1', 
        subscriptions: 10000, 
        avgPrice: 1200, 
        marketplace: 500000,
        consultations: 2000000,
        total: 14500000,
        churn: 0.15,
        netRevenue: 12325000
      },
      { 
        period: 'Год 2', 
        subscriptions: 50000, 
        avgPrice: 1500, 
        marketplace: 5000000,
        consultations: 15000000,
        total: 90000000,
        churn: 0.12,
        netRevenue: 79200000
      },
      { 
        period: 'Год 3', 
        subscriptions: 150000, 
        avgPrice: 1800, 
        marketplace: 20000000,
        consultations: 50000000,
        total: 320000000,
        churn: 0.10,
        netRevenue: 288000000
      },
    ],
    costs: [
      { category: 'Разработка', year1: 5000000, year2: 8000000, year3: 12000000 },
      { category: 'Маркетинг', year1: 15000000, year2: 30000000, year3: 50000000 },
      { category: 'Инфраструктура', year1: 2000000, year2: 5000000, year3: 10000000 },
      { category: 'Команда', year1: 25000000, year2: 50000000, year3: 80000000 },
      { category: 'Операционные', year1: 5000000, year2: 10000000, year3: 20000000 },
      { category: 'Юридические/Комплаенс', year1: 2000000, year2: 3000000, year3: 5000000 },
    ],
  }

  const marketAnalysis = {
    global: {
      size: 350000000000, // $350B в 2024
      growth: 0.25, // 25% CAGR
      forecast2027: 600000000000, // $600B к 2027
    },
    regions: [
      {
        region: 'Северная Америка',
        size: 140000000000,
        growth: 0.22,
        share: 0.40,
        description: 'Крупнейший рынок, высокий уровень цифровизации',
      },
      {
        region: 'Европа',
        size: 105000000000,
        growth: 0.24,
        share: 0.30,
        description: 'Строгое регулирование, высокий спрос на приватность',
      },
      {
        region: 'Азиатско-Тихоокеанский',
        size: 87500000000,
        growth: 0.28,
        share: 0.25,
        description: 'Быстрый рост, мобильные технологии',
      },
      {
        region: 'Россия и СНГ',
        size: 17500000000,
        growth: 0.30,
        share: 0.05,
        description: 'Растущий рынок, импортозамещение, наш фокус',
      },
    ],
    competitors: [
      {
        name: 'MyFitnessPal',
        users: 200000000,
        revenue: 500000000,
        strengths: 'Большая база, интеграции',
        weaknesses: 'Устаревший UX, нет медицинских данных',
      },
      {
        name: 'Noom',
        users: 50000000,
        revenue: 400000000,
        strengths: 'Психология, коучинг',
        weaknesses: 'Высокая цена, только похудение',
      },
      {
        name: 'Headspace',
        users: 70000000,
        revenue: 300000000,
        strengths: 'Медитация, ментальное здоровье',
        weaknesses: 'Узкая специализация',
      },
      {
        name: 'Teladoc',
        users: 10000000,
        revenue: 2000000000,
        strengths: 'Телемедицина, специалисты',
        weaknesses: 'Только консультации, нет трекинга',
      },
    ],
    targetAudience: [
      {
        segment: 'Активные пользователи фитнес-трекеров',
        size: 15000000,
        age: '25-45',
        income: 'Средний-высокий',
        painPoints: 'Разрозненные данные, нет персональных рекомендаций',
        willingness: 0.35,
      },
      {
        segment: 'Люди с хроническими заболеваниями',
        size: 20000000,
        age: '35-65',
        income: 'Средний',
        painPoints: 'Сложность управления здоровьем, нет единой системы',
        willingness: 0.50,
      },
      {
        segment: 'Спортсмены и любители фитнеса',
        size: 8000000,
        age: '20-40',
        income: 'Средний-высокий',
        painPoints: 'Нет комплексного подхода, разрозненные инструменты',
        willingness: 0.40,
      },
      {
        segment: 'Заботящиеся о здоровье (preventive)',
        size: 12000000,
        age: '30-50',
        income: 'Высокий',
        painPoints: 'Проактивный подход к здоровью, нужны данные и рекомендации',
        willingness: 0.45,
      },
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
            План разработки, маркетинга, финансовые прогнозы и анализ рынка
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {[
            { id: 'development', label: 'Разработка', icon: Rocket },
            { id: 'marketing', label: 'Маркетинг', icon: Users },
            { id: 'finance', label: 'Финансы', icon: DollarSign },
            { id: 'market', label: 'Анализ рынка', icon: BarChart3 },
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
                    <div className="flex flex-wrap items-center gap-4 mb-4 sm:mb-0">
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
                      <NeumorphicBadge variant="info">
                        {formatUSD(phase.cost)} / {formatRUB(phase.cost)}
                      </NeumorphicBadge>
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-warmGraphite-800">
                  Каналы маркетинга
                </h2>
                <NeumorphicBadge variant="info" className="text-lg">
                  Всего: {formatUSD(marketingPlan.totalBudget)} / {formatRUB(marketingPlan.totalBudget)}
                </NeumorphicBadge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {marketingPlan.channels.map((channel) => (
                  <NeumorphicCard key={channel.name} soft className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-warmGraphite-800">{channel.name}</h3>
                      <NeumorphicBadge variant="info">{channel.percent}</NeumorphicBadge>
                    </div>
                    <p className="text-sm text-warmGraphite-600 mb-2">{channel.description}</p>
                    <p className="text-xs text-warmGraphite-500">
                      {formatUSD(channel.budget)} / {formatRUB(channel.budget)}
                    </p>
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
                      <div className="flex items-center gap-2">
                        <NeumorphicBadge variant="success">{milestone.goal}</NeumorphicBadge>
                        <NeumorphicBadge variant="info" className="text-xs">
                          {formatUSD(milestone.budget)}
                        </NeumorphicBadge>
                      </div>
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
                      <th className="text-right p-3 text-warmGraphite-800 font-semibold">Маркетплейс</th>
                      <th className="text-right p-3 text-warmGraphite-800 font-semibold">Консультации</th>
                      <th className="text-right p-3 text-warmGraphite-800 font-semibold">Выручка (₽)</th>
                      <th className="text-right p-3 text-warmGraphite-800 font-semibold">Выручка ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialProjection.revenue.map((row, index) => (
                      <tr key={index} className="border-b border-warmGray-200">
                        <td className="p-3 text-warmGraphite-700 font-medium">{row.period}</td>
                        <td className="p-3 text-right text-warmGraphite-700">{row.subscriptions.toLocaleString()}</td>
                        <td className="p-3 text-right text-warmGraphite-700">{formatRUB(row.avgPrice)}</td>
                        <td className="p-3 text-right text-warmGraphite-700">{formatRUB(row.marketplace)}</td>
                        <td className="p-3 text-right text-warmGraphite-700">{formatRUB(row.consultations)}</td>
                        <td className="p-3 text-right text-warmGraphite-800 font-bold">{formatRUB(row.netRevenue)}</td>
                        <td className="p-3 text-right text-warmGraphite-800 font-bold">{formatUSD(row.netRevenue)}</td>
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
                      <th className="text-right p-3 text-warmGraphite-800 font-semibold">Год 1 (₽)</th>
                      <th className="text-right p-3 text-warmGraphite-800 font-semibold">Год 1 ($)</th>
                      <th className="text-right p-3 text-warmGraphite-800 font-semibold">Год 2 (₽)</th>
                      <th className="text-right p-3 text-warmGraphite-800 font-semibold">Год 2 ($)</th>
                      <th className="text-right p-3 text-warmGraphite-800 font-semibold">Год 3 (₽)</th>
                      <th className="text-right p-3 text-warmGraphite-800 font-semibold">Год 3 ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialProjection.costs.map((row, index) => (
                      <tr key={index} className="border-b border-warmGray-200">
                        <td className="p-3 text-warmGraphite-700 font-medium">{row.category}</td>
                        <td className="p-3 text-right text-warmGraphite-700">{formatRUB(row.year1)}</td>
                        <td className="p-3 text-right text-warmGraphite-700">{formatUSD(row.year1)}</td>
                        <td className="p-3 text-right text-warmGraphite-700">{formatRUB(row.year2)}</td>
                        <td className="p-3 text-right text-warmGraphite-700">{formatUSD(row.year2)}</td>
                        <td className="p-3 text-right text-warmGraphite-700">{formatRUB(row.year3)}</td>
                        <td className="p-3 text-right text-warmGraphite-700">{formatUSD(row.year3)}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-warmGraphite-800 font-bold">
                      <td className="p-3 text-warmGraphite-800">ИТОГО</td>
                      <td className="p-3 text-right text-warmGraphite-800">
                        {formatRUB(financialProjection.costs.reduce((sum, c) => sum + c.year1, 0))}
                      </td>
                      <td className="p-3 text-right text-warmGraphite-800">
                        {formatUSD(financialProjection.costs.reduce((sum, c) => sum + c.year1, 0))}
                      </td>
                      <td className="p-3 text-right text-warmGraphite-800">
                        {formatRUB(financialProjection.costs.reduce((sum, c) => sum + c.year2, 0))}
                      </td>
                      <td className="p-3 text-right text-warmGraphite-800">
                        {formatUSD(financialProjection.costs.reduce((sum, c) => sum + c.year2, 0))}
                      </td>
                      <td className="p-3 text-right text-warmGraphite-800">
                        {formatRUB(financialProjection.costs.reduce((sum, c) => sum + c.year3, 0))}
                      </td>
                      <td className="p-3 text-right text-warmGraphite-800">
                        {formatUSD(financialProjection.costs.reduce((sum, c) => sum + c.year3, 0))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </NeumorphicCard>

            <NeumorphicCard className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-warmGraphite-800 mb-6">
                Финансовые показатели
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {financialProjection.revenue.map((row, index) => {
                  const totalCosts = financialProjection.costs.reduce((sum, c) => {
                    if (index === 0) return sum + c.year1
                    if (index === 1) return sum + c.year2
                    return sum + c.year3
                  }, 0)
                  const profit = row.netRevenue - totalCosts
                  const margin = (profit / row.netRevenue) * 100
                  
                  return (
                    <NeumorphicCard key={row.period} soft className="p-4">
                      <h3 className="font-semibold text-warmGraphite-800 mb-3">{row.period}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-warmGraphite-600">Выручка:</span>
                          <span className="font-semibold text-warmGraphite-800">{formatUSD(row.netRevenue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-warmGraphite-600">Затраты:</span>
                          <span className="text-warmGraphite-700">{formatUSD(totalCosts)}</span>
                        </div>
                        <div className="flex justify-between border-t border-warmGray-300 pt-2">
                          <span className="text-warmGraphite-600">Прибыль:</span>
                          <span className={cn('font-bold', profit > 0 ? 'text-warmGreen-600' : 'text-warmRed-600')}>
                            {formatUSD(profit)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-warmGraphite-600">Маржа:</span>
                          <span className={cn('font-semibold', margin > 0 ? 'text-warmGreen-600' : 'text-warmRed-600')}>
                            {margin.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </NeumorphicCard>
                  )
                })}
              </div>
            </NeumorphicCard>
          </motion.div>
        )}

        {/* Market Analysis Tab */}
        {activeTab === 'market' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <NeumorphicCard className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-warmGraphite-800 mb-6 flex items-center gap-2">
                <Globe className="w-8 h-8" />
                Глобальный рынок цифрового здоровья
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <NeumorphicCard soft className="p-4">
                  <div className="text-sm text-warmGraphite-600 mb-1">Размер рынка (2024)</div>
                  <div className="text-2xl font-bold text-warmGraphite-800">{formatUSD(marketAnalysis.global.size)}</div>
                </NeumorphicCard>
                <NeumorphicCard soft className="p-4">
                  <div className="text-sm text-warmGraphite-600 mb-1">Рост (CAGR)</div>
                  <div className="text-2xl font-bold text-warmBlue-600">{(marketAnalysis.global.growth * 100).toFixed(0)}%</div>
                </NeumorphicCard>
                <NeumorphicCard soft className="p-4">
                  <div className="text-sm text-warmGraphite-600 mb-1">Прогноз (2027)</div>
                  <div className="text-2xl font-bold text-warmGraphite-800">{formatUSD(marketAnalysis.global.forecast2027)}</div>
                </NeumorphicCard>
              </div>
            </NeumorphicCard>

            <NeumorphicCard className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-warmGraphite-800 mb-6 flex items-center gap-2">
                <MapPin className="w-8 h-8" />
                Анализ по регионам
              </h2>
              <div className="space-y-4">
                {marketAnalysis.regions.map((region, index) => (
                  <NeumorphicCard key={index} soft className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="font-semibold text-warmGraphite-800 text-lg">{region.region}</h3>
                      <div className="flex items-center gap-2">
                        <NeumorphicBadge variant="info">{(region.share * 100).toFixed(0)}% рынка</NeumorphicBadge>
                        <NeumorphicBadge variant="success">+{(region.growth * 100).toFixed(0)}% рост</NeumorphicBadge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                      <div className="text-sm">
                        <span className="text-warmGraphite-600">Размер: </span>
                        <span className="font-semibold text-warmGraphite-800">{formatUSD(region.size)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-warmGraphite-600">{region.description}</p>
                  </NeumorphicCard>
                ))}
              </div>
            </NeumorphicCard>

            <NeumorphicCard className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-warmGraphite-800 mb-6 flex items-center gap-2">
                <Building2 className="w-8 h-8" />
                Конкуренты
              </h2>
              <div className="space-y-4">
                {marketAnalysis.competitors.map((competitor, index) => (
                  <NeumorphicCard key={index} soft className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="font-semibold text-warmGraphite-800 text-lg">{competitor.name}</h3>
                      <div className="flex items-center gap-2">
                        <NeumorphicBadge variant="info">{competitor.users.toLocaleString()} пользователей</NeumorphicBadge>
                        <NeumorphicBadge variant="success">{formatUSD(competitor.revenue)} выручка</NeumorphicBadge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-semibold text-warmGreen-600 mb-1">Сильные стороны:</div>
                        <div className="text-warmGraphite-600">{competitor.strengths}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-warmRed-600 mb-1">Слабые стороны:</div>
                        <div className="text-warmGraphite-600">{competitor.weaknesses}</div>
                      </div>
                    </div>
                  </NeumorphicCard>
                ))}
              </div>
            </NeumorphicCard>

            <NeumorphicCard className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-warmGraphite-800 mb-6 flex items-center gap-2">
                <UserCheck className="w-8 h-8" />
                Целевая аудитория
              </h2>
              <div className="space-y-4">
                {marketAnalysis.targetAudience.map((segment, index) => (
                  <NeumorphicCard key={index} soft className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="font-semibold text-warmGraphite-800 text-lg">{segment.segment}</h3>
                      <NeumorphicBadge variant="info">
                        {segment.size.toLocaleString()} чел. ({(segment.willingness * 100).toFixed(0)}% готовность)
                      </NeumorphicBadge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2 text-sm">
                      <div>
                        <span className="text-warmGraphite-600">Возраст: </span>
                        <span className="font-semibold text-warmGraphite-800">{segment.age}</span>
                      </div>
                      <div>
                        <span className="text-warmGraphite-600">Доход: </span>
                        <span className="font-semibold text-warmGraphite-800">{segment.income}</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-warmGraphite-800 mb-1">Болевые точки:</div>
                      <div className="text-warmGraphite-600">{segment.painPoints}</div>
                    </div>
                  </NeumorphicCard>
                ))}
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
                    Средний пользователь использует 3-5 разных приложений для отслеживания здоровья, что приводит к
                    фрагментации данных и отсутствию целостной картины.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">Решение</h3>
                  <p className="text-warmGraphite-600 leading-relaxed">
                    Nexus Vita - унифицированная экосистема здоровья, которая объединяет все аспекты здоровья
                    в одной платформе с AI-персонализацией, доступом к специалистам и DAO-управлением.
                    Уникальное сочетание медицинских данных, фитнеса, питания, ментального здоровья и социальных функций
                    с прозрачной экономикой токенов NVT.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">Рынок</h3>
                  <p className="text-warmGraphite-600 leading-relaxed mb-4">
                    Рынок цифрового здоровья растет на 25% в год и достигнет {formatUSD(marketAnalysis.global.forecast2027)} к 2027 году.
                    Целевая аудитория: 55+ млн человек в России и СНГ, заинтересованных в здоровом образе жизни.
                    Рынок России и СНГ показывает рост 30% в год - один из самых быстрорастущих в мире.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <NeumorphicCard soft className="p-4">
                      <div className="text-sm text-warmGraphite-600 mb-1">Размер рынка (2024)</div>
                      <div className="text-xl font-bold text-warmGraphite-800">{formatUSD(marketAnalysis.global.size)}</div>
                    </NeumorphicCard>
                    <NeumorphicCard soft className="p-4">
                      <div className="text-sm text-warmGraphite-600 mb-1">Рост (CAGR)</div>
                      <div className="text-xl font-bold text-warmBlue-600">{(marketAnalysis.global.growth * 100).toFixed(0)}%</div>
                    </NeumorphicCard>
                    <NeumorphicCard soft className="p-4">
                      <div className="text-sm text-warmGraphite-600 mb-1">Прогноз (2027)</div>
                      <div className="text-xl font-bold text-warmGraphite-800">{formatUSD(marketAnalysis.global.forecast2027)}</div>
                    </NeumorphicCard>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">Монетизация</h3>
                  <div className="space-y-2 text-warmGraphite-600">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Подписки:</strong> от 990₽/мес ($10/мес) - базовый план, 1,990₽/мес ($20/мес) - премиум с AI Health+</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Маркетплейс:</strong> комиссия 10-15% с продаж абонементов, услуг, товаров</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Консультации специалистов:</strong> комиссия 20-30% с каждой консультации</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Премиум функции:</strong> AI Health+, расширенная аналитика, приоритетная поддержка</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      <span><strong>Токены NVT:</strong> продажа токенов для DAO-управления, стейкинг, премиум доступ</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">Запрос на инвестиции</h3>
                  <p className="text-warmGraphite-600 leading-relaxed mb-4">
                    Мы ищем инвестиции в размере <strong className="text-warmGraphite-800">$500,000 - $1,000,000 (47.5 - 95 млн ₽)</strong> для:
                  </p>
                  <ul className="space-y-2 text-warmGraphite-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      <span>Завершения разработки альфа-версии и запуска бета-тестирования</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      <span>Маркетинговой кампании и привлечения первых 10,000 платящих пользователей</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      <span>Расширения команды (разработка, маркетинг, продажи, поддержка)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      <span>Партнерств с клиниками, фитнес-центрами и специалистами</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      <span>Масштабирования инфраструктуры и обеспечения безопасности данных</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">Прогноз возврата инвестиций</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <NeumorphicCard soft className="p-4">
                      <div className="text-sm text-warmGraphite-600 mb-1">Год 1</div>
                      <div className="text-xl font-bold text-warmGraphite-800">{formatUSD(financialProjection.revenue[0].netRevenue)}</div>
                      <div className="text-xs text-warmGraphite-500 mt-1">Выручка</div>
                    </NeumorphicCard>
                    <NeumorphicCard soft className="p-4">
                      <div className="text-sm text-warmGraphite-600 mb-1">Год 2</div>
                      <div className="text-xl font-bold text-warmGraphite-800">{formatUSD(financialProjection.revenue[1].netRevenue)}</div>
                      <div className="text-xs text-warmGraphite-500 mt-1">Выручка</div>
                    </NeumorphicCard>
                    <NeumorphicCard soft className="p-4">
                      <div className="text-sm text-warmGraphite-600 mb-1">Год 3</div>
                      <div className="text-xl font-bold text-warmGraphite-800">{formatUSD(financialProjection.revenue[2].netRevenue)}</div>
                      <div className="text-xs text-warmGraphite-500 mt-1">Выручка</div>
                    </NeumorphicCard>
                  </div>
                  <p className="text-sm text-warmGraphite-600 mt-4">
                    При инвестиции $750,000 ожидаемый выход через 3-5 лет с оценкой $50-100M (ROI 66-133x)
                  </p>
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
