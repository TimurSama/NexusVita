'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { sectors } from './data'
import { cn } from '@/lib/utils/cn'

interface SectorsSectionProps {
  onSectorClick: (sectorId: string) => void
  onInteractiveClick?: (sectorId: string) => void
}

export default function SectorsSection({ onSectorClick, onInteractiveClick }: SectorsSectionProps) {
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])
  
  const handleSectorToggle = (sectorId: string) => {
    setSelectedSectors(prev => 
      prev.includes(sectorId)
        ? prev.filter(id => id !== sectorId)
        : [...prev, sectorId]
    )
    onInteractiveClick?.(sectorId)
  }
  return (
    <section id="sectors" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
            Полное здоровье под контролем
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto">
            Каждый сектор — отдельная экосистема в одном приложении
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <NeumorphicCard
                className={cn(
                  "h-full cursor-pointer hover:scale-105 transition-transform p-4 sm:p-6 relative",
                  selectedSectors.includes(sector.id) && "ring-2 ring-warmBlue-500"
                )}
                onClick={() => onSectorClick(sector.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className={`text-${sector.color}-500 mb-3 sm:mb-4`}>
                    {sector.icon}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSectorToggle(sector.id)
                    }}
                    className={cn(
                      "p-1.5 rounded-lg transition-all",
                      selectedSectors.includes(sector.id)
                        ? "bg-warmBlue-500 text-white"
                        : "bg-warmGray-200 text-warmGraphite-600 hover:bg-warmGray-300"
                    )}
                  >
                    {selectedSectors.includes(sector.id) ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-2 sm:mb-3">
                  {sector.title}
                </h3>
                <p className="text-sm sm:text-base text-warmGraphite-600 mb-3 sm:mb-4 line-clamp-3">
                  {sector.description}
                </p>
                {selectedSectors.includes(sector.id) && (
                  <NeumorphicBadge className="bg-warmGreen-500 text-white mb-2 text-xs">
                    Выбрано для вашего плана
                  </NeumorphicBadge>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-warmBlue-600 font-medium text-sm sm:text-base">
                    <span>Подробнее</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                  </div>
                </div>
              </NeumorphicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
