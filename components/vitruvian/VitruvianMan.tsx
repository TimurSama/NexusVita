'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface VitruvianManProps {
  width?: number
  height?: number
  className?: string
  highlightedMuscles?: string[]
  pose?: string
}

export default function VitruvianMan({
  width = 400,
  height = 400,
  className = '',
  highlightedMuscles = [],
  pose,
}: VitruvianManProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Центр круга и квадрата
  const centerX = width / 2
  const centerY = height / 2
  const radius = Math.min(width, height) * 0.4

  // Координаты для Витрувианского человека (упрощенная схема)
  const headRadius = radius * 0.15
  const headY = centerY - radius * 0.65

  const shoulderWidth = radius * 0.4
  const shoulderY = centerY - radius * 0.3

  const chestWidth = radius * 0.3
  const chestY = centerY - radius * 0.1

  const waistWidth = radius * 0.2
  const waistY = centerY + radius * 0.1

  const hipWidth = radius * 0.25
  const hipY = centerY + radius * 0.3

  // Руки
  const armLength = radius * 0.5
  const armAngle = Math.PI / 6 // 30 градусов

  // Ноги
  const legLength = radius * 0.6
  const legAngle = Math.PI / 8 // 22.5 градуса

  const isMuscleHighlighted = (muscle: string) => {
    return highlightedMuscles.includes(muscle)
  }

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`vitruvian-man ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      {/* Круг (окружность) */}
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        className="schematic-line"
        strokeDasharray="4 4"
      />

      {/* Квадрат */}
      <rect
        x={centerX - radius}
        y={centerY - radius}
        width={radius * 2}
        height={radius * 2}
        className="schematic-line"
        strokeDasharray="4 4"
      />

      {/* Голова */}
      <circle
        cx={centerX}
        cy={headY}
        r={headRadius}
        className={`schematic-line ${isMuscleHighlighted('neck') ? 'stroke-ink-700 stroke-[3]' : ''}`}
        fill={isMuscleHighlighted('neck') ? 'rgba(58, 54, 49, 0.2)' : 'none'}
      />

      {/* Шея */}
      <line
        x1={centerX}
        y1={headY + headRadius}
        x2={centerX}
        y2={shoulderY}
        className={`schematic-line ${isMuscleHighlighted('neck') ? 'stroke-ink-700 stroke-[3]' : ''}`}
      />

      {/* Плечи */}
      <line
        x1={centerX - shoulderWidth / 2}
        y1={shoulderY}
        x2={centerX + shoulderWidth / 2}
        y2={shoulderY}
        className={`schematic-line ${isMuscleHighlighted('shoulders') ? 'stroke-ink-700 stroke-[3]' : ''}`}
      />

      {/* Грудь/Торс */}
      <ellipse
        cx={centerX}
        cy={chestY}
        rx={chestWidth / 2}
        ry={radius * 0.15}
        className={`schematic-line ${isMuscleHighlighted('chest') ? 'stroke-ink-700 stroke-[3]' : ''}`}
        fill={isMuscleHighlighted('chest') ? 'rgba(58, 54, 49, 0.2)' : 'none'}
      />

      {/* Талия */}
      <ellipse
        cx={centerX}
        cy={waistY}
        rx={waistWidth / 2}
        ry={radius * 0.1}
        className={`schematic-line ${isMuscleHighlighted('core') ? 'stroke-ink-700 stroke-[3]' : ''}`}
        fill={isMuscleHighlighted('core') ? 'rgba(58, 54, 49, 0.2)' : 'none'}
      />

      {/* Бедра */}
      <ellipse
        cx={centerX}
        cy={hipY}
        rx={hipWidth / 2}
        ry={radius * 0.12}
        className={`schematic-line ${isMuscleHighlighted('hips') ? 'stroke-ink-700 stroke-[3]' : ''}`}
        fill={isMuscleHighlighted('hips') ? 'rgba(58, 54, 49, 0.2)' : 'none'}
      />

      {/* Левая рука (верхняя часть) */}
      <line
        x1={centerX - shoulderWidth / 2}
        y1={shoulderY}
        x2={centerX - shoulderWidth / 2 - armLength * Math.cos(armAngle)}
        y2={shoulderY + armLength * Math.sin(armAngle)}
        className={`schematic-line ${isMuscleHighlighted('biceps') || isMuscleHighlighted('triceps') ? 'stroke-ink-700 stroke-[3]' : ''}`}
      />

      {/* Правая рука (верхняя часть) */}
      <line
        x1={centerX + shoulderWidth / 2}
        y1={shoulderY}
        x2={centerX + shoulderWidth / 2 + armLength * Math.cos(armAngle)}
        y2={shoulderY + armLength * Math.sin(armAngle)}
        className={`schematic-line ${isMuscleHighlighted('biceps') || isMuscleHighlighted('triceps') ? 'stroke-ink-700 stroke-[3]' : ''}`}
      />

      {/* Левая нога */}
      <line
        x1={centerX - hipWidth / 4}
        y1={hipY + radius * 0.12}
        x2={centerX - hipWidth / 4 - legLength * Math.sin(legAngle)}
        y2={hipY + radius * 0.12 + legLength * Math.cos(legAngle)}
        className={`schematic-line ${isMuscleHighlighted('quadriceps') || isMuscleHighlighted('hamstrings') ? 'stroke-ink-700 stroke-[3]' : ''}`}
      />

      {/* Правая нога */}
      <line
        x1={centerX + hipWidth / 4}
        y1={hipY + radius * 0.12}
        x2={centerX + hipWidth / 4 + legLength * Math.sin(legAngle)}
        y2={hipY + radius * 0.12 + legLength * Math.cos(legAngle)}
        className={`schematic-line ${isMuscleHighlighted('quadriceps') || isMuscleHighlighted('hamstrings') ? 'stroke-ink-700 stroke-[3]' : ''}`}
      />

      {/* Соединение туловища */}
      <line
        x1={centerX}
        y1={shoulderY}
        x2={centerX}
        y2={hipY + radius * 0.12}
        className={`schematic-line ${isMuscleHighlighted('spine') ? 'stroke-ink-700 stroke-[3]' : ''}`}
      />
    </motion.svg>
  )
}


