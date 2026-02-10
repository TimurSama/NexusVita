'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { cn } from '@/lib/utils/cn'

interface SubscriptionsSectionProps {
  onSubscribe: (planId: string) => void
}

export default function SubscriptionsSection({ onSubscribe }: SubscriptionsSectionProps) {
  const plans = [
    {
      id: 'basic',
      name: 'Базовый',
      price: 'Бесплатно',
      features: [
        'Личный дневник здоровья',
        'Базовый ИИ-планировщик',
        'Календарь и напоминания',
        'Сообщество и группы',
        'Базовые аналитики',
      ],
      popular: false,
    },
    {
      id: 'premium',
      name: 'Премиум',
      price: '$25/мес',
      features: [
        'Все из Базового',
        'Неограниченный чат с персональным ИИ-коучем',
        'Выбор и загрузка библиотек исследований и знаний',
        'Глубокая персонализация планов',
        'Расширенная аналитика и прогнозы',
        'Приоритетная поддержка',
        'Скидки в магазине (15%)',
        'Интеграции с устройствами',
        'Экспорт данных в PDF/Excel',
      ],
      popular: true,
    },
    {
      id: 'specialist',
      name: 'Для специалистов',
      price: '$49/мес',
      features: [
        'Все из Премиум',
        'Профиль специалиста в каталоге',
        'Управление клиентами и записями',
        'Интеграция календаря',
        'Онлайн консультации',
        'Биллинг и платежи',
        'Аналитика клиентской базы',
        'Маркетинговые инструменты',
      ],
      popular: false,
    },
    {
      id: 'business',
      name: 'Для бизнеса',
      price: 'По запросу',
      features: [
        'Все из Премиум',
        'Управление командой сотрудников',
        'Корпоративные дашборды',
        'Интеграции с HR-системами',
        'Групповые программы здоровья',
        'Аналитика по команде',
        'Персональный менеджер',
        'Кастомные интеграции',
      ],
      popular: false,
    },
    {
      id: 'center',
      name: 'Для центров',
      price: 'По запросу',
      features: [
        'Все из Премиум',
        'Управление абонементами',
        'QR-коды и система входа',
        'Интеграция с расписанием',
        'Управление тренерами',
        'Аналитика посещаемости',
        'Маркетинговые кампании',
        'API интеграции',
      ],
      popular: false,
    },
  ]

  return (
    <section id="subscriptions" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-warmBeige-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
            Подписка на здоровье, которая работает
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto">
            Выберите план, который подходит именно вам
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <NeumorphicCard className={cn('p-4 sm:p-6 lg:p-8 h-full relative flex flex-col', plan.popular && 'ring-2 ring-warmBlue-500')}>
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <NeumorphicBadge className="bg-warmBlue-500 text-white text-xs">
                      Популярный
                    </NeumorphicBadge>
                  </div>
                )}
                <h3 className="text-xl sm:text-2xl font-bold text-warmGraphite-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-warmBlue-600 mb-4 sm:mb-6">
                  {plan.price}
                </p>
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-warmGraphite-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <NeumorphicButton 
                  primary={plan.popular} 
                  className="w-full text-sm sm:text-base"
                  onClick={() => onSubscribe(plan.id)}
                >
                  Получить подписку
                </NeumorphicButton>
              </NeumorphicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
