'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicTextarea from '@/components/ui/NeumorphicTextarea'
import NeumorphicProgress from '@/components/ui/NeumorphicProgress'
import { motion, AnimatePresence } from 'framer-motion'

type FormData = {
  // Базовые данные
  email: string
  username: string
  password: string
  firstName: string
  lastName: string
  
  // Текущее состояние
  age: string
  gender: string
  height: string
  weight: string
  activityLevel: string
  sleepHours: string
  stressLevel: string
  
  // Цели
  goals: string[]
  primaryGoal: string
  
  // Привычки
  exerciseFrequency: string
  nutritionHabits: string[]
  supplements: string[]
  medicalConditions: string[]
  
  // Пожелания
  preferences: string[]
  preferredSpecialists: string[]
  budget: string
  
  // План
  planLevel: string
}

const GOALS = [
  'Снижение веса',
  'Набор мышечной массы',
  'Улучшение выносливости',
  'Улучшение сна',
  'Снижение стресса',
  'Улучшение питания',
  'Реабилитация',
  'Общее оздоровление',
]

const NUTRITION_HABITS = [
  'Вегетарианство',
  'Веганство',
  'Кето-диета',
  'Палео-диета',
  'Средиземноморская',
  'Низкоуглеводная',
  'Без ограничений',
]

const SUPPLEMENTS = [
  'Витамины',
  'Протеин',
  'Омега-3',
  'Креатин',
  'BCAA',
  'Пребиотики',
  'Другое',
]

const PREFERENCES = [
  'Онлайн консультации',
  'Офлайн встречи',
  'Групповые занятия',
  'Индивидуальные программы',
  'AI-коучинг',
  'Традиционные методы',
]

