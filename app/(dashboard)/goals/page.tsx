'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Target, CheckCircle, Circle, Trophy, Plus } from 'lucide-react'

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
  const [goals] = useState<Goal[]>([
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
  ])

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

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-ink-600 hover:text-ink-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-ink-800 mb-2">
                Мои Цели
              </h1>
              <p className="text-ink-600">
                Отслеживание прогресса и достижение целей
              </p>
            </div>
            <button className="px-6 py-3 bg-ink-700 text-white rounded-lg hover:bg-ink-800 transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Новая цель
            </button>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="sketch-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-6 h-6 text-ink-700" />
              <h3 className="text-lg font-semibold text-ink-800">Активных целей</h3>
            </div>
            <div className="text-4xl font-bold text-ink-800">
              {goals.filter((g) => g.status === 'ACTIVE').length}
            </div>
          </div>
          <div className="sketch-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-ink-800">Выполнено</h3>
            </div>
            <div className="text-4xl font-bold text-green-600">
              {goals.filter((g) => g.status === 'COMPLETED').length}
            </div>
          </div>
          <div className="sketch-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-6 h-6 text-yellow-600" />
              <h3 className="text-lg font-semibold text-ink-800">Награды</h3>
            </div>
            <div className="text-4xl font-bold text-yellow-600">
              {goals.reduce((sum, g) => sum + (g.rewardNXT || 0), 0)} NXT
            </div>
          </div>
        </div>

        <div className="sketch-card p-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-ink-800">Награды и трофеи</h2>
            <a className="ink-link text-sm" href="/achievements">
              Открыть достижения
            </a>
          </div>
          <p className="text-sm text-ink-600 mt-2">
            Выполняйте цели, чтобы получать токены и открывать достижения.
          </p>
        </div>

        {/* Список целей */}
        <div className="space-y-6">
          {goals.map((goal) => {
            const progress = getProgress(goal)
            const isCompleted = progress >= 100

            return (
              <div key={goal.id} className="sketch-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-ink-400" />
                      )}
                      <h3 className="text-2xl font-bold text-ink-800">{goal.title}</h3>
                      {goal.rewardNXT && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium flex items-center gap-1">
                          <Trophy className="w-4 h-4" />
                          {goal.rewardNXT} NXT
                        </span>
                      )}
                    </div>
                    <p className="text-ink-600 mb-2">{goal.description}</p>
                    <div className="flex items-center gap-4 text-sm text-ink-500">
                      <span>{getGoalTypeLabel(goal.type)}</span>
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
                    <span className="text-sm font-medium text-ink-700">Прогресс</span>
                    <span className="text-sm font-bold text-ink-800">
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-ink-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all duration-500 ${
                        isCompleted ? 'bg-green-600' : 'bg-ink-700'
                      }`}
                      style={{ width: `${Math.min(100, progress)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-sm text-ink-600">
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
                  <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800 font-semibold">
                      <CheckCircle className="w-5 h-5" />
                      Цель достигнута! Награда начислена.
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}


