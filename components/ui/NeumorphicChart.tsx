'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface ChartDataPoint {
  label: string
  value: number
  color?: string
}

interface NeumorphicChartProps {
  type: 'line' | 'bar' | 'pie' | 'progress'
  data: ChartDataPoint[]
  title?: string
  showLabels?: boolean
  showGrid?: boolean
  height?: number
  className?: string
  animate?: boolean
}

export default function NeumorphicChart({
  type,
  data,
  title,
  showLabels = true,
  showGrid = true,
  height = 200,
  className,
  animate = true,
}: NeumorphicChartProps) {
  const [animatedValues, setAnimatedValues] = useState<number[]>([])

  const maxValue = Math.max(...data.map((d) => d.value), 1)

  useEffect(() => {
    if (animate) {
      setAnimatedValues(data.map(() => 0))
      const timer = setTimeout(() => {
        setAnimatedValues(data.map((d) => d.value))
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setAnimatedValues(data.map((d) => d.value))
    }
  }, [data, animate])

  const renderLineChart = () => {
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1 || 1)) * 100
      const y = 100 - (animatedValues[i] / maxValue) * 100
      return `${x},${y}`
    }).join(' ')

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        {showGrid && (
          <>
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-warmGray-300 opacity-30"
              />
            ))}
          </>
        )}
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-warmBlue-500"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((d, i) => {
          const x = (i / (data.length - 1 || 1)) * 100
          const y = 100 - (animatedValues[i] / maxValue) * 100
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill="currentColor"
              className="text-warmBlue-500"
            />
          )
        })}
      </svg>
    )
  }

  const renderBarChart = () => {
    const barWidth = 100 / data.length

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        {showGrid && (
          <>
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-warmGray-300 opacity-30"
              />
            ))}
          </>
        )}
        {data.map((d, i) => {
          const barHeight = (animatedValues[i] / maxValue) * 100
          const x = (i * barWidth) + (barWidth * 0.1)
          const width = barWidth * 0.8
          const y = 100 - barHeight

          return (
            <motion.rect
              key={i}
              x={x}
              y={y}
              width={width}
              height={barHeight}
              fill="currentColor"
              className={d.color || 'text-warmBlue-500'}
              initial={{ height: 0, y: 100 }}
              animate={{ height: barHeight, y }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            />
          )
        })}
      </svg>
    )
  }

  const renderPieChart = () => {
    let currentAngle = -90
    const total = data.reduce((sum, d) => sum + d.value, 0)

    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-warmGray-200"
        />
        {data.map((d, i) => {
          const percentage = (d.value / total) * 100
          const angle = (percentage / 100) * 360
          const startAngle = currentAngle
          const endAngle = currentAngle + angle

          const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
          const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
          const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
          const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)
          const largeArc = angle > 180 ? 1 : 0

          const pathData = [
            `M 50 50`,
            `L ${x1} ${y1}`,
            `A 40 40 0 ${largeArc} 1 ${x2} ${y2}`,
            `Z`,
          ].join(' ')

          currentAngle += angle

          return (
            <motion.path
              key={i}
              d={pathData}
              fill={d.color || `hsl(${(i * 360) / data.length}, 70%, 60%)`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            />
          )
        })}
      </svg>
    )
  }

  const renderProgressChart = () => {
    const total = data.reduce((sum, d) => sum + d.value, 0)
    const percentage = (total / maxValue) * 100

    return (
      <div className="w-full">
        <div className="neumorphic-card-pressed rounded-neumorphic overflow-hidden h-4 sm:h-6">
          <motion.div
            className="neumorphic-card-soft h-full bg-warmBlue-500 rounded-neumorphic"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
        {showLabels && (
          <div className="mt-2 text-sm text-warmGraphite-600">
            {total.toFixed(0)} / {maxValue.toFixed(0)} ({percentage.toFixed(0)}%)
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn('neumorphic-card p-4 sm:p-6', className)}>
      {title && (
        <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-4">
          {title}
        </h3>
      )}
      <div style={{ height: `${height}px` }} className="relative">
        {type === 'line' && renderLineChart()}
        {type === 'bar' && renderBarChart()}
        {type === 'pie' && renderPieChart()}
        {type === 'progress' && renderProgressChart()}
      </div>
      {showLabels && type !== 'progress' && (
        <div className="mt-4 flex flex-wrap gap-2 sm:gap-4">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: d.color || `hsl(${(i * 360) / data.length}, 70%, 60%)` }}
              />
              <span className="text-xs sm:text-sm text-warmGraphite-600">
                {d.label}: {d.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
