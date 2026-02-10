'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface TimelineItem {
  id: string
  title: string
  description?: string
  date?: string
  icon?: React.ReactNode
  status?: 'completed' | 'active' | 'pending'
  color?: string
}

interface NeumorphicTimelineProps {
  items: TimelineItem[]
  orientation?: 'vertical' | 'horizontal'
  className?: string
}

export default function NeumorphicTimeline({
  items,
  orientation = 'vertical',
  className,
}: NeumorphicTimelineProps) {
  const statusColors = {
    completed: 'bg-warmGreen-500',
    active: 'bg-warmBlue-500',
    pending: 'bg-warmGray-400',
  }

  if (orientation === 'horizontal') {
    return (
      <div className={cn('flex items-center gap-4 sm:gap-6 overflow-x-auto pb-4', className)}>
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'w-10 h-10 sm:w-12 sm:h-12 rounded-full neumorphic-card',
                  'flex items-center justify-center',
                  statusColors[item.status || 'pending']
                )}
              >
                {item.icon || (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white" />
                )}
              </motion.div>
              <div className="mt-2 text-center max-w-[120px] sm:max-w-[150px]">
                <div className="text-xs sm:text-sm font-semibold text-warmGraphite-800">
                  {item.title}
                </div>
                {item.date && (
                  <div className="text-[10px] sm:text-xs text-warmGraphite-600 mt-1">
                    {item.date}
                  </div>
                )}
              </div>
            </div>
            {index < items.length - 1 && (
              <div className="w-8 sm:w-12 h-0.5 bg-warmGray-300 mx-2" />
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn('relative', className)}>
      <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-warmGray-300" />
      <div className="space-y-6 sm:space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex gap-4 sm:gap-6"
          >
            <div
              className={cn(
                'relative z-10 w-8 h-8 sm:w-12 sm:h-12 rounded-full neumorphic-card',
                'flex items-center justify-center flex-shrink-0',
                statusColors[item.status || 'pending']
              )}
            >
              {item.icon || (
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white" />
              )}
            </div>
            <div className="flex-1 pb-6 sm:pb-8">
              <div className="neumorphic-card p-3 sm:p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm sm:text-base font-semibold text-warmGraphite-800">
                    {item.title}
                  </h3>
                  {item.date && (
                    <span className="text-xs text-warmGraphite-600 whitespace-nowrap">
                      {item.date}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-xs sm:text-sm text-warmGraphite-600">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
