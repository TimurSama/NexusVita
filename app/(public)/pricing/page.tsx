'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function PricingPage() {
  const router = useRouter()

  const plans = [
    {
      name: 'Базовый',
      price: 'Бесплатно',
      description: 'Для начала работы с платформой',
      features: [
        'Медицинская карта',
        'Базовые метрики',
        'Социальная сеть',
        'Достижения и награды',
        'Доступ к специалистам (платно)',
      ],
      cta: 'Начать бесплатно',
      popular: false,
    },
    {
      name: 'AI Health+',
      price: '1999 ₽/мес',
      priceNXT: 'или 2000 NVT/мес',
      description: 'Персональный AI-ассистент для здоровья',
      features: [
        'Все из Базового',
        'AI-планирование дня',
        'Персональные рекомендации',
        'Автоматический анализ данных',
        'Интеграция с библиотекой знаний',
        '7 дней бесплатного пробного периода',
      ],
      cta: 'Попробовать бесплатно',
      popular: true,
    },
    {
      name: 'Профессионал',
      price: '4999 ₽/мес',
      priceNXT: 'или 5000 NVT/мес',
      description: 'Для специалистов и тренеров',
      features: [
        'Все из AI Health+',
        'Панель управления услугами',
        'Календарь и бронирования',
        'Рекомендации партнеров',
        'Аналитика и отчеты',
        'Приоритетная поддержка',
      ],
      cta: 'Выбрать план',
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-ink-800 mb-4">Тарифы</h1>
          <p className="text-lg text-ink-600">
            Выберите план, который подходит вам
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`sketch-card p-8 relative ${
                plan.popular ? 'border-2 border-ink-800 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-ink-800 text-parchment px-4 py-1 rounded-full text-sm font-semibold">
                  Популярный
                </div>
              )}
              <h3 className="text-2xl font-bold text-ink-800 mb-2">{plan.name}</h3>
              <p className="text-ink-600 mb-4 text-sm">{plan.description}</p>
              <div className="mb-6">
                <div className="text-3xl font-bold text-ink-800">{plan.price}</div>
                {plan.priceNXT && (
                  <div className="text-sm text-ink-500 mt-1">{plan.priceNXT}</div>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start">
                    <span className="text-ink-800 mr-2">✓</span>
                    <span className="text-ink-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className="sketch-button w-full"
                onClick={() => router.push('/register')}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="sketch-card p-8">
          <h2 className="text-2xl font-bold text-ink-800 mb-4">
            Оплата токенами NVT
          </h2>
          <p className="text-ink-600 mb-4">
            Все подписки и услуги можно оплачивать как фиатными деньгами, так и токенами NVT.
            При оплате токенами действуют специальные скидки.
          </p>
          <Link href="/ecosystem" className="ink-link">
            Узнать больше о токеномике →
          </Link>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-ink-800 mb-6">Частые вопросы</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Можно ли отменить подписку?',
                a: 'Да, вы можете отменить подписку в любой момент. Доступ сохранится до конца оплаченного периода.',
              },
              {
                q: 'Что включает пробный период AI Health+?',
                a: '7 дней полного доступа ко всем функциям AI Health+ без оплаты. После окончания пробного периода подписка не продлевается автоматически.',
              },
              {
                q: 'Как оплатить токенами NVT?',
                a: 'Приобретите токены NVT в разделе "Экосистема" или получите их за достижения и рефералы. Затем используйте их для оплаты подписок и услуг.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="sketch-card p-6">
                <h3 className="font-bold text-ink-800 mb-2">{faq.q}</h3>
                <p className="text-ink-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
