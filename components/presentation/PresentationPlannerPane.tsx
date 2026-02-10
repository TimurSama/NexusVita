'use client'

import { useEffect, useState } from 'react'
import { Ruler, Weight, Moon, Target } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicProgress from '@/components/ui/NeumorphicProgress'
import { cn } from '@/lib/utils/cn'

type PlanIntensity = 'soft' | 'medium' | 'intense'

type LocalProfile = {
  height: number
  weight: number
  sleepHours: number
  primaryGoal: string
  planIntensity: PlanIntensity
}

const HEIGHT_MIN = 140
const HEIGHT_MAX = 210
const WEIGHT_MIN = 40
const WEIGHT_MAX = 150
const SLEEP_MIN = 4
const SLEEP_MAX = 10

export default function PresentationPlannerPane() {
  const [profile, setProfile] = useState<LocalProfile>({
    height: 175,
    weight: 72,
    sleepHours: 7,
    primaryGoal: '',
    planIntensity: 'medium',
  })

  // Инициализация из localStorage (если пользователь уже что-то заполнял)
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const storedProfile = window.localStorage.getItem('nexusvita_health_profile')
      const storedPlan = window.localStorage.getItem('nexusvita_plan_settings')

      const parsedProfile = storedProfile ? JSON.parse(storedProfile) : {}
      const parsedPlan = storedPlan ? JSON.parse(storedPlan) : {}

      setProfile((prev) => ({
        height: Number(parsedProfile.height) || prev.height,
        weight: Number(parsedProfile.weight) || prev.weight,
        sleepHours: parsedProfile.sleepTargetHours || prev.sleepHours,
        primaryGoal: parsedPlan.primaryGoal || prev.primaryGoal,
        planIntensity:
          parsedPlan.planLevel === 'Интенсивный'
            ? 'intense'
            : parsedPlan.planLevel === 'Мягкий'
              ? 'soft'
              : parsedPlan.planLevel
                ? 'medium'
                : prev.planIntensity,
      }))
    } catch {
      // ignore
    }
  }, [])

  const syncToLocalStorage = (next: LocalProfile) => {
    if (typeof window === 'undefined') return
    try {
      const profileRaw = window.localStorage.getItem('nexusvita_health_profile')
      const planRaw = window.localStorage.getItem('nexusvita_plan_settings')
      const profileObj = profileRaw ? JSON.parse(profileRaw) : {}
      const planObj = planRaw ? JSON.parse(planRaw) : {}

      profileObj.height = String(next.height)
      profileObj.weight = String(next.weight)
      profileObj.sleepTargetHours = next.sleepHours

      const planLevelLabel =
        next.planIntensity === 'intense'
          ? 'Интенсивный'
          : next.planIntensity === 'soft'
            ? 'Мягкий'
            : 'Умеренный'

      window.localStorage.setItem('nexusvita_health_profile', JSON.stringify(profileObj))
      window.localStorage.setItem(
        'nexusvita_plan_settings',
        JSON.stringify({
          ...planObj,
          primaryGoal: next.primaryGoal || planObj.primaryGoal,
          planLevel: planLevelLabel,
        })
      )
    } catch {
      // ignore
    }
  }

  const handleChange = (partial: Partial<LocalProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...partial }
      syncToLocalStorage(next)
      return next
    })
  }

  const heightPercent =
    ((profile.height - HEIGHT_MIN) / (HEIGHT_MAX - HEIGHT_MIN)) * 100
  const weightPercent =
    ((profile.weight - WEIGHT_MIN) / (WEIGHT_MAX - WEIGHT_MIN)) * 100
  const sleepPercent =
    ((profile.sleepHours - SLEEP_MIN) / (SLEEP_MAX - SLEEP_MIN)) * 100

  return (
    <NeumorphicCard className="p-4 sm:p-6 space-y-4 sm:space-y-5">
      <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
        Ваш мини‑профиль для плана
      </h3>
      <p className="text-xs sm:text-sm text-warmGraphite-600">
        Эти настройки используются, чтобы во время презентации постепенно собрать базу для
        персонального плана. После регистрации они продолжат работать в ежедневнике.
      </p>

      {/* Рост */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-warmBlue-500" />
            <span className="text-xs sm:text-sm font-medium text-warmGraphite-700">
              Рост
            </span>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-warmGraphite-800">
            {profile.height} см
          </span>
        </div>
        <div className="px-2 py-2 rounded-2xl bg-warmBeige-50 border border-warmGray-200">
          <input
            type="range"
            min={HEIGHT_MIN}
            max={HEIGHT_MAX}
            value={profile.height}
            onChange={(e) => handleChange({ height: Number(e.target.value) })}
            className="w-full accent-warmBlue-500"
          />
          <NeumorphicProgress
            value={heightPercent}
            showLabel={false}
            size="sm"
            className="mt-2"
          />
          <div className="flex justify-between text-[10px] sm:text-xs text-warmGray-500 mt-1">
            <span>{HEIGHT_MIN} см</span>
            <span>{HEIGHT_MAX} см</span>
          </div>
        </div>
      </div>

      {/* Вес */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Weight className="w-4 h-4 text-warmGreen-500" />
            <span className="text-xs sm:text-sm font-medium text-warmGraphite-700">
              Вес
            </span>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-warmGraphite-800">
            {profile.weight} кг
          </span>
        </div>
        <div className="px-2 py-2 rounded-2xl bg-warmBeige-50 border border-warmGray-200">
          <input
            type="range"
            min={WEIGHT_MIN}
            max={WEIGHT_MAX}
            value={profile.weight}
            onChange={(e) => handleChange({ weight: Number(e.target.value) })}
            className="w-full accent-warmGreen-500"
          />
          <NeumorphicProgress
            value={weightPercent}
            showLabel={false}
            color="green"
            size="sm"
            className="mt-2"
          />
          <div className="flex justify-between text-[10px] sm:text-xs text-warmGray-500 mt-1">
            <span>{WEIGHT_MIN} кг</span>
            <span>{WEIGHT_MAX} кг</span>
          </div>
        </div>
      </div>

      {/* Сон */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-warmPurple-500" />
            <span className="text-xs sm:text-sm font-medium text-warmGraphite-700">
              Цель по сну
            </span>
          </div>
          <span className="text-xs sm:text-sm font-semibold text-warmGraphite-800">
            {profile.sleepHours} ч
          </span>
        </div>
        <div className="px-2 py-2 rounded-2xl bg-warmBeige-50 border border-warmGray-200">
          <input
            type="range"
            min={SLEEP_MIN}
            max={SLEEP_MAX}
            value={profile.sleepHours}
            onChange={(e) => handleChange({ sleepHours: Number(e.target.value) })}
            className="w-full accent-warmPink-500"
          />
          <NeumorphicProgress
            value={sleepPercent}
            showLabel={false}
            color="pink"
            size="sm"
            className="mt-2"
          />
          <div className="flex justify-between text-[10px] sm:text-xs text-warmGray-500 mt-1">
            <span>{SLEEP_MIN} ч</span>
            <span>{SLEEP_MAX} ч</span>
          </div>
        </div>
      </div>

      {/* Цель и интенсивность */}
      <div className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-warmBlue-600" />
            <span className="text-xs sm:text-sm font-medium text-warmGraphite-700">
              Главная цель на месяц
            </span>
          </div>
          <select
            value={profile.primaryGoal}
            onChange={(e) => handleChange({ primaryGoal: e.target.value })}
            className="neumorphic-input w-full text-xs sm:text-sm bg-warmGray-50"
          >
            <option value="">Выберите цель</option>
            <option value="Снижение веса">Снижение веса</option>
            <option value="Набор мышечной массы">Набор мышечной массы</option>
            <option value="Улучшение выносливости">Улучшение выносливости</option>
            <option value="Улучшение сна">Улучшение сна</option>
            <option value="Снижение стресса">Снижение стресса</option>
            <option value="Улучшение питания">Улучшение питания</option>
            <option value="Реабилитация">Реабилитация</option>
            <option value="Общее оздоровление">Общее оздоровление</option>
          </select>
        </div>

        <div className="space-y-1">
          <span className="text-xs sm:text-sm font-medium text-warmGraphite-700">
            Интенсивность плана
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'soft', label: 'Мягкий' },
              { id: 'medium', label: 'Умеренный' },
              { id: 'intense', label: 'Интенсивный' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleChange({ planIntensity: opt.id as PlanIntensity })}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all',
                  profile.planIntensity === opt.id
                    ? 'bg-warmBlue-500 text-white'
                    : 'bg-warmGray-100 text-warmGraphite-700 hover:bg-warmGray-200'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <NeumorphicButton
        className="w-full text-xs sm:text-sm mt-1"
        type="button"
        onClick={() => syncToLocalStorage(profile)}
      >
        Обновить данные для плана
      </NeumorphicButton>
    </NeumorphicCard>
  )
}

