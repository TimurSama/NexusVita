'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import { modules } from './data'
import { getIcon } from './iconMap'

interface ModulesSectionProps {
  onModuleClick: (moduleId: string) => void
}

export default function ModulesSection({ onModuleClick }: ModulesSectionProps) {
  return (
    <section id="modules" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-warmBeige-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
            Все инструменты здоровья в одной экосистеме
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto">
            Каждый модуль — самостоятельная единица с полным функционалом
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <NeumorphicCard
                className="h-full cursor-pointer hover:scale-105 transition-transform p-4 sm:p-6"
                onClick={() => onModuleClick(module.id)}
              >
                <div className="text-warmBlue-500 mb-3 sm:mb-4">
                  {(() => {
                    const IconComponent = getIcon(module.icon)
                    return IconComponent ? <IconComponent className="w-6 h-6" /> : null
                  })()}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-2 sm:mb-3">
                  {module.title}
                </h3>
                <p className="text-sm sm:text-base text-warmGraphite-600 mb-3 sm:mb-4 line-clamp-3">
                  {module.description}
                </p>
                <div className="flex items-center text-warmBlue-600 font-medium text-sm sm:text-base">
                  <span>Подробнее</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                </div>
              </NeumorphicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
