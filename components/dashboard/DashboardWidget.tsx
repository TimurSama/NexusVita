'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import { cn } from '@/lib/utils/cn'

interface DashboardWidgetProps {
  title: string
  icon?: ReactNode
  children: ReactNode
  className?: string
  onAction?: () => void
  actionLabel?: string
}

export default function DashboardWidget({
  title,
  icon,
  children,
  className,
  onAction,
  actionLabel,
}: DashboardWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NeumorphicCard className={cn('p-4 sm:p-6 h-full', className)}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {icon && <div className="text-warmBlue-500">{icon}</div>}
            <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
              {title}
            </h3>
          </div>
          {onAction && actionLabel && (
            <button
              onClick={onAction}
              className="text-xs sm:text-sm text-warmBlue-600 hover:text-warmBlue-700 font-medium"
            >
              {actionLabel}
            </button>
          )}
        </div>
        {children}
      </NeumorphicCard>
    </motion.div>
  )
}
