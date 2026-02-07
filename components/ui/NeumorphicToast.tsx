'use client'

import { ReactNode, useEffect, useState } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  id: string
  type: ToastType
  message: string
  duration?: number
  onClose: (id: string) => void
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const colors = {
  success: 'text-warmGreen-600',
  error: 'text-warmRed-600',
  warning: 'text-warmPink-500',
  info: 'text-warmBlue-600',
}

export default function NeumorphicToast({
  id,
  type,
  message,
  duration = 5000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onClose(id), 300)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, id, onClose])

  const Icon = icons[type]

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'neumorphic-card p-4 flex items-center gap-3 min-w-[300px] max-w-md animate-slideIn',
        'shadow-lg'
      )}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0', colors[type])} />
      <p className="flex-1 text-sm text-warmGraphite-800">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(() => onClose(id), 300)
        }}
        className="p-1 rounded-lg hover:bg-warmGray-200/50 transition-colors"
        aria-label="Закрыть"
      >
        <X className="w-4 h-4 text-warmGraphite-600" />
      </button>
    </div>
  )
}

// Toast Container
interface ToastContainerProps {
  toasts: Array<{
    id: string
    type: ToastType
    message: string
    duration?: number
  }>
  onClose: (id: string) => void
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <NeumorphicToast
          key={toast.id}
          {...toast}
          onClose={onClose}
        />
      ))}
    </div>
  )
}

// Toast Hook
export function useToast() {
  const [toasts, setToasts] = useState<
    Array<{ id: string; type: ToastType; message: string; duration?: number }>
  >([])

  const showToast = (
    type: ToastType,
    message: string,
    duration?: number
  ) => {
    const id = Date.now().toString()
    setToasts((prev) => [...prev, { id, type, message, duration }])
  }

  const closeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return {
    toasts,
    showToast,
    closeToast,
    success: (message: string, duration?: number) =>
      showToast('success', message, duration),
    error: (message: string, duration?: number) =>
      showToast('error', message, duration),
    warning: (message: string, duration?: number) =>
      showToast('warning', message, duration),
    info: (message: string, duration?: number) =>
      showToast('info', message, duration),
  }
}
