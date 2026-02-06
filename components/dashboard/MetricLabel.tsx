'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

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
      transition={{ delay, duration: 0.5 }}
      className="absolute metric-label"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Link href={link} className="flex items-center gap-2 group">
        <div>
          <div className="text-xs text-ink-500 uppercase tracking-wide">
            {label}
          </div>
          <div className="text-lg font-bold text-ink-800">
            {value} {unit && <span className="text-sm font-normal">{unit}</span>}
          </div>
        </div>
        <ArrowRight 
          className="w-4 h-4 text-ink-500 group-hover:translate-x-1 transition-transform" 
        />
      </Link>
    </motion.div>
  )
}


