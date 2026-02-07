'use client'

import { cn } from '@/lib/utils/cn'
import { neumorphicButton } from '@/lib/utils/neumorphic'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface NeumorphicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  primary?: boolean
  className?: string
}

export default function NeumorphicButton({
  children,
  primary = false,
  className,
  ...props
}: NeumorphicButtonProps) {
  return (
    <button
      className={cn(
        neumorphicButton(primary),
        'px-6 py-3 text-sm font-medium',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
