'use client'

import { useState } from 'react'
import { useDemo } from '@/contexts/DemoContext'
import { useRouter } from 'next/navigation'

interface Role {
  id: string
  name: string
  icon: string
  description: string
}

const roles: Role[] = [
  {
    id: 'guest',
    name: 'Гость',
    icon: '👤',
    description: 'Просмотр публичного контента',
  },
  {
    id: 'user',
    name: 'Пользователь',
    icon: '🏃',
    description: 'Полный функционал клиента',
  },
  {
    id: 'trainer',
    name: 'Тренер',
    icon: '💪',
    description: 'Управление страницей и контентом',
  },
  {
    id: 'location_manager',
    name: 'Менеджер локации',
    icon: '🏢',
    description: 'Управление залом',
  },
  {
    id: 'admin',
    name: 'Администратор',
    icon: '⚙️',
    description: 'Полный доступ к системе',
  },
]

export default function RoleSwitcher() {
  const { isDemoMode, currentDemoRole, startDemo, stopDemo } = useDemo()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleRoleSelect = (roleId: string) => {
    startDemo(roleId)
    setIsOpen(false)
    router.push('/')
  }

  const currentRole = roles.find((r) => r.id === currentDemoRole) || roles[0]

  if (!isDemoMode) {
    return (
      <button
        onClick={() => {
          startDemo('user')
          router.push('/')
        }}
        className="button-secondary text-sm px-3 py-1"
      >
        🎭 Демо-режим
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 button-secondary text-sm px-3 py-1"
      >
        <span>{currentRole.icon}</span>
        <span className="hidden md:inline">{currentRole.name}</span>
        <span className="text-xs">▼</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 card z-50 sketch-border">
            <div className="space-y-2">
              <div className="text-xs font-bold text-ink-600 mb-2 px-2">
                Переключить роль:
              </div>
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                    currentDemoRole === role.id
                      ? 'bg-accent-turquoise text-white'
                      : 'hover:bg-ink-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{role.icon}</span>
                    <div>
                      <div className="font-medium">{role.name}</div>
                      <div className="text-xs opacity-80">{role.description}</div>
                    </div>
                  </div>
                </button>
              ))}
              <div className="border-t border-ink-200 mt-2 pt-2">
                <button
                  onClick={() => {
                    stopDemo()
                    setIsOpen(false)
                    router.push('/')
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600"
                >
                  Выйти из демо
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

