'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, User, Target, Link2, Sparkles, ArrowRight } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicProgress from '@/components/ui/NeumorphicProgress'
import { cn } from '@/lib/utils/cn'

interface OnboardingProgress {
  id: string
  step: number
  completedSteps: string[]
  step1Completed: boolean
  step2Completed: boolean
  step3Completed: boolean
  step4Completed: boolean
  step5Completed: boolean
}

export default function OnboardingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState<OnboardingProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchProgress()
  }, [])

  const fetchProgress = async () => {
    try {
      const res = await fetch('/api/onboarding')
      if (res.ok) {
        const data = await res.json()
        setProgress(data)
      }
    } catch (error) {
      console.error('Failed to fetch onboarding progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const completeStep = async (step: number) => {
    setSaving(true)
    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step, completed: true }),
      })
      if (res.ok) {
        const updated = await res.json()
        setProgress(updated)

        if (step === 5) {
          setTimeout(() => router.push('/'), 2000)
        }
      }
    } catch (error) {
      console.error('Failed to complete step:', error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmGray-50">
        <NeumorphicCard className="p-8">
          <p className="text-warmGraphite-600">Загрузка...</p>
        </NeumorphicCard>
      </div>
    )
  }

  if (!progress) return null

  const steps = [
    {
      num: 1,
      title: 'Профиль',
      description: 'Заполните основную информацию о себе',
      icon: User,
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-warmGraphite-600">
            Расскажите о себе, чтобы мы могли персонализировать ваш опыт.
          </p>
          <NeumorphicButton primary onClick={() => router.push('/profile')}>
            Перейти к профилю
            <ArrowRight className="w-4 h-4 ml-2" />
          </NeumorphicButton>
        </div>
      ),
    },
    {
      num: 2,
      title: 'Цели',
      description: 'Поставьте свои первые цели здоровья',
      icon: Target,
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-warmGraphite-600">
            Определите, чего вы хотите достичь в области здоровья и фитнеса.
          </p>
          <NeumorphicButton primary onClick={() => router.push('/goals')}>
            Создать цель
            <ArrowRight className="w-4 h-4 ml-2" />
          </NeumorphicButton>
        </div>
      ),
    },
    {
      num: 3,
      title: 'Интеграции',
      description: 'Подключите устройства и сервисы',
      icon: Link2,
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-warmGraphite-600">
            Подключите Oura, Garmin или другие устройства для автоматического отслеживания.
          </p>
          <NeumorphicButton primary onClick={() => router.push('/profile')}>
            Настроить интеграции
            <ArrowRight className="w-4 h-4 ml-2" />
          </NeumorphicButton>
        </div>
      ),
    },
    {
      num: 4,
      title: 'AI Health+',
      description: 'Познакомьтесь с вашим персональным AI-ассистентом',
      icon: Sparkles,
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-warmGraphite-600">
            У вас есть 7 дней бесплатного пробного периода AI Health+!
          </p>
          <NeumorphicCard
            soft
            className="p-4 bg-warmPink-50/50 border-2 border-warmPink-200/50"
          >
            <p className="text-xs sm:text-sm text-warmGraphite-700">
              ✨ Пробный период активен до{' '}
              {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU')}
            </p>
          </NeumorphicCard>
          <NeumorphicButton primary onClick={() => router.push('/journal')}>
            Попробовать AI Health+
            <ArrowRight className="w-4 h-4 ml-2" />
          </NeumorphicButton>
        </div>
      ),
    },
    {
      num: 5,
      title: 'Готово!',
      description: 'Вы готовы начать свой путь к здоровью',
      icon: CheckCircle,
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-warmGraphite-600">
            Добро пожаловать в Nexus Vita! Начните исследовать все возможности платформы.
          </p>
          <NeumorphicButton
            primary
            onClick={() => completeStep(5)}
            disabled={saving}
            className="w-full sm:w-auto"
          >
            {saving ? 'Завершение...' : 'Начать использовать'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </NeumorphicButton>
        </div>
      ),
    },
  ]

  const currentStepData = steps[progress.step - 1]
  const progressPercent = (progress.step / 5) * 100

  return (
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <NeumorphicCard className="p-6 sm:p-8 mb-6 animate-fadeIn">
          <h1 className="text-2xl sm:text-3xl font-bold text-warmGraphite-800 mb-2">
            Добро пожаловать!
          </h1>
          <p className="text-sm sm:text-base text-warmGraphite-600 mb-6">
            Давайте настроим ваш аккаунт за несколько простых шагов
          </p>

          {/* Прогресс-бар */}
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {steps.map((s) => {
                const Icon = s.icon
                const isCompleted =
                  progress.step > s.num ||
                  (progress.step === s.num &&
                    (progress[`step${s.num}Completed` as keyof OnboardingProgress] as boolean))
                const isCurrent = progress.step === s.num && !isCompleted

                return (
                  <div
                    key={s.num}
                    className={cn(
                      'flex-1 text-center',
                      isCompleted || isCurrent ? 'text-warmGraphite-800' : 'text-warmGray-400'
                    )}
                  >
                    <div
                      className={cn(
                        'w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full flex items-center justify-center border-2 transition-all animate-fadeIn',
                        isCompleted
                          ? 'bg-warmGreen-500 text-white border-warmGreen-500'
                          : isCurrent
                            ? 'border-warmBlue-500 text-warmBlue-600 bg-warmBlue-50'
                            : 'border-warmGray-300 text-warmGray-400'
                      )}
                      style={{ animationDelay: `${s.num * 0.1}s` }}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                      ) : (
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                    </div>
                    <div className="text-xs mt-2 font-medium">{s.title}</div>
                  </div>
                )
              })}
            </div>
            <NeumorphicProgress
              value={progressPercent}
              max={100}
              color="blue"
              size="md"
              showLabel
              label={`${Math.round(progressPercent)}%`}
            />
          </div>

          {/* Текущий шаг */}
          <div className="border-t border-warmGray-300/50 pt-6">
            <h2 className="text-xl sm:text-2xl font-bold text-warmGraphite-800 mb-2">
              Шаг {currentStepData.num}: {currentStepData.title}
            </h2>
            <p className="text-sm sm:text-base text-warmGraphite-600 mb-6">
              {currentStepData.description}
            </p>
            {currentStepData.content}
          </div>
        </NeumorphicCard>

        {/* Пропустить онбординг */}
        {progress.step < 5 && (
          <div className="text-center">
            <button
              className="text-sm text-warmGray-600 hover:text-warmGraphite-800 transition-colors"
              onClick={() => {
                completeStep(5)
                router.push('/')
              }}
            >
              Пропустить онбординг
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
