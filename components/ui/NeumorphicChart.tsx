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

  // Ensure data is valid and not empty
  const safeData = Array.isArray(data) && data.length > 0 ? data : []
  const maxValue = safeData.length > 0 ? Math.max(...safeData.map((d) => (typeof d.value === 'number' && !isNaN(d.value) ? d.value : 0)), 1) : 1

  useEffect(() => {
    if (safeData.length === 0) {
      setAnimatedValues([])
      return
    }
    if (animate) {
      setAnimatedValues(safeData.map(() => 0))
      const timer = setTimeout(() => {
        setAnimatedValues(safeData.map((d) => typeof d.value === 'number' && !isNaN(d.value) ? d.value : 0))
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setAnimatedValues(safeData.map((d) => typeof d.value === 'number' && !isNaN(d.value) ? d.value : 0))
    }
  }, [safeData, animate])

  const renderLineChart = () => {
    if (safeData.length === 0) {
      return <div className="text-center text-warmGraphite-500 py-8">Нет данных для отображения</div>
    }
    
    const points = safeData.map((d, i) => {
      const divisor = safeData.length > 1 ? safeData.length - 1 : 1
      const x = (i / divisor) * 100
      const safeValue = typeof animatedValues[i] === 'number' && !isNaN(animatedValues[i]) ? animatedValues[i] : 0
      const safeMax = typeof maxValue === 'number' && !isNaN(maxValue) && maxValue > 0 ? maxValue : 1
      const y = 100 - (safeValue / safeMax) * 100
      // Ensure x and y are valid numbers
      const safeX = typeof x === 'number' && !isNaN(x) ? x : 0
      const safeY = typeof y === 'number' && !isNaN(y) ? y : 100
      return `${safeX},${safeY}`
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
        {safeData.map((d, i) => {
          const divisor = safeData.length > 1 ? safeData.length - 1 : 1
          const x = (i / divisor) * 100
          const safeValue = typeof animatedValues[i] === 'number' && !isNaN(animatedValues[i]) ? animatedValues[i] : 0
          const safeMax = typeof maxValue === 'number' && !isNaN(maxValue) && maxValue > 0 ? maxValue : 1
          const y = 100 - (safeValue / safeMax) * 100
          // Ensure x and y are valid numbers
          const safeX = typeof x === 'number' && !isNaN(x) ? x : 0
          const safeY = typeof y === 'number' && !isNaN(y) ? y : 100
          return (
            <circle
              key={i}
              cx={safeX}
              cy={safeY}
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
    if (safeData.length === 0) {
      return <div className="text-center text-warmGraphite-500 py-8">Нет данных для отображения</div>
    }
    
    const barWidth = 100 / safeData.length

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
        {safeData.map((d, i) => {
          const safeValue = typeof animatedValues[i] === 'number' && !isNaN(animatedValues[i]) ? animatedValues[i] : 0
          const safeMax = typeof maxValue === 'number' && !isNaN(maxValue) && maxValue > 0 ? maxValue : 1
          const barHeight = (safeValue / safeMax) * 100
          const x = (i * barWidth) + (barWidth * 0.1)
          const width = barWidth * 0.8
          const y = 100 - barHeight
          
          // Ensure all values are valid numbers
          const safeX = typeof x === 'number' && !isNaN(x) ? x : 0
          const safeY = typeof y === 'number' && !isNaN(y) ? y : 100
          const safeWidth = typeof width === 'number' && !isNaN(width) ? width : 0
          const safeBarHeight = typeof barHeight === 'number' && !isNaN(barHeight) && barHeight >= 0 ? barHeight : 0

          return (
            <motion.rect
              key={i}
              x={safeX}
              y={safeY}
              width={safeWidth}
              height={safeBarHeight}
              fill="currentColor"
              className={d.color || 'text-warmBlue-500'}
              initial={{ height: 0, y: 100 }}
              animate={{ height: safeBarHeight, y: safeY }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            />
          )
        })}
      </svg>
    )
  }

  const renderPieChart = () => {
    if (safeData.length === 0) {
      return <div className="text-center text-warmGraphite-500 py-8">Нет данных для отображения</div>
    }
    
    let currentAngle = -90
    const total = safeData.reduce((sum, d) => {
      const value = typeof d.value === 'number' && !isNaN(d.value) ? d.value : 0
      return sum + value
    }, 0)
    
    if (total === 0) {
      return <div className="text-center text-warmGraphite-500 py-8">Нет данных для отображения</div>
    }

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
        {safeData.map((d, i) => {
          const safeValue = typeof d.value === 'number' && !isNaN(d.value) ? d.value : 0
          const percentage = (safeValue / total) * 100
          const angle = (percentage / 100) * 360
          const startAngle = currentAngle
          const endAngle = currentAngle + angle

          const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
          const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
          const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
          const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)
          const largeArc = angle > 180 ? 1 : 0
          
          // Ensure all values are valid numbers
          const safeX1 = typeof x1 === 'number' && !isNaN(x1) ? x1 : 50
          const safeY1 = typeof y1 === 'number' && !isNaN(y1) ? y1 : 50
          const safeX2 = typeof x2 === 'number' && !isNaN(x2) ? x2 : 50
          const safeY2 = typeof y2 === 'number' && !isNaN(y2) ? y2 : 50

          const pathData = [
            `M 50 50`,
            `L ${safeX1} ${safeY1}`,
            `A 40 40 0 ${largeArc} 1 ${safeX2} ${safeY2}`,
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
    if (safeData.length === 0) {
      return <div className="text-center text-warmGraphite-500 py-8">Нет данных для отображения</div>
    }
    
    const total = safeData.reduce((sum, d) => {
      const value = typeof d.value === 'number' && !isNaN(d.value) ? d.value : 0
      return sum + value
    }, 0)
    const safeMax = typeof maxValue === 'number' && !isNaN(maxValue) && maxValue > 0 ? maxValue : 1
    const percentage = Math.min(Math.max((total / safeMax) * 100, 0), 100)

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
      {showLabels && type !== 'progress' && safeData.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 sm:gap-4">
          {safeData.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: d.color || `hsl(${(i * 360) / safeData.length}, 70%, 60%)` }}
              />
              <span className="text-xs sm:text-sm text-warmGraphite-600">
                {d.label}: {typeof d.value === 'number' && !isNaN(d.value) ? d.value : 0}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
