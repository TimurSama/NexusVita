'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import NeumorphicButton from './NeumorphicButton'
import { cn } from '@/lib/utils/cn'

interface NeumorphicCarouselProps {
  items: React.ReactNode[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showDots?: boolean
  showArrows?: boolean
  className?: string
}

export default function NeumorphicCarousel({
  items,
  autoPlay = false,
  autoPlayInterval = 3000,
  showDots = true,
  showArrows = true,
  className,
}: NeumorphicCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, items.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (items.length === 0) return null

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative overflow-hidden rounded-neumorphic">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>

        {showArrows && items.length > 1 && (
          <>
            <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10">
              <NeumorphicButton onClick={goToPrevious} className="p-2">
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </NeumorphicButton>
            </div>
            <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10">
              <NeumorphicButton onClick={goToNext} className="p-2">
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </NeumorphicButton>
            </div>
          </>
        )}
      </div>

      {showDots && items.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                index === currentIndex
                  ? 'bg-warmBlue-500 w-6'
                  : 'bg-warmGray-300 hover:bg-warmGray-400'
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
