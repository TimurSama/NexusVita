'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface NeumorphicProgressProps {
  value: number
  max?: number
  showLabel?: boolean
  label?: string
  color?: 'blue' | 'green' | 'red' | 'pink'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const colors = {
  blue: 'bg-warmBlue-500',
  green: 'bg-warmGreen-500',
  red: 'bg-warmRed-500',
  pink: 'bg-warmPink-500',
}

const sizes = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
}

export default function NeumorphicProgress({
  value,
  max = 100,
  showLabel = true,
  label,
  color = 'blue',
  size = 'md',
  className,
}: NeumorphicProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  // Ensure value and max are valid numbers
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0
  const safeMax = typeof max === 'number' && !isNaN(max) && max > 0 ? max : 100
  const percentage = Math.min(Math.max((safeValue / safeMax) * 100, 0), 100)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(percentage)
    }, 100)
    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-warmGraphite-700">
            {label || `${Math.round(safeValue)}%`}
          </span>
          {showLabel && (
            <span className="text-sm text-warmGray-600">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className="neumorphic-card-pressed rounded-neumorphic overflow-hidden">
        <div
          className={cn(
            'neumorphic-card-soft h-full rounded-neumorphic transition-all duration-500 ease-out',
            colors[color],
            sizes[size]
          )}
          style={{ width: `${animatedValue}%` }}
        />
      </div>
    </div>
  )
}
