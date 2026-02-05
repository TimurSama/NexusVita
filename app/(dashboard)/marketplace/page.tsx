'use client'

import { useEffect, useState } from 'react'

const marketplaceSections = [
  {
    title: 'Абонементы и пропуска',
    description: 'Фитнес-клубы, бассейны, бани, групповые занятия и студии.',
    items: ['Фитнес-клуб 3 мес', 'Баня + SPA', 'Групповая йога'],
  },
  {
    title: 'Спортивное питание и витамины',
    description: 'БАДы, аминокислоты, нутрицевтики, персональные наборы.',
    items: ['Комплекс D3 + K2', 'Протеин, 1 кг', 'Магний бисглицинат'],
  },
  {
    title: 'Здоровое питание',
    description: 'Доставка рационов, магазины эко-продуктов, меню без аллергенов.',
    items: ['Рацион 1800 ккал', 'Веган набор', 'Безглютеновый маркет'],
  },
  {
    title: 'Восстановление и терапия',
    description: 'Массаж, тейпирование, ортопедические товары, диагностика.',
    items: ['Курс массажа', 'Проверка осанки', 'Ортез колена'],
  },
]

const featured = [
  { name: 'Про абонемент ProGym', price: '12 900 ₽', tag: 'Популярно' },
  { name: 'Набор “Здоровый сон”', price: '2 490 ₽', tag: 'Нутрицевтики' },
  { name: 'Годовой чек-ап', price: '9 900 ₽', tag: 'Медицина' },
  { name: 'Психотерапия 4 сессии', price: '8 000 ₽', tag: 'Ментальное' },
]

export default function MarketplacePage() {
  const [offers, setOffers] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      const data = await fetch('/api/cashback/offers').then((res) => res.json())
      setOffers(Array.isArray(data) ? data : [])
    }
    load()
  }, [])

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-ink-800">Маркетплейс здоровья</h1>
            <p className="text-ink-600">
              Абонементы, товары, сервисы и программы, интегрированные в ваш
              профиль.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="sketch-button">Добавить товар</button>
            <button className="px-5 py-2.5 rounded-lg border-2 border-ink-300 text-ink-700 hover:bg-parchment-200">
              Мои покупки
            </button>
          </div>
        </header>

        <section className="sketch-card p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-ink-800">
                Рекомендуемые предложения
              </h2>
              <p className="text-ink-600 text-sm">
                Подбираем абонементы и товары по вашим целям и анализам.
              </p>
            </div>
            <button className="ink-link text-sm">Смотреть все</button>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((item) => (
              <div
                key={item.name}
                className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
              >
                <div className="text-xs text-ink-500">{item.tag}</div>
                <div className="text-lg font-semibold text-ink-800">
                  {item.name}
                </div>
                <div className="text-sm text-ink-700 mt-2">{item.price}</div>
                <button className="mt-4 w-full sketch-button">Добавить</button>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {marketplaceSections.map((section) => (
            <div key={section.title} className="sketch-card p-6">
              <h3 className="text-xl font-semibold text-ink-800 mb-2">
                {section.title}
              </h3>
              <p className="text-ink-600 mb-4">{section.description}</p>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-3 rounded-lg border border-ink-200 bg-parchment-100"
                  >
                    <span className="text-sm text-ink-700">{item}</span>
                    <button className="px-3 py-1 rounded-md border border-ink-300 text-xs text-ink-700 hover:bg-parchment-200">
                      Выбрать
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="sketch-card p-6">
          <h2 className="text-2xl font-semibold text-ink-800 mb-4">
            Кэшбэк и партнерские предложения
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offers.length === 0 && (
              <div className="text-sm text-ink-600">
                Пока нет активных кэшбэк-кампаний.
              </div>
            )}
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
              >
                <div className="font-semibold text-ink-800">{offer.title}</div>
                <div className="text-sm text-ink-600">{offer.description}</div>
                <div className="text-xs text-ink-500 mt-1">
                  Кэшбэк {offer.percent}% · код {offer.referralCode}
                </div>
                <button
                  className="mt-3 w-full sketch-button"
                  onClick={async () => {
                    await fetch('/api/cashback/redeem', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ offerId: offer.id, amountNXT: 100 }),
                    })
                  }}
                >
                  Запросить кэшбэк
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
