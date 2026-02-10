'use client'

import { motion } from 'framer-motion'
import { Rocket, Globe2, Layers } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'

export default function GrowthStrategySection() {
  return (
    <section
      id="growth-strategy"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-warmBeige-50"
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
            Стратегия роста и масштабирования
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto">
            От MVP к экосистемной платформе: поэтапное расширение функционала, рынков и
            партнёрств.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <NeumorphicCard className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Rocket className="w-5 h-5 text-warmBlue-500" />
              <h3 className="text-lg font-semibold text-warmGraphite-800">
                Фазы развития
              </h3>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-warmGraphite-700">
              <li>• Запуск MVP с ключевыми модулями.</li>
              <li>• Расширение функциональности и ИИ‑слоя.</li>
              <li>• Выход на новые сегменты и рынки.</li>
              <li>• Формирование экосистемных партнёрств.</li>
            </ul>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Globe2 className="w-5 h-5 text-warmGreen-500" />
              <h3 className="text-lg font-semibold text-warmGraphite-800">
                Географическое масштабирование
              </h3>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-warmGraphite-700">
              <li>• Адаптация под локальные рынки и языки.</li>
              <li>• Учет регуляторных требований (данные, медицина).</li>
              <li>• Локальные партнёрства с центрами и брендами.</li>
              <li>• Масштабирование без изменения архитектурного ядра.</li>
            </ul>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-5 h-5 text-warmPurple-500" />
              <h3 className="text-lg font-semibold text-warmGraphite-800">
                Расширение экосистемы
              </h3>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-warmGraphite-700">
              <li>
                • Добавление новых вертикалей (корпоративное здоровье, образование и
                др.).
              </li>
              <li>• Развитие B2B‑направлений и корпоративных решений.</li>
              <li>• Открытие API для сторонних разработчиков.</li>
              <li>• Переход от продукта к полноценной платформе.</li>
            </ul>
          </NeumorphicCard>
        </div>
      </div>
    </section>
  )
}

