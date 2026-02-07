'use client'

import { useEffect, useState } from 'react'
import { ShoppingCart, Star, Tag, TrendingUp } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { cn } from '@/lib/utils/cn'

const marketplaceSections = [
  {
    title: 'Абонементы и пропуска',
    description: 'Фитнес-клубы, бассейны, бани, групповые занятия и студии.',
    items: ['Фитнес-клуб 3 мес', 'Баня + SPA', 'Групповая йога'],
    icon: '🏋️',
  },
  {
    title: 'Спортивное питание и витамины',
    description: 'БАДы, аминокислоты, нутрицевтики, персональные наборы.',
    items: ['Комплекс D3 + K2', 'Протеин, 1 кг', 'Магний бисглицинат'],
    icon: '💊',
  },
  {
    title: 'Здоровое питание',
    description: 'Доставка рационов, магазины эко-продуктов, меню без аллергенов.',
    items: ['Рацион 1800 ккал', 'Веган набор', 'Безглютеновый маркет'],
    icon: '🥗',
  },
  {
    title: 'Восстановление и терапия',
    description: 'Массаж, тейпирование, ортопедические товары, диагностика.',
    items: ['Курс массажа', 'Проверка осанки', 'Ортез колена'],
    icon: '🩹',
  },
]

const featured = [
  {
    name: 'Про абонемент ProGym',
    price: '12 900 ₽',
    tag: 'Популярно',
    rating: 4.8,
    reviews: 234,
  },
  {
    name: 'Набор "Здоровый сон"',
    price: '2 490 ₽',
    tag: 'Нутрицевтики',
    rating: 4.9,
    reviews: 156,
  },
  {
    name: 'Годовой чек-ап',
    price: '9 900 ₽',
    tag: 'Медицина',
    rating: 5.0,
    reviews: 89,
  },
  {
    name: 'Психотерапия 4 сессии',
    price: '8 000 ₽',
    tag: 'Ментальное',
    rating: 4.7,
    reviews: 112,
  },
]

export default function MarketplacePage() {
  const [offers, setOffers] = useState<any[]>([])
  const [cart, setCart] = useState<Set<string>>(new Set())

  useEffect(() => {
    const load = async () => {
      const data = await fetch('/api/cashback/offers').then((res) => res.json())
      setOffers(Array.isArray(data) ? data : [])
    }
    load()
  }, [])

  const handleAddToCart = (itemName: string) => {
    setCart((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemName)) {
        newSet.delete(itemName)
      } else {
        newSet.add(itemName)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-fadeIn">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800">
              Маркетплейс здоровья
            </h1>
            <p className="text-base sm:text-lg text-warmGraphite-600 mt-2">
              Абонементы, товары, сервисы и программы, интегрированные в ваш профиль.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <NeumorphicButton primary>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Корзина ({cart.size})
            </NeumorphicButton>
            <NeumorphicButton>Мои покупки</NeumorphicButton>
          </div>
        </header>

        {/* Рекомендуемые предложения */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
                Рекомендуемые предложения
              </h2>
              <p className="text-sm text-warmGraphite-600 mt-1">
                Подбираем абонементы и товары по вашим целям и анализам.
              </p>
            </div>
            <button className="text-sm text-warmBlue-600 hover:text-warmBlue-700 font-medium transition-colors">
              Смотреть все →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((item, index) => {
              const inCart = cart.has(item.name)
              return (
                <NeumorphicCard
                  key={item.name}
                  soft
                  className={cn(
                    'p-4 hover:scale-105 transition-all duration-300 animate-fadeIn',
                    inCart && 'ring-2 ring-warmBlue-500'
                  )}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <NeumorphicBadge variant="info" size="sm">
                      {item.tag}
                    </NeumorphicBadge>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-warmPink-500 text-warmPink-500" />
                      <span className="text-xs font-semibold text-warmGraphite-700">
                        {item.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-warmGraphite-800 mb-2">
                    {item.name}
                  </div>
                  <div className="text-sm text-warmGraphite-600 mb-1">
                    {item.reviews} отзывов
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-warmGraphite-800 mb-4">
                    {item.price}
                  </div>
                  <NeumorphicButton
                    primary={inCart}
                    className="w-full text-sm"
                    onClick={() => handleAddToCart(item.name)}
                  >
                    {inCart ? 'В корзине' : 'Добавить'}
                  </NeumorphicButton>
                </NeumorphicCard>
              )
            })}
          </div>
        </NeumorphicCard>

        {/* Категории */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {marketplaceSections.map((section, index) => (
            <NeumorphicCard
              key={section.title}
              className="p-4 sm:p-6 hover:scale-[1.02] transition-all duration-300 animate-fadeIn"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{section.icon}</span>
                <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
                  {section.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-warmGraphite-600 mb-4">
                {section.description}
              </p>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <NeumorphicCard
                    key={item}
                    soft
                    className="p-3 flex items-center justify-between hover:scale-[1.01] transition-transform"
                  >
                    <span className="text-sm text-warmGraphite-700">{item}</span>
                    <NeumorphicButton className="text-xs px-3 py-1">
                      Выбрать
                    </NeumorphicButton>
                  </NeumorphicCard>
                ))}
              </div>
            </NeumorphicCard>
          ))}
        </section>

        {/* Кэшбэк предложения */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-warmGreen-600" />
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
              Кэшбэк и партнерские предложения
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offers.length === 0 && (
              <div className="text-sm text-warmGray-600 col-span-2 text-center py-8">
                Пока нет активных кэшбэк-кампаний.
              </div>
            )}
            {offers.map((offer, index) => (
              <NeumorphicCard
                key={offer.id}
                soft
                className="p-4 hover:scale-[1.02] transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-warmGraphite-800 text-sm sm:text-base">
                    {offer.title}
                  </div>
                  <NeumorphicBadge variant="success" size="sm">
                    {offer.percent}%
                  </NeumorphicBadge>
                </div>
                <div className="text-xs sm:text-sm text-warmGraphite-600 mb-2">
                  {offer.description}
                </div>
                <div className="text-xs text-warmGray-600 mb-3">
                  Код: <span className="font-mono font-semibold">{offer.referralCode}</span>
                </div>
                <NeumorphicButton
                  primary
                  className="w-full text-sm"
                  onClick={async () => {
                    await fetch('/api/cashback/redeem', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ offerId: offer.id, amountNXT: 100 }),
                    })
                  }}
                >
                  <Tag className="w-4 h-4 mr-2" />
                  Запросить кэшбэк
                </NeumorphicButton>
              </NeumorphicCard>
            ))}
          </div>
        </NeumorphicCard>
      </div>
    </div>
  )
}
