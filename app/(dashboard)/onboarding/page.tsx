'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
        
        // Если последний шаг - перенаправляем на главную
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-ink-600">Загрузка...</div>
      </div>
    )
  }

  if (!progress) return null

  const steps = [
    {
      num: 1,
      title: 'Профиль',
      description: 'Заполните основную информацию о себе',
      content: (
        <div className="space-y-4">
          <p className="text-ink-600">
            Расскажите о себе, чтобы мы могли персонализировать ваш опыт.
          </p>
          <button
            className="sketch-button"
            onClick={() => router.push('/profile')}
          >
            Перейти к профилю
          </button>
        </div>
      ),
    },
    {
      num: 2,
      title: 'Цели',
      description: 'Поставьте свои первые цели здоровья',
      content: (
        <div className="space-y-4">
          <p className="text-ink-600">
            Определите, чего вы хотите достичь в области здоровья и фитнеса.
          </p>
          <button
            className="sketch-button"
            onClick={() => router.push('/goals')}
          >
            Создать цель
          </button>
        </div>
      ),
    },
    {
      num: 3,
      title: 'Интеграции',
      description: 'Подключите устройства и сервисы',
      content: (
        <div className="space-y-4">
          <p className="text-ink-600">
            Подключите Oura, Garmin или другие устройства для автоматического отслеживания.
          </p>
          <button
            className="sketch-button"
            onClick={() => router.push('/profile')}
          >
            Настроить интеграции
          </button>
        </div>
      ),
    },
    {
      num: 4,
      title: 'AI Health+',
      description: 'Познакомьтесь с вашим персональным AI-ассистентом',
      content: (
        <div className="space-y-4">
          <p className="text-ink-600">
            У вас есть 7 дней бесплатного пробного периода AI Health+!
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              ✨ Пробный период активен до{' '}
              {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU')}
            </p>
          </div>
          <button
            className="sketch-button"
            onClick={() => router.push('/journal')}
          >
            Попробовать AI Health+
          </button>
        </div>
      ),
    },
    {
      num: 5,
      title: 'Готово!',
      description: 'Вы готовы начать свой путь к здоровью',
      content: (
        <div className="space-y-4">
          <p className="text-ink-600">
            Добро пожаловать в Nexus Vita! Начните исследовать все возможности платформы.
          </p>
          <button
            className="sketch-button"
            onClick={() => completeStep(5)}
            disabled={saving}
          >
            {saving ? 'Завершение...' : 'Начать использовать'}
          </button>
        </div>
      ),
    },
  ]

  const currentStepData = steps[progress.step - 1]

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="sketch-card p-8 mb-6">
          <h1 className="text-3xl font-bold text-ink-800 mb-2">Добро пожаловать!</h1>
          <p className="text-ink-600 mb-6">
            Давайте настроим ваш аккаунт за несколько простых шагов
          </p>

          {/* Прогресс-бар */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((s) => (
                <div
                  key={s.num}
                  className={`flex-1 text-center ${
                    progress.step > s.num || (progress.step === s.num && progress[`step${s.num}Completed` as keyof OnboardingProgress] as boolean)
                      ? 'text-ink-800'
                      : 'text-ink-400'
                  }`}
                >
                  <div
                    className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center border-2 ${
                      progress.step > s.num || (progress.step === s.num && progress[`step${s.num}Completed` as keyof OnboardingProgress] as boolean)
                        ? 'bg-ink-800 text-parchment border-ink-800'
                        : progress.step === s.num
                        ? 'border-ink-800 text-ink-800'
                        : 'border-ink-300 text-ink-400'
                    }`}
                  >
                    {progress.step > s.num || (progress.step === s.num && progress[`step${s.num}Completed` as keyof OnboardingProgress] as boolean) ? (
                      '✓'
                    ) : (
                      s.num
                    )}
                  </div>
                  <div className="text-xs mt-1">{s.title}</div>
                </div>
              ))}
            </div>
            <div className="h-2 bg-ink-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-ink-800 transition-all duration-300"
                style={{ width: `${(progress.step / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Текущий шаг */}
          <div className="border-t border-ink-200 pt-6">
            <h2 className="text-2xl font-bold text-ink-800 mb-2">
              Шаг {currentStepData.num}: {currentStepData.title}
            </h2>
            <p className="text-ink-600 mb-6">{currentStepData.description}</p>
            {currentStepData.content}
          </div>
        </div>

        {/* Пропустить онбординг */}
        {progress.step < 5 && (
          <div className="text-center">
            <button
              className="text-sm text-ink-500 hover:text-ink-700"
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
