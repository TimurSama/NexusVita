'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  Home,
  Dumbbell,
  Apple,
  FileText,
  Target,
  Users,
  Store,
  Book,
  HeartPulse,
  Wallet,
  Menu,
  X,
  CreditCard,
  ClipboardList,
  User,
  Sparkles,
  Award,
  Calendar,
  Gift,
  Building2,
  Briefcase,
  BookOpen,
  PenTool,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const navigationItems = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/social', label: 'Лента', icon: Users },
  { href: '/specialists', label: 'Специалисты', icon: HeartPulse },
  { href: '/marketplace', label: 'Маркетплейс', icon: Store },
  { href: '/access', label: 'Карты и пропуска', icon: CreditCard },
  { href: '/journal', label: 'Личный дневник', icon: PenTool },
  { href: '/ecosystem', label: 'Экосистема', icon: Book },
  { href: '/dao', label: 'DAO / Токены', icon: Wallet },
]

const utilityItems = [
  { href: '/training', label: 'Тренировки', icon: Dumbbell },
  { href: '/nutrition', label: 'Питание', icon: Apple },
  { href: '/monitoring/analyses', label: 'Анализы', icon: FileText },
  { href: '/goals', label: 'Цели', icon: Target },
  { href: '/calendar', label: 'Календарь', icon: Calendar },
  { href: '/medical-card', label: 'Медкарта', icon: ClipboardList },
  { href: '/subscriptions', label: 'Подписки', icon: CreditCard },
  { href: '/profile', label: 'Профиль', icon: User },
  { href: '/achievements', label: 'Достижения', icon: Award },
  { href: '/referrals', label: 'Рефералы', icon: Gift },
  { href: '/partner', label: 'Кабинет партнера', icon: Building2 },
  { href: '/specialist-dashboard', label: 'Панель специалиста', icon: Briefcase },
  { href: '/knowledge', label: 'Библиотека знаний', icon: BookOpen },
  { href: '/journal', label: 'Личный дневник', icon: PenTool },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-parchment-200/90 backdrop-blur-sm border-b-2 border-ink-300 shadow-lg sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-ink-700 hover:bg-parchment-300"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Открыть меню"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link href="/" className="text-2xl font-bold text-ink-800">
              Nexus Vita
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2',
                      isActive
                        ? 'bg-ink-700 text-white'
                        : 'text-ink-600 hover:bg-parchment-300 hover:text-ink-800'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3 py-2 rounded-md text-sm font-medium text-ink-600 hover:bg-parchment-300 hover:text-ink-800"
              >
                Войти
              </Link>
              <Link href="/register" className="sketch-button">
                Регистрация
              </Link>
            </div>
            <Link href="/dao" className="sketch-button">
              Купить токены
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t-2 border-ink-300 bg-parchment-100/95">
          <div className="px-4 py-4 space-y-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-ink-500 mb-2">
                Экосистема
              </div>
              <div className="grid grid-cols-1 gap-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2',
                        isActive
                          ? 'bg-ink-700 text-white'
                          : 'text-ink-600 hover:bg-parchment-300 hover:text-ink-800'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
            <div className="sketch-divider" />
            <div>
              <div className="text-xs uppercase tracking-widest text-ink-500 mb-2">
                Мое здоровье
              </div>
              <div className="grid grid-cols-1 gap-2">
                {utilityItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2',
                        isActive
                          ? 'bg-ink-700 text-white'
                          : 'text-ink-600 hover:bg-parchment-300 hover:text-ink-800'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
            <div className="sketch-divider" />
            <div className="grid grid-cols-1 gap-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-ink-600 hover:bg-parchment-300 hover:text-ink-800"
              >
                Войти
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="sketch-button justify-center"
              >
                Регистрация
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}


