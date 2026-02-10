'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface WheelOption {
  id: string
  label: string
  value: any
  color?: string
}

interface NeumorphicWheelProps {
  options: WheelOption[]
  value?: string
  onChange?: (value: any) => void
  size?: number
  className?: string
}

export default function NeumorphicWheel({
  options,
  value,
  onChange,
  size = 200,
  className,
}: NeumorphicWheelProps) {
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startAngle, setStartAngle] = useState(0)
  const wheelRef = useRef<HTMLDivElement>(null)

  const anglePerOption = 360 / options.length
  const selectedIndex = value
    ? options.findIndex((opt) => opt.id === value)
    : 0

  useEffect(() => {
    if (!isDragging) {
      const targetRotation = -selectedIndex * anglePerOption
      setRotation(targetRotation)
    }
  }, [selectedIndex, anglePerOption, isDragging])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    if (wheelRef.current) {
      const rect = wheelRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI)
      setStartAngle(angle - rotation)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !wheelRef.current) return

    const rect = wheelRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI)
    const newRotation = angle - startAngle

    setRotation(newRotation)
  }

  const handleMouseUp = () => {
    if (!isDragging) return

    setIsDragging(false)
    const normalizedRotation = ((rotation % 360) + 360) % 360
    const selectedIndex = Math.round(normalizedRotation / anglePerOption) % options.length
    const selectedOption = options[selectedIndex]

    onChange?.(selectedOption.value)
  }

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        if (wheelRef.current) {
          const rect = wheelRef.current.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI)
          const newRotation = angle - startAngle
          setRotation(newRotation)
        }
      }

      const handleGlobalMouseUp = () => {
        setIsDragging(false)
        const normalizedRotation = ((rotation % 360) + 360) % 360
        const selectedIndex = Math.round(normalizedRotation / anglePerOption) % options.length
        const selectedOption = options[selectedIndex]
        onChange?.(selectedOption.value)
      }

      window.addEventListener('mousemove', handleGlobalMouseMove)
      window.addEventListener('mouseup', handleGlobalMouseUp)

      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove)
        window.removeEventListener('mouseup', handleGlobalMouseUp)
      }
    }
  }, [isDragging, startAngle, rotation, anglePerOption, options, onChange])

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div
        ref={wheelRef}
        className="relative neumorphic-card rounded-full cursor-grab active:cursor-grabbing"
        style={{ width: size, height: size }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotate: rotation }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {options.map((option, index) => {
            const angle = (index * anglePerOption - 90) * (Math.PI / 180)
            const radius = size / 2 - 20
            const x = size / 2 + radius * Math.cos(angle) - 15
            const y = size / 2 + radius * Math.sin(angle) - 10

            return (
              <div
                key={option.id}
                className="absolute text-xs sm:text-sm font-medium text-warmGraphite-700"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: `rotate(${index * anglePerOption}deg)`,
                }}
              >
                {option.label}
              </div>
            )
          })}
        </motion.div>

        {/* Центральный индикатор */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-warmBlue-500" />
      </div>

      {value && (
        <div className="text-center">
          <div className="text-sm sm:text-base font-semibold text-warmGraphite-800">
            {options.find((opt) => opt.id === value)?.label}
          </div>
        </div>
      )}
    </div>
  )
}
