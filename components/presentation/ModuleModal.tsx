'use client'

import NeumorphicModal from '@/components/ui/NeumorphicModal'
import { CheckCircle, Star } from 'lucide-react'
import { Module } from './types'

interface ModuleModalProps {
  module: Module | null
  isOpen: boolean
  onClose: () => void
}

export default function ModuleModal({ module, isOpen, onClose }: ModuleModalProps) {
  if (!module) return null

  return (
    <NeumorphicModal
      isOpen={isOpen}
      onClose={onClose}
      title={module.title}
      size="lg"
    >
      <div className="space-y-4 sm:space-y-6 max-h-[70vh] overflow-y-auto pr-2">
        <div className="text-warmBlue-500 text-5xl sm:text-6xl mb-3 sm:mb-4 flex justify-center">
          {module.icon && <module.icon className="w-12 h-12 sm:w-16 sm:h-16" />}
        </div>
        <p className="text-base sm:text-lg text-warmGraphite-600 text-center">
          {module.description}
        </p>
        
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-2 sm:mb-3">
            Функции:
          </h3>
          <ul className="space-y-1 sm:space-y-2">
            {module.features.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-warmGraphite-700">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-2 sm:mb-3">
            Преимущества:
          </h3>
          <ul className="space-y-1 sm:space-y-2">
            {module.benefits.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-warmGraphite-700">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-warmYellow-500 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </NeumorphicModal>
  )
}
