'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Target, CheckCircle, Circle, Trophy, Plus, TrendingUp, BarChart3 } from 'lucide-react'
import { motion } from 'framer-motion'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicProgress from '@/components/ui/NeumorphicProgress'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import NeumorphicChart from '@/components/ui/NeumorphicChart'
import NeumorphicTabs from '@/components/ui/NeumorphicTabs'
import { generateMockGoals, generateMockMetrics } from '@/lib/mocks/data-generators'
import { cn } from '@/lib/utils/cn'

interface Goal {
  id: string
  title: string
  description: string
  type: string
  targetValue: number
  currentValue: number
  deadline: string | null
  status: string
  rewardNXT: number | null
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [metrics, setMetrics] = useState(generateMockMetrics(30))

  useEffect(() => {
    // Инициализация с моками
    const mockGoals = generateMockGoals(5)
    const initialGoals: Goal[] = [
      {
        id: '1',
        title: 'Сбросить 5 кг',
        description: 'Достичь веса 70 кг к концу месяца',
        type: 'WEIGHT_LOSS',
        targetValue: 70,
        currentValue: 75.5,
        deadline: '2024-02-29',
        status: 'ACTIVE',
        rewardNXT: 100,
      },
      {
        id: '2',
        title: '30 дней тренировок',
        description: 'Тренироваться минимум 4 раза в неделю',
        type: 'CONSISTENCY',
        targetValue: 30,
        currentValue: 12,
        deadline: '2024-02-15',
        status: 'ACTIVE',
        rewardNXT: 150,
      },
      {
        id: '3',
        title: 'Набрать 5 кг мышечной массы',
        description: 'Увеличить мышечную массу до 65 кг',
        type: 'MUSCLE_GAIN',
        targetValue: 65,
        currentValue: 60,
        deadline: '2024-03-31',
        status: 'ACTIVE',
        rewardNXT: 200,
      },
      ...mockGoals.map((mg) => ({
        id: mg.id,
        title: mg.title,
        description: `Достичь ${mg.target} ${mg.unit}`,
        type: mg.title.includes('вес') ? 'WEIGHT_LOSS' : 'CONSISTENCY',
        targetValue: mg.target,
        currentValue: mg.current,
        deadline: mg.deadline.toISOString().split('T')[0],
        status: mg.status.toUpperCase() as any,
        rewardNXT: Math.floor(Math.random() * 200) + 50,
      })),
    ]
    setGoals(initialGoals)
  }, [])

