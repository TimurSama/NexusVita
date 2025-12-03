'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen">
      {/* Хэдер */}
      <header className="bg-parchment-200 border-b border-ink-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-ink-900">Nexus Vita</div>
            <div className="text-sm text-ink-600">Экосистема здоровья</div>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/presentation" className="text-ink-700 hover:text-ink-900">
              О проекте
            </Link>
            <Link href="/offers" className="text-ink-700 hover:text-ink-900">
              Тарифы
            </Link>
            <Link href="/tokenomics" className="text-ink-700 hover:text-ink-900">
              Токеномика
            </Link>
            <Link href="/roadmap" className="text-ink-700 hover:text-ink-900">
              Дорожная карта
            </Link>
            <Link href="/demo" className="text-ink-700 hover:text-ink-900">
              Демо
            </Link>
            <button
              onClick={() => router.push('/login')}
              className="button-secondary"
            >
              Войти
            </button>
            <button
              onClick={() => router.push('/register')}
              className="button-primary"
            >
              Регистрация
            </button>
          </nav>
        </div>
      </header>

      {/* Главный экран */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-ink-900">
            Nexus Vita
          </h1>
          <p className="text-xl text-ink-600 mb-8">
            Модульная экосистема здоровья, тренировок и работы с тренерами
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/register')}
              className="button-primary text-lg px-8 py-3"
            >
              Начать бесплатно
            </button>
            <button
              onClick={() => router.push('/demo')}
              className="button-secondary text-lg px-8 py-3"
            >
              Попробовать демо
            </button>
          </div>
          <div className="flex gap-4 justify-center mt-4">
            <Link href="/presentation" className="text-accent-turquoise hover:underline">
              Узнать больше →
            </Link>
            <Link href="/offers" className="text-accent-turquoise hover:underline">
              Тарифы →
            </Link>
            <Link href="/tokenomics" className="text-accent-turquoise hover:underline">
              Токеномика →
            </Link>
            <Link href="/roadmap" className="text-accent-turquoise hover:underline">
              Дорожная карта →
            </Link>
          </div>
        </div>

        {/* Особенности */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="card">
            <h3 className="text-xl font-bold mb-2">Персональные страницы тренеров</h3>
            <p className="text-ink-600">
              Каждый тренер создаёт свой мини-сайт с уникальным дизайном и модулями
            </p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold mb-2">Интерактивный аватар тела</h3>
            <p className="text-ink-600">
              Отслеживайте прогресс, отмечайте цели и проблемные зоны на интерактивной модели тела
            </p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold mb-2">Система тем</h3>
            <p className="text-ink-600">
              Выбирайте темы оформления или создавайте свои в стиле кибер-ренессанса
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

