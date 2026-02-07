'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Apple, TrendingUp } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicProgress from '@/components/ui/NeumorphicProgress'
import { cn } from '@/lib/utils/cn'

export default function NutritionPage() {
  const [dailyCalories, setDailyCalories] = useState(2450)
  const [targetCalories, setTargetCalories] = useState(2500)
  const [protein, setProtein] = useState(180)
  const [carbs, setCarbs] = useState(300)
  const [fats, setFats] = useState(65)

  const caloriesProgress = (dailyCalories / targetCalories) * 100

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
                Питание
              </h1>
              <p className="text-base sm:text-lg text-warmGraphite-600">
                Дневник питания и отслеживание калорий
              </p>
            </div>
            <NeumorphicButton primary>
              <Plus className="w-4 h-4 mr-2" />
              Добавить прием пищи
            </NeumorphicButton>
          </div>
        </div>

        {/* Статистика за день */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            title="Калории"
            current={dailyCalories}
            target={targetCalories}
            unit="ккал"
            color="blue"
            delay={0.1}
          />
          <StatCard
            title="Белки"
            current={protein}
            target={200}
            unit="г"
            color="red"
            delay={0.2}
          />
          <StatCard
            title="Углеводы"
            current={carbs}
            target={300}
            unit="г"
            color="pink"
            delay={0.3}
          />
          <StatCard
            title="Жиры"
            current={fats}
            target={70}
            unit="г"
            color="green"
            delay={0.4}
          />
        </div>

        {/* Прогресс калорий */}
        <NeumorphicCard className="p-4 sm:p-6 mb-6 sm:mb-8 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
              Прогресс калорий
            </h3>
            <span className="text-sm sm:text-base text-warmGraphite-600">
              {dailyCalories} / {targetCalories} ккал
            </span>
          </div>
          <NeumorphicProgress
            value={caloriesProgress}
            max={100}
            color="blue"
            size="lg"
            showLabel
            label={`${Math.round(caloriesProgress)}%`}
          />
        </NeumorphicCard>

        {/* Приемы пищи */}
        <div className="space-y-4 sm:space-y-6">
          <MealSection title="Завтрак" time="08:00" delay={0.6} />
          <MealSection title="Обед" time="13:00" delay={0.7} />
          <MealSection title="Ужин" time="19:00" delay={0.8} />
          <MealSection title="Перекусы" time="Весь день" delay={0.9} />
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
  delay = 0,
}: {
  title: string
  current: number
  target: number
  unit: string
  color: 'blue' | 'red' | 'green' | 'pink'
  delay?: number
}) {
  const progress = (current / target) * 100
  const colorClasses = {
    blue: 'warmBlue',
    red: 'warmRed',
    green: 'warmGreen',
    pink: 'warmPink',
  }

  return (
    <NeumorphicCard
      className="p-4 sm:p-6 animate-fadeIn"
      style={{ animationDelay: `${delay}s` }}
    >
      <h3 className="text-xs sm:text-sm font-medium text-warmGray-600 mb-2 uppercase tracking-wide">
        {title}
      </h3>
      <div className="text-2xl sm:text-3xl font-bold text-warmGraphite-800 mb-2">
        {current} <span className="text-base sm:text-lg font-normal">{unit}</span>
      </div>
      <div className="text-xs sm:text-sm text-warmGray-600 mb-3">
        Цель: {target} {unit}
      </div>
      <NeumorphicProgress
        value={progress}
        max={100}
        color={color}
        size="sm"
        showLabel={false}
      />
    </NeumorphicCard>
  )
}

function MealSection({ title, time, delay = 0 }: { title: string; time: string; delay?: number }) {
  return (
    <NeumorphicCard
      className="p-4 sm:p-6 animate-fadeIn"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-warmGraphite-800">{title}</h3>
          <p className="text-xs sm:text-sm text-warmGray-600 mt-1">{time}</p>
        </div>
        <NeumorphicButton className="text-xs sm:text-sm px-3 py-1.5">
          <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
          Добавить
        </NeumorphicButton>
      </div>
      <div className="text-center py-8 sm:py-12">
        <Apple className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-warmGray-400 opacity-50" />
        <p className="text-sm sm:text-base text-warmGray-500">Пока нет записей</p>
      </div>
    </NeumorphicCard>
  )
}
