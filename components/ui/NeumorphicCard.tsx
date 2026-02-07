'use client'

import { cn } from '@/lib/utils/cn'
import { ReactNode, CSSProperties } from 'react'

interface NeumorphicCardProps {
  children: ReactNode
  className?: string
  pressed?: boolean
  soft?: boolean
  onClick?: () => void
  style?: CSSProperties
}

export default function NeumorphicCard({
  children,
  className,
  pressed = false,
  soft = false,
  onClick,
  style,
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
      style={style}
    >
      {children}
    </div>
  )
}
