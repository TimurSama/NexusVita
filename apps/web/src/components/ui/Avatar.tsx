'use client';

import { forwardRef, ImgHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  name?: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
}

const getInitials = (name: string): string => {
  const words = name.trim().split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};

const getColorFromName = (name: string): string => {
  const colors = [
    'from-violet-500 to-purple-600',
    'from-cyan-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-pink-500 to-rose-600',
    'from-emerald-500 to-green-600',
    'from-blue-500 to-indigo-600',
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, size = 'md', name, status, ...props }, ref) => {
    const sizes = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base',
      xl: 'w-16 h-16 text-lg',
      '2xl': 'w-24 h-24 text-2xl',
    };

    const statusSizes = {
      xs: 'w-1.5 h-1.5 right-0 bottom-0',
      sm: 'w-2 h-2 right-0 bottom-0',
      md: 'w-2.5 h-2.5 right-0 bottom-0',
      lg: 'w-3 h-3 right-0.5 bottom-0.5',
      xl: 'w-4 h-4 right-0.5 bottom-0.5',
      '2xl': 'w-5 h-5 right-1 bottom-1',
    };

    const statusColors = {
      online: 'bg-green-500',
      offline: 'bg-gray-500',
      busy: 'bg-red-500',
      away: 'bg-amber-500',
    };

    return (
      <div ref={ref} className={clsx('relative inline-block', className)}>
        {src ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className={clsx(
              'rounded-full object-cover ring-2 ring-[var(--bg-primary)]',
              sizes[size]
            )}
            {...props}
          />
        ) : (
          <div
            className={clsx(
              'rounded-full flex items-center justify-center font-semibold text-white',
              'bg-gradient-to-br',
              name ? getColorFromName(name) : 'from-gray-500 to-gray-600',
              sizes[size]
            )}
          >
            {name ? getInitials(name) : '?'}
          </div>
        )}
        
        {status && (
          <span
            className={clsx(
              'absolute rounded-full border-2 border-[var(--bg-primary)]',
              statusSizes[size],
              statusColors[status]
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// Avatar Group
interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: AvatarProps['size'];
  className?: string;
}

const AvatarGroup = ({ children, max = 4, size = 'md', className }: AvatarGroupProps) => {
  const childArray = Array.isArray(children) ? children : [children];
  const visibleAvatars = childArray.slice(0, max);
  const remainingCount = childArray.length - max;

  const overlaps = {
    xs: '-ml-2',
    sm: '-ml-2',
    md: '-ml-3',
    lg: '-ml-4',
    xl: '-ml-5',
    '2xl': '-ml-8',
  };

  return (
    <div className={clsx('flex items-center', className)}>
      {visibleAvatars.map((child, index) => (
        <div
          key={index}
          className={clsx(index > 0 && overlaps[size], 'relative')}
          style={{ zIndex: visibleAvatars.length - index }}
        >
          {child}
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div
          className={clsx(
            overlaps[size],
            'rounded-full flex items-center justify-center',
            'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]',
            'ring-2 ring-[var(--bg-primary)] font-medium',
            {
              xs: 'w-6 h-6 text-xs',
              sm: 'w-8 h-8 text-xs',
              md: 'w-10 h-10 text-sm',
              lg: 'w-12 h-12 text-base',
              xl: 'w-16 h-16 text-lg',
              '2xl': 'w-24 h-24 text-2xl',
            }[size]
          )}
          style={{ zIndex: 0 }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export { Avatar, AvatarGroup };

