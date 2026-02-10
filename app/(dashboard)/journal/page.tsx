'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Plus,
  BookOpen,
  Calendar,
  Heart,
  Target,
  CalendarDays,
  Activity,
  Flame,
} from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicTextarea from '@/components/ui/NeumorphicTextarea'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { cn } from '@/lib/utils/cn'

type Entry = {
  id: string
  title: string
  note: string
  createdAt: string
}

type HealthProfile = {
  age: string
  height: string
  weight: string
  sex: 'Мужской' | 'Женский' | 'Другое' | ''
  activityLevel: 'Минимальная' | 'Низкая' | 'Средняя' | 'Высокая' | ''
  trainingTypes: string[]
  nutritionStyle: 'Сбалансированное' | 'Низкоуглеводное' | 'Вегетарианское' | 'Без ограничений' | ''
  dietaryRestrictions: string[]
  medicalNotes: string
  sleepTargetHours: number
}

type DailyState = {
  date: string
  mood: 'Отлично' | 'Хорошо' | 'Нормально' | 'Плохо' | 'Очень плохо' | null
  energy: 'Низкая' | 'Средняя' | 'Высокая' | null
  sleepHours: number | null
  stress: 'Низкий' | 'Умеренный' | 'Высокий' | null
}

type PlanIntensity = 'soft' | 'medium' | 'intense'

type MonthlyPlanItem = {
  id: string
  date: string
  category: 'Тренировка' | 'Питание' | 'Восстановление' | 'Психо-эмоциональное' | 'Социальное'
  title: string
  description: string
}

type ProgramId = 'balanced' | 'weight-loss' | 'muscle-gain' | 'sleep-focus' | 'stress-focus'

type Program = {
  id: ProgramId
  name: string
  focus: string
  description: string
  recommendedGoal: string
  defaultIntensity: PlanIntensity
}

