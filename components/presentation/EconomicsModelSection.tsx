'use client'

import { motion } from 'framer-motion'
import { CreditCard, Stethoscope, Users, Sparkles } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'

export default function EconomicsModelSection() {
  return (
    <section
      id="economics-model"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10 lg:mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
            Экономическая модель и монетизация
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto">
            Комбинированная модель: подписки пользователей, доходы от специалистов,
            партнёрства и экосистемные вознаграждения.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <NeumorphicCard className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-5 h-5 text-warmBlue-500" />
              <h3 className="text-lg font-semibold text-warmGraphite-800">
                Пользовательские подписки
              </h3>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-warmGraphite-700">
              <li>• Базовый бесплатный доступ.</li>
              <li>• Премиальные уровни с ИИ и расширенной аналитикой.</li>
              <li>• Специализированные пакеты (спорт, реабилитация, корпоративные).</li>
            </ul>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Stethoscope className="w-5 h-5 text-warmGreen-500" />
              <h3 className="text-lg font-semibold text-warmGraphite-800">
                Доходы от специалистов
              </h3>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-warmGraphite-700">
              <li>• Подписка на профессиональные аккаунты.</li>
              <li>• Комиссии с оказанных услуг и программ.</li>
              <li>• Продвижение методик и курсов.</li>
            </ul>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-warmOrange-500" />
              <h3 className="text-lg font-semibold text-warmGraphite-800">
                Партнёрские доходы
              </h3>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-warmGraphite-700">
              <li>• Комиссионные с продаж услуг и продуктов.</li>
              <li>• Брендированные программы и экосистемные инициативы.</li>
              <li>• Интеграционные решения для центров и компаний.</li>
            </ul>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-warmPurple-500" />
              <h3 className="text-lg font-semibold text-warmGraphite-800">
                Экосистемные вознаграждения
              </h3>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-warmGraphite-700">
              <li>• Балльные системы и геймификация.</li>
              <li>• Токенизированные вознаграждения (опционально).</li>
              <li>• Реферальные программы для пользователей и партнёров.</li>
            </ul>
          </NeumorphicCard>
        </div>

        <p className="mt-6 text-xs sm:text-sm text-center text-warmGraphite-500 max-w-3xl mx-auto">
          Модель ориентирована на устойчивые повторяющиеся доходы, рост LTV и усиление
          экосистемы за счёт вовлечённости всех участников.
        </p>
      </div>
    </section>
  )
}

