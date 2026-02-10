'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, CheckCircle, MessageSquare, TrendingUp, BarChart3 } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicProgress from '@/components/ui/NeumorphicProgress'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import { InteractiveMetric } from './InteractiveElements'

interface AIPlannerSectionProps {
  onTryClick: () => void
}

export default function AIPlannerSection({ onTryClick }: AIPlannerSectionProps) {
  const [showInteractiveDemo, setShowInteractiveDemo] = useState(false)
  const [userGoal, setUserGoal] = useState('')
  const [metrics, setMetrics] = useState({
    steps: 8240,
    calories: 1850,
    sleep: 7.5,
  })

  const demoMetrics = [
    { label: 'Шаги', value: metrics.steps, target: 10000, icon: <TrendingUp className="w-5 h-5" />, color: 'warmBlue' },
    { label: 'Калории', value: metrics.calories, target: 2000, icon: <BarChart3 className="w-5 h-5" />, color: 'warmGreen' },
    { label: 'Сон', value: metrics.sleep, target: 8, icon: <MessageSquare className="w-5 h-5" />, color: 'warmPurple' },
  ]

  return (
    <section id="ai-planner" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
            ИИ, который заботится о твоем прогрессе
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto">
            Введите цели, предпочтения и ограничения — ИИ создаст персональный план тренировок, питания и восстановления
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <NeumorphicCard className="p-6 sm:p-8">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-warmBlue-500" />
              <h3 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
                Персональный ИИ-планировщик
              </h3>
            </div>
            <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {[
                'Автоматическое планирование тренировок',
                'Персональные планы питания',
                'Динамическая корректировка',
                'Синхронизация с устройствами',
                'Анализ паттернов и рекомендации',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-warmGraphite-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-2">
              <NeumorphicButton primary onClick={onTryClick} className="flex-1 sm:flex-none">
                <MessageSquare className="w-4 h-4 mr-2" />
                Попробовать ИИ-планировщик
              </NeumorphicButton>
              <NeumorphicButton onClick={() => setShowInteractiveDemo(!showInteractiveDemo)} className="flex-1 sm:flex-none">
                {showInteractiveDemo ? 'Скрыть демо' : 'Интерактивное демо'}
              </NeumorphicButton>
            </div>
          </NeumorphicCard>

          <NeumorphicCard className="p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-4">
              {showInteractiveDemo ? 'Интерактивное демо метрик' : 'Пример дашборда'}
            </h3>
            <AnimatePresence>
              {showInteractiveDemo ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <NeumorphicInput
                    placeholder="Введите вашу цель (например: снизить вес на 5 кг)"
                    value={userGoal}
                    onChange={(e) => setUserGoal(e.target.value)}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {demoMetrics.map((metric, index) => (
                      <InteractiveMetric
                        key={index}
                        metric={metric}
                        onUpdate={(value) => {
                          const key = metric.label === 'Шаги' ? 'steps' : metric.label === 'Калории' ? 'calories' : 'sleep'
                          setMetrics(prev => ({ ...prev, [key]: value }))
                        }}
                      />
                    ))}
                  </div>
                  {userGoal && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 rounded-2xl bg-warmBlue-50 border border-warmBlue-200"
                    >
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-5 h-5 text-warmBlue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-warmGraphite-800 mb-1">Рекомендация ИИ:</h4>
                          <p className="text-sm text-warmGraphite-700">
                            Для достижения цели "{userGoal}" рекомендую увеличить активность до 10,000 шагов в день и следить за калориями.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3 sm:space-y-4"
                >
                  {[
                    { label: 'Калории', value: '1850', target: '2000', color: 'warmGreen' },
                    { label: 'Шаги', value: '8240', target: '10000', color: 'warmBlue' },
                    { label: 'Сон', value: '7.5ч', target: '8ч', color: 'warmPurple' },
                    { label: 'Тренировки', value: '3', target: '4', color: 'warmOrange' },
                  ].map((metric, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2 text-sm sm:text-base">
                        <span className="text-warmGraphite-700 font-medium">{metric.label}</span>
                        <span className="text-warmGraphite-600">
                          {metric.value} / {metric.target}
                        </span>
                      </div>
                      <NeumorphicProgress
                        value={(parseInt(metric.value) / parseInt(metric.target)) * 100}
                        className="h-2 sm:h-3"
                      />
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </NeumorphicCard>
        </div>
      </div>
    </section>
  )
}
