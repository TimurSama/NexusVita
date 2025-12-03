'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

export default function HomeWidgets() {
  const { user } = useAuth()

  // Моковые данные для демонстрации
  const goals = [
    { name: 'Вес', current: 75, target: 70, unit: 'кг' },
    { name: 'Жир', current: 20, target: 15, unit: '%' },
    { name: 'Сила', current: 60, target: 80, unit: '%' },
  ]

  const weeklySchedule = [
    { day: 'ПН', type: 'зал', count: 1 },
    { day: 'ВТ', type: 'бассейн', count: 1 },
    { day: 'СР', type: 'зал', count: 1 },
    { day: 'ЧТ', type: 'баня', count: 1 },
    { day: 'ПТ', type: 'зал', count: 1 },
    { day: 'СБ', type: 'SPA', count: 1 },
    { day: 'ВС', type: 'отдых', count: 0 },
  ]

  return (
    <div className="space-y-4">
      {/* Виджет: ФИО и базовые данные */}
      <div className="card">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-accent-turquoise flex items-center justify-center text-white font-bold text-lg">
            {user?.firstName[0]}
          </div>
          <div>
            <div className="font-bold">{user?.firstName} {user?.lastName}</div>
            <div className="text-sm text-ink-600">Возраст: 28 лет</div>
            <div className="text-sm text-ink-600">Рост: 180 см</div>
            <div className="text-sm text-ink-600">Вес: 75 кг</div>
          </div>
        </div>
        <Link href="/settings/profile" className="text-sm text-accent-turquoise hover:underline">
          Редактировать профиль →
        </Link>
      </div>

      {/* Виджет: Шкала целей */}
      <div className="card">
        <h3 className="font-bold mb-3">Цели</h3>
        <div className="space-y-3">
          {goals.map((goal) => {
            const progress = ((goal.current / goal.target) * 100).toFixed(0)
            return (
              <div key={goal.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{goal.name}</span>
                  <span>
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                </div>
                <div className="w-full bg-ink-200 rounded-full h-2">
                  <div
                    className="bg-accent-turquoise h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(100, parseInt(progress))}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <Link href="/goals" className="text-sm text-accent-turquoise hover:underline mt-3 block">
          Детальная аналитика →
        </Link>
      </div>

      {/* Виджет: Недельный календарь */}
      <div className="card">
        <h3 className="font-bold mb-3">Неделя</h3>
        <div className="grid grid-cols-7 gap-1">
          {weeklySchedule.map((day) => (
            <div
              key={day.day}
              className={`text-center p-2 rounded ${
                day.count > 0
                  ? 'bg-accent-turquoise text-white'
                  : day.day === 'ВС'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-ink-100 text-ink-600'
              }`}
            >
              <div className="text-xs font-bold">{day.day}</div>
              {day.count > 0 && (
                <div className="text-xs mt-1">{day.type}</div>
              )}
            </div>
          ))}
        </div>
        <Link href="/calendar" className="text-sm text-accent-turquoise hover:underline mt-3 block">
          Полный календарь →
        </Link>
      </div>
    </div>
  )
}

