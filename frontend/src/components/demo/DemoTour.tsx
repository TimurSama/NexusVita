'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDemo } from '@/contexts/DemoContext'
import { motion, AnimatePresence } from 'framer-motion'

interface TourStep {
  id: string
  title: string
  description: string
  route: string
  features: string[]
}

const tourSteps: Record<string, TourStep[]> = {
  user: [
    {
      id: 'home',
      title: 'Главная страница',
      description: 'Интерактивный аватар тела и виджеты с информацией',
      route: '/',
      features: ['Аватар тела', 'Виджеты целей', 'Календарь', 'Быстрые действия'],
    },
    {
      id: 'body-avatar',
      title: 'Аватар тела',
      description: 'Отслеживание целей и проблемных зон',
      route: '/',
      features: ['Интерактивные зоны', 'Отметка целей', 'Проблемные точки'],
    },
    {
      id: 'trainers',
      title: 'Страницы тренеров',
      description: 'Просмотр и подписка на тренеров',
      route: '/trainers/demo',
      features: ['Лента публикаций', 'Календарь', 'Магазин тренера'],
    },
    {
      id: 'workouts',
      title: 'Тренировки',
      description: 'Программы и записи тренировок',
      route: '/workouts',
      features: ['Программы', 'Записи', 'Прогресс'],
    },
    {
      id: 'challenges',
      title: 'Челленджи',
      description: 'Участие в соревнованиях',
      route: '/challenges',
      features: ['Активные челленджи', 'Прогресс', 'Награды'],
    },
    {
      id: 'locations',
      title: 'Локации',
      description: 'Фитнес-клубы и центры',
      route: '/locations',
      features: ['Поиск залов', 'Абонементы', 'QR/NFC проход'],
    },
    {
      id: 'shop',
      title: 'Магазин',
      description: 'Покупка услуг и товаров',
      route: '/shop',
      features: ['Товары', 'Услуги', 'Токены'],
    },
    {
      id: 'human-centered',
      title: 'Человекоцентричность',
      description: 'Комплексный подход к здоровью',
      route: '/human-centered',
      features: ['Физическое здоровье', 'Эмоциональное', 'Социальное', 'Бытовое'],
    },
    {
      id: 'decentralization',
      title: 'Децентрализация',
      description: 'Блокчейн и Web3 возможности',
      route: '/decentralization',
      features: ['Блокчейн', 'Токены', 'DAO', 'NFT'],
    },
  ],
  trainer: [
    {
      id: 'trainer-page',
      title: 'Страница тренера',
      description: 'Управление мини-сайтом',
      route: '/trainers/demo',
      features: ['Настройка темы', 'Модули', 'Контент'],
    },
    {
      id: 'content',
      title: 'Управление контентом',
      description: 'Публикации и материалы',
      route: '/trainers/demo',
      features: ['Посты', 'Видео', 'Статьи'],
    },
    {
      id: 'programs',
      title: 'Программы',
      description: 'Создание программ тренировок',
      route: '/programs',
      features: ['Тренировки', 'Питание', 'Планы'],
    },
    {
      id: 'clients',
      title: 'Клиенты',
      description: 'Управление клиентами',
      route: '/clients',
      features: ['Подписчики', 'Прогресс', 'Чат'],
    },
    {
      id: 'business-plan',
      title: 'Бизнес-план',
      description: 'Стратегия и монетизация',
      route: '/business-plan',
      features: ['Модель монетизации', 'Прогнозы', 'Преимущества'],
    },
  ],
  admin: [
    {
      id: 'moderation',
      title: 'Модерация',
      description: 'Управление контентом и пользователями',
      route: '/admin/moderation',
      features: ['Контент', 'Пользователи', 'Жалобы'],
    },
    {
      id: 'themes',
      title: 'Каталог тем',
      description: 'Управление темами оформления',
      route: '/admin/themes',
      features: ['Темы', 'Модерация', 'Публикация'],
    },
    {
      id: 'tokenomics',
      title: 'Токеномика',
      description: 'Настройка системы токенов',
      route: '/admin/tokenomics',
      features: ['Награды', 'Курсы', 'Распределение'],
    },
    {
      id: 'analytics',
      title: 'Аналитика',
      description: 'Статистика и отчёты',
      route: '/admin/analytics',
      features: ['Пользователи', 'Активность', 'Доходы'],
    },
  ],
}

export default function DemoTour() {
  const { currentDemoRole, startDemo } = useDemo()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  const steps = currentDemoRole ? tourSteps[currentDemoRole] || tourSteps.user : tourSteps.user
  const step = steps[currentStep]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      router.push(steps[currentStep + 1].route)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      router.push(steps[currentStep - 1].route)
    }
  }

  const handleStart = () => {
    if (!currentDemoRole) {
      startDemo('user')
    }
    router.push(steps[0].route)
  }

  if (!currentDemoRole) {
    return (
      <div className="card text-center">
        <h3 className="text-2xl font-bold mb-4">Начните демо-тур</h3>
        <p className="text-ink-600 mb-6">
          Выберите роль и пройдите по всем ключевым функциям приложения
        </p>
        <button onClick={handleStart} className="button-primary">
          Начать тур
        </button>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="card card-sketch"
      >
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-ink-600">
              Шаг {currentStep + 1} из {steps.length}
            </span>
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep
                      ? 'bg-accent-turquoise'
                      : index < currentStep
                      ? 'bg-green-500'
                      : 'bg-ink-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
        <p className="text-ink-600 mb-4">{step.description}</p>

        <div className="mb-6">
          <h4 className="font-bold mb-2">Функции:</h4>
          <ul className="space-y-1">
            {step.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-ink-700">
                <span className="text-accent-turquoise">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="button-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Назад
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="button-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Далее →
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