  const getGoalTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      WEIGHT_LOSS: 'Снижение веса',
      WEIGHT_GAIN: 'Набор веса',
      MUSCLE_GAIN: 'Набор мышечной массы',
      FAT_LOSS: 'Снижение жира',
      STRENGTH: 'Сила',
      ENDURANCE: 'Выносливость',
      CONSISTENCY: 'Регулярность',
      OTHER: 'Другое',
    }
    return labels[type] || type
  }

  const getProgress = (goal: Goal) => {
    if (goal.type === 'CONSISTENCY') {
      return (goal.currentValue / goal.targetValue) * 100
    }
    const totalChange = Math.abs(goal.targetValue - (goal.currentValue - (goal.targetValue - goal.currentValue)))
    const currentChange = Math.abs(goal.currentValue - goal.targetValue)
    return Math.max(0, Math.min(100, ((totalChange - currentChange) / totalChange) * 100))
  }

  const activeGoals = goals.filter((g) => g.status === 'ACTIVE').length
  const completedGoals = goals.filter((g) => g.status === 'COMPLETED').length
  const totalRewards = goals.reduce((sum, g) => sum + (g.rewardNXT || 0), 0)

  return (
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="mb-6 sm:mb-8 animate-fadeIn">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-warmBlue-600 hover:text-warmBlue-700 mb-4 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800 mb-2">
                Мои Цели
              </h1>
              <p className="text-base sm:text-lg text-warmGraphite-600">
                Отслеживание прогресса и достижение целей
              </p>
            </div>
            <NeumorphicButton primary>
              <Plus className="w-4 h-4 mr-2" />
              Новая цель
            </NeumorphicButton>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 neumorphic-card-soft rounded-neumorphic-sm">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-warmBlue-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-warmGraphite-800">
                Активных целей
              </h3>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-warmGraphite-800">
              {activeGoals}
            </div>
          </NeumorphicCard>
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 neumorphic-card-soft rounded-neumorphic-sm">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-warmGreen-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-warmGraphite-800">
                Выполнено
              </h3>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-warmGreen-600">
              {completedGoals}
            </div>
          </NeumorphicCard>
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 neumorphic-card-soft rounded-neumorphic-sm">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-warmPink-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-warmGraphite-800">
                Награды
              </h3>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-warmPink-600">
              {totalRewards} NXT
            </div>
          </NeumorphicCard>
        </div>

        <NeumorphicCard className="p-4 sm:p-6 mb-6 sm:mb-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
              Награды и трофеи
            </h2>
            <Link
              href="/achievements"
              className="text-sm text-warmBlue-600 hover:text-warmBlue-700 font-medium transition-colors"
            >
              Открыть достижения →
            </Link>
          </div>
          <p className="text-sm text-warmGraphite-600 mt-2">
            Выполняйте цели, чтобы получать токены и открывать достижения.
          </p>
        </NeumorphicCard>

        {/* График прогресса всех целей */}
        <NeumorphicCard className="p-4 sm:p-6 mb-6 sm:mb-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-warmBlue-600" />
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
              Общий прогресс
            </h2>
          </div>
          <NeumorphicChart
            type="bar"
            data={goals.map((g) => ({
              label: g.title.substring(0, 15) + (g.title.length > 15 ? '...' : ''),
              value: getProgress(g),
            }))}
            height={200}
            showLabels={true}
          />
        </NeumorphicCard>

        {/* Список целей */}
        <NeumorphicTabs
          tabs={[
            {
              id: 'all',
              label: 'Все цели',
              content: (
                <div className="space-y-4 sm:space-y-6 mt-4">
                  {goals.map((goal, index) => {
                    const progress = getProgress(goal)
                    const isCompleted = progress >= 100

                    return (
                      <motion.div
                        key={goal.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <NeumorphicCard
                          className="p-4 sm:p-6 hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                          onClick={() => setSelectedGoal(goal)}
                        >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-warmGreen-600 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 sm:w-6 sm:h-6 text-warmGray-400 flex-shrink-0" />
                      )}
                      <h3 className="text-xl sm:text-2xl font-bold text-warmGraphite-800">
                        {goal.title}
                      </h3>
                      {goal.rewardNXT && (
                        <NeumorphicBadge variant="warning" size="sm" className="flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          {goal.rewardNXT} NVT
                        </NeumorphicBadge>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-warmGraphite-600 mb-2">
                      {goal.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs sm:text-sm text-warmGray-600 flex-wrap">
                      <NeumorphicBadge variant="info" size="sm">
                        {getGoalTypeLabel(goal.type)}
                      </NeumorphicBadge>
                      {goal.deadline && (
                        <span>
                          До: {new Date(goal.deadline).toLocaleDateString('ru-RU')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Прогресс */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-warmGraphite-700">Прогресс</span>
                    <span className="text-sm font-bold text-warmGraphite-800">
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                  <NeumorphicProgress
                    value={progress}
                    max={100}
                    color={isCompleted ? 'green' : 'blue'}
                    size="md"
                    showLabel={false}
                  />
                  <div className="flex items-center justify-between mt-2 text-xs sm:text-sm text-warmGray-600">
                    <span>
                      Текущее: {goal.currentValue}
                      {goal.type !== 'CONSISTENCY' && ' кг'}
                      {goal.type === 'CONSISTENCY' && ' дней'}
                    </span>
                    <span>
                      Цель: {goal.targetValue}
                      {goal.type !== 'CONSISTENCY' && ' кг'}
                      {goal.type === 'CONSISTENCY' && ' дней'}
                    </span>
                  </div>
                </div>

                          {isCompleted && (
                            <NeumorphicCard
                              soft
                              className="mt-4 p-4 bg-warmGreen-50/50 border-2 border-warmGreen-200"
                            >
                              <div className="flex items-center gap-2 text-warmGreen-800 font-semibold">
                                <CheckCircle className="w-5 h-5" />
                                Цель достигнута! Награда начислена.
                              </div>
                            </NeumorphicCard>
                          )}
                        </NeumorphicCard>
                      </motion.div>
                    )
                  })}
                </div>
              ),
            },
            {
              id: 'active',
              label: 'Активные',
              content: (
                <div className="space-y-4 sm:space-y-6 mt-4">
                  {goals
                    .filter((g) => g.status === 'ACTIVE')
                    .map((goal, index) => {
                      const progress = getProgress(goal)
                      return (
                        <motion.div
                          key={goal.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <NeumorphicCard
                            className="p-4 sm:p-6 hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                            onClick={() => setSelectedGoal(goal)}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                  <Circle className="w-5 h-5 sm:w-6 sm:h-6 text-warmGray-400 flex-shrink-0" />
                                  <h3 className="text-xl sm:text-2xl font-bold text-warmGraphite-800">
                                    {goal.title}
                                  </h3>
                                  {goal.rewardNXT && (
                                    <NeumorphicBadge variant="warning" size="sm" className="flex items-center gap-1">
                                      <Trophy className="w-3 h-3" />
                                      {goal.rewardNXT} NVT
                                    </NeumorphicBadge>
                                  )}
                                </div>
                                <p className="text-sm sm:text-base text-warmGraphite-600 mb-2">
                                  {goal.description}
                                </p>
                                <div className="flex items-center gap-4 text-xs sm:text-sm text-warmGray-600 flex-wrap">
                                  <NeumorphicBadge variant="info" size="sm">
                                    {getGoalTypeLabel(goal.type)}
                                  </NeumorphicBadge>
                                  {goal.deadline && (
                                    <span>
                                      До: {new Date(goal.deadline).toLocaleDateString('ru-RU')}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-warmGraphite-700">Прогресс</span>
                                <span className="text-sm font-bold text-warmGraphite-800">
                                  {progress.toFixed(0)}%
                                </span>
                              </div>
                              <NeumorphicProgress
                                value={progress}
                                max={100}
                                color="blue"
                                size="md"
                                showLabel={false}
                              />
                              <div className="flex items-center justify-between mt-2 text-xs sm:text-sm text-warmGray-600">
                                <span>
                                  Текущее: {goal.currentValue}
                                  {goal.type !== 'CONSISTENCY' && ' кг'}
                                  {goal.type === 'CONSISTENCY' && ' дней'}
                                </span>
                                <span>
                                  Цель: {goal.targetValue}
                                  {goal.type !== 'CONSISTENCY' && ' кг'}
                                  {goal.type === 'CONSISTENCY' && ' дней'}
                                </span>
                              </div>
                            </div>
                          </NeumorphicCard>
                        </motion.div>
                      )
                    })}
                </div>
              ),
            },
            {
              id: 'completed',
              label: 'Завершенные',
              content: (
                <div className="space-y-4 sm:space-y-6 mt-4">
                  {goals
                    .filter((g) => g.status === 'COMPLETED')
                    .map((goal, index) => {
                      const progress = 100
                      return (
                        <motion.div
                          key={goal.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <NeumorphicCard className="p-4 sm:p-6 hover:scale-[1.01] transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-warmGreen-600 flex-shrink-0" />
                                  <h3 className="text-xl sm:text-2xl font-bold text-warmGraphite-800">
                                    {goal.title}
                                  </h3>
                                  {goal.rewardNXT && (
                                    <NeumorphicBadge variant="success" size="sm" className="flex items-center gap-1">
                                      <Trophy className="w-3 h-3" />
                                      {goal.rewardNXT} NVT получено
                                    </NeumorphicBadge>
                                  )}
                                </div>
                                <p className="text-sm sm:text-base text-warmGraphite-600 mb-2">
                                  {goal.description}
                                </p>
                              </div>
                            </div>
                            <NeumorphicProgress
                              value={progress}
                              max={100}
                              color="green"
                              size="md"
                              showLabel={false}
                            />
                            <NeumorphicCard
                              soft
                              className="mt-4 p-4 bg-warmGreen-50/50 border-2 border-warmGreen-200"
                            >
                              <div className="flex items-center gap-2 text-warmGreen-800 font-semibold">
                                <CheckCircle className="w-5 h-5" />
                                Цель достигнута! Награда начислена.
                              </div>
                            </NeumorphicCard>
                          </NeumorphicCard>
                        </motion.div>
                      )
                    })}
                  {goals.filter((g) => g.status === 'COMPLETED').length === 0 && (
                    <div className="text-center text-warmGraphite-600 py-8">
                      Завершенных целей пока нет
                    </div>
                  )}
                </div>
              ),
            },
            {
              id: 'analytics',
              label: 'Аналитика',
              icon: <TrendingUp className="w-4 h-4" />,
              content: (
                <div className="mt-4 space-y-4">
                  <NeumorphicChart
                    type="line"
                    data={metrics.slice(0, 7).map((m) => ({
                      label: m.label,
                      value: m.value,
                    }))}
                    title="Динамика метрик за неделю"
                    height={250}
                  />
                  <NeumorphicChart
                    type="bar"
                    data={goals.map((g) => ({
                      label: g.title.substring(0, 10),
                      value: getProgress(g),
                    }))}
                    title="Прогресс по целям"
                    height={200}
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  )
}
