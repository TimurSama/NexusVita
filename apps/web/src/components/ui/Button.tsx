'use client';

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-medium transition-all duration-200
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      whitespace-nowrap select-none
    `;

    const variants = {
      primary: `
        bg-gradient-to-r from-violet-600 to-purple-600
        text-white shadow-md shadow-violet-500/25
        hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5
        focus-visible:ring-violet-500
        active:translate-y-0
      `,
      secondary: `
        bg-[var(--bg-tertiary)] text-[var(--text-primary)]
        border border-[var(--border-default)]
        hover:bg-[var(--bg-elevated)] hover:border-[var(--border-strong)]
        focus-visible:ring-[var(--border-strong)]
      `,
      ghost: `
        bg-transparent text-[var(--text-secondary)]
        hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]
        focus-visible:ring-[var(--border-default)]
      `,
      accent: `
        bg-gradient-to-r from-cyan-500 to-teal-500
        text-white shadow-md shadow-cyan-500/25
        hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5
        focus-visible:ring-cyan-500
        active:translate-y-0
      `,
      danger: `
        bg-gradient-to-r from-red-500 to-rose-500
        text-white shadow-md shadow-red-500/25
        hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5
        focus-visible:ring-red-500
        active:translate-y-0
      `,
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-lg',
      md: 'px-4 py-2 text-sm rounded-xl',
      lg: 'px-6 py-3 text-base rounded-xl',
    };

    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Загрузка...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };

