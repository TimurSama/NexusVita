'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

interface Offer {
  id: string
  name: string
  description: string
  price: number
  tokenPrice?: number
  features: string[]
  popular?: boolean
  category: 'user' | 'trainer' | 'location'
}

export default function OffersPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'user' | 'trainer' | 'location'>('all')

  const offers: Offer[] = [
    {
      id: 'user-basic',
      name: 'Базовый',
      description: 'Для начинающих пользователей',
      price: 0,
      features: [
        'Доступ к базовым функциям',
        'Просмотр публичных страниц тренеров',
        'Участие в бесплатных челленджах',
        'Базовое отслеживание прогресса',
        'Получение токенов за активности',
      ],
      category: 'user',
    },
    {
      id: 'user-premium',
      name: 'Премиум',
      description: 'Расширенные возможности для активных пользователей',
      price: 990,
      tokenPrice: 500,
      popular: true,
      features: [
        'Всё из Базового',
        'Доступ к премиум-программам тренеров',
        'Приоритетная поддержка',
        'Расширенная аналитика прогресса',
        'Эксклюзивные челленджи',
        'Скидки в магазине до 20%',
        'Ранний доступ к новым функциям',
      ],
      category: 'user',
    },
    {
      id: 'trainer-starter',
      name: 'Стартовый',
      description: 'Для начинающих тренеров',
      price: 1990,
      tokenPrice: 1000,
      features: [
        'Создание мини-сайта',
        'До 3 модулей на странице',
        'Базовые темы оформления',
        'До 50 подписчиков',
        'Продажа программ и услуг',
        'Календарь тренировок',
        'Чат с клиентами',
      ],
      category: 'trainer',
    },
    {
      id: 'trainer-pro',
      name: 'Профессиональный',
      description: 'Для опытных тренеров',
      price: 4990,
      tokenPrice: 2500,
      popular: true,
      features: [
        'Всё из Стартового',
        'Неограниченное количество модулей',
        'Все темы + создание своих',
        'Неограниченное количество подписчиков',
        'Продвинутая аналитика',
        'Интеграция с Telegram',
        'Приоритет в каталоге тренеров',
        'Маркетплейс программ',
        'Групповые тренировки онлайн',
      ],
      category: 'trainer',
    },
    {
      id: 'location-basic',
      name: 'Базовый для зала',
      description: 'Для небольших фитнес-клубов',
      price: 4990,
      tokenPrice: 2500,
      features: [
        'Управление карточкой локации',
        'До 3 абонементов',
        'QR/NFC проход',
        'До 5 тренеров',
        'Базовая аналитика посещений',
        'Интеграция с тренерами',
      ],
      category: 'location',
    },
    {
      id: 'location-enterprise',
      name: 'Корпоративный',
      description: 'Для крупных сетей фитнес-клубов',
      price: 19990,
      tokenPrice: 10000,
      popular: true,
      features: [
        'Всё из Базового',
        'Неограниченное количество абонементов',
        'Множественные локации',
        'Неограниченное количество тренеров',
        'Продвинутая аналитика',
        'API интеграция',
        'Персональный менеджер',
        'Кастомные интеграции',
        'Приоритетная поддержка 24/7',
      ],
      category: 'location',
    },
  ]

  const filteredOffers = selectedCategory === 'all' 
    ? offers 
    : offers.filter(o => o.category === selectedCategory)

  const handlePurchase = (offer: Offer) => {
    if (!user) {
      router.push('/register')
      return
    }
    // Здесь будет логика покупки
    router.push(`/shop/checkout?offer=${offer.id}`)
  }

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Тарифы и предложения</h1>
          <p className="text-xl text-ink-600">
            Выберите подходящий тариф для ваших целей
          </p>
        </div>

        {/* Фильтры */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-lg ${
              selectedCategory === 'all' 
                ? 'button-primary' 
                : 'button-secondary'
            }`}
          >
            Все
          </button>
          <button
            onClick={() => setSelectedCategory('user')}
            className={`px-6 py-2 rounded-lg ${
              selectedCategory === 'user' 
                ? 'button-primary' 
                : 'button-secondary'
            }`}
          >
            Для пользователей
          </button>
          <button
            onClick={() => setSelectedCategory('trainer')}
            className={`px-6 py-2 rounded-lg ${
              selectedCategory === 'trainer' 
                ? 'button-primary' 
                : 'button-secondary'
            }`}
          >
            Для тренеров
          </button>
          <button
            onClick={() => setSelectedCategory('location')}
            className={`px-6 py-2 rounded-lg ${
              selectedCategory === 'location' 
                ? 'button-primary' 
                : 'button-secondary'
            }`}
          >
            Для залов
          </button>
        </div>

        {/* Тарифы */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className={`card relative ${
                offer.popular ? 'border-2 border-accent-turquoise' : ''
              }`}
            >
              {offer.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent-turquoise text-white px-4 py-1 rounded-full text-sm font-bold">
                  Популярный
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{offer.name}</h3>
                <p className="text-ink-600 mb-4">{offer.description}</p>
                <div className="mb-2">
                  {offer.price === 0 ? (
                    <div className="text-3xl font-bold">Бесплатно</div>
                  ) : (
                    <>
                      <div className="text-3xl font-bold">{offer.price} ₽</div>
                      {offer.tokenPrice && (
                        <div className="text-sm text-accent-turquoise mt-1">
                          или {offer.tokenPrice} токенов
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {offer.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-accent-turquoise mr-2">✓</span>
                    <span className="text-ink-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePurchase(offer)}
                className={`w-full ${
                  offer.popular ? 'button-primary' : 'button-secondary'
                }`}
              >
                {offer.price === 0 ? 'Начать бесплатно' : 'Выбрать тариф'}
              </button>
            </div>
          ))}
        </div>

        {/* Децентрализация и Web3 */}
        <div className="mt-12 card card-sketch bg-accent-turquoise bg-opacity-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">🔗</div>
            <div>
              <h3 className="text-2xl font-bold">Децентрализация и Web3</h3>
              <p className="text-ink-600">
                Все тарифы поддерживают блокчейн функции (опционально)
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg">
              <div className="font-bold mb-2">🔐 Безопасность данных</div>
              <p className="text-sm text-ink-600">
                Ваши данные защищены блокчейном. Вы полностью контролируете доступ.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <div className="font-bold mb-2">💎 NFT достижения</div>
              <p className="text-sm text-ink-600">
                Уникальные цифровые награды как NFT, которые можно собирать и обменивать.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <div className="font-bold mb-2">🗳️ Участие в DAO</div>
              <p className="text-sm text-ink-600">
                Владельцы токенов участвуют в управлении платформой через голосование.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/decentralization" className="text-accent-turquoise hover:underline font-medium">
              Узнать больше о децентрализации →
            </Link>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-12 card bg-ink-50">
          <h3 className="text-2xl font-bold mb-4">Часто задаваемые вопросы</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold mb-2">Можно ли изменить тариф позже?</h4>
              <p className="text-ink-600">
                Да, вы можете перейти на другой тариф в любой момент. Разница будет засчитана пропорционально.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Что такое токены?</h4>
              <p className="text-ink-600">
                Токены — это внутренняя валюта Nexus Vita. Вы получаете их за активности (тренировки, челленджи)
                и можете использовать для оплаты тарифов, программ и услуг. Токены также работают на блокчейне.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Есть ли пробный период?</h4>
              <p className="text-ink-600">
                Да, для всех платных тарифов доступен 7-дневный пробный период. Вы можете отменить подписку
                в любой момент без дополнительных платежей.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Обязательно ли использовать блокчейн?</h4>
              <p className="text-ink-600">
                Нет, блокчейн функции опциональны. Вы можете использовать платформу традиционным способом,
                а блокчейн функции активировать при желании.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Что включает человекоцентричный подход?</h4>
              <p className="text-ink-600">
                Платформа учитывает не только физическое здоровье, но и эмоциональное состояние, социальную активность
                и бытовые привычки. Это обеспечивает комплексную поддержку вашего благополучия.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

