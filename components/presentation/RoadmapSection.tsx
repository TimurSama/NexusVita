'use client'

import { motion } from 'framer-motion'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import { CheckCircle, Clock } from 'lucide-react'

export default function RoadmapSection() {
  const roadmap = [
    {
      quarter: 'Q1 2025',
      title: 'Запуск и первые пользователи',
      items: [
        { text: 'Завершение MVP', done: true },
        { text: 'Публичный лендинг', done: true },
        { text: 'Система онбординга', done: true },
        { text: 'Запуск токенсейла (ранние инвесторы)', done: false },
        { text: 'Первые 100 бета-тестеров', done: false },
        { text: 'Партнерство с 3 клиниками (FHIR интеграция)', done: false },
        { text: 'Интеграция с 2 фитнес-клубами', done: false },
        { text: 'Мобильное приложение (iOS beta)', done: false },
        { text: 'Публичный запуск', done: false },
        { text: '1000+ зарегистрированных пользователей', done: false },
      ],
    },
    {
      quarter: 'Q2 2025',
      title: 'Масштабирование',
      items: [
        { text: 'Партнерства с 10+ клиниками', done: false },
        { text: 'Интеграция с 5+ фитнес-клубами', done: false },
        { text: 'Android приложение', done: false },
        { text: 'Расширение библиотеки знаний (100+ материалов)', done: false },
        { text: 'Интеграция с Apple Health (нативный SDK)', done: false },
        { text: 'Расширение AI Health+ функционала', done: false },
        { text: 'Система групповых занятий', done: false },
        { text: '5,000+ пользователей', done: false },
        { text: 'Международные платежи (Stripe Connect)', done: false },
        { text: 'Мультиязычность (EN, RU)', done: false },
        { text: '10,000+ пользователей', done: false },
      ],
    },
    {
      quarter: 'Q3 2025',
      title: 'Развитие экосистемы',
      items: [
        { text: 'Запуск DAO-управления', done: false },
        { text: 'Токенсейл для широкой публики', done: false },
        { text: 'Интеграция с криптобиржами', done: false },
        { text: 'Расширение команды (20+ человек)', done: false },
        { text: 'Интеграция с 20+ клиниками', done: false },
        { text: 'Партнерства с производителями БАДов', done: false },
        { text: 'Система сертификации специалистов', done: false },
        { text: '25,000+ пользователей', done: false },
        { text: 'Расширение на страны СНГ', done: false },
        { text: 'Локализация для Казахстана, Беларуси', done: false },
        { text: '50,000+ пользователей', done: false },
      ],
    },
    {
      quarter: 'Q4 2025',
      title: 'Международная экспансия',
      items: [
        { text: 'Выход на европейский рынок', done: false },
        { text: 'Соответствие GDPR', done: false },
        { text: 'Партнерства с европейскими клиниками', done: false },
        { text: '100,000+ пользователей', done: false },
        { text: 'Series A раунд ($5M)', done: false },
        { text: 'Расширение команды (50+ человек)', done: false },
        { text: 'Открытие офисов в Европе', done: false },
        { text: '200,000+ пользователей', done: false },
        { text: '$1M+ ARR', done: false },
      ],
    },
  ]

  return (
    <section id="roadmap" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-warmBeige-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
            Дорожная карта развития
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto">
            Планы развития платформы на 2025 год
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
              <NeumorphicCard className="p-4 sm:p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-warmGraphite-800">
                    {quarter.quarter}
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-warmGraphite-600 mb-4">
                  {quarter.title}
                </p>
                <ul className="space-y-2">
                  {quarter.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm sm:text-base">
                      {item.done ? (
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-warmGraphite-400 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={item.done ? 'text-warmGraphite-700 line-through' : 'text-warmGraphite-700'}>
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
