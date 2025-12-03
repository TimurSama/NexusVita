'use client'

import Header from '@/components/layout/Header'

interface RoadmapItem {
  quarter: string
  year: number
  status: 'completed' | 'in-progress' | 'planned'
  title: string
  description: string
  features: string[]
}

export default function RoadmapPage() {
  const roadmap: RoadmapItem[] = [
    {
      quarter: 'Q4',
      year: 2024,
      status: 'completed',
      title: 'Запуск MVP',
      description: 'Базовый функционал экосистемы',
      features: [
        'Регистрация и авторизация',
        'Интерактивный аватар тела',
        'Страницы тренеров (мини-сайты)',
        'Система тем оформления',
        'Базовые программы тренировок',
        'Система токенов',
        'Демо-режим',
      ],
    },
    {
      quarter: 'Q1',
      year: 2025,
      status: 'in-progress',
      title: 'Расширение функционала',
      description: 'Добавление ключевых возможностей',
      features: [
        'Интеграция с Telegram (чат, мини-приложение)',
        'Планы питания и дневники',
        'Медицинский модуль (анализы, рекомендации)',
        'QR/NFC проход в залы',
        'Онлайн-тренировки (видео)',
        'Расширенная аналитика прогресса',
        'Мобильное приложение (iOS/Android)',
      ],
    },
    {
      quarter: 'Q2',
      year: 2025,
      status: 'planned',
      title: 'Социальные функции',
      description: 'Развитие сообщества',
      features: [
        'Групповые челленджи',
        'Социальная лента',
        'Рейтинги и лидерборды',
        'Команды и группы',
        'Система рефералов',
        'Маркетплейс программ',
        'Отзывы и рейтинги',
      ],
    },
    {
      quarter: 'Q3',
      year: 2025,
      status: 'planned',
      title: 'Интеграции и партнёрства',
      description: 'Расширение экосистемы',
      features: [
        'Интеграция с фитнес-трекерами (Apple Watch, Garmin)',
        'Интеграция с умными весами',
        'Партнёрства с брендами спортпита',
        'API для сторонних разработчиков',
        'Интеграция с календарями',
        'Экспорт данных',
        'Интеграция с платежными системами',
      ],
    },
    {
      quarter: 'Q4',
      year: 2025,
      status: 'planned',
      title: 'Искусственный интеллект',
      description: 'Умные рекомендации и персонализация',
      features: [
        'AI-тренер (персональные рекомендации)',
        'Анализ техники упражнений (компьютерное зрение)',
        'Умные планы питания на основе анализов',
        'Предсказание травм и профилактика',
        'Персонализированные программы',
        'Голосовой помощник',
        'Автоматическое отслеживание прогресса',
      ],
    },
    {
      quarter: 'Q1',
      year: 2026,
      status: 'planned',
      title: 'Глобальное расширение',
      description: 'Выход на международный рынок',
      features: [
        'Мультиязычность (EN, DE, FR, ES)',
        'Локализация для разных стран',
        'Международные платежи',
        'Партнёрства с зарубежными залами',
        'Глобальные челленджи',
        'Международная токеномика',
        'Франшиза для залов',
      ],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'in-progress':
        return 'bg-accent-turquoise'
      case 'planned':
        return 'bg-ink-300'
      default:
        return 'bg-ink-300'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Завершено'
      case 'in-progress':
        return 'В разработке'
      case 'planned':
        return 'Запланировано'
      default:
        return 'Запланировано'
    }
  }

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Дорожная карта развития</h1>
          <p className="text-xl text-ink-600">
            Планы развития Nexus Vita на ближайшие годы
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Вертикальная линия */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-ink-300 hidden md:block"></div>

          <div className="space-y-12">
            {roadmap.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Точка на линии */}
                  <div className="hidden md:block absolute left-6 w-4 h-4 rounded-full border-4 border-parchment-50 z-10" style={{ top: '0.5rem' }}>
                    <div className={`w-full h-full rounded-full ${getStatusColor(item.status)}`}></div>
                  </div>

                  {/* Контент */}
                  <div className="md:ml-20 flex-1">
                    <div className="card">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl font-bold text-ink-900">
                              {item.quarter} {item.year}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${getStatusColor(item.status)}`}>
                              {getStatusText(item.status)}
                            </span>
                          </div>
                          <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                          <p className="text-ink-600 mb-4">{item.description}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3">
                        {item.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start">
                            <span className="text-accent-turquoise mr-2 mt-1">•</span>
                            <span className="text-ink-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Статистика */}
        <section className="mt-16">
          <div className="card bg-ink-50">
            <h2 className="text-2xl font-bold mb-6 text-center">Текущий прогресс</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-turquoise mb-2">1</div>
                <div className="text-ink-600">Завершённых этапов</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-turquoise mb-2">1</div>
                <div className="text-ink-600">В разработке</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-ink-600 mb-2">4</div>
                <div className="text-ink-600">Запланировано</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-turquoise mb-2">50+</div>
                <div className="text-ink-600">Функций в планах</div>
              </div>
            </div>
          </div>
        </section>

        {/* Предложения */}
        <section className="mt-12">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Предложить идею</h2>
            <p className="text-ink-600 mb-4">
              У вас есть идея для улучшения Nexus Vita? Мы всегда открыты к предложениям!
            </p>
            <button className="button-primary">
              Отправить предложение
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

