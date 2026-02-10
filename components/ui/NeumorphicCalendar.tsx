'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import NeumorphicButton from './NeumorphicButton'
import { cn } from '@/lib/utils/cn'

interface CalendarEvent {
  id: string
  date: Date
  title: string
  type: 'consultation' | 'training' | 'nutrition' | 'analysis' | 'personal' | 'reminder'
  color?: string
}

interface NeumorphicCalendarProps {
  events?: CalendarEvent[]
  onDateClick?: (date: Date) => void
  onEventClick?: (event: CalendarEvent) => void
  view?: 'month' | 'week' | 'day'
  className?: string
}

const typeColors = {
  consultation: 'bg-warmBlue-500',
  training: 'bg-warmRed-500',
  nutrition: 'bg-warmGreen-500',
  analysis: 'bg-warmPurple-500',
  personal: 'bg-warmGray-500',
  reminder: 'bg-warmOrange-500',
}

export default function NeumorphicCalendar({
  events = [],
  onDateClick,
  onEventClick,
  view = 'month',
  className,
}: NeumorphicCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const month = currentDate.getMonth()
  const year = currentDate.getFullYear()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay()

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
  ]

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(new Date())
  }

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (date: Date) => {
    if (!selectedDate) return false
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    onDateClick?.(date)
  }

  const renderMonthView = () => {
    const days: (Date | null)[] = []

    // Пустые ячейки до первого дня месяца
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return (
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs sm:text-sm font-semibold text-warmGraphite-600 p-2"
          >
            {day}
          </div>
        ))}
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square" />
          }

          const dayEvents = getEventsForDate(date)
          const today = isToday(date)
          const selected = isSelected(date)

          return (
            <motion.button
              key={date.toISOString()}
              onClick={() => handleDateClick(date)}
              className={cn(
                'aspect-square neumorphic-card-soft rounded-neumorphic-sm p-1 sm:p-2',
                'flex flex-col items-center justify-start',
                'hover:scale-105 transition-transform',
                today && 'ring-2 ring-warmBlue-500',
                selected && 'ring-2 ring-warmGreen-500'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span
                className={cn(
                  'text-xs sm:text-sm font-medium',
                  today ? 'text-warmBlue-600 font-bold' : 'text-warmGraphite-700'
                )}
              >
                {date.getDate()}
              </span>
              {dayEvents.length > 0 && (
                <div className="flex flex-wrap gap-0.5 mt-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        typeColors[event.type] || event.color || 'bg-warmBlue-500'
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        onEventClick?.(event)
                      }}
                    />
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="text-[8px] text-warmGraphite-500">
                      +{dayEvents.length - 3}
                    </span>
                  )}
                </div>
              )}
            </motion.button>
          )
        })}
      </div>
    )
  }

  return (
    <div className={cn('neumorphic-card p-4 sm:p-6', className)}>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
          {monthNames[month]} {year}
        </h3>
        <div className="flex items-center gap-2">
          <NeumorphicButton onClick={goToPreviousMonth} className="p-2">
            <ChevronLeft className="w-4 h-4" />
          </NeumorphicButton>
          <NeumorphicButton onClick={goToToday} className="px-3 py-1 text-xs sm:text-sm">
            Сегодня
          </NeumorphicButton>
          <NeumorphicButton onClick={goToNextMonth} className="p-2">
            <ChevronRight className="w-4 h-4" />
          </NeumorphicButton>
        </div>
      </div>
      {view === 'month' && renderMonthView()}
    </div>
  )
}
