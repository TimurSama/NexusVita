'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, MessageSquare, Users, BarChart3, BookOpen } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicProgress from '@/components/ui/NeumorphicProgress'
import InteractiveDashboard from './InteractiveDashboard'

interface DashboardPreviewSectionProps {
  onTryClick: () => void
  onSubscribeClick: () => void
}

export default function DashboardPreviewSection({ onTryClick, onSubscribeClick }: DashboardPreviewSectionProps) {
  const [showFullDashboard, setShowFullDashboard] = useState(false)
  const [planCoverage, setPlanCoverage] = useState({
    training: 0,
    recovery: 0,
    psyche: 0,
  })

  // Простейший превью-график на основе сохранённого демо-плана
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const rawPlans = window.localStorage.getItem('nv_demo_plans')
      if (!rawPlans) return
      const plans = JSON.parse(rawPlans) as Array<{
        schedule: { type: string }[]
      }>
      const last = plans[plans.length - 1]
      if (!last) return
      const schedule = last.schedule || []
      const total = schedule.length || 1
      const training = schedule.filter((s) => s.type === 'training').length
      const recovery = schedule.filter((s) =>
        ['activity', 'recovery'].includes(s.type)
      ).length
      const psyche = schedule.filter((s) => s.type === 'mental').length

      setPlanCoverage({
        training: Math.round((training / total) * 100),
        recovery: Math.round((recovery / total) * 100),
        psyche: Math.round((psyche / total) * 100),
      })
    } catch {
      // ignore
    }
  }, [])

  return (
    <section id="dashboard" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-warmBeige-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
            Персональный дашборд здоровья
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto mb-6">
            Ежедневник, цели, планы, календарь, отслеживание метрик и рекомендации ИИ — всё в одном месте
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <NeumorphicButton primary onClick={() => setShowFullDashboard(true)}>
              <BarChart3 className="w-4 h-4 mr-2" />
              Посмотреть дашборд
            </NeumorphicButton>
            <NeumorphicButton onClick={onTryClick}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Попробовать бесплатно
            </NeumorphicButton>
          </div>
        </motion.div>

        {showFullDashboard ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <NeumorphicCard className="p-4 sm:p-6 lg:p-8">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold text-warmGraphite-800">
                  Интерактивный дашборд (демо)
                </h3>
                <NeumorphicButton onClick={() => setShowFullDashboard(false)} className="p-2">
                  Свернуть
                </NeumorphicButton>
              </div>
              <InteractiveDashboard 
                onGoalAdd={() => console.log('Goal added')}
                onJournalEntry={() => console.log('Journal entry added')}
                onPlanCreate={onTryClick}
              />
            </NeumorphicCard>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: <BookOpen className="w-8 h-8 sm:w-10 sm:h-10" />,
                title: 'Ежедневник',
                description: 'Записывайте самочувствие, настроение, энергию и заметки. ИИ анализирует паттерны и даёт рекомендации.',
                features: ['Заметки о дне', 'Трекинг настроения', 'Уровень энергии', 'Анализ паттернов'],
                color: 'warmGreen',
              },
              {
                icon: <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" />,
                title: 'ИИ-рекомендации',
                description: 'Персональный ИИ-коуч анализирует ваши данные и даёт рекомендации по здоровью, тренировкам и питанию.',
                features: ['Анализ данных', 'Персональные советы', 'Прогнозы', 'Адаптивные планы'],
                color: 'warmBlue',
              },
              {
                icon: <Users className="w-8 h-8 sm:w-10 sm:h-10" />,
                title: 'Специалисты',
                description: 'Подключайте тренеров, врачей и коучей. Они видят ваши данные и могут давать персональные рекомендации.',
                features: ['Онлайн консультации', 'Доступ к данным', 'Персональные планы', 'История сессий'],
                color: 'warmPurple',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <NeumorphicCard className="p-4 sm:p-6 h-full cursor-pointer hover:scale-105 transition-transform" onClick={() => setShowFullDashboard(true)}>
                  <div className={`text-${feature.color}-500 mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-warmGraphite-600 mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-warmGraphite-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-warmBlue-500"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <NeumorphicButton className="w-full text-sm sm:text-base">
                    Попробовать
                  </NeumorphicButton>
                </NeumorphicCard>
              </motion.div>
            ))}
          </div>
        )}

        {/* Превью-график плана */}
        {!showFullDashboard && (
          <div className="mt-8">
            <NeumorphicCard className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-warmGraphite-800 mb-3">
                Превью вашего плана (демо)
              </h3>
              <p className="text-xs sm:text-sm text-warmGraphite-600 mb-4 max-w-xl">
                На основе ответов в презентации и интерактивов по тренировкам/питанию мы
                собираем примерный баланс между тренировками, восстановлением и
                психо‑эмоциональными практиками. В рабочем продукте эти графики будут
                строиться на реальных данных.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <p className="text-xs sm:text-sm text-warmGraphite-700 mb-1">
                    Тренировки
                  </p>
                  <NeumorphicProgress
                    value={planCoverage.training}
                    showLabel
                    color="blue"
                    size="sm"
                    label={`${planCoverage.training || 0}% дней`}
                  />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-warmGraphite-700 mb-1">
                    Восстановление и активный отдых
                  </p>
                  <NeumorphicProgress
                    value={planCoverage.recovery}
                    showLabel
                    color="green"
                    size="sm"
                    label={`${planCoverage.recovery || 0}% дней`}
                  />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-warmGraphite-700 mb-1">
                    Психо‑эмоциональные практики
                  </p>
                  <NeumorphicProgress
                    value={planCoverage.psyche}
                    showLabel
                    color="pink"
                    size="sm"
                    label={`${planCoverage.psyche || 0}% дней`}
                  />
                </div>
              </div>
            </NeumorphicCard>
          </div>
        )}
      </div>
    </section>
  )
}
