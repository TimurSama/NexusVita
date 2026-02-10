'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Clock, Calendar } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import { cn } from '@/lib/utils/cn'
import { useI18n } from '@/lib/i18n/I18nProvider'

interface TimelineItem {
  quarter: string
  title: string
  items: Array<{ text: string; done: boolean }>
}

export default function InteractiveTimeline() {
  const { lang } = useI18n()
  const [selectedQuarter, setSelectedQuarter] = useState<string | null>(null)

  const roadmap: TimelineItem[] = [
    {
      quarter: 'Q1 2025',
      title: lang === 'en' ? 'Launch and first users' : 'Запуск и первые пользователи',
      items: [
        { text: lang === 'en' ? 'Complete MVP' : 'Завершение MVP', done: true },
        { text: lang === 'en' ? 'Public landing' : 'Публичный лендинг', done: true },
        { text: lang === 'en' ? 'Onboarding system' : 'Система онбординга', done: true },
        { text: lang === 'en' ? 'First 100 beta testers' : 'Первые 100 бета-тестеров', done: false },
        { text: lang === 'en' ? 'Public launch' : 'Публичный запуск', done: false },
      ],
    },
    {
      quarter: 'Q2 2025',
      title: lang === 'en' ? 'Scaling' : 'Масштабирование',
      items: [
        { text: lang === 'en' ? 'Partnerships with 10+ clinics' : 'Партнерства с 10+ клиниками', done: false },
        { text: lang === 'en' ? 'Android app' : 'Android приложение', done: false },
        { text: lang === 'en' ? '10,000+ users' : '10,000+ пользователей', done: false },
        { text: lang === 'en' ? 'Multilingual support (EN, RU)' : 'Мультиязычность (EN, RU)', done: false },
      ],
    },
    {
      quarter: 'Q3 2025',
      title: lang === 'en' ? 'Ecosystem development' : 'Развитие экосистемы',
      items: [
        { text: lang === 'en' ? 'DAO governance launch' : 'Запуск DAO-управления', done: false },
        { text: lang === 'en' ? '25,000+ users' : '25,000+ пользователей', done: false },
        { text: lang === 'en' ? 'Expansion to CIS countries' : 'Расширение на страны СНГ', done: false },
      ],
    },
    {
      quarter: 'Q4 2025',
      title: lang === 'en' ? 'International expansion' : 'Международная экспансия',
      items: [
        { text: lang === 'en' ? 'European market entry' : 'Выход на европейский рынок', done: false },
        { text: lang === 'en' ? '100,000+ users' : '100,000+ пользователей', done: false },
        { text: lang === 'en' ? 'Series A round ($5M)' : 'Series A раунд ($5M)', done: false },
      ],
    },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
            {lang === 'en' ? 'Development Roadmap' : 'Дорожная карта развития'}
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto">
            {lang === 'en'
              ? 'Platform development plans for 2025'
              : 'Планы развития платформы на 2025 год'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {roadmap.map((quarter, index) => (
            <motion.div
              key={quarter.quarter}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <NeumorphicCard
                className={cn(
                  'p-4 sm:p-6 h-full cursor-pointer transition-all',
                  selectedQuarter === quarter.quarter && 'ring-2 ring-warmBlue-500'
                )}
                onClick={() =>
                  setSelectedQuarter(
                    selectedQuarter === quarter.quarter ? null : quarter.quarter
                  )
                }
              >
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-warmBlue-500" />
                  <h3 className="text-xl sm:text-2xl font-bold text-warmGraphite-800">
                    {quarter.quarter}
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-warmGraphite-600 mb-4">
                  {quarter.title}
                </p>
                <ul className="space-y-2">
                  {quarter.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm sm:text-base"
                    >
                      {item.done ? (
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-warmGraphite-400 mt-0.5 flex-shrink-0" />
                      )}
                      <span
                        className={cn(
                          item.done
                            ? 'text-warmGraphite-700 line-through'
                            : 'text-warmGraphite-700'
                        )}
                      >
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </NeumorphicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
