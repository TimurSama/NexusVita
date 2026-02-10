'use client'

import { motion } from 'framer-motion'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react'

export default function EconomicsSection() {
  const metrics = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Целевая аудитория',
      value: '1M+',
      description: 'Активных пользователей к концу 2026',
      color: 'text-warmBlue-600',
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'ARR (Annual Recurring Revenue)',
      value: '$10M+',
      description: 'Прогнозируемый доход к концу 2026',
      color: 'text-warmGreen-600',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Рост пользователей',
      value: '20%+',
      description: 'Ежемесячный рост активных пользователей',
      color: 'text-warmOrange-600',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'ARPU',
      value: '$15+',
      description: 'Средний доход с пользователя в месяц',
      color: 'text-warmPurple-600',
    },
  ]

  const funding = [
    {
      round: 'Seed Round',
      amount: '$500K',
      use: [
        '40% — разработка и продукт',
        '30% — маркетинг и продажи',
        '20% — команда',
        '10% — операционные расходы',
      ],
    },
    {
      round: 'Series A',
      amount: '$5M',
      use: [
        '50% — масштабирование продукта',
        '25% — международная экспансия',
        '15% — команда и инфраструктура',
        '10% — маркетинг',
      ],
    },
  ]

  const tokenomics = {
    total: '1,000,000,000 NVT',
    distribution: [
      { label: 'Продажа инвесторам', percent: '30%' },
      { label: 'Команда и консультанты (vesting 4 года)', percent: '20%' },
      { label: 'Резерв развития', percent: '15%' },
      { label: 'Маркетинг и партнерства', percent: '15%' },
      { label: 'Ликвидность', percent: '10%' },
      { label: 'Награды пользователям', percent: '10%' },
    ],
  }

  return (
    <section id="economics" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
            Экономика проекта
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto">
            Модель монетизации и прогнозы развития
          </p>
        </motion.div>

        {/* Метрики */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12 lg:mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <NeumorphicCard className="p-4 sm:p-6 text-center">
                <div className={`${metric.color} mb-3 flex justify-center`}>
                  {metric.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-2">
                  {metric.title}
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-warmBlue-600 mb-2">
                  {metric.value}
                </p>
                <p className="text-xs sm:text-sm text-warmGraphite-600">
                  {metric.description}
                </p>
              </NeumorphicCard>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12 lg:mb-16">
          {/* Финансирование */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <NeumorphicCard className="p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-warmGraphite-800 mb-4 sm:mb-6">
                Финансирование
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {funding.map((round, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <h4 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
                        {round.round}
                      </h4>
                      <span className="text-xl sm:text-2xl font-bold text-warmBlue-600">
                        {round.amount}
                      </span>
                    </div>
                    <ul className="space-y-1 sm:space-y-2">
                      {round.use.map((item, idx) => (
                        <li key={idx} className="text-sm sm:text-base text-warmGraphite-700">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </NeumorphicCard>
          </motion.div>

          {/* Токеномика */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <NeumorphicCard className="p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-warmGraphite-800 mb-2 sm:mb-3">
                Токеномика NVT
              </h3>
              <p className="text-base sm:text-lg text-warmGraphite-600 mb-4 sm:mb-6">
                Общий объем: <span className="font-semibold">{tokenomics.total}</span>
              </p>
              <ul className="space-y-2 sm:space-y-3">
                {tokenomics.distribution.map((item, index) => (
                  <li key={index} className="flex items-center justify-between text-sm sm:text-base">
                    <span className="text-warmGraphite-700">{item.label}</span>
                    <span className="font-semibold text-warmBlue-600">{item.percent}</span>
                  </li>
                ))}
              </ul>
            </NeumorphicCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
