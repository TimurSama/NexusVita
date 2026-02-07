'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  Sparkles,
  Heart,
  Target,
  Calendar,
  Users,
  BookOpen,
  Gift,
  CheckCircle,
  Star,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicProgress from '@/components/ui/NeumorphicProgress'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import VitruvianMan from '@/components/vitruvian/VitruvianMan'
import { cn } from '@/lib/utils/cn'

type StepData = {
  name?: string
  goals?: string[]
  primaryGoal?: string
  planLevel?: string
  preferences?: string[]
}

export default function LandingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<StepData>({})
  const [showResults, setShowResults] = useState(false)

  const steps = [
    {
      id: 'hero',
      title: 'Добро пожаловать в Nexus Vita',
      subtitle: 'Ваш путь к здоровью начинается здесь',
    },
    {
      id: 'name',
      title: 'Как вас зовут?',
      subtitle: 'Давайте познакомимся',
    },
    {
      id: 'goals',
      title: 'Какие у вас цели?',
      subtitle: 'Выберите все, что вас интересует',
    },
    {
      id: 'primary',
      title: 'Главная цель',
      subtitle: 'Что для вас приоритетно?',
    },
    {
      id: 'plan',
      title: 'Уровень плана',
      subtitle: 'Выберите подходящий темп',
    },
    {
      id: 'results',
      title: 'Ваш персональный план',
      subtitle: 'Мы подготовили рекомендации специально для вас',
    },
  ]

  const goals = [
    'Снижение веса',
    'Набор мышечной массы',
    'Улучшение выносливости',
    'Улучшение сна',
    'Снижение стресса',
    'Улучшение питания',
    'Реабилитация',
    'Общее оздоровление',
  ]

  const planLevels = [
    {
      id: 'soft',
      title: 'Мягкий',
      desc: 'Постепенные изменения',
      icon: '🌱',
      color: 'warmGreen',
    },
    {
      id: 'medium',
      title: 'Средний',
      desc: 'Сбалансированный подход',
      icon: '⚖️',
      color: 'warmBlue',
    },
    {
      id: 'hard',
      title: 'Сложный',
      desc: 'Интенсивный план',
      icon: '🔥',
      color: 'warmRed',
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleGoal = (goal: string) => {
    const currentGoals = formData.goals || []
    if (currentGoals.includes(goal)) {
      setFormData({ ...formData, goals: currentGoals.filter((g) => g !== goal) })
    } else {
      setFormData({ ...formData, goals: [...currentGoals, goal] })
    }
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  // Автоматический переход на следующий шаг через 3 секунды для hero
  useEffect(() => {
    if (currentStep === 0) {
      const timer = setTimeout(() => {
        setCurrentStep(1)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentStep])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Фоновые декоративные элементы */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-warmBlue-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-warmPink-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-warmGreen-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {/* Hero Step */}
          {currentStep === 0 && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen flex items-center justify-center px-4 py-20"
            >
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-warmGraphite-800 mb-6">
                    Nexus Vita
                  </h1>
                  <p className="text-2xl sm:text-3xl text-warmGraphite-600 mb-4">
                    Экосистема здоровья нового поколения
                  </p>
                  <p className="text-lg sm:text-xl text-warmGraphite-500 mb-12 max-w-2xl mx-auto">
                    Объединяем медицинские данные, спорт, питание, психологию и AI-коучинг в
                    единую платформу
                  </p>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <NeumorphicButton
                    primary
                    onClick={handleNext}
                    className="text-lg px-8 py-4 animate-glow"
                  >
                    Начать путешествие
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </NeumorphicButton>
                  <NeumorphicButton
                    onClick={() => router.push('/register')}
                    className="text-lg px-8 py-4"
                  >
                    Пропустить и зарегистрироваться
                  </NeumorphicButton>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Interactive Steps */}
          {currentStep > 0 && currentStep < steps.length - 1 && !showResults && (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="min-h-screen flex items-center justify-center px-4 py-20"
            >
              <div className="w-full max-w-3xl">
                <NeumorphicCard className="p-8 sm:p-12">
                  {/* Прогресс */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-warmGray-600">
                        Шаг {currentStep} из {steps.length - 1}
                      </span>
                      <span className="text-sm text-warmGray-600">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <NeumorphicProgress
                      value={progress}
                      max={100}
                      color="blue"
                      size="lg"
                      showLabel={false}
                    />
                  </div>

                  {/* Контент шага */}
                  <div className="mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800 mb-3">
                      {steps[currentStep].title}
                    </h2>
                    <p className="text-lg text-warmGraphite-600 mb-8">
                      {steps[currentStep].subtitle}
                    </p>

                    {/* Шаг 1: Имя */}
                    {currentStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <NeumorphicInput
                          placeholder="Введите ваше имя"
                          value={formData.name || ''}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="text-lg py-4"
                          autoFocus
                        />
                      </motion.div>
                    )}

                    {/* Шаг 2: Цели */}
                    {currentStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                      >
                        {goals.map((goal, idx) => (
                          <motion.button
                            key={goal}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * idx }}
                            type="button"
                            onClick={() => toggleGoal(goal)}
                            className={cn(
                              'p-4 rounded-2xl text-sm font-medium transition-all duration-300',
                              formData.goals?.includes(goal)
                                ? 'neumorphic-button-primary text-white scale-105'
                                : 'neumorphic-card-soft text-warmGraphite-700 hover:scale-105'
                            )}
                          >
                            {goal}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}

                    {/* Шаг 3: Главная цель */}
                    {currentStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        {goals.map((goal, idx) => (
                          <motion.button
                            key={goal}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            type="button"
                            onClick={() => setFormData({ ...formData, primaryGoal: goal })}
                            className={cn(
                              'p-6 rounded-2xl text-left transition-all duration-300',
                              formData.primaryGoal === goal
                                ? 'neumorphic-card ring-4 ring-warmBlue-400 scale-105'
                                : 'neumorphic-card-soft hover:scale-102'
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-warmGraphite-800">{goal}</span>
                              {formData.primaryGoal === goal && (
                                <CheckCircle className="w-5 h-5 text-warmBlue-600" />
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </motion.div>
                    )}

                    {/* Шаг 4: Уровень плана */}
                    {currentStep === 4 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
                      >
                        {planLevels.map((plan, idx) => (
                          <motion.button
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            type="button"
                            onClick={() => setFormData({ ...formData, planLevel: plan.id })}
                            className={cn(
                              'p-8 rounded-2xl text-center transition-all duration-300',
                              formData.planLevel === plan.id
                                ? 'neumorphic-card ring-4 ring-warmBlue-400 scale-105'
                                : 'neumorphic-card-soft hover:scale-102'
                            )}
                          >
                            <div className="text-5xl mb-4">{plan.icon}</div>
                            <h3 className="text-xl font-bold text-warmGraphite-800 mb-2">
                              {plan.title}
                            </h3>
                            <p className="text-sm text-warmGraphite-600">{plan.desc}</p>
                            {formData.planLevel === plan.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="mt-4"
                              >
                                <CheckCircle className="w-6 h-6 text-warmBlue-600 mx-auto" />
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  {/* Навигация */}
                  <div className="flex items-center justify-between pt-6 border-t border-warmGray-300/50">
                    <NeumorphicButton
                      onClick={handleBack}
                      disabled={currentStep === 1}
                      className={currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                      Назад
                    </NeumorphicButton>
                    <NeumorphicButton
                      primary
                      onClick={handleNext}
                      disabled={
                        (currentStep === 1 && !formData.name) ||
                        (currentStep === 2 && (!formData.goals || formData.goals.length === 0)) ||
                        (currentStep === 3 && !formData.primaryGoal) ||
                        (currentStep === 4 && !formData.planLevel)
                      }
                      className="text-lg px-8 py-4"
                    >
                      {currentStep === steps.length - 2 ? 'Посмотреть план' : 'Далее'}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </NeumorphicButton>
                  </div>
                </NeumorphicCard>
              </div>
            </motion.div>
          )}

          {/* Results Step */}
          {showResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen px-4 py-12"
            >
              <div className="max-w-6xl mx-auto">
                {/* Заголовок результатов */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-center mb-12"
                >
                  <h1 className="text-4xl sm:text-5xl font-bold text-warmGraphite-800 mb-4">
                    {formData.name ? `${formData.name}, ` : ''}ваш персональный план готов!
                  </h1>
                  <p className="text-xl text-warmGraphite-600">
                    Мы подготовили рекомендации специально для вас
                  </p>
                </motion.div>

                {/* План рекомендаций */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {/* Календарь */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <NeumorphicCard className="p-6 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <Calendar className="w-6 h-6 text-warmBlue-600" />
                        <h3 className="text-xl font-semibold text-warmGraphite-800">
                          Персональный календарь
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {[
                          { day: 'Пн', activity: 'Тренировка' },
                          { day: 'Ср', activity: 'Консультация' },
                          { day: 'Пт', activity: 'Тренировка' },
                          { day: 'Вс', activity: 'Отдых' },
                        ].map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="flex items-center justify-between p-3 neumorphic-card-soft rounded-xl"
                          >
                            <span className="font-medium text-warmGraphite-800">{item.day}</span>
                            <span className="text-sm text-warmGraphite-600">{item.activity}</span>
                          </motion.div>
                        ))}
                      </div>
                    </NeumorphicCard>
                  </motion.div>

                  {/* Специалисты */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <NeumorphicCard className="p-6 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <Users className="w-6 h-6 text-warmPink-600" />
                        <h3 className="text-xl font-semibold text-warmGraphite-800">
                          Рекомендуемые специалисты
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {[
                          { name: 'Анна К.', role: 'Тренер', rating: 4.9 },
                          { name: 'Михаил П.', role: 'Нутрициолог', rating: 4.8 },
                          { name: 'Елена С.', role: 'Психолог', rating: 5.0 },
                        ].map((spec, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                            className="p-3 neumorphic-card-soft rounded-xl"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-warmGraphite-800">
                                {spec.name}
                              </span>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-warmPink-600 fill-current" />
                                <span className="text-sm text-warmGraphite-600">{spec.rating}</span>
                              </div>
                            </div>
                            <span className="text-xs text-warmGray-600">{spec.role}</span>
                          </motion.div>
                        ))}
                      </div>
                    </NeumorphicCard>
                  </motion.div>

                  {/* Дневник */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <NeumorphicCard className="p-6 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <BookOpen className="w-6 h-6 text-warmGreen-600" />
                        <h3 className="text-xl font-semibold text-warmGraphite-800">
                          Личный дневник
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {[
                          'Отслеживание прогресса',
                          'Заметки о самочувствии',
                          'AI-анализ данных',
                          'Персональные рекомендации',
                        ].map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            className="flex items-center gap-2 p-3 neumorphic-card-soft rounded-xl"
                          >
                            <CheckCircle className="w-4 h-4 text-warmGreen-600 flex-shrink-0" />
                            <span className="text-sm text-warmGraphite-700">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </NeumorphicCard>
                  </motion.div>
                </div>

                {/* Предложение регистрации */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <NeumorphicCard className="p-8 sm:p-12 bg-gradient-to-br from-warmBlue-50/50 to-warmPink-50/50 border-2 border-warmBlue-200/50">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800 mb-4">
                        Готовы начать?
                      </h2>
                      <p className="text-lg text-warmGraphite-600 mb-6">
                        Зарегистрируйтесь и получите полный доступ к экосистеме
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      {[
                        {
                          icon: Gift,
                          title: '7 дней бесплатно',
                          desc: 'Пробный период AI Health+',
                          color: 'warmPink',
                        },
                        {
                          icon: Sparkles,
                          title: '100 NVT токенов',
                          desc: 'Бонус при регистрации',
                          color: 'warmBlue',
                        },
                        {
                          icon: TrendingUp,
                          title: 'Персональный план',
                          desc: 'На основе ваших ответов',
                          color: 'warmGreen',
                        },
                      ].map((benefit, idx) => {
                        const Icon = benefit.icon
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 + idx * 0.1 }}
                          >
                            <NeumorphicCard soft className="p-6 text-center">
                              <Icon
                                className={cn(
                                  'w-8 h-8 mx-auto mb-3',
                                  `text-${benefit.color}-600`
                                )}
                              />
                              <h3 className="font-semibold text-warmGraphite-800 mb-1">
                                {benefit.title}
                              </h3>
                              <p className="text-xs text-warmGraphite-600">{benefit.desc}</p>
                            </NeumorphicCard>
                          </motion.div>
                        )
                      })}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <NeumorphicButton
                        primary
                        onClick={() => router.push('/register')}
                        className="text-lg px-8 py-4 animate-glow"
                      >
                        Зарегистрироваться
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </NeumorphicButton>
                      <NeumorphicButton
                        onClick={() => router.push('/subscriptions')}
                        className="text-lg px-8 py-4"
                      >
                        Посмотреть подписки
                      </NeumorphicButton>
                    </div>
                  </NeumorphicCard>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