export default function JournalPage() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [note, setNote] = useState('')
  const [title, setTitle] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasSubscription, setHasSubscription] = useState(false)
  const [profile, setProfile] = useState<HealthProfile>({
    age: '',
    height: '',
    weight: '',
    sex: '',
    activityLevel: '',
    trainingTypes: [],
    nutritionStyle: '',
    dietaryRestrictions: [],
    medicalNotes: '',
    sleepTargetHours: 7,
  })
  const [dailyState, setDailyState] = useState<DailyState>({
    date: new Date().toISOString().slice(0, 10),
    mood: null,
    energy: null,
    sleepHours: null,
    stress: null,
  })
  const [primaryGoal, setPrimaryGoal] = useState<string>('')
  const [planIntensity, setPlanIntensity] = useState<PlanIntensity>('medium')
  const [monthlyPlan, setMonthlyPlan] = useState<MonthlyPlanItem[]>([])
  const [selectedProgramId, setSelectedProgramId] = useState<ProgramId>('balanced')

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(!!data?.user?.id)
        setHasSubscription(false)
      })
      .catch(() => setIsAuthenticated(false))

    if (typeof window !== 'undefined') {
      const savedEntries = window.localStorage.getItem('nexusvita_journal_entries')
      if (savedEntries) {
        try {
          const parsed: Entry[] = JSON.parse(savedEntries)
          setEntries(parsed)
        } catch {
          // игнорируем битые данные
        }
      } else {
        setEntries([
          {
            id: '1',
            title: 'Сон',
            note: '7ч 20м, самочувствие хорошее',
            createdAt: new Date().toISOString(),
          },
        ])
      }

      const savedDaily = window.localStorage.getItem('nexusvita_daily_state')
      if (savedDaily) {
        try {
          const parsed: DailyState = JSON.parse(savedDaily)
          setDailyState((prev) => ({ ...prev, ...parsed }))
        } catch {
          // ignore
        }
      }

      const savedProfile = window.localStorage.getItem('nexusvita_health_profile')
      if (savedProfile) {
        try {
          const parsed: HealthProfile = JSON.parse(savedProfile)
          setProfile((prev) => ({ ...prev, ...parsed }))
        } catch {
          // ignore
        }
      }

      const savedSettings = window.localStorage.getItem('nexusvita_plan_settings')
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings) as {
            primaryGoal?: string
            planIntensity?: PlanIntensity
            programId?: ProgramId
          }
          if (parsed.primaryGoal) setPrimaryGoal(parsed.primaryGoal)
          if (parsed.planIntensity) setPlanIntensity(parsed.planIntensity)
          if (parsed.programId) setSelectedProgramId(parsed.programId)
        } catch {
          // ignore
        }
      }

      const savedPlan = window.localStorage.getItem('nexusvita_monthly_plan')
      if (savedPlan) {
        try {
          const parsed: MonthlyPlanItem[] = JSON.parse(savedPlan)
          setMonthlyPlan(parsed)
        } catch {
          // ignore
        }
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('nexusvita_journal_entries', JSON.stringify(entries))
  }, [entries])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('nexusvita_daily_state', JSON.stringify(dailyState))
  }, [dailyState])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('nexusvita_health_profile', JSON.stringify(profile))
  }, [profile])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(
      'nexusvita_plan_settings',
      JSON.stringify({ primaryGoal, planIntensity, programId: selectedProgramId })
    )
  }, [primaryGoal, planIntensity, selectedProgramId])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('nexusvita_monthly_plan', JSON.stringify(monthlyPlan))
  }, [monthlyPlan])

  const handleSave = async () => {
    if (!title.trim() || !note.trim()) return

    const newEntry: Entry = {
      id: Date.now().toString(),
      title: title.trim(),
      note: note.trim(),
      createdAt: new Date().toISOString(),
    }

    setEntries([newEntry, ...entries])
    setTitle('')
    setNote('')
  }

  const programs: Program[] = [
    {
      id: 'balanced',
      name: 'Сбалансированный месяц',
      focus: 'Общее оздоровление и баланс всех сфер',
      description:
        'Поддерживающий режим с упором на сон, питание, лёгкие тренировки и психо-эмоциональный баланс.',
      recommendedGoal: 'Общее оздоровление',
      defaultIntensity: 'medium',
    },
    {
      id: 'weight-loss',
      name: 'Фокус на снижении веса',
      focus: 'Дефицит калорий и повышение NEAT‑активности',
      description:
        'Умеренный дефицит калорий, больше шагов и регулярные тренировки средней интенсивности.',
      recommendedGoal: 'Снижение веса',
      defaultIntensity: 'medium',
    },
    {
      id: 'muscle-gain',
      name: 'Набор мышечной массы',
      focus: 'Прогрессивная нагрузка и достаточное питание',
      description:
        'Силовые тренировки 3–4 раза в неделю, достаточный сон и акцент на белке в рационе.',
      recommendedGoal: 'Набор мышечной массы',
      defaultIntensity: 'intense',
    },
    {
      id: 'sleep-focus',
      name: 'Перезапуск сна',
      focus: 'Восстановление ритмов и снижение усталости',
      description:
        'Мягкий режим, минимизация поздних нагрузок, вечерние ритуалы и отслеживание качества сна.',
      recommendedGoal: 'Улучшение сна',
      defaultIntensity: 'soft',
    },
    {
      id: 'stress-focus',
      name: 'Снижение стресса',
      focus: 'Психо-эмоциональная стабильность',
      description:
        'Дыхательные практики, умеренное движение, разгрузка календаря и регулярные рефлексии.',
      recommendedGoal: 'Снижение стресса',
      defaultIntensity: 'soft',
    },
  ]

  const selectedProgram = programs.find((p) => p.id === selectedProgramId) || programs[0]

  const generateMonthlyPlan = () => {
    const today = new Date()
    const baseDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    const weeks = 4
    const tasksPerWeek =
      planIntensity === 'soft' ? 3 : planIntensity === 'medium' ? 5 : 7

    const goalLabel =
      primaryGoal ||
      selectedProgram.recommendedGoal ||
      'Общее оздоровление и баланс между тренировками, восстановлением и психикой'

    const sleepTarget = profile.sleepTargetHours || 7

    const newPlan: MonthlyPlanItem[] = []

    for (let w = 0; w < weeks; w++) {
      for (let t = 0; t < tasksPerWeek; t++) {
        const dayOffset = w * 7 + (t % 7)
        const date = new Date(baseDate)
        date.setDate(baseDate.getDate() + dayOffset)
        const dateStr = date.toISOString().slice(0, 10)

        const slot = t % 5
        let item: MonthlyPlanItem

        if (slot === 0) {
          item = {
            id: `${dateStr}-training`,
            date: dateStr,
            category: 'Тренировка',
            title: 'Основная тренировка',
            description:
              planIntensity === 'intense'
                ? '60 минут силовой или интервальной тренировки под вашу цель.'
                : planIntensity === 'medium'
                  ? '40–50 минут комбинированной тренировки (силовая + кардио).'
                  : '30 минут мягкой тренировки или прогулки в комфортном темпе.',
          }
        } else if (slot === 1) {
          item = {
            id: `${dateStr}-nutrition`,
            date: dateStr,
            category: 'Питание',
            title: 'Контроль питания',
            description:
              'Фиксация рациона в дневнике и выполнение плана питания, ориентированного на цель: ' +
              goalLabel.toLowerCase() +
              '.',
          }
        } else if (slot === 2) {
          item = {
            id: `${dateStr}-recovery`,
            date: dateStr,
            category: 'Восстановление',
            title: 'Сон и восстановление',
            description:
              `Фокус на качестве сна: цель ${sleepTarget} часов, снижение экранного времени вечером, лёгкая растяжка.`,
          }
        } else if (slot === 3) {
          item = {
            id: `${dateStr}-psyche`,
            date: dateStr,
            category: 'Психо-эмоциональное',
            title: 'Практика для психики',
            description:
              '10–20 минут дыхательных практик, медитации или рефлексии в дневнике.',
          }
        } else {
          item = {
            id: `${dateStr}-social`,
            date: dateStr,
            category: 'Социальное',
            title: 'Социальная активность',
            description:
              'Созвон с близкими, участие в группе, совместная тренировка или прогулка.',
          }
        }

        newPlan.push(item)
      }
    }

    setMonthlyPlan(newPlan)
  }

  return (
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="animate-fadeIn">
          <h1 className="text-2xl sm:text-3xl font-bold text-warmGraphite-800 mb-1 sm:mb-2">
            Личный дневник
          </h1>
          <p className="text-sm sm:text-base text-warmGraphite-600">
            Планирование дня, заметки о здоровье, показатели самочувствия и отслеживание прогресса.
          </p>
        </div>

        {/* AI Subscription Banner */}
        {!hasSubscription && (
          <NeumorphicCard
            className="p-4 sm:p-6 bg-gradient-to-r from-warmBlue-50/50 to-warmPink-50/50 border-2 border-warmBlue-200/50 animate-fadeIn"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 neumorphic-card-soft rounded-neumorphic-sm">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-warmBlue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-warmGraphite-800 mb-1 text-base sm:text-lg">
                  AI-помощник в дневнике
                </h3>
                <p className="text-sm text-warmGraphite-700 mb-3">
                  Получите персональные рекомендации и анализ ваших записей с помощью AI
                  Health+. Бесплатный тестовый период на 7 дней.
                </p>
                <Link href="/subscriptions">
                  <NeumorphicButton primary className="text-sm">
                    Подключить подписку
                  </NeumorphicButton>
                </Link>
              </div>
            </div>
          </NeumorphicCard>
        )}

        {/* Профиль здоровья */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-4">
            Профиль здоровья
          </h2>
          <p className="text-xs sm:text-sm text-warmGraphite-600 mb-4">
            Эти данные используются только локально в демо‑режиме, чтобы собирать более точный
            месячный план и сценарии дня. Никакие данные не отправляются на сервер.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
            <NeumorphicInput
              label="Возраст"
              placeholder="Например: 32"
              value={profile.age}
              onChange={(e) => setProfile((prev) => ({ ...prev, age: e.target.value }))}
            />
            <NeumorphicInput
              label="Рост (см)"
              placeholder="Например: 178"
              value={profile.height}
              onChange={(e) => setProfile((prev) => ({ ...prev, height: e.target.value }))}
            />
            <NeumorphicInput
              label="Вес (кг)"
              placeholder="Например: 74"
              value={profile.weight}
              onChange={(e) => setProfile((prev) => ({ ...prev, weight: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <div className="space-y-2">
              <div className="text-xs sm:text-sm font-medium text-warmGraphite-700">Пол</div>
              <div className="flex flex-wrap gap-2">
                {['Мужской', 'Женский', 'Другое'].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setProfile((prev) => ({ ...prev, sex: value as HealthProfile['sex'] }))
                    }
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all',
                      profile.sex === value
                        ? 'bg-warmBlue-500 text-white'
                        : 'bg-warmGray-100 text-warmGraphite-700 hover:bg-warmGray-200'
                    )}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs sm:text-sm font-medium text-warmGraphite-700">
                Уровень активности
              </div>
              <div className="flex flex-wrap gap-2">
                {['Минимальная', 'Низкая', 'Средняя', 'Высокая'].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setProfile((prev) => ({
                        ...prev,
                        activityLevel: value as HealthProfile['activityLevel'],
                      }))
                    }
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all',
                      profile.activityLevel === value
                        ? 'bg-warmGreen-500 text-white'
                        : 'bg-warmGray-100 text-warmGraphite-700 hover:bg-warmGray-200'
                    )}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <div className="space-y-2">
              <div className="text-xs sm:text-sm font-medium text-warmGraphite-700">
                Любимые форматы тренировок
              </div>
              <div className="flex flex-wrap gap-2">
                {['Силовые', 'Кардио', 'Йога/Пилатес', 'Функциональные', 'Прогулки'].map(
                  (value) => {
                    const selected = profile.trainingTypes.includes(value)
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setProfile((prev) => ({
                            ...prev,
                            trainingTypes: selected
                              ? prev.trainingTypes.filter((t) => t !== value)
                              : [...prev.trainingTypes, value],
                          }))
                        }
                        className={cn(
                          'px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all',
                          selected
                            ? 'bg-warmBlue-500 text-white'
                            : 'bg-warmGray-100 text-warmGraphite-700 hover:bg-warmGray-200'
                        )}
                      >
                        {value}
                      </button>
                    )
                  }
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs sm:text-sm font-medium text-warmGraphite-700">
                Стиль питания
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Сбалансированное',
                  'Низкоуглеводное',
                  'Вегетарианское',
                  'Без ограничений',
                ].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setProfile((prev) => ({
                        ...prev,
                        nutritionStyle: value as HealthProfile['nutritionStyle'],
                      }))
                    }
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all',
                      profile.nutritionStyle === value
                        ? 'bg-warmPink-500 text-white'
                        : 'bg-warmGray-100 text-warmGraphite-700 hover:bg-warmGray-200'
                    )}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <div className="space-y-2">
              <div className="text-xs sm:text-sm font-medium text-warmGraphite-700">
                Ограничения и особенности
              </div>
              <div className="flex flex-wrap gap-2">
                {['Без лактозы', 'Без глютена', 'Ограничения по суставам', 'Сердечно‑сосудистые'].map(
                  (value) => {
                    const selected = profile.dietaryRestrictions.includes(value)
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setProfile((prev) => ({
                            ...prev,
                            dietaryRestrictions: selected
                              ? prev.dietaryRestrictions.filter((t) => t !== value)
                              : [...prev.dietaryRestrictions, value],
                          }))
                        }
                        className={cn(
                          'px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all',
                          selected
                            ? 'bg-warmRed-500 text-white'
                            : 'bg-warmGray-100 text-warmGraphite-700 hover:bg-warmGray-200'
                        )}
                      >
                        {value}
                      </button>
                    )
                  }
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-warmGraphite-700">
                <CalendarDays className="w-4 h-4 text-warmBlue-600" />
                Целевой сон (ч)
              </div>
              <div className="flex flex-wrap gap-2">
                {[6, 7, 8, 9].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() =>
                      setProfile((prev) => ({
                        ...prev,
                        sleepTargetHours: h,
                      }))
                    }
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all',
                      profile.sleepTargetHours === h
                        ? 'bg-warmBlue-500 text-white'
                        : 'bg-warmGray-100 text-warmGraphite-700 hover:bg-warmGray-200'
                    )}
                  >
                    {h}ч
                  </button>
                ))}
              </div>
            </div>
          </div>

          <NeumorphicTextarea
            label="Комментарий для себя (диагнозы, обследования, важные заметки)"
            placeholder="Например: переболел COVID в 2022, есть ограничения по бегу; рекомендована работа над осанкой..."
            value={profile.medicalNotes}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                medicalNotes: e.target.value,
              }))
            }
            rows={3}
            maxLength={500}
            showCounter
          />
        </NeumorphicCard>

        {/* Daily state + New Entry Form */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-4">
            Сегодняшнее состояние и запись
          </h2>
          <div className="space-y-4">
            {/* Daily state */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-warmGraphite-700">
                  <Heart className="w-4 h-4 text-warmPink-600" />
                  Настроение
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Отлично', 'Хорошо', 'Нормально', 'Плохо', 'Очень плохо'].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setDailyState((prev) => ({ ...prev, mood: value as DailyState['mood'] }))
                      }
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all',
                        dailyState.mood === value
                          ? 'bg-warmBlue-500 text-white'
                          : 'bg-warmGray-100 text-warmGraphite-700 hover:bg-warmGray-200'
                      )}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-warmGraphite-700">
                  <Target className="w-4 h-4 text-warmGreen-600" />
                  Энергия
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Низкая', 'Средняя', 'Высокая'].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setDailyState((prev) => ({ ...prev, energy: value as DailyState['energy'] }))
                      }
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all',
                        dailyState.energy === value
                          ? 'bg-warmGreen-500 text-white'
                          : 'bg-warmGray-100 text-warmGraphite-700 hover:bg-warmGray-200'
                      )}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-warmGraphite-700">
                  <CalendarDays className="w-4 h-4 text-warmBlue-600" />
                  Сон (часы)
                </div>
                <div className="flex flex-wrap gap-2">
                  {[5, 6, 7, 8, 9].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() =>
                        setDailyState((prev) => ({ ...prev, sleepHours: h }))
                      }
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all',
                        dailyState.sleepHours === h
                          ? 'bg-warmBlue-500 text-white'
                          : 'bg-warmGray-100 text-warmGraphite-700 hover:bg-warmGray-200'
                      )}
                    >
                      {h}ч
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-warmGraphite-700">
                  <Heart className="w-4 h-4 text-warmRed-500" />
                  Уровень стресса
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Низкий', 'Умеренный', 'Высокий'].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setDailyState((prev) => ({ ...prev, stress: value as DailyState['stress'] }))
                      }
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all',
                        dailyState.stress === value
                          ? 'bg-warmPink-500 text-white'
                          : 'bg-warmGray-100 text-warmGraphite-700 hover:bg-warmGray-200'
                      )}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Новая запись */}
            <NeumorphicInput
              label="Заголовок"
              placeholder="Например: Сон, Тренировка, Настроение..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <NeumorphicTextarea
              label="Заметка"
              placeholder="Что важного сегодня? Как вы себя чувствуете?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={6}
              showCounter
              maxLength={1000}
            />
            <NeumorphicButton
              primary
              onClick={handleSave}
              disabled={!title.trim() || !note.trim()}
              className="w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Сохранить запись
            </NeumorphicButton>
          </div>
        </NeumorphicCard>

        {/* Месячный план на основе данных */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.25s' }}>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Target className="w-5 h-5 text-warmGreen-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
              Персональный план на месяц
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-warmGraphite-600 mb-4">
            План строится на основе вашей основной цели, выбранной интенсивности и общих показателей
            самочувствия и профиля. В демо‑режиме расчёт выполняется локально на устройстве без
            обращения к серверу или ИИ.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <div className="space-y-2">
              <div className="text-xs sm:text-sm font-medium text-warmGraphite-700">
                Основная цель
              </div>
              <select
                value={primaryGoal}
                onChange={(e) => setPrimaryGoal(e.target.value)}
                className="neumorphic-input w-full text-xs sm:text-sm bg-warmGray-50"
              >
                <option value="">Выберите основную цель</option>
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

            <div className="space-y-2">
              <div className="text-xs sm:text-sm font-medium text-warmGraphite-700">
                Интенсивность плана
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'soft', label: 'Мягкий' },
                  { id: 'medium', label: 'Умеренный' },
                  { id: 'intense', label: 'Интенсивный' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPlanIntensity(opt.id as PlanIntensity)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all',
                      planIntensity === opt.id
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
            primary
            onClick={generateMonthlyPlan}
            className="w-full sm:w-auto mb-4"
          >
            Сгенерировать план на 4 недели
          </NeumorphicButton>

          {monthlyPlan.length === 0 ? (
            <p className="text-xs sm:text-sm text-warmGray-600">
              План ещё не создан. Укажите цель и интенсивность, затем нажмите кнопку генерации.
            </p>
          ) : (
            <div className="max-h-80 sm:max-h-96 overflow-y-auto mt-2 space-y-3">
              {monthlyPlan.map((item) => (
                <NeumorphicCard
                  key={item.id}
                  soft
                  className="p-3 sm:p-4 hover:scale-[1.01] transition-transform"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <NeumorphicBadge variant="info" size="sm">
                          {new Date(item.date).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </NeumorphicBadge>
                        <NeumorphicBadge variant="success" size="sm">
                          {item.category}
                        </NeumorphicBadge>
                      </div>
                      <div className="text-sm sm:text-base font-semibold text-warmGraphite-800">
                        {item.title}
                      </div>
                      <p className="text-xs sm:text-sm text-warmGraphite-600 mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </NeumorphicCard>
              ))}
            </div>
          )}
        </NeumorphicCard>

        {/* Программы и сценарии */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Activity className="w-5 h-5 text-warmBlue-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
              Программы и сценарии месяца
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-warmGraphite-600 mb-4">
            Выберите сценарий, который лучше всего отражает вашу текущую задачу. Вы можете
            переключаться между программами и целями в любой момент — это обновит акценты в плане
            на месяц.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {programs.map((program) => {
              const isSelected = program.id === selectedProgramId
              return (
                <NeumorphicCard
                  key={program.id}
                  soft
                  className={cn(
                    'p-3 sm:p-4 cursor-pointer transition-all',
                    isSelected && 'border-2 border-warmBlue-400'
                  )}
                  onClick={() => {
                    setSelectedProgramId(program.id)
                    if (!primaryGoal) {
                      setPrimaryGoal(program.recommendedGoal)
                    }
                    setPlanIntensity(program.defaultIntensity)
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Flame className="w-4 h-4 text-warmPink-500" />
                    <div className="text-sm sm:text-base font-semibold text-warmGraphite-800">
                      {program.name}
                    </div>
                  </div>
                  <div className="text-xs text-warmGraphite-600 mb-1">
                    Фокус: {program.focus}
                  </div>
                  <p className="text-xs sm:text-sm text-warmGraphite-600">{program.description}</p>
                </NeumorphicCard>
              )
            })}
          </div>
        </NeumorphicCard>

        {/* Источники и исследования */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.35s' }}>
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <BookOpen className="w-5 h-5 text-warmBlue-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
              Библиотека знаний и исследования
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-warmGraphite-600 mb-4">
            В полноценной версии здесь будут персональные подборки научных работ и статей по
            медицине, тренировкам, питанию и психо‑эмоциональному здоровью. В демо вы можете
            посмотреть концепцию раздела знаний.
          </p>
          <div className="space-y-3">
            <NeumorphicCard soft className="p-3 sm:p-4 flex items-center justify-between">
              <div>
                <div className="text-sm sm:text-base font-semibold text-warmGraphite-800">
                  Обзор научных статей по тренировкам и восстановлению
                </div>
                <p className="text-xs sm:text-sm text-warmGraphite-600 mt-1">
                  Концепция раздела знаний NexusVita: протоколы, исследования и практические
                  рекомендации.
                </p>
              </div>
              <Link
                href="/knowledge"
                className="text-xs sm:text-sm text-warmBlue-600 hover:text-warmBlue-700 font-medium ml-3"
              >
                Открыть →
              </Link>
            </NeumorphicCard>
            <NeumorphicCard soft className="p-3 sm:p-4 flex items-center justify-between">
              <div>
                <div className="text-sm sm:text-base font-semibold text-warmGraphite-800">
                  Питание, сон и психика
                </div>
                <p className="text-xs sm:text-sm text-warmGraphite-600 mt-1">
                  Как связаны режим сна, питание и уровень стресса. Пример связки модулей
                  питания/журнала/календаря.
                </p>
              </div>
              <Link
                href="/knowledge"
                className="text-xs sm:text-sm text-warmBlue-600 hover:text-warmBlue-700 font-medium ml-3"
              >
                Смотреть →
              </Link>
            </NeumorphicCard>
          </div>
        </NeumorphicCard>

        {/* Entries List */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-warmBlue-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
              История записей
            </h2>
          </div>
          {entries.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-warmGray-400" />
              <p className="text-warmGray-600">Пока нет записей. Создайте первую запись выше.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry, index) => (
                <NeumorphicCard
                  key={entry.id}
                  soft
                  className="p-4 hover:scale-[1.01] transition-all duration-300 animate-fadeIn"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-warmGraphite-800 text-base sm:text-lg">
                      {entry.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-warmGray-600">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(entry.createdAt).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-warmGraphite-700 whitespace-pre-wrap leading-relaxed">
                    {entry.note}
                  </p>
                </NeumorphicCard>
              ))}
            </div>
          )}
        </NeumorphicCard>
      </div>
    </div>
  )
}
