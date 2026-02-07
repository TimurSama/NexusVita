'use client'

import { cn } from '@/lib/utils/cn'
import { neumorphicCard } from '@/lib/utils/neumorphic'
import { ReactNode } from 'react'

interface NeumorphicCardProps {
  children: ReactNode
  className?: string
  pressed?: boolean
  soft?: boolean
  onClick?: () => void
}

export default function NeumorphicCard({
  children,
  className,
  pressed = false,
  soft = false,
  onClick,
}: NeumorphicCardProps) {
  return (
    <div
      className={cn(
        pressed
          ? 'neumorphic-card-pressed'
          : soft
            ? 'neumorphic-card-soft'
            : 'neumorphic-card',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
