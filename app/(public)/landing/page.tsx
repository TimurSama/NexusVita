'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-ink-800 mb-6">
            Nexus Vita
          </h1>
          <p className="text-2xl text-ink-600 mb-4">
            Унифицированная экосистема здоровья
          </p>
          <p className="text-lg text-ink-500 mb-8 max-w-2xl mx-auto">
            Объединяем медицинские данные, спорт, питание, психологию и социальное взаимодействие
            в единую платформу для управления здоровьем
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              className="sketch-button text-lg px-8 py-3"
              onClick={() => router.push('/register')}
            >
              Начать бесплатно
            </button>
            <Link
              href="/pricing"
              className="sketch-button-outline text-lg px-8 py-3"
            >
              Тарифы
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 bg-ink-50/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-ink-800 text-center mb-12">
            Возможности платформы
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Медицинские данные',
                description: 'Единая медицинская карта, анализы, интеграция с клиниками через FHIR/HL7',
                icon: '🏥',
              },
              {
                title: 'Тренировки и спорт',
                description: 'Персональные программы, тренеры, отслеживание прогресса',
                icon: '💪',
              },
              {
                title: 'Питание',
                description: 'Консультации нутрициологов, планы питания, отслеживание калорий',
                icon: '🥗',
              },
              {
                title: 'Психология',
                description: 'Работа с психологами, отслеживание ментального здоровья',
                icon: '🧠',
              },
              {
                title: 'AI Health+',
                description: 'Персональный AI-ассистент для планирования и мониторинга здоровья',
                icon: '🤖',
              },
              {
                title: 'Социальная сеть',
                description: 'Друзья, группы, достижения, мотивация и поддержка',
                icon: '👥',
              },
            ].map((feature, idx) => (
              <div key={idx} className="sketch-card p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-ink-800 mb-2">{feature.title}</h3>
                <p className="text-ink-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Health+ Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-ink-800 mb-4">
            AI Health+ — ваш персональный помощник
          </h2>
          <p className="text-lg text-ink-600 mb-6">
            Искусственный интеллект анализирует все ваши данные и создает оптимальные планы
            тренировок, питания и восстановления
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
            <p className="text-ink-800 font-semibold mb-2">
              ✨ 7 дней бесплатного пробного периода
            </p>
            <p className="text-sm text-ink-600">
              Попробуйте AI Health+ бесплатно в течение 7 дней после регистрации
            </p>
          </div>
          <button
            className="sketch-button text-lg px-8 py-3"
            onClick={() => router.push('/register')}
          >
            Попробовать бесплатно
          </button>
        </div>
      </section>

      {/* Tokenomics */}
      <section className="px-6 py-16 bg-ink-50/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-ink-800 mb-4">
            Токеномика NVT
          </h2>
          <p className="text-lg text-ink-600 mb-6">
            Используйте токены NVT для оплаты услуг специалистов, подписок, покупок в маркетплейсе
            и участия в DAO-голосованиях
          </p>
          <Link
            href="/ecosystem"
            className="sketch-button-outline text-lg px-8 py-3 inline-block"
          >
            Узнать больше
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-ink-800 mb-4">
            Готовы начать?
          </h2>
          <p className="text-lg text-ink-600 mb-8">
            Присоединяйтесь к экосистеме здоровья уже сегодня
          </p>
          <button
            className="sketch-button text-lg px-8 py-3"
            onClick={() => router.push('/register')}
          >
            Зарегистрироваться
          </button>
        </div>
      </section>
    </div>
  )
}
