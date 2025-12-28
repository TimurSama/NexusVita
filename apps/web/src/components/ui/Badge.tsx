'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, className, variant = 'default', size = 'md', dot = false, ...props }, ref) => {
    const variants = {
      default: 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]',
      primary: 'bg-violet-500/20 text-violet-400',
      secondary: 'bg-cyan-500/20 text-cyan-400',
      success: 'bg-green-500/20 text-green-400',
      warning: 'bg-amber-500/20 text-amber-400',
      danger: 'bg-red-500/20 text-red-400',
      info: 'bg-blue-500/20 text-blue-400',
    };

    const dotColors = {
      default: 'bg-[var(--text-secondary)]',
      primary: 'bg-violet-400',
      secondary: 'bg-cyan-400',
      success: 'bg-green-400',
      warning: 'bg-amber-400',
      danger: 'bg-red-400',
      info: 'bg-blue-400',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-xs',
      lg: 'px-3 py-1.5 text-sm',
    };

    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center gap-1.5 font-medium rounded-full',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span className={clsx('w-1.5 h-1.5 rounded-full', dotColors[variant])} />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };


