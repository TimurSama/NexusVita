'use client'

import { motion } from 'framer-motion'
import {
  User,
  Activity,
  Brain,
  Target,
  Calendar,
  BookOpen,
  Users,
  Stethoscope,
  Store,
} from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import { useI18n } from '@/lib/i18n/I18nProvider'

const modules = [
  {
    id: 'profile',
    icon: <User className="w-6 h-6" />,
    title: 'Профиль пользователя',
    description:
      'Динамическая модель человека: данные, цели, ограничения, история активности и текущая динамика.',
    bullets: [
      'Базовые данные и индивидуальные особенности',
      'Цели и приоритеты (здоровье, форма, образ жизни)',
      'Автообновление по действиям и данным трекеров',
    ],
  },
  {
    id: 'tracking',
    icon: <Activity className="w-6 h-6" />,
    title: 'Данные и трекинг',
    description:
      'Единый контур данных: ручной ввод, устройства, программы, данные специалистов.',
    bullets: [
      'Самочувствие, питание, сон, настроение',
      'Интеграции с трекерами и устройствами',
      'Нормализация данных во временной шкале',
    ],
  },
  {
    id: 'analytics',
    icon: <Brain className="w-6 h-6" />,
    title: 'Аналитика и рекомендации',
    description:
      'Оценка состояния, поиск паттернов, прогноз нагрузки и восстановления, персональные рекомендации.',
    bullets: [
      'Выявление отклонений и рисков',
      'Прогноз нагрузки и восстановления',
      'Адаптивные рекомендации в реальном времени',
    ],
  },
  {
    id: 'goals',
    icon: <Target className="w-6 h-6" />,
    title: 'Цели и планирование',
    description:
      'Долгосрочные цели, этапы и задачи, связанные с календарём и рекомендациями.',
    bullets: [
      'Долгосрочные цели и среднесрочные этапы',
      'Краткосрочные задачи и привычки',
      'Связка целей с действиями и календарём',
    ],
  },
  {
    id: 'calendar',
    icon: <Calendar className="w-6 h-6" />,
    title: 'Календарь',
    description:
      'Единый календарь тренировок, восстановления, консультаций и социальных активностей.',
    bullets: [
      'Баланс нагрузки и восстановления',
      'Автоматическая корректировка расписания',
      'Синхронизация с внешними календарями',
    ],
  },
  {
    id: 'journals',
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Дневники и рефлексия',
    description:
      'Фиксация физического и эмоционального состояния, субъективных ощущений и комментариев.',
    bullets: [
      'Физическое и эмоциональное состояние',
      'Комментарии к программам и сессиям',
      'Повышение осознанности и качества данных',
    ],
  },
  {
    id: 'social',
    icon: <Users className="w-6 h-6" />,
    title: 'Социальный модуль',
    description:
      'Ленты активности, сообщества, групповые программы, челленджи и совместные цели.',
    bullets: [
      'Сообщества по целям и интересам',
      'Групповые программы и челленджи',
      'Мотивация через социальную поддержку',
    ],
  },
  {
    id: 'specialists',
    icon: <Stethoscope className="w-6 h-6" />,
    title: 'Модуль специалистов',
    description:
      'Профили, методики, инструменты работы с клиентами и аналитика прогресса.',
    bullets: [
      'Профессиональные профили и программы',
      'Работа с клиентами в общем контексте',
      'Доступ к данным только по согласиям',
    ],
  },
  {
    id: 'marketplace',
    icon: <Store className="w-6 h-6" />,
    title: 'Маркетплейс',
    description:
      'Консультации, курсы, офлайн- и онлайн-услуги, партнёрские продукты, встроенные в сценарии.',
    bullets: [
      'Консультации и программы',
      'Онлайн/офлайн-услуги и продукты',
      'Автовстраивание покупок в планы и календарь',
    ],
  },
]

export default function ProductModulesSection() {
  const { lang } = useI18n()

  const localizedModules = modules.map((mod) => {
    if (lang !== 'en') return mod
    switch (mod.id) {
      case 'profile':
        return {
          ...mod,
          title: 'User profile',
          description:
            'Dynamic human model: data, goals, constraints, activity history and current dynamics.',
          bullets: [
            'Basic data and individual characteristics',
            'Goals and priorities (health, shape, lifestyle)',
            'Auto‑updates from actions and tracker data',
          ],
        }
      case 'tracking':
        return {
          ...mod,
          title: 'Data and tracking',
          description:
            'Unified data loop: manual input, devices, programs and specialist data.',
          bullets: [
            'Wellbeing, nutrition, sleep, mood',
            'Integrations with trackers and devices',
            'Normalisation of data along the timeline',
          ],
        }
      case 'analytics':
        return {
          ...mod,
          title: 'Analytics and recommendations',
          description:
            'State assessment, pattern search, load and recovery forecast, personal recommendations.',
          bullets: [
            'Detection of deviations and risks',
            'Load and recovery forecast',
            'Adaptive recommendations in real time',
          ],
        }
      case 'goals':
        return {
          ...mod,
          title: 'Goals and planning',
          description:
            'Long‑term goals, stages and tasks linked with the calendar and recommendations.',
          bullets: [
            'Long‑term goals and mid‑term stages',
            'Short‑term tasks and habits',
            'Linking goals with actions and calendar',
          ],
        }
      case 'calendar':
        return {
          ...mod,
          title: 'Calendar',
          description:
            'Single calendar for training, recovery, consultations and social activities.',
          bullets: [
            'Balance of load and recovery',
            'Automatic schedule adjustment',
            'Sync with external calendars',
          ],
        }
      case 'journals':
        return {
          ...mod,
          title: 'Journals and reflection',
          description:
            'Logging physical and emotional state, subjective feelings and comments.',
          bullets: [
            'Physical and emotional state',
            'Comments on programs and sessions',
            'Higher awareness and better data quality',
          ],
        }
      case 'social':
        return {
          ...mod,
          title: 'Social module',
          description:
            'Activity feeds, communities, group programs, challenges and shared goals.',
          bullets: [
            'Communities by goals and interests',
            'Group programs and challenges',
            'Motivation through social support',
          ],
        }
      case 'specialists':
        return {
          ...mod,
          title: 'Specialists module',
          description:
            'Profiles, methods, client‑work tools and progress analytics.',
          bullets: [
            'Professional profiles and programs',
            'Working with clients in a shared context',
            'Access to data only with user consent',
          ],
        }
      case 'marketplace':
        return {
          ...mod,
          title: 'Marketplace',
          description:
            'Consultations, courses, offline and online services, partner products embedded into flows.',
          bullets: [
            'Consultations and programs',
            'Online/offline services and products',
            'Automatic embedding of purchases into plans and calendar',
          ],
        }
      default:
        return mod
    }
  })

  return (
    <section
      id="product-modules"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10 lg:mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
            {lang === 'en'
              ? 'NexusVita product modules'
              : 'Продуктовые модули NexusVita'}
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto">
            {lang === 'en'
              ? 'Interconnected set of modules: profile, data, analytics, goals, calendar, journals, social layer, specialists and marketplace.'
              : 'Взаимосвязанная система модулей: профиль, данные, аналитика, цели, календарь, дневники, социальный слой, специалисты и маркетплейс.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {localizedModules.map((mod, index) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <NeumorphicCard className="h-full p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-warmBlue-500">{mod.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
                    {mod.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-warmGraphite-700 mb-3">
                  {mod.description}
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-warmGraphite-700">
                  {mod.bullets.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </NeumorphicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

