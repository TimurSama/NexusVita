'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Apple } from 'lucide-react'

export default function NutritionPage() {
  const [dailyCalories, setDailyCalories] = useState(2450)
  const [targetCalories, setTargetCalories] = useState(2500)
  const [protein, setProtein] = useState(180)
  const [carbs, setCarbs] = useState(300)
  const [fats, setFats] = useState(65)

  const caloriesProgress = (dailyCalories / targetCalories) * 100

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
                Питание
              </h1>
              <p className="text-ink-600">
                Дневник питания и отслеживание калорий
              </p>
            </div>
            <button className="px-6 py-3 bg-ink-700 text-white rounded-lg hover:bg-ink-800 transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Добавить прием пищи
            </button>
          </div>
        </div>

        {/* Статистика за день */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Калории"
            current={dailyCalories}
            target={targetCalories}
            unit="ккал"
            color="bg-blue-500"
          />
          <StatCard
            title="Белки"
            current={protein}
            target={200}
            unit="г"
            color="bg-red-500"
          />
          <StatCard
            title="Углеводы"
            current={carbs}
            target={300}
            unit="г"
            color="bg-yellow-500"
          />
          <StatCard
            title="Жиры"
            current={fats}
            target={70}
            unit="г"
            color="bg-green-500"
          />
        </div>

        {/* Прогресс калорий */}
        <div className="bg-parchment-200/80 backdrop-blur-sm border-2 border-ink-300 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-ink-800">
              Прогресс калорий
            </h3>
            <span className="text-ink-600">
              {dailyCalories} / {targetCalories} ккал
            </span>
          </div>
          <div className="w-full bg-ink-200 rounded-full h-4">
            <div
              className="bg-ink-700 h-4 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(caloriesProgress, 100)}%` }}
            />
          </div>
        </div>

        {/* Приемы пищи */}
        <div className="space-y-4">
          <MealSection title="Завтрак" time="08:00" />
          <MealSection title="Обед" time="13:00" />
          <MealSection title="Ужин" time="19:00" />
          <MealSection title="Перекусы" time="Весь день" />
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  current,
  target,
  unit,
  color,
}: {
  title: string
  current: number
  target: number
  unit: string
  color: string
}) {
  const progress = (current / target) * 100

  return (
    <div className="bg-parchment-200/80 backdrop-blur-sm border-2 border-ink-300 rounded-lg shadow-lg p-6">
      <h3 className="text-sm font-medium text-ink-600 mb-2">{title}</h3>
      <div className="text-3xl font-bold text-ink-800 mb-2">
        {current} <span className="text-lg font-normal">{unit}</span>
      </div>
      <div className="text-sm text-ink-500 mb-2">
        Цель: {target} {unit}
      </div>
      <div className="w-full bg-ink-200 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  )
}

function MealSection({ title, time }: { title: string; time: string }) {
  return (
    <div className="bg-parchment-200/80 backdrop-blur-sm border-2 border-ink-300 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-ink-800">{title}</h3>
          <p className="text-sm text-ink-600">{time}</p>
        </div>
        <button className="px-4 py-2 bg-ink-700 text-white rounded-lg hover:bg-ink-800 transition-colors flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" />
          Добавить
        </button>
      </div>
      <div className="text-center py-8 text-ink-500">
        <Apple className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p>Пока нет записей</p>
      </div>
    </div>
  )
}


