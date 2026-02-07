'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface NeumorphicInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const NeumorphicInput = forwardRef<HTMLInputElement, NeumorphicInputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-warmGraphite-700 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'neumorphic-input w-full',
            error && 'ring-2 ring-warmRed-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-warmRed-600 animate-shake">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-warmGray-600">{helperText}</p>
        )}
      </div>
    )
  }
)

NeumorphicInput.displayName = 'NeumorphicInput'

export default NeumorphicInput