const SPECIALISTS = [
  'Тренер',
  'Нутрициолог',
  'Психолог',
  'Врач',
  'Массажист',
  'Йога-инструктор',
]

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    sleepHours: '',
    stressLevel: '',
    goals: [],
    primaryGoal: '',
    exerciseFrequency: '',
    nutritionHabits: [],
    supplements: [],
    medicalConditions: [],
    preferences: [],
    preferredSpecialists: [],
    budget: '',
    planLevel: '',
  })

  const totalSteps = 6
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter((i) => i !== item)
    }
    return [...array, item]
  }

  const handleSubmit = async () => {
    setError(null)
    setLoading(true)
    
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        // Дополнительные данные сохраняются в профиле
        profileData: {
          age: formData.age,
          gender: formData.gender,
          height: formData.height,
          weight: formData.weight,
          activityLevel: formData.activityLevel,
          sleepHours: formData.sleepHours,
          stressLevel: formData.stressLevel,
          goals: formData.goals,
          primaryGoal: formData.primaryGoal,
          exerciseFrequency: formData.exerciseFrequency,
          nutritionHabits: formData.nutritionHabits,
          supplements: formData.supplements,
          medicalConditions: formData.medicalConditions,
          preferences: formData.preferences,
          preferredSpecialists: formData.preferredSpecialists,
          budget: formData.budget,
          planLevel: formData.planLevel,
        },
      }),
    })
    setLoading(false)

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось зарегистрироваться')
      return
    }
    router.push('/onboarding')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <NeumorphicCard className="p-6 sm:p-10 animate-fadeIn">
          {/* Прогресс */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-warmGraphite-800">
                Регистрация
              </h1>
              <span className="text-sm text-warmGray-600">
                Шаг {step} из {totalSteps}
              </span>
            </div>
            <NeumorphicProgress
              value={progress}
              max={100}
              color="blue"
              size="md"
              showLabel={false}
            />
          </div>

          {error && (
            <NeumorphicCard
              soft
              className="p-4 bg-warmRed-50 border-2 border-warmRed-200 mb-6 animate-shake"
            >
              <p className="text-sm text-warmRed-700">{error}</p>
            </NeumorphicCard>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Шаг 1: Базовые данные */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
                    Основная информация
                  </h2>
                  <NeumorphicInput
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <NeumorphicInput
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                  <NeumorphicInput
                    placeholder="Имя"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                  <NeumorphicInput
                    placeholder="Фамилия"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                  <NeumorphicInput
                    placeholder="Пароль (минимум 8 символов)"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              )}

              {/* Шаг 2: Текущее состояние */}
              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
                    Текущее состояние
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <NeumorphicInput
                      placeholder="Возраст"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                    <select
                      className="neumorphic-input"
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                      <option value="">Пол</option>
                      <option value="male">Мужской</option>
                      <option value="female">Женский</option>
                      <option value="other">Другое</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <NeumorphicInput
                      placeholder="Рост (см)"
                      type="number"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    />
                    <NeumorphicInput
                      placeholder="Вес (кг)"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    />
                  </div>
                  <select
                    className="neumorphic-input w-full"
                    value={formData.activityLevel}
                    onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
                  >
                    <option value="">Уровень активности</option>
                    <option value="sedentary">Малоподвижный</option>
                    <option value="light">Легкая активность</option>
                    <option value="moderate">Умеренная активность</option>
                    <option value="active">Активный</option>
                    <option value="very-active">Очень активный</option>
                  </select>
                  <div className="grid grid-cols-2 gap-4">
                    <NeumorphicInput
                      placeholder="Часов сна в сутки"
                      type="number"
                      value={formData.sleepHours}
                      onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
                    />
                    <select
                      className="neumorphic-input"
                      value={formData.stressLevel}
                      onChange={(e) => setFormData({ ...formData, stressLevel: e.target.value })}
                    >
                      <option value="">Уровень стресса</option>
                      <option value="low">Низкий</option>
                      <option value="medium">Средний</option>
                      <option value="high">Высокий</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Шаг 3: Цели */}
              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
                    Ваши цели
                  </h2>
                  <p className="text-sm text-warmGraphite-600 mb-4">
                    Выберите все, что вас интересует:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {GOALS.map((goal) => (
                      <button
                        key={goal}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            goals: toggleArrayItem(formData.goals, goal),
                          })
                        }
                        className={`p-3 rounded-2xl text-sm font-medium transition-all ${
                          formData.goals.includes(goal)
                            ? 'neumorphic-button-primary text-white'
                            : 'neumorphic-card-soft text-warmGraphite-700 hover:scale-105'
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                  <select
                    className="neumorphic-input w-full mt-4"
                    value={formData.primaryGoal}
                    onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                  >
                    <option value="">Главная цель</option>
                    {GOALS.map((goal) => (
                      <option key={goal} value={goal}>
                        {goal}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Шаг 4: Привычки */}
              {step === 4 && (
                <div className="space-y-5">
                  <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
                    Привычки и образ жизни
                  </h2>
                  <select
                    className="neumorphic-input w-full"
                    value={formData.exerciseFrequency}
                    onChange={(e) =>
                      setFormData({ ...formData, exerciseFrequency: e.target.value })
                    }
                  >
                    <option value="">Частота тренировок</option>
                    <option value="never">Не тренируюсь</option>
                    <option value="rarely">Редко (1-2 раза в месяц)</option>
                    <option value="sometimes">Иногда (1-2 раза в неделю)</option>
                    <option value="regularly">Регулярно (3-4 раза в неделю)</option>
                    <option value="daily">Ежедневно</option>
                  </select>
                  <div>
                    <p className="text-sm text-warmGraphite-600 mb-3">Предпочтения в питании:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {NUTRITION_HABITS.map((habit) => (
                        <button
                          key={habit}
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              nutritionHabits: toggleArrayItem(formData.nutritionHabits, habit),
                            })
                          }
                          className={`p-2 rounded-xl text-xs font-medium transition-all ${
                            formData.nutritionHabits.includes(habit)
                              ? 'neumorphic-button-primary text-white'
                              : 'neumorphic-card-soft text-warmGraphite-700 hover:scale-105'
                          }`}
                        >
                          {habit}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-warmGraphite-600 mb-3">Добавки и препараты:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {SUPPLEMENTS.map((supplement) => (
                        <button
                          key={supplement}
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              supplements: toggleArrayItem(formData.supplements, supplement),
                            })
                          }
                          className={`p-2 rounded-xl text-xs font-medium transition-all ${
                            formData.supplements.includes(supplement)
                              ? 'neumorphic-button-primary text-white'
                              : 'neumorphic-card-soft text-warmGraphite-700 hover:scale-105'
                          }`}
                        >
                          {supplement}
                        </button>
                      ))}
                    </div>
                  </div>
                  <NeumorphicTextarea
                    placeholder="Хронические заболевания или медицинские условия (необязательно)"
                    value={formData.medicalConditions.join(', ')}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        medicalConditions: e.target.value.split(',').map((s) => s.trim()),
                      })
                    }
                    rows={3}
                  />
                </div>
              )}

              {/* Шаг 5: Пожелания */}
              {step === 5 && (
                <div className="space-y-5">
                  <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
                    Пожелания и предпочтения
                  </h2>
                  <div>
                    <p className="text-sm text-warmGraphite-600 mb-3">Предпочтения:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {PREFERENCES.map((pref) => (
                        <button
                          key={pref}
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              preferences: toggleArrayItem(formData.preferences, pref),
                            })
                          }
                          className={`p-2 rounded-xl text-xs font-medium transition-all ${
                            formData.preferences.includes(pref)
                              ? 'neumorphic-button-primary text-white'
                              : 'neumorphic-card-soft text-warmGraphite-700 hover:scale-105'
                          }`}
                        >
                          {pref}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-warmGraphite-600 mb-3">
                      Интересующие специалисты:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {SPECIALISTS.map((spec) => (
                        <button
                          key={spec}
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              preferredSpecialists: toggleArrayItem(
                                formData.preferredSpecialists,
                                spec
                              ),
                            })
                          }
                          className={`p-2 rounded-xl text-xs font-medium transition-all ${
                            formData.preferredSpecialists.includes(spec)
                              ? 'neumorphic-button-primary text-white'
                              : 'neumorphic-card-soft text-warmGraphite-700 hover:scale-105'
                          }`}
                        >
                          {spec}
                        </button>
                      ))}
                    </div>
                  </div>
                  <select
                    className="neumorphic-input w-full"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option value="">Бюджет на здоровье в месяц</option>
                    <option value="low">До 5 000 ₽</option>
                    <option value="medium">5 000 - 15 000 ₽</option>
                    <option value="high">15 000 - 30 000 ₽</option>
                    <option value="premium">Свыше 30 000 ₽</option>
                  </select>
                </div>
              )}

              {/* Шаг 6: План */}
              {step === 6 && (
                <div className="space-y-5">
                  <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
                    Выберите уровень плана
                  </h2>
                  <p className="text-sm text-warmGraphite-600 mb-6">
                    Мы подберем оптимальный план на основе ваших ответов
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      {
                        level: 'soft',
                        title: 'Мягкий',
                        desc: 'Постепенные изменения, минимальный стресс',
                        features: ['Легкие тренировки', 'Постепенное изменение питания', 'Мягкие рекомендации'],
                      },
                      {
                        level: 'medium',
                        title: 'Средний',
                        desc: 'Сбалансированный подход',
                        features: ['Регулярные тренировки', 'Сбалансированное питание', 'Умеренные нагрузки'],
                      },
                      {
                        level: 'hard',
                        title: 'Сложный',
                        desc: 'Интенсивный план для быстрых результатов',
                        features: ['Интенсивные тренировки', 'Строгое питание', 'Максимальная эффективность'],
                      },
                    ].map((plan) => (
                      <button
                        key={plan.level}
                        type="button"
                        onClick={() => setFormData({ ...formData, planLevel: plan.level })}
                        className={`p-6 rounded-2xl text-left transition-all ${
                          formData.planLevel === plan.level
                            ? 'neumorphic-card ring-4 ring-warmBlue-400 scale-105'
                            : 'neumorphic-card-soft hover:scale-102'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-warmGraphite-800">
                            {plan.title}
                          </h3>
                          {formData.planLevel === plan.level && (
                            <CheckCircle className="w-5 h-5 text-warmBlue-600" />
                          )}
                        </div>
                        <p className="text-sm text-warmGraphite-600 mb-3">{plan.desc}</p>
                        <ul className="text-xs text-warmGraphite-600 space-y-1">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="text-warmBlue-600">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Навигация */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-warmGray-300/50">
            <NeumorphicButton
              onClick={handleBack}
              disabled={step === 1}
              className={step === 1 ? 'opacity-50 cursor-not-allowed' : ''}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </NeumorphicButton>
            {step < totalSteps ? (
              <NeumorphicButton primary onClick={handleNext}>
                Далее
                <ArrowRight className="w-4 h-4 ml-2" />
              </NeumorphicButton>
            ) : (
              <NeumorphicButton primary onClick={handleSubmit} disabled={loading}>
                {loading ? 'Создание...' : 'Создать аккаунт'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </NeumorphicButton>
            )}
          </div>

          <div className="text-sm text-warmGraphite-600 mt-6 text-center">
            Уже есть аккаунт?{' '}
            <Link
              href="/login"
              className="text-warmBlue-600 hover:text-warmBlue-700 font-medium transition-colors"
            >
              Войти
            </Link>
          </div>
        </NeumorphicCard>
      </div>
    </div>
  )
}
