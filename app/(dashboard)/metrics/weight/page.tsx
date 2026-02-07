'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, Plus } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicProgress from '@/components/ui/NeumorphicProgress'
import { cn } from '@/lib/utils/cn'

export default function WeightPage() {
  const [currentWeight, setCurrentWeight] = useState(75.5)
  const [targetWeight, setTargetWeight] = useState(70)
  const [weightHistory] = useState([
    { date: '2024-01-01', weight: 78.0 },
    { date: '2024-01-08', weight: 77.2 },
    { date: '2024-01-15', weight: 76.5 },
    { date: '2024-01-22', weight: 75.5 },
  ])

  const weightChange = currentWeight - weightHistory[0].weight
  const progressToGoal =
    ((currentWeight - targetWeight) / (weightHistory[0].weight - targetWeight)) * 100

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
                Отслеживание Веса
              </h1>
              <p className="text-base sm:text-lg text-warmGraphite-600">
                Мониторинг изменений веса и прогресса к цели
              </p>
            </div>
            <NeumorphicButton primary>
              <Plus className="w-4 h-4 mr-2" />
              Добавить замер
            </NeumorphicButton>
          </div>
        </div>

        {/* Текущий вес и статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-xs sm:text-sm font-medium text-warmGray-600 mb-2 uppercase tracking-wide">
              Текущий вес
            </h3>
            <div className="text-3xl sm:text-4xl font-bold text-warmGraphite-800">
              {currentWeight} <span className="text-xl sm:text-2xl">кг</span>
            </div>
          </NeumorphicCard>
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xs sm:text-sm font-medium text-warmGray-600 mb-2 uppercase tracking-wide">
              Целевой вес
            </h3>
            <div className="text-3xl sm:text-4xl font-bold text-warmGraphite-800">
              {targetWeight} <span className="text-xl sm:text-2xl">кг</span>
            </div>
          </NeumorphicCard>
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xs sm:text-sm font-medium text-warmGray-600 mb-2 uppercase tracking-wide flex items-center gap-2">
              Изменение
              {weightChange < 0 ? (
                <TrendingDown className="w-4 h-4 text-warmGreen-600" />
              ) : (
                <TrendingUp className="w-4 h-4 text-warmRed-600" />
              )}
            </h3>
            <div
              className={cn(
                'text-3xl sm:text-4xl font-bold',
                weightChange < 0 ? 'text-warmGreen-600' : 'text-warmRed-600'
              )}
            >
              {weightChange > 0 ? '+' : ''}
              {weightChange.toFixed(1)} <span className="text-xl sm:text-2xl">кг</span>
            </div>
          </NeumorphicCard>
        </div>

        {/* Прогресс к цели */}
        <NeumorphicCard className="p-4 sm:p-6 mb-6 sm:mb-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-4">
            Прогресс к цели
          </h3>
          <NeumorphicProgress
            value={Math.max(0, Math.min(100, 100 - progressToGoal))}
            max={100}
            color="blue"
            size="lg"
            showLabel
            label={`${Math.max(0, Math.min(100, 100 - progressToGoal)).toFixed(0)}%`}
          />
          <p className="text-sm text-warmGraphite-600 mt-3">
            Осталось сбросить: {Math.max(0, currentWeight - targetWeight).toFixed(1)} кг
          </p>
        </NeumorphicCard>

        {/* История веса */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-xl sm:text-2xl font-bold text-warmGraphite-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-warmBlue-600" />
            История веса
          </h3>
          <div className="space-y-3">
            {weightHistory.map((entry, index) => (
              <NeumorphicCard
                key={entry.date}
                soft
                className="p-4 flex items-center justify-between hover:scale-[1.01] transition-transform animate-fadeIn"
                style={{ animationDelay: `${0.6 + index * 0.05}s` }}
              >
                <div>
                  <div className="font-semibold text-warmGraphite-800 text-base sm:text-lg">
                    {entry.weight} кг
                  </div>
                  <div className="text-xs sm:text-sm text-warmGray-600 mt-1">
                    {new Date(entry.date).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                {index > 0 && (
                  <div
                    className={cn(
                      'flex items-center gap-1 text-sm font-semibold',
                      entry.weight < weightHistory[index - 1].weight
                        ? 'text-warmGreen-600'
                        : 'text-warmRed-600'
                    )}
                  >
                    {entry.weight < weightHistory[index - 1].weight ? (
                      <TrendingDown className="w-4 h-4" />
                    ) : (
                      <TrendingUp className="w-4 h-4" />
                    )}
                    {Math.abs(entry.weight - weightHistory[index - 1].weight).toFixed(1)} кг
                  </div>
                )}
              </NeumorphicCard>
            ))}
          </div>
        </NeumorphicCard>
      </div>
    </div>
  )
}
