'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useDemo } from '@/contexts/DemoContext'
import RoleSwitcher from '@/components/demo/RoleSwitcher'

export default function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { isDemoMode, stopDemo } = useDemo()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <header className="bg-parchment-200 border-b-2 border-ink-300 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-3">
            <div className="text-2xl font-bold text-ink-900">Nexus Vita</div>
            <div className="text-xs text-ink-600 hidden md:block">
              Экосистема здоровья
            </div>
          </Link>

          {/* Навигация */}
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/" className="text-ink-700 hover:text-ink-900">
              Главная
            </Link>
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
            <Link href="/decentralization" className="text-ink-700 hover:text-ink-900">
              Децентрализация
            </Link>
            <Link href="/human-centered" className="text-ink-700 hover:text-ink-900">
              Человекоцентричность
            </Link>
            <Link href="/business-plan" className="text-ink-700 hover:text-ink-900">
              Бизнес-план
            </Link>
            <Link href="/trainers" className="text-ink-700 hover:text-ink-900">
              Тренеры
            </Link>
            <Link href="/locations" className="text-ink-700 hover:text-ink-900">
              Локации
            </Link>
            <Link href="/challenges" className="text-ink-700 hover:text-ink-900">
              Челленджи
            </Link>
            <Link href="/shop" className="text-ink-700 hover:text-ink-900">
              Магазин
            </Link>
          </nav>

          {/* Правая часть */}
          <div className="flex items-center gap-4">
            <RoleSwitcher />
            <Link href="/demo" className="text-ink-700 hover:text-ink-900 hidden md:block">
              Демо
            </Link>
            <Link href="/notifications" className="text-ink-700 hover:text-ink-900">
              🔔
            </Link>
            <Link href="/messages" className="text-ink-700 hover:text-ink-900">
              💬
            </Link>
            <Link href="/settings" className="text-ink-700 hover:text-ink-900">
              ⚙️
            </Link>
            {user && (
              <div className="flex items-center gap-2">
                <Link href={`/profile/${user.id}`}>
                  <div className="w-8 h-8 rounded-full bg-accent-turquoise flex items-center justify-center text-white font-bold">
                    {user.firstName[0]}
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-ink-600 hover:text-ink-900"
                >
                  Выйти
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

