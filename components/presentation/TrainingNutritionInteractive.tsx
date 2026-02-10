'use client'

import { useEffect, useState } from 'react'
import { Activity, Apple, Flame } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicProgress from '@/components/ui/NeumorphicProgress'
import { cn } from '@/lib/utils/cn'
import { useI18n } from '@/lib/i18n/I18nProvider'

type LocalTrainingNutrition = {
  workoutsPerWeek: number
  workoutType: 'Силовые' | 'Кардио' | 'Смешанные'
  caloriesTarget: number
  nutritionFocus: 'Баланс' | 'Дефицит' | 'Профицит'
}

const WORKOUT_MIN = 1
const WORKOUT_MAX = 7
const CALORIES_MIN = 1400
const CALORIES_MAX = 3200

export default function TrainingNutritionInteractive() {
  const { t, lang } = useI18n()
  const [state, setState] = useState<LocalTrainingNutrition>({
    workoutsPerWeek: 3,
    workoutType: lang === 'en' ? 'Mixed' : 'Смешанные',
    caloriesTarget: 2000,
    nutritionFocus: lang === 'en' ? 'Balance' : 'Баланс',
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = window.localStorage.getItem('nexusvita_training_nutrition')
      if (stored) {
        const parsed = JSON.parse(stored)
        setState((prev) => ({ ...prev, ...parsed }))
      }
    } catch {
      // ignore
    }
  }, [])

  const sync = (next: LocalTrainingNutrition) => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem('nexusvita_training_nutrition', JSON.stringify(next))
    } catch {
      // ignore
    }
  }

  const update = (partial: Partial<LocalTrainingNutrition>) => {
    setState((prev) => {
      const next = { ...prev, ...partial }
      sync(next)
      return next
    })
  }

  const workoutsPercent =
    ((state.workoutsPerWeek - WORKOUT_MIN) / (WORKOUT_MAX - WORKOUT_MIN)) * 100
  const caloriesPercent =
    ((state.caloriesTarget - CALORIES_MIN) / (CALORIES_MAX - CALORIES_MIN)) * 100

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <NeumorphicCard className="p-4 sm:p-6 space-y-3">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-warmBlue-500" />
            <span className="text-sm font-semibold text-warmGraphite-800">
              {t('training.weekly')}
            </span>
          </div>
          <span className="text-sm font-bold text-warmGraphite-800">
            {state.workoutsPerWeek} {lang === 'en' ? 'times' : 'раз'}
          </span>
        </div>
        <p className="text-xs text-warmGraphite-600 mb-1">
          {lang === 'en'
            ? 'Set your desired training frequency — this will affect the intensity of weekly and monthly plans.'
            : 'Настройте желаемую частоту тренировок — это повлияет на интенсивность недельного и месячного плана.'}
        </p>
        <div className="px-1 py-2 rounded-2xl bg-warmBeige-50 border border-warmGray-200">
          <input
            type="range"
            min={WORKOUT_MIN}
            max={WORKOUT_MAX}
            value={state.workoutsPerWeek}
            onChange={(e) => update({ workoutsPerWeek: Number(e.target.value) })}
            className="w-full accent-warmBlue-500"
          />
          <NeumorphicProgress
            value={workoutsPercent}
            showLabel={false}
            size="sm"
            className="mt-2"
          />
          <div className="flex justify-between text-[10px] sm:text-xs text-warmGray-500 mt-1">
            <span>1 {lang === 'en' ? 'time' : 'раз'}</span>
            <span>7 {lang === 'en' ? 'times' : 'раз'}</span>
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <span className="text-xs sm:text-sm font-medium text-warmGraphite-700">
            {lang === 'en' ? 'Workout format' : 'Формат тренировок'}
          </span>
          <div className="flex flex-wrap gap-2">
            {(lang === 'en'
              ? ['Strength', 'Cardio', 'Mixed']
              : ['Силовые', 'Кардио', 'Смешанные']).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => update({ workoutType: type as any })}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all',
                  (state.workoutType === type ||
                    (lang === 'en' && type === 'Mixed' && state.workoutType === 'Смешанные') ||
                    (lang === 'ru' && type === 'Смешанные' && state.workoutType === 'Mixed'))
                    ? 'bg-warmBlue-500 text-white'
                    : 'bg-warmGray-100 text-warmGraphite-700 hover:bg-warmGray-200'
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </NeumorphicCard>

      <NeumorphicCard className="p-4 sm:p-6 space-y-3">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Apple className="w-5 h-5 text-warmGreen-500" />
            <span className="text-sm font-semibold text-warmGraphite-800">
              {t('nutrition.calories')}
            </span>
          </div>
          <span className="text-sm font-bold text-warmGraphite-800">
            {state.caloriesTarget} {lang === 'en' ? 'kcal' : 'ккал'}
          </span>
        </div>
        <p className="text-xs text-warmGraphite-600 mb-1">
          {lang === 'en'
            ? 'Approximate daily calorie target. In the demo version, it affects presentation recommendations and the journal plan.'
            : 'Примерный дневной таргет калорий. В демо‑версии он влияет на рекомендации презентации и план в ежедневнике.'}
        </p>
        <div className="px-1 py-2 rounded-2xl bg-warmBeige-50 border border-warmGray-200">
          <input
            type="range"
            min={CALORIES_MIN}
            max={CALORIES_MAX}
            step={100}
            value={state.caloriesTarget}
            onChange={(e) => update({ caloriesTarget: Number(e.target.value) })}
            className="w-full accent-warmGreen-500"
          />
          <NeumorphicProgress
            value={caloriesPercent}
            showLabel={false}
            color="green"
            size="sm"
            className="mt-2"
          />
          <div className="flex justify-between text-[10px] sm:text-xs text-warmGray-500 mt-1">
            <span>{CALORIES_MIN} {lang === 'en' ? 'kcal' : 'ккал'}</span>
            <span>{CALORIES_MAX} {lang === 'en' ? 'kcal' : 'ккал'}</span>
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <span className="text-xs sm:text-sm font-medium text-warmGraphite-700">
            {lang === 'en' ? 'Nutrition focus' : 'Фокус питания'}
          </span>
          <div className="flex flex-wrap gap-2">
            {(lang === 'en'
              ? ['Balance', 'Deficit', 'Surplus']
              : ['Баланс', 'Дефицит', 'Профицит']).map((focus) => (
              <button
                key={focus}
                type="button"
                onClick={() => update({ nutritionFocus: focus as any })}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all',
                  (state.nutritionFocus === focus ||
                    (lang === 'en' && focus === 'Balance' && state.nutritionFocus === 'Баланс') ||
                    (lang === 'ru' && focus === 'Баланс' && state.nutritionFocus === 'Balance'))
                    ? 'bg-warmPink-500 text-white'
                    : 'bg-warmGray-100 text-warmGraphite-700 hover:bg-warmGray-200'
                )}
              >
                {focus}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-warmGraphite-500 mt-2">
          <Flame className="w-3 h-3 text-warmOrange-500" />
          <span>
            {lang === 'en'
              ? 'In the full version, these parameters will be linked to training, nutrition and calendar modules. In demo mode, they are used for live plan visualization.'
              : 'В полной версии эти параметры будут связаны с модулями тренировок, питания и календарём. В демо‑режиме они используются для живой визуализации плана.'}
          </span>
        </div>
      </NeumorphicCard>
    </div>
  )
}

