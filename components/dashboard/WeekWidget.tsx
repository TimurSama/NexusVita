'use client'

import { CalendarDays } from 'lucide-react'
import DashboardWidget from './DashboardWidget'
import NeumorphicCalendar from '@/components/ui/NeumorphicCalendar'
import { generateMockEvents } from '@/lib/mocks/data-generators'

export default function WeekWidget() {
  const events = generateMockEvents(10)

  return (
    <DashboardWidget
      title="Неделя"
      icon={<CalendarDays className="w-5 h-5" />}
    >
      <NeumorphicCalendar
        events={events.map((e) => ({
          id: e.id,
          date: e.date,
          title: e.title,
          type: e.type,
        }))}
        view="month"
        className="!p-0"
      />
    </DashboardWidget>
  )
}
