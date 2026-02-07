'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils/cn'

interface NeumorphicBadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const variants = {
  default: 'bg-warmGray-200 text-warmGraphite-700',
  success: 'bg-warmGreen-100 text-warmGreen-700',
  error: 'bg-warmRed-100 text-warmRed-700',
  warning: 'bg-warmPink-100 text-warmPink-700',
  info: 'bg-warmBlue-100 text-warmBlue-700',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
}

export default function NeumorphicBadge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: NeumorphicBadgeProps) {
  return (
    <span
      className={cn(
        'neumorphic-card-soft inline-flex items-center rounded-neumorphic-sm font-medium',
        variants[variant],
        sizes[size],
        'animate-scaleIn',
        className
      )}
    >
      {children}
    </span>
  )
}
