'use client'

import { cn } from '@/lib/utils/cn'

interface NeumorphicSkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card'
  width?: string | number
  height?: string | number
  className?: string
  lines?: number
}

export default function NeumorphicSkeleton({
  variant = 'rectangular',
  width,
  height,
  className,
  lines,
}: NeumorphicSkeletonProps) {
  if (variant === 'text' && lines) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'neumorphic-card-soft rounded-neumorphic-sm',
              'animate-pulse bg-warmGray-200',
              i === lines - 1 ? 'w-3/4' : 'w-full'
            )}
            style={{ height: height || '1rem' }}
          />
        ))}
      </div>
    )
  }

  const baseClasses = cn(
    'neumorphic-card-soft rounded-neumorphic-sm',
    'animate-pulse bg-warmGray-200',
    className
  )

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  if (variant === 'circular') {
    return (
      <div
        className={cn(baseClasses, 'rounded-full')}
        style={style}
      />
    )
  }

  if (variant === 'card') {
    return (
      <div className={cn('neumorphic-card p-4 sm:p-6', className)}>
        <div className={cn(baseClasses, 'h-6 w-3/4 mb-4')} />
        <div className={cn(baseClasses, 'h-4 w-full mb-2')} />
        <div className={cn(baseClasses, 'h-4 w-5/6')} />
      </div>
    )
  }

  return (
    <div
      className={baseClasses}
      style={style}
    />
  )
}
