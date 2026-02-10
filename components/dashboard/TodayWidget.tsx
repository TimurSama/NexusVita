'use client'

import { Calendar, Clock, CheckCircle } from 'lucide-react'
import DashboardWidget from './DashboardWidget'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { cn } from '@/lib/utils/cn'
import Link from 'next/link'

interface TodayTask {
  id: string
  title: string
  time: string
  type: 'training' | 'nutrition' | 'consultation' | 'other'
  completed: boolean
  link: string
}

interface TodayWidgetProps {
  tasks?: TodayTask[]
}

const typeColors = {
  training: 'bg-warmRed-500',
  nutrition: 'bg-warmGreen-500',
  consultation: 'bg-warmBlue-500',
  other: 'bg-warmGray-500',
}

export default function TodayWidget({ tasks = [] }: TodayWidgetProps) {
  const mockTasks: TodayTask[] = tasks.length > 0 ? tasks : [
    { id: '1', title: 'Силовая тренировка', time: '18:00', type: 'training', completed: false, link: '/training' },
    { id: '2', title: 'Ужин с высоким содержанием белка', time: '19:30', type: 'nutrition', completed: false, link: '/nutrition' },
    { id: '3', title: 'Дыхательная практика', time: '20:00', type: 'other', completed: false, link: '/journal' },
  ]

  const completedCount = mockTasks.filter((t) => t.completed).length
  const totalCount = mockTasks.length

  return (
    <DashboardWidget
      title="Сегодня"
      icon={<Calendar className="w-5 h-5" />}
      actionLabel="Все задачи"
      onAction={() => {}}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-warmGraphite-600">
            Выполнено: {completedCount} из {totalCount}
          </div>
          <NeumorphicBadge variant="info" size="sm">
            {Math.round((completedCount / totalCount) * 100)}%
          </NeumorphicBadge>
        </div>
        {mockTasks.map((task) => (
          <Link key={task.id} href={task.link}>
            <NeumorphicCard
              soft
              className={cn(
                'p-3 flex items-center gap-3 hover:scale-[1.01] transition-transform',
                task.completed && 'opacity-60'
              )}
            >
              <div className={cn('w-2 h-2 rounded-full', typeColors[task.type])} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {task.completed ? (
                    <CheckCircle className="w-4 h-4 text-warmGreen-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-warmGray-400" />
                  )}
                  <span className={cn(
                    'text-sm font-medium',
                    task.completed ? 'text-warmGraphite-500 line-through' : 'text-warmGraphite-800'
                  )}>
                    {task.title}
                  </span>
                </div>
                <div className="text-xs text-warmGray-600 mt-1 ml-6">
                  {task.time}
                </div>
              </div>
            </NeumorphicCard>
          </Link>
        ))}
      </div>
    </DashboardWidget>
  )
}
