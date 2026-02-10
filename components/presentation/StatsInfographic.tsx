'use client'

import { motion } from 'framer-motion'
import { Users, TrendingUp, DollarSign, Activity, Heart, Brain } from 'lucide-react'
import InfographicCard from './InfographicCard'
import { useI18n } from '@/lib/i18n/I18nProvider'

export default function StatsInfographic() {
  const { t, lang } = useI18n()

  const stats = [
    {
      icon: Users,
      title: lang === 'en' ? 'Target Users' : 'Целевая аудитория',
      value: '1M+',
      subtitle: lang === 'en' ? 'Active users by end of 2026' : 'Активных пользователей к концу 2026',
      color: 'blue' as const,
      trend: 'up' as const,
      trendValue: '+20%',
    },
    {
      icon: DollarSign,
      title: 'ARR',
      value: '$10M+',
      subtitle: lang === 'en' ? 'Projected revenue by end of 2026' : 'Прогнозируемый доход к концу 2026',
      color: 'green' as const,
      trend: 'up' as const,
      trendValue: '+15%',
    },
    {
      icon: TrendingUp,
      title: lang === 'en' ? 'User Growth' : 'Рост пользователей',
      value: '20%+',
      subtitle: lang === 'en' ? 'Monthly active user growth' : 'Ежемесячный рост активных пользователей',
      color: 'red' as const,
      progress: 75,
    },
    {
      icon: Activity,
      title: 'ARPU',
      value: '$15+',
      subtitle: lang === 'en' ? 'Average revenue per user per month' : 'Средний доход с пользователя в месяц',
      color: 'blue' as const,
      progress: 60,
    },
    {
      icon: Heart,
      title: lang === 'en' ? 'User Retention' : 'Удержание пользователей',
      value: '85%',
      subtitle: lang === 'en' ? 'Monthly retention rate' : 'Месячный показатель удержания',
      color: 'pink' as const,
      progress: 85,
      trend: 'up' as const,
      trendValue: '+5%',
    },
    {
      icon: Brain,
      title: lang === 'en' ? 'AI Engagement' : 'Вовлечённость с ИИ',
      value: '92%',
      subtitle: lang === 'en' ? 'Users using AI features' : 'Пользователей используют функции ИИ',
      color: 'blue' as const,
      progress: 92,
    },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-warmBeige-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
            {lang === 'en' ? 'Platform Metrics & Growth' : 'Метрики платформы и рост'}
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto">
            {lang === 'en'
              ? 'Key indicators showing the potential and trajectory of NexusVita ecosystem'
              : 'Ключевые показатели, демонстрирующие потенциал и траекторию развития экосистемы NexusVita'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <InfographicCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              progress={stat.progress}
              color={stat.color}
              trend={stat.trend}
              trendValue={stat.trendValue}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
