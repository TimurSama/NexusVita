'use client'

import { useState } from 'react'
import Link from 'next/link'

interface TrainerSidebarProps {
  trainerId: string
}

export default function TrainerSidebar({ trainerId }: TrainerSidebarProps) {
  const [currentMonth] = useState(new Date().getMonth())
  const [currentYear] = useState(new Date().getFullYear())

  // Моковые данные календаря
  const calendarDays = [
    { day: 1, hasWorkout: true, hasOther: false },
    { day: 2, hasWorkout: false, hasOther: true },
    { day: 3, hasWorkout: true, hasOther: false },
    { day: 4, hasWorkout: false, hasOther: true },
    { day: 5, hasWorkout: true, hasOther: false },
    { day: 6, hasWorkout: false, hasOther: true },
    { day: 7, hasWorkout: false, hasOther: false, isSunday: true },
    // ... остальные дни
  ]

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ]

  return (
    <div className="space-y-4">
      {/* Календарь */}
      <div className="card">
        <h3 className="font-bold mb-3">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <div className="grid grid-cols-7 gap-1 text-xs">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
            <div key={day} className="text-center font-bold text-ink-600 py-1">
              {day}
            </div>
          ))}
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
            const dayData = calendarDays.find((d) => d.day === day)
            return (
              <div
                key={day}
                className={`text-center p-1 rounded ${
                  dayData?.isSunday
                    ? 'bg-red-100 text-red-700'
                    : dayData?.hasWorkout
                    ? 'bg-accent-turquoise text-white'
                    : dayData?.hasOther
                    ? 'bg-ink-200'
                    : ''
                }`}
              >
                {day}
              </div>
            )
          })}
        </div>
      </div>

      {/* Кнопки контент-страниц */}
      <div className="card">
        <h3 className="font-bold mb-3">Контент</h3>
        <div className="space-y-2">
          <Link href={`/trainers/${trainerId}/videos`} className="button-secondary w-full text-left">
            📹 Видео
          </Link>
          <Link href={`/trainers/${trainerId}/achievements`} className="button-secondary w-full text-left">
            🏆 Награды
          </Link>
          <Link href={`/trainers/${trainerId}/shop`} className="button-secondary w-full text-left">
            🛒 Магазин
          </Link>
          <Link href={`/trainers/${trainerId}/programs`} className="button-secondary w-full text-left">
            📋 Программы
          </Link>
        </div>
      </div>
    </div>
  )
}

