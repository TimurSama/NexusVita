'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicProgress from '@/components/ui/NeumorphicProgress'
import { cn } from '@/lib/utils/cn'

interface InfographicCardProps {
  icon: LucideIcon
  title: string
  value: string | number
  subtitle?: string
  progress?: number
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'pink'
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  className?: string
  delay?: number
}

export default function InfographicCard({
  icon: Icon,
  title,
  value,
  subtitle,
  progress,
  color = 'blue',
  trend,
  trendValue,
  className,
  delay = 0,
}: InfographicCardProps) {
  const colorClasses = {
    blue: 'text-warmBlue-500',
    green: 'text-warmGreen-500',
    orange: 'text-warmOrange-500',
    purple: 'text-warmPurple-500',
    pink: 'text-warmPink-500',
  }

  const progressColors = {
    blue: 'blue' as const,
    green: 'green' as const,
    orange: 'orange' as const,
    purple: 'purple' as const,
    pink: 'pink' as const,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <NeumorphicCard className={cn('p-4 sm:p-6 h-full', className)}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={cn('p-2 sm:p-3 rounded-2xl bg-warmBeige-50', colorClasses[color])}>
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-warmGraphite-800">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-warmGraphite-600 mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          {trend && trendValue && (
            <div
              className={cn(
                'text-xs font-medium px-2 py-1 rounded-lg',
                trend === 'up'
                  ? 'bg-warmGreen-50 text-warmGreen-700'
                  : trend === 'down'
                    ? 'bg-warmRed-50 text-warmRed-700'
                    : 'bg-warmGray-100 text-warmGraphite-700'
              )}
            >
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
            </div>
          )}
        </div>

        <div className="mb-3">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-warmGraphite-800 mb-1">
            {value}
          </div>
        </div>

        {progress !== undefined && (
          <div className="mt-3">
            <NeumorphicProgress
              value={progress}
              color={progressColors[color]}
              showLabel
              size="sm"
            />
          </div>
        )}
      </NeumorphicCard>
    </motion.div>
  )
}
