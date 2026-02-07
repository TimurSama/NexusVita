'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
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
  Activity,
  Apple,
  Brain,
  Stethoscope,
  Dumbbell,
  ShoppingBag,
  Coins,
  MessageSquare,
  Shield,
  BarChart3,
  Sparkles,
  X,
  Send,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicProgress from '@/components/ui/NeumorphicProgress'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import NeumorphicModal from '@/components/ui/NeumorphicModal'
import { cn } from '@/lib/utils/cn'

type FormData = {
  name?: string
  goals?: string[]
  primaryGoal?: string
  planLevel?: string
  preferences?: string[]
  mood?: string
  activityLevel?: string
  age?: string
  gender?: string
  healthIssues?: string[]
}

export default function AboutPage() {
  const router = useRouter()
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMinimized, setChatMinimized] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([])
  const [chatInput, setChatInput] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [formData, setFormData] = useState<FormData>({})
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  const questions = [
    { id: 'name', text: 'Как вас зовут?', type: 'text' },
    { id: 'age', text: 'Сколько вам лет?', type: 'number' },
    { id: 'gender', text: 'Ваш пол?', type: 'select', options: ['Мужской', 'Женский', 'Другое'] },
    { id: 'goals', text: 'Какие у вас цели? (можно выбрать несколько)', type: 'multiselect', options: ['Снижение веса', 'Набор мышечной массы', 'Улучшение выносливости', 'Улучшение сна', 'Снижение стресса', 'Улучшение питания', 'Реабилитация', 'Общее оздоровление'] },
    { id: 'primaryGoal', text: 'Главная цель?', type: 'select', options: ['Снижение веса', 'Набор мышечной массы', 'Улучшение выносливости', 'Улучшение сна', 'Снижение стресса', 'Улучшение питания', 'Реабилитация', 'Общее оздоровление'] },
    { id: 'mood', text: 'Как ваше настроение?', type: 'select', options: ['Отлично', 'Хорошо', 'Нормально', 'Плохо', 'Очень плохо'] },
    { id: 'activityLevel', text: 'Уровень активности?', type: 'select', options: ['Минимальный', 'Низкий', 'Умеренный', 'Высокий', 'Очень высокий'] },
    { id: 'planLevel', text: 'Уровень плана?', type: 'select', options: ['Мягкий', 'Умеренный', 'Интенсивный'] },
  ]

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const newUserMessage = { sender: 'user' as const, text: chatInput }
    setChatMessages((prev) => [...prev, newUserMessage])
    setChatInput('')

    // Simulate AI response
    setTimeout(() => {
      if (currentQuestion < questions.length) {
        const question = questions[currentQuestion]
        setChatMessages((prev) => [...prev, { sender: 'ai', text: question.text }])
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setChatMessages((prev) => [...prev, { sender: 'ai', text: 'Отлично! Мы собрали всю информацию. Теперь можем предложить вам персональный план. Хотите зарегистрироваться и получить пробную неделю?' }])
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <NeumorphicBadge variant="info" className="mb-6 text-lg px-6 py-3">
              ✦ Экосистема здоровья нового поколения
            </NeumorphicBadge>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-warmGraphite-800 mb-6">
              Nexus Vita
            </h1>
            <p className="text-2xl sm:text-3xl text-warmGraphite-600 mb-4 max-w-3xl mx-auto">
              Унифицированная платформа для управления здоровьем
            </p>
            <p className="text-lg sm:text-xl text-warmGraphite-500 mb-12 max-w-2xl mx-auto">
              Объединяем медицинские данные, спорт, питание, психологию и AI-коучинг в единую экосистему
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeumorphicButton
                primary
                onClick={() => router.push('/register')}
                className="text-lg px-8 py-4"
              >
                Начать бесплатно
                <ArrowRight className="w-5 h-5 ml-2" />
              </NeumorphicButton>
              <NeumorphicButton
                onClick={() => setChatOpen(true)}
                className="text-lg px-8 py-4"
              >
                Узнать больше
              </NeumorphicButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-warmGraphite-800 mb-4">
              Всё для вашего здоровья в одном месте
            </h2>
            <p className="text-xl text-warmGraphite-600 max-w-2xl mx-auto">
              Комплексный подход к здоровью через интеграцию всех аспектов жизни
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                id: 'medical-card',
                icon: <Stethoscope className="w-8 h-8" />,
                title: 'Медицинская карта',
                description: 'Храните все медицинские данные, анализы, диагнозы и назначения в единой системе',
                color: 'warmRed',
                details: {
                  features: [
                    'Цифровое хранение всех медицинских документов',
                    'Автоматическая синхронизация анализов из лабораторий',
                    'История болезней и диагнозов',
                    'Назначения врачей и лекарства',
                    'Вакцинации и прививки',
                    'Аллергии и противопоказания',
                    'Интеграция с клиниками через FHIR',
                    'Экспорт данных в PDF',
                  ],
                  benefits: [
                    'Все данные в одном месте',
                    'Доступ в любой момент',
                    'Безопасное хранение',
                    'Легкий обмен с врачами',
                  ],
                },
              },
              {
                id: 'training',
                icon: <Dumbbell className="w-8 h-8" />,
                title: 'Тренировки',
                description: 'Персональные программы тренировок, отслеживание прогресса и интеграция с фитнес-трекерами',
                color: 'warmBlue',
                details: {
                  features: [
                    'Персональные программы от тренеров',
                    'Библиотека упражнений с видео',
                    'Отслеживание прогресса (веса, подходы, повторения)',
                    'Интеграция с Garmin, Apple Watch, Fitbit',
                    'Планирование тренировок на неделю/месяц',
                    'Анализ эффективности тренировок',
                    'Рекомендации по восстановлению',
                    'Групповые тренировки и челленджи',
                  ],
                  benefits: [
                    'Персонализированные программы',
                    'Мотивация через прогресс',
                    'Интеграция с устройствами',
                    'Профессиональная поддержка',
                  ],
                },
              },
              {
                id: 'nutrition',
                icon: <Apple className="w-8 h-8" />,
                title: 'Питание',
                description: 'Планирование рациона, подсчет калорий, макронутриентов и рекомендации по питанию',
                color: 'warmGreen',
                details: {
                  features: [
                    'Подсчет калорий и БЖУ',
                    'База продуктов с детальной информацией',
                    'Планирование рациона на день/неделю',
                    'Рекомендации по питанию от нутрициологов',
                    'Отслеживание воды и жидкости',
                    'Дневник питания с фото',
                    'Анализ дефицита микронутриентов',
                    'Рецепты и планы питания',
                  ],
                  benefits: [
                    'Контроль питания',
                    'Персональные рекомендации',
                    'Удобное планирование',
                    'Достижение целей',
                  ],
                },
              },
              {
                id: 'mental-health',
                icon: <Brain className="w-8 h-8" />,
                title: 'Психическое здоровье',
                description: 'Дневник настроения, медитации, работа со стрессом и доступ к психологам',
                color: 'warmPink',
                details: {
                  features: [
                    'Дневник настроения и эмоций',
                    'Библиотека медитаций и практик',
                    'Техники работы со стрессом',
                    'Доступ к психологам и психотерапевтам',
                    'Трекинг сна и восстановления',
                    'Анализ паттернов настроения',
                    'Персональные рекомендации',
                    'Группы поддержки',
                  ],
                  benefits: [
                    'Комплексный подход к ментальному здоровью',
                    'Профессиональная поддержка',
                    'Инструменты самопомощи',
                    'Сообщество единомышленников',
                  ],
                },
              },
              {
                id: 'social',
                icon: <Users className="w-8 h-8" />,
                title: 'Социальная сеть',
                description: 'Общение с единомышленниками, группы поддержки и обмен опытом',
                color: 'warmBlue',
                details: {
                  features: [
                    'Лента постов и достижений',
                    'Группы по интересам и целям',
                    'Челленджи и соревнования',
                    'Обмен опытом и советами',
                    'Система друзей и подписок',
                    'Истории и активности',
                    'Мотивационные посты',
                    'Экспертный контент',
                  ],
                  benefits: [
                    'Мотивация через сообщество',
                    'Обмен опытом',
                    'Поддержка единомышленников',
                    'Достижение целей вместе',
                  ],
                },
              },
              {
                id: 'ai-health',
                icon: <Sparkles className="w-8 h-8" />,
                title: 'AI Health+',
                description: 'Искусственный интеллект для персональных рекомендаций и планов здоровья',
                color: 'warmPink',
                details: {
                  features: [
                    'Персональные планы здоровья на основе данных',
                    'AI-коучинг и рекомендации 24/7',
                    'Анализ всех данных для выявления паттернов',
                    'Предсказание рисков и профилактика',
                    'Персонализированные советы по образу жизни',
                    'Интеграция всех модулей для комплексного анализа',
                    'Адаптивные планы, меняющиеся с прогрессом',
                    'Библиотека протоколов и программ',
                  ],
                  benefits: [
                    'Персонализация на основе данных',
                    'Круглосуточная поддержка',
                    'Проактивные рекомендации',
                    'Комплексный анализ здоровья',
                  ],
                },
              },
              {
                id: 'specialists',
                icon: <Heart className="w-8 h-8" />,
                title: 'Специалисты',
                description: 'Доступ к врачам, тренерам, нутрициологам и другим специалистам через платформу',
                color: 'warmRed',
                details: {
                  features: [
                    'База проверенных специалистов',
                    'Онлайн и офлайн консультации',
                    'Запись на прием через календарь',
                    'Видео-консультации в приложении',
                    'История всех консультаций',
                    'Рейтинги и отзывы',
                    'Специализации: врачи, тренеры, нутрициологи, психологи',
                    'Интеграция с клиниками',
                  ],
                  benefits: [
                    'Доступ к профессионалам',
                    'Удобная запись',
                    'История консультаций',
                    'Выбор лучших специалистов',
                  ],
                },
              },
              {
                id: 'marketplace',
                icon: <ShoppingBag className="w-8 h-8" />,
                title: 'Маркетплейс',
                description: 'Покупка абонементов, услуг, добавок и товаров для здоровья',
                color: 'warmGreen',
                details: {
                  features: [
                    'Абонементы в фитнес-клубы и студии',
                    'Услуги специалистов',
                    'БАДы и добавки',
                    'Спортивное питание',
                    'Товары для здоровья',
                    'Онлайн-курсы и программы',
                    'Система кэшбэка токенами NVT',
                    'Персональные рекомендации',
                  ],
                  benefits: [
                    'Все для здоровья в одном месте',
                    'Выгодные цены',
                    'Кэшбэк токенами',
                    'Персональные предложения',
                  ],
                },
              },
              {
                id: 'dao',
                icon: <Coins className="w-8 h-8" />,
                title: 'DAO и токены',
                description: 'Участие в управлении экосистемой через токены NVT и голосования',
                color: 'warmBlue',
                details: {
                  features: [
                    'Токены NVT за активность и достижения',
                    'Голосование за развитие платформы',
                    'Предложения улучшений (proposals)',
                    'Стейкинг токенов для премиум-доступа',
                    'Гранты на исследования здоровья',
                    'Участие в прибыли экосистемы',
                    'Децентрализованное управление',
                    'Прозрачная экономика',
                  ],
                  benefits: [
                    'Участие в управлении',
                    'Монетизация активности',
                    'Влияние на развитие',
                    'Прозрачность и справедливость',
                  ],
                },
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <NeumorphicCard 
                  className="p-6 sm:p-8 h-full hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedFeature(feature.id)}
                >
                  <div className={cn('text-4xl mb-4 text-' + feature.color + '-500')}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-warmGraphite-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-warmGraphite-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <NeumorphicButton className="w-full text-sm">
                    Узнать подробнее →
                  </NeumorphicButton>
                </NeumorphicCard>
              </motion.div>
            ))}
          </div>

          {/* Feature Details Modal */}
          {selectedFeature && (() => {
            const feature = [
              {
                id: 'medical-card',
                icon: <Stethoscope className="w-8 h-8" />,
                title: 'Медицинская карта',
                description: 'Храните все медицинские данные, анализы, диагнозы и назначения в единой системе',
                color: 'warmRed',
                details: {
                  features: [
                    'Цифровое хранение всех медицинских документов',
                    'Автоматическая синхронизация анализов из лабораторий',
                    'История болезней и диагнозов',
                    'Назначения врачей и лекарства',
                    'Вакцинации и прививки',
                    'Аллергии и противопоказания',
                    'Интеграция с клиниками через FHIR',
                    'Экспорт данных в PDF',
                  ],
                  benefits: [
                    'Все данные в одном месте',
                    'Доступ в любой момент',
                    'Безопасное хранение',
                    'Легкий обмен с врачами',
                  ],
                },
              },
              {
                id: 'training',
                icon: <Dumbbell className="w-8 h-8" />,
                title: 'Тренировки',
                description: 'Персональные программы тренировок, отслеживание прогресса и интеграция с фитнес-трекерами',
                color: 'warmBlue',
                details: {
                  features: [
                    'Персональные программы от тренеров',
                    'Библиотека упражнений с видео',
                    'Отслеживание прогресса (веса, подходы, повторения)',
                    'Интеграция с Garmin, Apple Watch, Fitbit',
                    'Планирование тренировок на неделю/месяц',
                    'Анализ эффективности тренировок',
                    'Рекомендации по восстановлению',
                    'Групповые тренировки и челленджи',
                  ],
                  benefits: [
                    'Персонализированные программы',
                    'Мотивация через прогресс',
                    'Интеграция с устройствами',
                    'Профессиональная поддержка',
                  ],
                },
              },
              {
                id: 'nutrition',
                icon: <Apple className="w-8 h-8" />,
                title: 'Питание',
                description: 'Планирование рациона, подсчет калорий, макронутриентов и рекомендации по питанию',
                color: 'warmGreen',
                details: {
                  features: [
                    'Подсчет калорий и БЖУ',
                    'База продуктов с детальной информацией',
                    'Планирование рациона на день/неделю',
                    'Рекомендации по питанию от нутрициологов',
                    'Отслеживание воды и жидкости',
                    'Дневник питания с фото',
                    'Анализ дефицита микронутриентов',
                    'Рецепты и планы питания',
                  ],
                  benefits: [
                    'Контроль питания',
                    'Персональные рекомендации',
                    'Удобное планирование',
                    'Достижение целей',
                  ],
                },
              },
              {
                id: 'mental-health',
                icon: <Brain className="w-8 h-8" />,
                title: 'Психическое здоровье',
                description: 'Дневник настроения, медитации, работа со стрессом и доступ к психологам',
                color: 'warmPink',
                details: {
                  features: [
                    'Дневник настроения и эмоций',
                    'Библиотека медитаций и практик',
                    'Техники работы со стрессом',
                    'Доступ к психологам и психотерапевтам',
                    'Трекинг сна и восстановления',
                    'Анализ паттернов настроения',
                    'Персональные рекомендации',
                    'Группы поддержки',
                  ],
                  benefits: [
                    'Комплексный подход к ментальному здоровью',
                    'Профессиональная поддержка',
                    'Инструменты самопомощи',
                    'Сообщество единомышленников',
                  ],
                },
              },
              {
                id: 'social',
                icon: <Users className="w-8 h-8" />,
                title: 'Социальная сеть',
                description: 'Общение с единомышленниками, группы поддержки и обмен опытом',
                color: 'warmBlue',
                details: {
                  features: [
                    'Лента постов и достижений',
                    'Группы по интересам и целям',
                    'Челленджи и соревнования',
                    'Обмен опытом и советами',
                    'Система друзей и подписок',
                    'Истории и активности',
                    'Мотивационные посты',
                    'Экспертный контент',
                  ],
                  benefits: [
                    'Мотивация через сообщество',
                    'Обмен опытом',
                    'Поддержка единомышленников',
                    'Достижение целей вместе',
                  ],
                },
              },
              {
                id: 'ai-health',
                icon: <Sparkles className="w-8 h-8" />,
                title: 'AI Health+',
                description: 'Искусственный интеллект для персональных рекомендаций и планов здоровья',
                color: 'warmPink',
                details: {
                  features: [
                    'Персональные планы здоровья на основе данных',
                    'AI-коучинг и рекомендации 24/7',
                    'Анализ всех данных для выявления паттернов',
                    'Предсказание рисков и профилактика',
                    'Персонализированные советы по образу жизни',
                    'Интеграция всех модулей для комплексного анализа',
                    'Адаптивные планы, меняющиеся с прогрессом',
                    'Библиотека протоколов и программ',
                  ],
                  benefits: [
                    'Персонализация на основе данных',
                    'Круглосуточная поддержка',
                    'Проактивные рекомендации',
                    'Комплексный анализ здоровья',
                  ],
                },
              },
              {
                id: 'specialists',
                icon: <Heart className="w-8 h-8" />,
                title: 'Специалисты',
                description: 'Доступ к врачам, тренерам, нутрициологам и другим специалистам через платформу',
                color: 'warmRed',
                details: {
                  features: [
                    'База проверенных специалистов',
                    'Онлайн и офлайн консультации',
                    'Запись на прием через календарь',
                    'Видео-консультации в приложении',
                    'История всех консультаций',
                    'Рейтинги и отзывы',
                    'Специализации: врачи, тренеры, нутрициологи, психологи',
                    'Интеграция с клиниками',
                  ],
                  benefits: [
                    'Доступ к профессионалам',
                    'Удобная запись',
                    'История консультаций',
                    'Выбор лучших специалистов',
                  ],
                },
              },
              {
                id: 'marketplace',
                icon: <ShoppingBag className="w-8 h-8" />,
                title: 'Маркетплейс',
                description: 'Покупка абонементов, услуг, добавок и товаров для здоровья',
                color: 'warmGreen',
                details: {
                  features: [
                    'Абонементы в фитнес-клубы и студии',
                    'Услуги специалистов',
                    'БАДы и добавки',
                    'Спортивное питание',
                    'Товары для здоровья',
                    'Онлайн-курсы и программы',
                    'Система кэшбэка токенами NVT',
                    'Персональные рекомендации',
                  ],
                  benefits: [
                    'Все для здоровья в одном месте',
                    'Выгодные цены',
                    'Кэшбэк токенами',
                    'Персональные предложения',
                  ],
                },
              },
              {
                id: 'dao',
                icon: <Coins className="w-8 h-8" />,
                title: 'DAO и токены',
                description: 'Участие в управлении экосистемой через токены NVT и голосования',
                color: 'warmBlue',
                details: {
                  features: [
                    'Токены NVT за активность и достижения',
                    'Голосование за развитие платформы',
                    'Предложения улучшений (proposals)',
                    'Стейкинг токенов для премиум-доступа',
                    'Гранты на исследования здоровья',
                    'Участие в прибыли экосистемы',
                    'Децентрализованное управление',
                    'Прозрачная экономика',
                  ],
                  benefits: [
                    'Участие в управлении',
                    'Монетизация активности',
                    'Влияние на развитие',
                    'Прозрачность и справедливость',
                  ],
                },
              },
            ].find(f => f.id === selectedFeature)!

            return (
              <NeumorphicModal
                isOpen={!!selectedFeature}
                onClose={() => setSelectedFeature(null)}
                title={feature.title}
                size="lg"
              >
                <div className="space-y-6">
                  <div className={cn('text-5xl mb-4 text-' + feature.color + '-500 flex justify-center')}>
                    {feature.icon}
                  </div>
                  <p className="text-lg text-warmGraphite-600 text-center">
                    {feature.description}
                  </p>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">Функции и возможности:</h3>
                    <ul className="space-y-2">
                      {feature.details.features.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-warmGraphite-700">
                          <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">Преимущества:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {feature.details.benefits.map((item, index) => (
                        <NeumorphicCard key={index} soft className="p-3">
                          <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-warmBlue-500" />
                            <span className="text-warmGraphite-700">{item}</span>
                          </div>
                        </NeumorphicCard>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center pt-4">
                    <NeumorphicButton
                      primary
                      onClick={() => {
                        setSelectedFeature(null)
                        router.push('/register')
                      }}
                    >
                      Попробовать бесплатно
                    </NeumorphicButton>
                    <NeumorphicButton onClick={() => setSelectedFeature(null)}>
                      Закрыть
                    </NeumorphicButton>
                  </div>
                </div>
              </NeumorphicModal>
            )
          })()}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-warmGray-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-warmGraphite-800 mb-4">
              Как это работает
            </h2>
            <p className="text-xl text-warmGraphite-600 max-w-2xl mx-auto">
              Простой путь к здоровью в три шага
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {[
              {
                step: '1',
                title: 'Регистрация',
                description: 'Создайте аккаунт и получите бесплатную пробную неделю. Заполните опросник для персональной настройки.',
                icon: <CheckCircle className="w-12 h-12" />,
              },
              {
                step: '2',
                title: 'Персонализация',
                description: 'AI анализирует ваши данные и создает персональный план здоровья с рекомендациями специалистов.',
                icon: <Target className="w-12 h-12" />,
              },
              {
                step: '3',
                title: 'Достижение целей',
                description: 'Отслеживайте прогресс, получайте награды, общайтесь с сообществом и достигайте своих целей.',
                icon: <TrendingUp className="w-12 h-12" />,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <NeumorphicCard className="p-8">
                  <div className="text-6xl font-bold text-warmBlue-500 mb-4">{item.step}</div>
                  <div className="text-warmBlue-500 mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-warmGraphite-800 mb-4">{item.title}</h3>
                  <p className="text-warmGraphite-600 leading-relaxed">{item.description}</p>
                </NeumorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <NeumorphicCard className="p-8 sm:p-12 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold text-warmGraphite-800 mb-4">
                Начните свой путь к здоровью
              </h2>
              <p className="text-xl text-warmGraphite-600 mb-8">
                Получите персональный план и пробную неделю бесплатно
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <NeumorphicButton
                  primary
                  onClick={() => router.push('/register')}
                  className="text-lg px-8 py-4"
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
      </section>

      {/* Floating Chat Widget */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={cn(
              'fixed bottom-4 right-4 z-50 w-80 sm:w-96',
              chatMinimized && 'h-16'
            )}
          >
            <NeumorphicCard className="p-0 overflow-hidden h-full flex flex-col">
              {/* Chat Header */}
              <div className="bg-warmBlue-500 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-semibold">AI Помощник</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setChatMinimized(!chatMinimized)}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {chatMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setChatOpen(false)}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {!chatMinimized && (
                <>
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-96">
                    {chatMessages.length === 0 && (
                      <div className="text-center text-warmGraphite-600 text-sm">
                        Привет! Я помогу вам узнать больше о Nexus Vita и создать персональный план. Давайте начнем?
                      </div>
                    )}
                    {chatMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={cn(
                          'flex',
                          msg.sender === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        <div
                          className={cn(
                            'max-w-[80%] p-3 rounded-2xl',
                            msg.sender === 'user'
                              ? 'bg-warmBlue-500 text-white rounded-br-none'
                              : 'bg-warmGray-100 text-warmGraphite-800 rounded-bl-none'
                          )}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <form onSubmit={handleChatSubmit} className="p-4 border-t border-warmGray-300/50">
                    <div className="flex gap-2">
                      <NeumorphicInput
                        placeholder="Введите сообщение..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        className="flex-1 text-sm"
                      />
                      <NeumorphicButton primary type="submit" className="px-4">
                        <Send className="w-4 h-4" />
                      </NeumorphicButton>
                    </div>
                  </form>
                </>
              )}
            </NeumorphicCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      {!chatOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-4 right-4 z-40"
        >
          <NeumorphicButton
            primary
            onClick={() => setChatOpen(true)}
            className="p-4 rounded-full shadow-lg"
          >
            <MessageSquare className="w-6 h-6" />
          </NeumorphicButton>
        </motion.div>
      )}
    </div>
  )
}
