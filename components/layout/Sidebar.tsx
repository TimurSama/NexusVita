'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, Home, Users, HeartPulse, Store, CreditCard, Book, Wallet, Dumbbell, Apple, FileText, Target, Calendar, ClipboardList, User, Award, Gift, Building2, Briefcase, BookOpen, PenTool, LogIn, Map } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useEffect, useState } from 'react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigationItems = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/about', label: 'Подробнее', icon: BookOpen },
  { href: '/roadmap', label: 'Дорожная карта', icon: Map },
  { href: '/social', label: 'Лента', icon: Users },
  { href: '/specialists', label: 'Специалисты', icon: HeartPulse },
  { href: '/marketplace', label: 'Маркетплейс', icon: Store },
  { href: '/access', label: 'Карты и пропуска', icon: CreditCard },
  { href: '/journal', label: 'Личный дневник', icon: PenTool },
  { href: '/ecosystem', label: 'Экосистема', icon: Book },
  { href: '/dao', label: 'DAO / Токены', icon: Wallet },
]

const healthItems = [
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
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check authentication status
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(!!data?.user?.id)
      })
      .catch(() => setIsAuthenticated(false))
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-warmGraphite-900/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-80 neumorphic-surface z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-warmGray-300/50">
            <h2 className="text-lg font-semibold text-warmGraphite-800">Меню</h2>
            <button
              onClick={onClose}
              className="neumorphic-button p-2 rounded-neumorphic-sm text-warmGraphite-600"
              aria-label="Закрыть меню"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Auth Section */}
          {!isAuthenticated && (
            <div className="p-4 border-b border-warmGray-300/50">
              <Link
                href="/login"
                onClick={onClose}
                className={cn(
                  'neumorphic-button-primary flex items-center gap-3 px-4 py-3 rounded-neumorphic text-sm font-medium',
                  'text-white'
                )}
              >
                <LogIn className="w-5 h-5" />
                Войти / Регистрация
              </Link>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <div className="mb-4">
              <div className="text-xs font-semibold text-warmGray-600 uppercase tracking-wider mb-2 px-2">
                Экосистема
              </div>
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-neumorphic-sm text-sm font-medium transition-all',
                      isActive
                        ? 'neumorphic-card-pressed text-warmBlue-600'
                        : 'text-warmGraphite-700 hover:neumorphic-card-soft'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <div className="mt-6 mb-4">
              <div className="text-xs font-semibold text-warmGray-600 uppercase tracking-wider mb-2 px-2">
                Мое здоровье
              </div>
              {healthItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-neumorphic-sm text-sm font-medium transition-all',
                      isActive
                        ? 'neumorphic-card-pressed text-warmBlue-600'
                        : 'text-warmGraphite-700 hover:neumorphic-card-soft'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      </aside>
    </>
  )
}
