'use client'

import { useState, useEffect, useRef } from 'react'
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
  Info,
  Play,
  Clock,
  MapPin,
  CreditCard,
  Award,
  Building2,
  FileText,
  Settings,
  Bell,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicProgress from '@/components/ui/NeumorphicProgress'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import NeumorphicModal from '@/components/ui/NeumorphicModal'
import { cn } from '@/lib/utils/cn'

// Данные формы собираются через chatMessages, отдельный тип не нужен

type Sector = {
  id: string
  title: string
  icon: React.ReactNode
  color: string
  description: string
  details: {
    features: string[]
    benefits: string[]
    examples: string[]
  }
}

type Module = {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  features: string[]
  benefits: string[]
}

export default function PresentationPage() {
  const router = useRouter()
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMinimized, setChatMinimized] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; type?: string }>>([])
  const [chatInput, setChatInput] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [formProgress, setFormProgress] = useState(0)
  // formData хранится в chatMessages, поэтому отдельная переменная не нужна
  const [showPlan, setShowPlan] = useState(false)
  const [planGenerated, setPlanGenerated] = useState(false)

  const sectors: Sector[] = [
    {
      id: 'medicine',
      title: 'Медицина',
      icon: <Stethoscope className="w-8 h-8" />,
      color: 'red',
      description: 'Централизованная история медицинских данных: лабораторные анализы, результаты обследований, назначения, реабилитационные планы и протоколы профилактики.',
      details: {
        features: [
          'Хранение всех медицинских документов в одном месте',
          'Интеграция с клиниками через FHIR/HL7',
          'Автоматическое распознавание анализов (OCR)',
          'Графики результатов с нормами',
          'Напоминания о приемах и обследованиях',
          'Экспорт данных в PDF',
          'Безопасное хранение с шифрованием',
        ],
        benefits: [
          'Всегда под рукой полная медицинская история',
          'Легко делиться данными с врачами',
          'Отслеживание динамики показателей',
          'Профилактика и раннее выявление проблем',
        ],
        examples: [
          'Анализы крови, мочи, биохимия',
          'Результаты УЗИ, МРТ, КТ',
          'Назначения врачей',
          'Реабилитационные программы',
        ],
      },
    },
    {
      id: 'sport',
      title: 'Спорт и физическая производительность',
      icon: <Dumbbell className="w-8 h-8" />,
      color: 'blue',
      description: 'Планирование тренировок, контроль нагрузок, адаптивные планы прогресса и реабилитационные протоколы.',
      details: {
        features: [
          'Персональные программы тренировок',
          'База упражнений с видео и описаниями',
          'Отслеживание прогресса (вес, подходы, повторения)',
          'Интеграция с Garmin, Oura, Apple Health',
          'Графики прогресса и статистика',
          'Реабилитационные протоколы',
          'Снижение риска травм',
        ],
        benefits: [
          'Систематический подход к тренировкам',
          'Мотивация через визуализацию прогресса',
          'Персонализация под ваши цели',
          'Профессиональная поддержка тренеров',
        ],
        examples: [
          'Силовые тренировки',
          'Кардио программы',
          'Йога и растяжка',
          'Реабилитация после травм',
        ],
      },
    },
    {
      id: 'psycho',
      title: 'Психо-эмоциональное здоровье',
      icon: <Brain className="w-8 h-8" />,
      color: 'purple',
      description: 'Инструменты для мониторинга настроения, доступа к терапевтам и программам ментального здоровья.',
      details: {
        features: [
          'Дневник настроения и эмоций',
          'Доступ к психологам и терапевтам',
          'Программы стресс-менеджмента',
          'Медитации и техники релаксации',
          'Анализ паттернов настроения',
          'Рекомендации ИИ на основе данных',
          'Групповые программы поддержки',
        ],
        benefits: [
          'Понимание своих эмоциональных паттернов',
          'Профессиональная поддержка',
          'Инструменты для саморегуляции',
          'Социальная поддержка сообщества',
        ],
        examples: [
          'Когнитивно-поведенческая терапия',
          'Медитации и mindfulness',
          'Техники управления стрессом',
          'Групповые сессии',
        ],
      },
    },
    {
      id: 'nutrition',
      title: 'Питание и метаболизм',
      icon: <Apple className="w-8 h-8" />,
      color: 'green',
      description: 'Персонализированные планы питания на базе данных о пользователе, ограничениях, целях и анализах.',
      details: {
        features: [
          'Персональные планы питания',
          'База продуктов с БЖУ и калориями',
          'Дневник питания с фото блюд',
          'Автоматическое составление списков покупок',
          'Интеграция с магазинами',
          'Анализ дефицита микронутриентов',
          'Рекомендации по питанию от ИИ',
        ],
        benefits: [
          'Сбалансированное питание под ваши цели',
          'Экономия времени на планировании',
          'Понимание влияния питания на здоровье',
          'Удобные списки покупок',
        ],
        examples: [
          'Планы для снижения веса',
          'Питание для набора массы',
          'Веганские и вегетарианские планы',
          'Диеты при заболеваниях',
        ],
      },
    },
    {
      id: 'social',
      title: 'Социальное',
      icon: <Users className="w-8 h-8" />,
      color: 'orange',
      description: 'Лента и группы по интересам, социальные вызовы и командные планы.',
      details: {
        features: [
          'Социальная лента с постами',
          'Группы по интересам и целям',
          'Челленджи и соревнования',
          'Система друзей и подписок',
          'Обмен достижениями',
          'Командные планы и программы',
          'Реферальная система с бонусами',
        ],
        benefits: [
          'Мотивация через сообщество',
          'Поддержка единомышленников',
          'Соревновательный элемент',
          'Обмен опытом и знаниями',
        ],
        examples: [
          'Группы по похудению',
          'Челлендж "30 дней без сахара"',
          'Командные тренировки',
          'Обмен рецептами',
        ],
      },
    },
    {
      id: 'sleep',
      title: 'Сон и восстановление',
      icon: <Clock className="w-8 h-8" />,
      color: 'indigo',
      description: 'Аналитика сна, рекомендации по гигиене сна, интеграция с устройствами.',
      details: {
        features: [
          'Анализ качества сна',
          'Интеграция с Oura, Garmin, Apple Watch',
          'Рекомендации по гигиене сна',
          'Корреляция сна с тренировками и питанием',
          'Будильники с учетом фаз сна',
          'Трекинг восстановления',
          'Оптимизация режима дня',
        ],
        benefits: [
          'Понимание влияния сна на здоровье',
          'Улучшение качества сна',
          'Оптимизация восстановления',
          'Синхронизация с тренировками',
        ],
        examples: [
          'Анализ глубокого и REM сна',
          'Корреляция с тренировками',
          'Рекомендации по режиму',
          'Трекинг восстановления',
        ],
      },
    },
    {
      id: 'prevention',
      title: 'Профилактика и окружающая среда',
      icon: <Shield className="w-8 h-8" />,
      color: 'teal',
      description: 'Мониторинг факторов среды, оценка рисков и рекомендации по адаптации образа жизни.',
      details: {
        features: [
          'Мониторинг условий окружающей среды',
          'Оценка рисков для здоровья',
          'Рекомендации по адаптации',
          'Трекинг условий труда',
          'Алерты о неблагоприятных условиях',
          'Интеграция с IoT датчиками',
          'Профилактические программы',
        ],
        benefits: [
          'Защита от вредных факторов',
          'Адаптация образа жизни',
          'Профилактика заболеваний',
          'Оптимизация условий работы',
        ],
        examples: [
          'Мониторинг качества воздуха',
          'Оценка условий труда',
          'Рекомендации по профилактике',
          'Алерты о рисках',
        ],
      },
    },
  ]

  const modules: Module[] = [
    {
      id: 'journal',
      title: 'Личный журнал',
      icon: <BookOpen className="w-6 h-6" />,
      description: 'Ежедневные записи: самочувствие, тренировки, питание, сон, заметки врача.',
      features: [
        'Ежедневные записи о самочувствии',
        'Трекинг тренировок и питания',
        'Заметки и фото',
        'Аналитика и статистика',
        'Напоминания и цели',
      ],
      benefits: [
        'Полная картина вашего здоровья',
        'Понимание паттернов',
        'Мотивация через визуализацию',
      ],
    },
    {
      id: 'ai-planner',
      title: 'ИИ-планировщик',
      icon: <Sparkles className="w-6 h-6" />,
      description: 'Формирует персональные планы тренировок, питания, восстановления и терапии.',
      features: [
        'Персональные планы на основе данных',
        'Динамическая адаптация',
        'Рекомендации в реальном времени',
        'Анализ паттернов',
        'Предсказание рисков',
      ],
      benefits: [
        'Индивидуальный подход',
        'Экономия времени',
        'Оптимизация результатов',
      ],
    },
    {
      id: 'specialists',
      title: 'Тренеры & Коучи',
      icon: <Users className="w-6 h-6" />,
      description: 'Карточки специалистов, расписание, пакеты услуг, онлайн/оффлайн сессии.',
      features: [
        'Каталог специалистов',
        'Онлайн и офлайн консультации',
        'Запись на сессии',
        'Рейтинги и отзывы',
        'Пакеты услуг',
      ],
      benefits: [
        'Профессиональная поддержка',
        'Удобная запись',
        'Выбор лучших специалистов',
      ],
    },
    {
      id: 'marketplace',
      title: 'Магазин',
      icon: <ShoppingBag className="w-6 h-6" />,
      description: 'БАДы, медикаменты, питание, оборудование с интеграцией в планы.',
      features: [
        'Каталог товаров для здоровья',
        'Интеграция с планами питания',
        'Автоматические списки покупок',
        'Кэшбэк и бонусы',
        'Доставка и оплата',
      ],
      benefits: [
        'Все в одном месте',
        'Персонализированные рекомендации',
        'Экономия через кэшбэк',
      ],
    },
    {
      id: 'centers',
      title: 'Центры и абонементы',
      icon: <Building2 className="w-6 h-6" />,
      description: 'Управление абонементами фитнес-центров, клиник, спа с синхронизацией.',
      features: [
        'Управление абонементами',
        'QR-коды для входа',
        'Синхронизация посещений',
        'Расписание и бронирование',
        'Интеграция с центрами',
      ],
      benefits: [
        'Все абонементы в одном месте',
        'Удобное бронирование',
        'Автоматическая синхронизация',
      ],
    },
    {
      id: 'dao',
      title: 'DAO и токены',
      icon: <Coins className="w-6 h-6" />,
      description: 'Управление сообществом, голосования, токены для бонусов и оплаты.',
      features: [
        'Голосования за инициативы',
        'Токены NVT для бонусов',
        'Стейкинг токенов',
        'Прозрачные смарт-контракты',
        'Участие в управлении',
      ],
      benefits: [
        'Влияние на развитие платформы',
        'Бонусы за активность',
        'Дополнительные возможности',
      ],
    },
    {
      id: 'social-network',
      title: 'Социальная сеть',
      icon: <Users className="w-6 h-6" />,
      description: 'Профиль, друзья, группы, обмен достижениями, реферальные кампании.',
      features: [
        'Социальная лента',
        'Система друзей',
        'Группы и сообщества',
        'Обмен достижениями',
        'Реферальная система',
      ],
      benefits: [
        'Мотивация через сообщество',
        'Поддержка единомышленников',
        'Бонусы за приглашения',
      ],
    },
  ]

  const questions = [
    { id: 'name', text: 'Как вас зовут?', type: 'text', required: true },
    { id: 'age', text: 'Сколько вам лет?', type: 'number', required: true },
    { id: 'gender', text: 'Ваш пол?', type: 'select', options: ['Мужской', 'Женский', 'Другое'], required: true },
    { id: 'weight', text: 'Ваш вес (кг)?', type: 'number', required: false },
    { id: 'height', text: 'Ваш рост (см)?', type: 'number', required: false },
    { id: 'goals', text: 'Какие у вас цели? (можно выбрать несколько)', type: 'multiselect', options: ['Снижение веса', 'Набор мышечной массы', 'Улучшение выносливости', 'Улучшение сна', 'Снижение стресса', 'Улучшение питания', 'Реабилитация', 'Общее оздоровление'], required: true },
    { id: 'primaryGoal', text: 'Главная цель?', type: 'select', options: ['Снижение веса', 'Набор мышечной массы', 'Улучшение выносливости', 'Улучшение сна', 'Снижение стресса', 'Улучшение питания', 'Реабилитация', 'Общее оздоровление'], required: true },
    { id: 'mood', text: 'Как ваше настроение?', type: 'select', options: ['Отлично', 'Хорошо', 'Нормально', 'Плохо', 'Очень плохо'], required: false },
    { id: 'activityLevel', text: 'Уровень активности?', type: 'select', options: ['Минимальный', 'Низкий', 'Умеренный', 'Высокий', 'Очень высокий'], required: true },
    { id: 'sleepHours', text: 'Сколько часов вы спите в среднем?', type: 'number', required: false },
    { id: 'stressLevel', text: 'Уровень стресса?', type: 'select', options: ['Очень низкий', 'Низкий', 'Умеренный', 'Высокий', 'Очень высокий'], required: false },
    { id: 'nutritionHabits', text: 'Ваши пищевые привычки?', type: 'multiselect', options: ['Веган', 'Вегетарианец', 'Пескетарианец', 'Обычное питание', 'Кето', 'Палео', 'Интервальное голодание'], required: false },
    { id: 'trainingExperience', text: 'Опыт тренировок?', type: 'select', options: ['Новичок', 'Начинающий', 'Средний', 'Продвинутый', 'Профессионал'], required: false },
    { id: 'healthIssues', text: 'Есть ли проблемы со здоровьем?', type: 'multiselect', options: ['Нет', 'Диабет', 'Гипертония', 'Проблемы с суставами', 'Проблемы с позвоночником', 'Сердечно-сосудистые', 'Другое'], required: false },
    { id: 'timeAvailable', text: 'Сколько времени можете уделять в неделю?', type: 'select', options: ['Меньше 3 часов', '3-5 часов', '5-7 часов', '7-10 часов', 'Больше 10 часов'], required: false },
    { id: 'budget', text: 'Бюджет на здоровье в месяц?', type: 'select', options: ['До 5000₽', '5000-10000₽', '10000-20000₽', '20000-50000₽', 'Больше 50000₽'], required: false },
    { id: 'planLevel', text: 'Уровень плана?', type: 'select', options: ['Мягкий', 'Умеренный', 'Интенсивный'], required: true },
  ]

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const question = questions[currentQuestion]
    const answer = chatInput.trim()

    // Ответ сохраняется в chatMessages

    const newUserMessage = { sender: 'user' as const, text: answer, type: question.type }
    setChatMessages((prev) => [...prev, newUserMessage])
    setChatInput('')

    // Обновляем прогресс
    const progress = ((currentQuestion + 1) / questions.length) * 100
    setFormProgress(progress)

    // Симуляция ответа ИИ
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        const nextQuestion = questions[currentQuestion + 1]
        setChatMessages((prev) => [...prev, { sender: 'ai', text: nextQuestion.text, type: nextQuestion.type }])
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setChatMessages((prev) => [...prev, { sender: 'ai', text: 'Отлично! Мы собрали всю информацию. Генерирую ваш персональный план...' }])
        setTimeout(() => {
          setPlanGenerated(true)
          setShowPlan(true)
        }, 2000)
      }
    }, 1000)
  }


  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-br from-warmGreen-50 via-warmBlue-50 to-warmBeige-50"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-warmGraphite-800 mb-6">
              NexusVita
            </h1>
            <p className="text-2xl sm:text-3xl text-warmGraphite-600 mb-4">
              Первая экосистема полного здоровья человека
            </p>
            <p className="text-lg sm:text-xl text-warmGraphite-500 mb-8 max-w-3xl mx-auto">
              От анализа состояния до персональных планов: тренировки, питание, психо-эмоциональное здоровье и социальная интеграция
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <NeumorphicButton
                primary
                onClick={() => setChatOpen(true)}
                className="text-lg px-8 py-4"
              >
                Начать бесплатно
              </NeumorphicButton>
              <NeumorphicButton
                onClick={() => router.push('/subscriptions')}
                className="text-lg px-8 py-4"
              >
                Получить подписку
              </NeumorphicButton>
            </div>
          </motion.div>

          {/* Vitruvian Man Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-16 relative"
          >
            <div className="relative w-full max-w-2xl mx-auto aspect-square">
              {/* Placeholder for Vitruvian Man - будет заменен на реальный компонент */}
              <div className="w-full h-full neumorphic-card flex items-center justify-center">
                <div className="text-center">
                  <Activity className="w-32 h-32 text-warmBlue-400 mx-auto mb-4" />
                  <p className="text-warmGraphite-600">Интерактивный Витрувианский человек</p>
                  <p className="text-sm text-warmGraphite-500 mt-2">Кликните на секторы для детальной информации</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-warmGraphite-400 animate-bounce" />
        </motion.div>
      </section>

      {/* Sectors Section */}
      <section id="sectors" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-warmGraphite-800 mb-4">
              Полное здоровье под контролем
            </h2>
            <p className="text-xl text-warmGraphite-600 max-w-3xl mx-auto">
              Каждый сектор — отдельная экосистема в одном приложении
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <NeumorphicCard
                  className="h-full cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setSelectedSector(sector.id)}
                >
                  <div className={`text-${sector.color}-500 mb-4`}>
                    {sector.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-warmGraphite-800 mb-3">
                    {sector.title}
                  </h3>
                  <p className="text-warmGraphite-600 mb-4">
                    {sector.description}
                  </p>
                  <div className="flex items-center text-warmBlue-600 font-medium">
                    <span>Подробнее</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </NeumorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20 px-4 sm:px-6 lg:px-8 bg-warmBeige-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-warmGraphite-800 mb-4">
              Все инструменты здоровья в одной экосистеме
            </h2>
            <p className="text-xl text-warmGraphite-600 max-w-3xl mx-auto">
              Каждый модуль — самостоятельная единица с полным функционалом
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <NeumorphicCard
                  className="h-full cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setSelectedModule(module.id)}
                >
                  <div className="text-warmBlue-500 mb-4">
                    {module.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">
                    {module.title}
                  </h3>
                  <p className="text-warmGraphite-600 mb-4">
                    {module.description}
                  </p>
                  <div className="flex items-center text-warmBlue-600 font-medium">
                    <span>Подробнее</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </NeumorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Planner Section */}
      <section id="ai-planner" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-warmGraphite-800 mb-4">
              ИИ, который заботится о твоем прогрессе
            </h2>
            <p className="text-xl text-warmGraphite-600 max-w-3xl mx-auto">
              Введите цели, предпочтения и ограничения — ИИ создаст персональный план тренировок, питания и восстановления
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <NeumorphicCard className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Sparkles className="w-12 h-12 text-warmBlue-500" />
                <h3 className="text-2xl font-semibold text-warmGraphite-800">
                  Персональный ИИ-планировщик
                </h3>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  'Автоматическое планирование тренировок',
                  'Персональные планы питания',
                  'Динамическая корректировка',
                  'Синхронизация с устройствами',
                  'Анализ паттернов и рекомендации',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                    <span className="text-warmGraphite-700">{item}</span>
                  </li>
                ))}
              </ul>
              <NeumorphicButton primary onClick={() => setChatOpen(true)}>
                Попробовать ИИ-планировщик
              </NeumorphicButton>
            </NeumorphicCard>

            <NeumorphicCard className="p-8">
              <h3 className="text-xl font-semibold text-warmGraphite-800 mb-4">
                Пример дашборда
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Калории', value: '1850', target: '2000', color: 'warmGreen' },
                  { label: 'Шаги', value: '8240', target: '10000', color: 'warmBlue' },
                  { label: 'Сон', value: '7.5ч', target: '8ч', color: 'warmPurple' },
                  { label: 'Тренировки', value: '3', target: '4', color: 'warmOrange' },
                ].map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-warmGraphite-700 font-medium">{metric.label}</span>
                      <span className="text-warmGraphite-600">
                        {metric.value} / {metric.target}
                      </span>
                    </div>
                    <NeumorphicProgress
                      value={(parseInt(metric.value) / parseInt(metric.target)) * 100}
                      className="h-3"
                    />
                  </div>
                ))}
              </div>
            </NeumorphicCard>
          </div>
        </div>
      </section>

      {/* Specialists Section */}
      <section id="specialists" className="py-20 px-4 sm:px-6 lg:px-8 bg-warmBeige-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-warmGraphite-800 mb-4">
              Персональная поддержка профессионалов
            </h2>
            <p className="text-xl text-warmGraphite-600 max-w-3xl mx-auto">
              Выбирайте тренеров и коучей по направлениям: фитнес, реабилитация, питание
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Анна Петрова', specialization: 'Фитнес-тренер', rating: 4.9, price: '2000₽/час', image: '👩‍🏋️' },
              { name: 'Дмитрий Соколов', specialization: 'Нутрициолог', rating: 4.8, price: '2500₽/час', image: '👨‍⚕️' },
              { name: 'Мария Иванова', specialization: 'Психолог', rating: 5.0, price: '3000₽/час', image: '👩‍⚕️' },
            ].map((specialist, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <NeumorphicCard className="p-6 hover:scale-105 transition-transform cursor-pointer">
                  <div className="text-6xl mb-4 text-center">{specialist.image}</div>
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-2 text-center">
                    {specialist.name}
                  </h3>
                  <p className="text-warmGraphite-600 text-center mb-3">
                    {specialist.specialization}
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-warmYellow-500 fill-current" />
                    <span className="font-semibold text-warmGraphite-800">{specialist.rating}</span>
                  </div>
                  <p className="text-warmGraphite-700 font-medium text-center mb-4">
                    {specialist.price}
                  </p>
                  <NeumorphicButton primary className="w-full">
                    Записаться
                  </NeumorphicButton>
                </NeumorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section id="marketplace" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-warmGraphite-800 mb-4">
              Все для здоровья и спорта в одном месте
            </h2>
            <p className="text-xl text-warmGraphite-600 max-w-3xl mx-auto">
              БАДы, питание, оборудование, абонементы с интеграцией в ваши планы
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Протеин', price: '2500₽', image: '🥤', category: 'Питание' },
              { name: 'Витамины', price: '1500₽', image: '💊', category: 'БАДы' },
              { name: 'Гантели', price: '5000₽', image: '🏋️', category: 'Оборудование' },
              { name: 'Абонемент в зал', price: '3000₽/мес', image: '🏋️‍♂️', category: 'Абонементы' },
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <NeumorphicCard className="p-6 hover:scale-105 transition-transform cursor-pointer">
                  <div className="text-6xl mb-4 text-center">{product.image}</div>
                  <p className="text-warmGraphite-500 text-sm mb-2">{product.category}</p>
                  <h3 className="text-lg font-semibold text-warmGraphite-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-xl font-bold text-warmBlue-600 mb-4">
                    {product.price}
                  </p>
                  <NeumorphicButton primary className="w-full">
                    Добавить в план
                  </NeumorphicButton>
                </NeumorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscriptions Section */}
      <section id="subscriptions" className="py-20 px-4 sm:px-6 lg:px-8 bg-warmBeige-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-warmGraphite-800 mb-4">
              Подписка на здоровье, которая работает
            </h2>
            <p className="text-xl text-warmGraphite-600 max-w-3xl mx-auto">
              Выберите план, который подходит именно вам
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Базовая',
                price: '990₽/мес',
                features: ['ИИ-планировщик', 'Дневник', 'Календарь', 'Базовые аналитики'],
                popular: false,
              },
              {
                name: 'Премиум',
                price: '2990₽/мес',
                features: ['Все из Базовой', 'Тренеры и коучи', 'Магазин с бонусами', 'Глубокая аналитика', 'Приоритетная поддержка'],
                popular: true,
              },
              {
                name: 'Корпоративная',
                price: 'По запросу',
                features: ['Все из Премиум', 'Группы пользователей', 'Интеграции', 'Корпоративные дашборды', 'Персональный менеджер'],
                popular: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <NeumorphicCard className={cn('p-8 h-full relative', plan.popular && 'ring-2 ring-warmBlue-500')}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <NeumorphicBadge className="bg-warmBlue-500 text-white">
                        Популярный
                      </NeumorphicBadge>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-warmGraphite-800 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-3xl font-bold text-warmBlue-600 mb-6">
                    {plan.price}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                        <span className="text-warmGraphite-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <NeumorphicButton primary={plan.popular} className="w-full">
                    Получить подписку
                  </NeumorphicButton>
                </NeumorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-warmGraphite-800 mb-4">
              Результаты пользователей
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Иван П.', result: '-15 кг за 3 месяца', quote: 'Отличное приложение! План питания и тренировок помог достичь цели.', rating: 5 },
              { name: 'Мария К.', result: 'Улучшение сна на 40%', quote: 'ИИ-планировщик подобрал идеальный режим дня. Спасибо!', rating: 5 },
              { name: 'Алексей С.', result: '+8 кг мышечной массы', quote: 'Тренер через приложение помог составить программу. Результат превзошел ожидания!', rating: 5 },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <NeumorphicCard className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-warmYellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-warmGraphite-700 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-warmGraphite-800">{testimonial.name}</p>
                      <p className="text-sm text-warmGraphite-600">{testimonial.result}</p>
                    </div>
                  </div>
                </NeumorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-warmBeige-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-warmGraphite-800 mb-4">
              Часто задаваемые вопросы
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: 'Как работает ИИ-планировщик?',
                a: 'ИИ анализирует ваши цели, предпочтения, ограничения и интегрированные данные (анализы, тренировки, питание), создавая персональный план. План динамически адаптируется по мере получения новых данных.',
              },
              {
                q: 'Как оплачивать тренеров?',
                a: 'Все платежи проходят через приложение. Вы можете оплачивать разовые сессии или покупать пакеты услуг. Интеграция с календарем позволяет автоматически планировать и оплачивать консультации.',
              },
              {
                q: 'Безопасны ли мои медицинские данные?',
                a: 'Да, все данные хранятся с шифрованием, соответствуют требованиям GDPR и HIPAA. Вы полностью контролируете доступ к вашим данным и можете экспортировать или удалить их в любой момент.',
              },
              {
                q: 'Можно ли использовать бесплатно?',
                a: 'Да, базовая версия доступна бесплатно с ограниченным функционалом. Вы можете попробовать ИИ-планировщик и основные функции. Для полного доступа рекомендуется подписка.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <NeumorphicCard className="p-6">
                  <h3 className="text-lg font-semibold text-warmGraphite-800 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-warmGraphite-600">
                    {faq.a}
                  </p>
                </NeumorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-warmGraphite-800 mb-4">
              Начните путь к полному здоровью с NexusVita
            </h2>
            <p className="text-xl text-warmGraphite-600 mb-8">
              Подписка открывает доступ к ИИ-планировщику, тренерам, магазинам и центрам
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeumorphicButton
                primary
                onClick={() => setChatOpen(true)}
                className="text-lg px-8 py-4"
              >
                Начать бесплатно
              </NeumorphicButton>
              <NeumorphicButton
                onClick={() => router.push('/subscriptions')}
                className="text-lg px-8 py-4"
              >
                Получить подписку
              </NeumorphicButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-warmGraphite-800 text-warmGray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">NexusVita</h3>
              <p className="text-warmGray-400">
                Цифровой путь к здоровью и энергии
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2 text-warmGray-400">
                <li><a href="/about" className="hover:text-warmGray-200">О нас</a></li>
                <li><a href="/roadmap" className="hover:text-warmGray-200">Дорожная карта</a></li>
                <li><a href="/subscriptions" className="hover:text-warmGray-200">Подписки</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-warmGray-400">
                <li><a href="/faq" className="hover:text-warmGray-200">FAQ</a></li>
                <li><a href="/contact" className="hover:text-warmGray-200">Контакты</a></li>
                <li><a href="/legal" className="hover:text-warmGray-200">Правовая информация</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-warmGray-200"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="hover:text-warmGray-200"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-warmGray-200"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="hover:text-warmGray-200"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-warmGray-700 pt-8 text-center text-warmGray-400">
            <p>&copy; 2025 NexusVita. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-4 right-4 w-96 h-[600px] z-50"
          >
            <NeumorphicCard className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-warmGray-300/50">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-warmBlue-600" />
                  <h3 className="font-semibold text-warmGraphite-800">ИИ-помощник</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setChatMinimized(!chatMinimized)}
                    className="p-1 hover:bg-warmGray-200 rounded"
                  >
                    {chatMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setChatOpen(false)}
                    className="p-1 hover:bg-warmGray-200 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {!chatMinimized && (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.length === 0 && (
                      <div className="text-center text-warmGraphite-600 py-8">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-warmBlue-400" />
                        <p>Привет! Я помогу вам создать персональный план.</p>
                        <p className="text-sm mt-2">Давайте начнем с нескольких вопросов.</p>
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
                            'max-w-[80%] rounded-2xl px-4 py-2',
                            msg.sender === 'user'
                              ? 'bg-warmBlue-500 text-white'
                              : 'bg-warmGray-200 text-warmGraphite-800'
                          )}
                        >
                          <p>{msg.text}</p>
                        </div>
                      </div>
                    ))}
                    {currentQuestion < questions.length && (
                      <div className="mt-4">
                        <NeumorphicProgress value={formProgress} className="mb-2" />
                        <p className="text-xs text-warmGraphite-500 text-center">
                          Вопрос {currentQuestion + 1} из {questions.length}
                        </p>
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleChatSubmit} className="p-4 border-t border-warmGray-300/50">
                    <div className="flex gap-2">
                      <NeumorphicInput
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Введите ответ..."
                        className="flex-1"
                      />
                      <NeumorphicButton primary type="submit">
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

      {!chatOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-4 right-4 z-40"
        >
          <NeumorphicButton
            primary
            onClick={() => setChatOpen(true)}
            className="rounded-full p-4 shadow-lg"
          >
            <MessageSquare className="w-6 h-6" />
          </NeumorphicButton>
        </motion.div>
      )}

      {/* Sector Modal */}
      <AnimatePresence>
        {selectedSector && (
          <NeumorphicModal
            isOpen={!!selectedSector}
            onClose={() => setSelectedSector(null)}
            title={sectors.find(s => s.id === selectedSector)?.title}
            size="lg"
          >
            {(() => {
              const sector = sectors.find(s => s.id === selectedSector)!
              return (
                <div className="space-y-6">
                  <div className={`text-${sector.color}-500 text-6xl mb-4 flex justify-center`}>
                    {sector.icon}
                  </div>
                  <p className="text-lg text-warmGraphite-600 text-center">
                    {sector.description}
                  </p>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">
                      Функции и возможности:
                    </h3>
                    <ul className="space-y-2">
                      {sector.details.features.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-warmGraphite-700">
                          <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">
                      Преимущества:
                    </h3>
                    <ul className="space-y-2">
                      {sector.details.benefits.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-warmGraphite-700">
                          <Star className="w-5 h-5 text-warmYellow-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">
                      Примеры использования:
                    </h3>
                    <ul className="space-y-2">
                      {sector.details.examples.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-warmGraphite-700">
                          <Zap className="w-5 h-5 text-warmBlue-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })()}
          </NeumorphicModal>
        )}
      </AnimatePresence>

      {/* Module Modal */}
      <AnimatePresence>
        {selectedModule && (
          <NeumorphicModal
            isOpen={!!selectedModule}
            onClose={() => setSelectedModule(null)}
            title={modules.find(m => m.id === selectedModule)?.title}
            size="lg"
          >
            {(() => {
              const selectedModuleData = modules.find(m => m.id === selectedModule)!
              return (
                <div className="space-y-6">
                  <div className="text-warmBlue-500 text-6xl mb-4 flex justify-center">
                    {selectedModuleData.icon}
                  </div>
                  <p className="text-lg text-warmGraphite-600 text-center">
                    {selectedModuleData.description}
                  </p>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">
                      Функции:
                    </h3>
                    <ul className="space-y-2">
                      {selectedModuleData.features.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-warmGraphite-700">
                          <CheckCircle className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">
                      Преимущества:
                    </h3>
                    <ul className="space-y-2">
                      {selectedModuleData.benefits.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-warmGraphite-700">
                          <Star className="w-5 h-5 text-warmYellow-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })()}
          </NeumorphicModal>
        )}
      </AnimatePresence>

      {/* Plan Modal */}
      <AnimatePresence>
        {showPlan && planGenerated && (
          <NeumorphicModal
            isOpen={showPlan}
            onClose={() => setShowPlan(false)}
            title="Ваш персональный план на месяц"
            size="xl"
          >
            <div className="space-y-6">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-warmGreen-500 mx-auto mb-4" />
                <p className="text-lg text-warmGraphite-600">
                  План успешно сгенерирован на основе ваших ответов!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NeumorphicCard className="p-6">
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-4">
                    Тренировки
                  </h3>
                  <ul className="space-y-2 text-warmGraphite-700">
                    <li>• 3 тренировки в неделю</li>
                    <li>• Силовые + кардио</li>
                    <li>• Прогрессия нагрузки</li>
                  </ul>
                </NeumorphicCard>

                <NeumorphicCard className="p-6">
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-4">
                    Питание
                  </h3>
                  <ul className="space-y-2 text-warmGraphite-700">
                    <li>• Персональный план питания</li>
                    <li>• Список покупок</li>
                    <li>• Рекомендации по БЖУ</li>
                  </ul>
                </NeumorphicCard>

                <NeumorphicCard className="p-6">
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-4">
                    Восстановление
                  </h3>
                  <ul className="space-y-2 text-warmGraphite-700">
                    <li>• Режим сна 8 часов</li>
                    <li>• Медитации и релаксация</li>
                    <li>• Отслеживание восстановления</li>
                  </ul>
                </NeumorphicCard>

                <NeumorphicCard className="p-6">
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-4">
                    Рекомендации
                  </h3>
                  <ul className="space-y-2 text-warmGraphite-700">
                    <li>• Подключить специалиста</li>
                    <li>• Глубокая аналитика</li>
                    <li>• Библиотека знаний</li>
                  </ul>
                </NeumorphicCard>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <NeumorphicButton
                  primary
                  onClick={() => router.push('/register')}
                  className="flex-1"
                >
                  Зарегистрироваться и получить план бесплатно
                </NeumorphicButton>
                <NeumorphicButton
                  onClick={() => router.push('/subscriptions')}
                  className="flex-1"
                >
                  Подключить премиум функции
                </NeumorphicButton>
              </div>
            </div>
          </NeumorphicModal>
        )}
      </AnimatePresence>
    </div>
  )
}
