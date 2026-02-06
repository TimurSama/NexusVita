'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, TrendingDown, Calendar } from 'lucide-react'

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
  const progressToGoal = ((currentWeight - targetWeight) / (weightHistory[0].weight - targetWeight)) * 100

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
          <h1 className="text-4xl font-bold text-ink-800 mb-2">
            Отслеживание Веса
          </h1>
          <p className="text-ink-600">
            Мониторинг изменений веса и прогресса к цели
          </p>
        </div>

        {/* Текущий вес и статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-parchment-200/80 backdrop-blur-sm border-2 border-ink-300 rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-ink-600 mb-2">
              Текущий вес
            </h3>
            <div className="text-4xl font-bold text-ink-800">
              {currentWeight} <span className="text-2xl">кг</span>
            </div>
          </div>
          <div className="bg-parchment-200/80 backdrop-blur-sm border-2 border-ink-300 rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-ink-600 mb-2">
              Целевой вес
            </h3>
            <div className="text-4xl font-bold text-ink-800">
              {targetWeight} <span className="text-2xl">кг</span>
            </div>
          </div>
          <div className="bg-parchment-200/80 backdrop-blur-sm border-2 border-ink-300 rounded-lg shadow-lg p-6">
            <h3 className="text-sm font-medium text-ink-600 mb-2 flex items-center gap-2">
              Изменение
              {weightChange < 0 ? (
                <TrendingDown className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingUp className="w-4 h-4 text-red-600" />
              )}
            </h3>
            <div
              className={`text-4xl font-bold ${
                weightChange < 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {weightChange > 0 ? '+' : ''}
              {weightChange.toFixed(1)} <span className="text-2xl">кг</span>
            </div>
          </div>
        </div>

        {/* Прогресс к цели */}
        <div className="bg-parchment-200/80 backdrop-blur-sm border-2 border-ink-300 rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-ink-800 mb-4">
            Прогресс к цели
          </h3>
          <div className="w-full bg-ink-200 rounded-full h-6 mb-2">
            <div
              className="bg-ink-700 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${Math.max(0, Math.min(100, 100 - progressToGoal))}%` }}
            >
              <span className="text-xs text-white font-medium">
                {Math.max(0, Math.min(100, 100 - progressToGoal)).toFixed(0)}%
              </span>
            </div>
          </div>
          <p className="text-sm text-ink-600">
            Осталось сбросить: {Math.max(0, currentWeight - targetWeight).toFixed(1)} кг
          </p>
        </div>

        {/* История веса */}
        <div className="bg-parchment-200/80 backdrop-blur-sm border-2 border-ink-300 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-ink-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            История измерений
          </h3>
          <div className="space-y-3">
            {weightHistory.map((entry, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-parchment-100 rounded border border-ink-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-ink-700 rounded-full" />
                  <div>
                    <div className="font-semibold text-ink-800">
                      {entry.weight} кг
                    </div>
                    <div className="text-sm text-ink-600">
                      {new Date(entry.date).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
                {idx > 0 && (
                  <div
                    className={`text-sm font-medium ${
                      entry.weight < weightHistory[idx - 1].weight
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {entry.weight < weightHistory[idx - 1].weight ? '↓' : '↑'}{' '}
                    {Math.abs(entry.weight - weightHistory[idx - 1].weight).toFixed(1)} кг
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="mt-4 w-full px-6 py-3 bg-ink-700 text-white rounded-lg hover:bg-ink-800 transition-colors">
            Добавить новое измерение
          </button>
        </div>
      </div>
    </div>
  )
}


