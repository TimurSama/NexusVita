'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import { cn } from '@/lib/utils/cn'

interface MetricLabelProps {
  label: string
  value: string | number
  unit?: string
  link: string
  position: { x: number; y: number }
  delay?: number
}

export default function MetricLabel({
  label,
  value,
  unit,
  link,
  position,
  delay = 0,
}: MetricLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className="absolute z-20"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Link href={link}>
        <NeumorphicCard
          soft
          className={cn(
            'p-2 sm:p-3 min-w-[120px] sm:min-w-[140px]',
            'hover:scale-110 transition-all duration-300',
            'group cursor-pointer'
          )}
        >
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <div className="text-xs text-warmGray-600 uppercase tracking-wide font-semibold">
                {label}
              </div>
              <div className="text-sm sm:text-base font-bold text-warmGraphite-800 mt-0.5">
                {value}{' '}
                {unit && (
                  <span className="text-xs font-normal text-warmGray-600">
                    {unit}
                  </span>
                )}
              </div>
            </div>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-warmBlue-600 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </div>
        </NeumorphicCard>
      </Link>
    </motion.div>
  )
}


