'use client'

import { TextareaHTMLAttributes, forwardRef, useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface NeumorphicTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  maxLength?: number
  showCounter?: boolean
}

const NeumorphicTextarea = forwardRef<
  HTMLTextAreaElement,
  NeumorphicTextareaProps
>(
  (
    { label, error, helperText, maxLength, showCounter, className, ...props },
    ref
  ) => {
    const [charCount, setCharCount] = useState(
      props.value?.toString().length || 0
    )

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-warmGraphite-700 mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'neumorphic-input w-full resize-none',
            error && 'ring-2 ring-warmRed-500',
            className
          )}
          maxLength={maxLength}
          onChange={(e) => {
            setCharCount(e.target.value.length)
            props.onChange?.(e)
          }}
          {...props}
        />
        <div className="flex items-center justify-between mt-1">
          {error && (
            <p className="text-sm text-warmRed-600 animate-shake">{error}</p>
          )}
          {helperText && !error && (
            <p className="text-sm text-warmGray-600">{helperText}</p>
          )}
          {showCounter && maxLength && (
            <p
              className={cn(
                'text-xs ml-auto',
                charCount >= maxLength
                  ? 'text-warmRed-600'
                  : 'text-warmGray-500'
              )}
            >
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  }
)

NeumorphicTextarea.displayName = 'NeumorphicTextarea'

export default NeumorphicTextarea
