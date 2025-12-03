'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface BodyPart {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  muscles?: string[]
}

interface BodyAvatarProps {
  userId: string
  targetZones?: Array<{ bodyPart: string; goal: string; priority: string }>
  painPoints?: Array<{ bodyPart: string; severity: string; notes: string }>
}

export default function BodyAvatar({ userId, targetZones = [], painPoints = [] }: BodyAvatarProps) {
  const [selectedPart, setSelectedPart] = useState<string | null>(null)
  const [hoveredPart, setHoveredPart] = useState<string | null>(null)

  // Определение зон тела для интерактивности
  const bodyParts: BodyPart[] = [
    { id: 'head', name: 'Голова', x: 45, y: 5, width: 10, height: 12 },
    { id: 'neck', name: 'Шея', x: 47, y: 17, width: 6, height: 5 },
    { id: 'chest', name: 'Грудь', x: 40, y: 22, width: 20, height: 15 },
    { id: 'back', name: 'Спина', x: 40, y: 22, width: 20, height: 20 },
    { id: 'left-arm', name: 'Левая рука', x: 30, y: 22, width: 10, height: 30, muscles: ['бицепс', 'трицепс'] },
    { id: 'right-arm', name: 'Правая рука', x: 60, y: 22, width: 10, height: 30, muscles: ['бицепс', 'трицепс'] },
    { id: 'abs', name: 'Пресс', x: 42, y: 37, width: 16, height: 12 },
    { id: 'left-leg', name: 'Левая нога', x: 38, y: 49, width: 12, height: 40, muscles: ['квадрицепс', 'бицепс бедра'] },
    { id: 'right-leg', name: 'Правая нога', x: 50, y: 49, width: 12, height: 40, muscles: ['квадрицепс', 'бицепс бедра'] },
  ]

  const getPartStatus = (partId: string) => {
    const target = targetZones.find((t) => t.bodyPart === partId)
    const pain = painPoints.find((p) => p.bodyPart === partId)
    
    if (pain) return 'pain'
    if (target) return 'target'
    return 'normal'
  }

  const getPartColor = (partId: string) => {
    const status = getPartStatus(partId)
    if (status === 'pain') return 'rgba(197, 48, 48, 0.3)' // красный
    if (status === 'target') return 'rgba(79, 209, 199, 0.3)' // бирюзовый
    return 'rgba(0, 0, 0, 0.1)' // прозрачный
  }

  return (
    <div className="relative w-full" style={{ paddingBottom: '150%' }}>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        style={{ maxHeight: '500px' }}
      >
        {/* Фон - схематичное тело */}
        <g className="body-outline">
          {/* Голова */}
          <ellipse cx="50" cy="11" rx="5" ry="6" fill="none" stroke="#3d3d3d" strokeWidth="0.5" />
          
          {/* Шея */}
          <rect x="47" y="17" width="6" height="5" fill="none" stroke="#3d3d3d" strokeWidth="0.5" />
          
          {/* Туловище */}
          <rect x="40" y="22" width="20" height="20" fill="none" stroke="#3d3d3d" strokeWidth="0.5" rx="2" />
          
          {/* Левая рука (в разрезе мышц) */}
          <rect x="30" y="22" width="10" height="30" fill="none" stroke="#3d3d3d" strokeWidth="0.5" rx="1" />
          <line x1="32" y1="25" x2="38" y2="25" stroke="#3d3d3d" strokeWidth="0.3" />
          <line x1="32" y1="30" x2="38" y2="30" stroke="#3d3d3d" strokeWidth="0.3" />
          <line x1="32" y1="35" x2="38" y2="35" stroke="#3d3d3d" strokeWidth="0.3" />
          
          {/* Правая рука (рентген - кости) */}
          <rect x="60" y="22" width="10" height="30" fill="none" stroke="#3d3d3d" strokeWidth="0.5" rx="1" />
          <line x1="62" y1="24" x2="68" y2="28" stroke="#3d3d3d" strokeWidth="0.4" />
          <line x1="62" y1="28" x2="68" y2="32" stroke="#3d3d3d" strokeWidth="0.4" />
          <line x1="62" y1="32" x2="68" y2="36" stroke="#3d3d3d" strokeWidth="0.4" />
          <circle cx="65" cy="24" r="1" fill="#3d3d3d" />
          <circle cx="65" cy="30" r="1" fill="#3d3d3d" />
          <circle cx="65" cy="36" r="1" fill="#3d3d3d" />
          
          {/* Пресс */}
          <rect x="42" y="37" width="16" height="12" fill="none" stroke="#3d3d3d" strokeWidth="0.5" />
          <line x1="45" y1="40" x2="55" y2="40" stroke="#3d3d3d" strokeWidth="0.3" />
          <line x1="45" y1="43" x2="55" y2="43" stroke="#3d3d3d" strokeWidth="0.3" />
          <line x1="45" y1="46" x2="55" y2="46" stroke="#3d3d3d" strokeWidth="0.3" />
          
          {/* Левая нога (мышцы) */}
          <rect x="38" y="49" width="12" height="40" fill="none" stroke="#3d3d3d" strokeWidth="0.5" rx="1" />
          <ellipse cx="42" cy="55" rx="2" ry="3" fill="none" stroke="#3d3d3d" strokeWidth="0.3" />
          <ellipse cx="46" cy="60" rx="2" ry="3" fill="none" stroke="#3d3d3d" strokeWidth="0.3" />
          
          {/* Правая нога (связки) */}
          <rect x="50" y="49" width="12" height="40" fill="none" stroke="#3d3d3d" strokeWidth="0.5" rx="1" />
          <path d="M 52 52 Q 56 55 60 52" fill="none" stroke="#3d3d3d" strokeWidth="0.3" />
          <path d="M 52 58 Q 56 61 60 58" fill="none" stroke="#3d3d3d" strokeWidth="0.3" />
          <path d="M 52 64 Q 56 67 60 64" fill="none" stroke="#3d3d3d" strokeWidth="0.3" />
        </g>

        {/* Интерактивные зоны */}
        {bodyParts.map((part) => (
          <g key={part.id}>
            <rect
              x={part.x}
              y={part.y}
              width={part.width}
              height={part.height}
              fill={hoveredPart === part.id || selectedPart === part.id ? getPartColor(part.id) : 'transparent'}
              stroke={selectedPart === part.id ? '#4fd1c7' : 'transparent'}
              strokeWidth="0.5"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredPart(part.id)}
              onMouseLeave={() => setHoveredPart(null)}
              onClick={() => setSelectedPart(selectedPart === part.id ? null : part.id)}
            />
          </g>
        ))}
      </svg>

      {/* Информационная панель */}
      {selectedPart && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-0 right-0 bg-white border border-ink-200 rounded p-4 shadow-lg"
        >
          <h3 className="font-bold mb-2">
            {bodyParts.find((p) => p.id === selectedPart)?.name}
          </h3>
          {targetZones.find((t) => t.bodyPart === selectedPart) && (
            <div className="text-sm text-accent-turquoise mb-1">
              Цель: {targetZones.find((t) => t.bodyPart === selectedPart)?.goal}
            </div>
          )}
          {painPoints.find((p) => p.bodyPart === selectedPart) && (
            <div className="text-sm text-red-600 mb-1">
              Проблема: {painPoints.find((p) => p.bodyPart === selectedPart)?.notes}
            </div>
          )}
          <button
            onClick={() => setSelectedPart(null)}
            className="text-xs text-ink-600 mt-2"
          >
            Закрыть
          </button>
        </motion.div>
      )}
    </div>
  )
}

