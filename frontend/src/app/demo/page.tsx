'use client'

import { useDemo } from '@/contexts/DemoContext'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import DemoTour from '@/components/demo/DemoTour'

interface DemoRole {
  id: string
  name: string
  description: string
  features: Array<{ id: string; name: string; description: string }>
}

const demoRoles: DemoRole[] = [
  {
    id: 'guest',
    name: 'Гость',
    description: 'Просмотр публичных страниц тренеров и материалов',
    features: [
      { id: 'browse_trainers', name: 'Просмотр тренеров', description: 'Изучите страницы тренеров и их контент' },
      { id: 'view_content', name: 'Просмотр контента', description: 'Читайте публикации и статьи' },
      { id: 'explore_themes', name: 'Изучение тем', description: 'Посмотрите различные темы оформления' },
    ],
  },
  {
    id: 'user',
    name: 'Пользователь (клиент)',
    description: 'Полный функционал для клиентов: тренировки, питание, прогресс',
    features: [
      { id: 'home', name: 'Главная страница', description: 'Интерактивный аватар тела и виджеты' },
      { id: 'body_avatar', name: 'Аватар тела', description: 'Отслеживание целей и проблемных зон' },
      { id: 'workouts', name: 'Тренировки', description: 'Программы тренировок и записи' },
      { id: 'nutrition', name: 'Питание', description: 'Планы питания и дневники' },
      { id: 'shop', name: 'Магазин', description: 'Покупка услуг и товаров' },
      { id: 'challenges', name: 'Челленджи', description: 'Участие в челленджах и соревнованиях' },
    ],
  },
  {
    id: 'trainer',
    name: 'Тренер / Специалист',
    description: 'Управление страницей, контентом, программами и клиентами',
    features: [
      { id: 'trainer_page', name: 'Страница тренера', description: 'Создание и настройка мини-сайта' },
      { id: 'content_management', name: 'Управление контентом', description: 'Публикации, фото, видео' },
      { id: 'programs', name: 'Программы', description: 'Создание программ тренировок и питания' },
      { id: 'clients', name: 'Клиенты', description: 'Управление клиентами и подписками' },
      { id: 'calendar', name: 'Календарь', description: 'Расписание тренировок и событий' },
      { id: 'shop', name: 'Магазин тренера', description: 'Продажа услуг и товаров' },
    ],
  },
  {
    id: 'location_manager',
    name: 'Представитель локации',
    description: 'Управление залом, абонементами и партнёрскими программами',
    features: [
      { id: 'location_management', name: 'Управление локацией', description: 'Настройка карточки зала' },
      { id: 'passes', name: 'Абонементы', description: 'Создание и управление абонементами' },
      { id: 'access_control', name: 'Контроль доступа', description: 'QR/NFC проход и проверка' },
      { id: 'partnerships', name: 'Партнёрства', description: 'Настройка скидок и партнёрских программ' },
    ],
  },
  {
    id: 'admin',
    name: 'Администратор',
    description: 'Полный доступ к системе: модерация, справочники, токеномика',
    features: [
      { id: 'moderation', name: 'Модерация', description: 'Модерация контента и пользователей' },
      { id: 'themes_catalog', name: 'Каталог тем', description: 'Управление темами оформления' },
      { id: 'tokenomics', name: 'Токеномика', description: 'Настройка системы токенов и наград' },
      { id: 'analytics', name: 'Аналитика', description: 'Статистика и отчёты системы' },
    ],
  },
]

export default function DemoPage() {
  const { startDemo, isDemoMode } = useDemo()
  const router = useRouter()

  const handleStartDemo = (roleId: string, featureId?: string) => {
    startDemo(roleId, featureId)
    // Перенаправляем на соответствующую страницу
    if (featureId === 'home' || featureId === 'body_avatar') {
      router.push('/')
    } else if (featureId === 'trainer_page') {
      router.push('/trainers/demo')
    } else {
      router.push(`/demo/${roleId}/${featureId || 'overview'}`)
    }
  }

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-ink-900">
            Демо-режим Nexus Vita
          </h1>
          <p className="text-xl text-ink-600 mb-8">
            Изучите все возможности приложения от каждой роли
          </p>
        </div>

        <div className="space-y-8">
          {demoRoles.map((role) => (
            <div key={role.id} className="card">
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">{role.name}</h2>
                <p className="text-ink-600">{role.description}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {role.features.map((feature) => (
                  <div
                    key={feature.id}
                    className="border border-ink-200 rounded p-4 hover:border-accent-turquoise transition-colors cursor-pointer"
                    onClick={() => handleStartDemo(role.id, feature.id)}
                  >
                    <h3 className="font-bold mb-2">{feature.name}</h3>
                    <p className="text-sm text-ink-600 mb-3">{feature.description}</p>
                    <button className="button-primary text-sm w-full">
                      Попробовать
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-ink-200">
                <button
                  onClick={() => handleStartDemo(role.id)}
                  className="button-secondary w-full"
                >
                  Обзор всех функций роли "{role.name}"
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Демо-тур */}
        <div className="mt-12">
          <DemoTour />
        </div>

        {isDemoMode && (
          <div className="mt-12 card bg-yellow-50 border-yellow-200">
            <h3 className="font-bold mb-2">Демо-режим активен</h3>
            <p className="text-sm text-ink-600 mb-4">
              Вы находитесь в демо-режиме. Все действия не сохраняются в базе данных.
              Это позволяет безопасно изучать все функции приложения.
            </p>
            <button
              onClick={() => router.push('/')}
              className="button-primary"
            >
              Перейти к демонстрации
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

