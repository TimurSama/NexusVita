'use client'

import Header from '@/components/layout/Header'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function BusinessPlanPage() {
  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4 text-ink-900"
          >
            Бизнес-план Nexus Vita
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-ink-600 max-w-3xl mx-auto"
          >
            Стратегия развития и монетизации экосистемы здоровья
          </motion.p>
        </div>

        {/* Видение и миссия */}
        <section className="mb-16">
          <div className="card card-sketch">
            <h2 className="text-3xl font-bold mb-6 text-center">Видение и миссия</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3">🎯 Миссия</h3>
                <p className="text-ink-700 leading-relaxed">
                  Создать децентрализованную экосистему, которая объединяет пользователей,
                  тренеров, врачей и фитнес-клубы для комплексного подхода к здоровью и
                  благополучию каждого человека.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">👁️ Видение</h3>
                <p className="text-ink-700 leading-relaxed">
                  Стать ведущей платформой для управления здоровьем, где каждый может
                  получить персонализированную поддержку, зарабатывать за активность и
                  участвовать в управлении экосистемой.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Целевая аудитория */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Целевая аудитория</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                segment: 'Пользователи',
                size: '10M+',
                description: 'Люди, заботящиеся о здоровье, спортсмены, восстанавливающиеся после травм',
                needs: ['Отслеживание прогресса', 'Мотивация', 'Доступ к экспертам'],
              },
              {
                segment: 'Тренеры',
                size: '500K+',
                description: 'Фитнес-тренеры, йога-инструкторы, персональные тренеры',
                needs: ['Привлечение клиентов', 'Управление программами', 'Монетизация'],
              },
              {
                segment: 'Локации',
                size: '50K+',
                description: 'Фитнес-клубы, студии, медицинские центры, SPA',
                needs: ['Управление абонементами', 'Аналитика', 'Привлечение клиентов'],
              },
            ].map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card card-sketch"
              >
                <div className="text-4xl font-bold text-accent-turquoise mb-2">
                  {audience.size}
                </div>
                <h3 className="text-xl font-bold mb-2">{audience.segment}</h3>
                <p className="text-ink-600 mb-4">{audience.description}</p>
                <div>
                  <div className="text-sm font-bold mb-2">Потребности:</div>
                  <ul className="space-y-1 text-sm text-ink-700">
                    {audience.needs.map((need, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-accent-turquoise">•</span>
                        {need}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Модель монетизации */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Модель монетизации</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                revenue: 'Подписки',
                amount: '40%',
                description: 'Ежемесячные подписки пользователей и тренеров на премиум-функции',
                examples: ['Премиум для пользователей', 'Профессиональный для тренеров', 'Корпоративный для залов'],
              },
              {
                revenue: 'Комиссии',
                amount: '30%',
                description: 'Комиссия с продаж программ, услуг и товаров на платформе',
                examples: ['Программы тренировок', 'Консультации', 'Товары в магазине'],
              },
              {
                revenue: 'Абонементы',
                amount: '15%',
                description: 'Комиссия с продажи абонементов в фитнес-клубы и локации',
                examples: ['Месячные абонементы', 'Годовые абонементы', 'Разовые посещения'],
              },
              {
                revenue: 'Реклама и партнёрства',
                amount: '10%',
                description: 'Реклама брендов спортпита, оборудования, партнёрские программы',
                examples: ['Брендированный контент', 'Партнёрские программы', 'Спонсорство челленджей'],
              },
              {
                revenue: 'Данные (опционально)',
                amount: '5%',
                description: 'Анонимные агрегированные данные для исследований (с согласия)',
                examples: ['Статистика активности', 'Тренды здоровья', 'Исследования'],
              },
            ].map((stream, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card card-sketch"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold">{stream.revenue}</h3>
                  <div className="text-3xl font-bold text-accent-turquoise">{stream.amount}</div>
                </div>
                <p className="text-ink-600 mb-4">{stream.description}</p>
                <div>
                  <div className="text-sm font-bold mb-2">Примеры:</div>
                  <ul className="space-y-1 text-sm text-ink-700">
                    {stream.examples.map((example, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-accent-turquoise">•</span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Финансовые прогнозы */}
        <section className="mb-16">
          <div className="card card-sketch">
            <h2 className="text-3xl font-bold text-center mb-8">Финансовые прогнозы (3 года)</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-ink-300">
                    <th className="text-left p-4">Год</th>
                    <th className="text-right p-4">Пользователи</th>
                    <th className="text-right p-4">Выручка</th>
                    <th className="text-right p-4">Расходы</th>
                    <th className="text-right p-4">Прибыль</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { year: 1, users: '100K', revenue: '50M ₽', expenses: '40M ₽', profit: '10M ₽' },
                    { year: 2, users: '500K', revenue: '250M ₽', expenses: '180M ₽', profit: '70M ₽' },
                    { year: 3, users: '2M', revenue: '1B ₽', expenses: '650M ₽', profit: '350M ₽' },
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-ink-200">
                      <td className="p-4 font-bold">Год {row.year}</td>
                      <td className="p-4 text-right">{row.users}</td>
                      <td className="p-4 text-right text-green-600 font-bold">{row.revenue}</td>
                      <td className="p-4 text-right text-red-600">{row.expenses}</td>
                      <td className="p-4 text-right text-accent-turquoise font-bold">{row.profit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Конкурентные преимущества */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Конкурентные преимущества</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                advantage: 'Децентрализация',
                description: 'Единственная платформа здоровья на блокчейне с DAO управлением',
              },
              {
                advantage: 'Комплексный подход',
                description: 'Учёт всех аспектов здоровья, а не только тренировок',
              },
              {
                advantage: 'Токеномика',
                description: 'Пользователи зарабатывают за активность, а не только платят',
              },
              {
                advantage: 'Социальность',
                description: 'Сильная социальная составляющая и офлайн-сообщества',
              },
              {
                advantage: 'Модульность',
                description: 'Гибкая система тем и модулей для тренеров',
              },
              {
                advantage: 'Интеграции',
                description: 'Широкие возможности интеграции с внешними сервисами',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="card card-sketch"
              >
                <h3 className="text-xl font-bold mb-2">{item.advantage}</h3>
                <p className="text-ink-700">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Риски и митигация */}
        <section className="mb-16">
          <div className="card card-sketch">
            <h2 className="text-3xl font-bold text-center mb-8">Риски и митигация</h2>
            <div className="space-y-6">
              {[
                {
                  risk: 'Регуляторные ограничения',
                  mitigation: 'Работа с регуляторами, соблюдение GDPR, локализация данных',
                },
                {
                  risk: 'Конкуренция',
                  mitigation: 'Фокус на уникальных преимуществах, быстрое развитие функций',
                },
                {
                  risk: 'Принятие блокчейна',
                  mitigation: 'Гибридный подход: блокчейн опционален, традиционные методы доступны',
                },
                {
                  risk: 'Масштабирование',
                  mitigation: 'Использование Layer 2 решений, оптимизация производительности',
                },
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-bold text-ink-900 mb-1">⚠️ {item.risk}</h3>
                  <p className="text-ink-700">💡 {item.mitigation}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="card card-sketch bg-accent-turquoise bg-opacity-10 text-center">
            <h2 className="text-3xl font-bold mb-4">Готовы присоединиться?</h2>
            <p className="text-lg text-ink-700 mb-6">
              Изучите тарифы и начните использовать Nexus Vita уже сегодня
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/offers" className="button-primary">
                Посмотреть тарифы
              </Link>
              <Link href="/demo" className="button-secondary">
                Попробовать демо
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

