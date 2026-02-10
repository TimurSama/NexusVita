'use client'

import { motion } from 'framer-motion'
import NeumorphicButton from '@/components/ui/NeumorphicButton'

interface CTASectionProps {
  onStartClick: () => void
  onSubscribeClick: () => void
}

export default function CTASection({ onStartClick, onSubscribeClick }: CTASectionProps) {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
            Начните путь к полному здоровью с NexusVita
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 mb-6 sm:mb-8">
            Подписка открывает доступ к ИИ-планировщику, тренерам, магазинам и центрам
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <NeumorphicButton
              primary
              onClick={onStartClick}
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
            >
              Начать бесплатно
            </NeumorphicButton>
            <NeumorphicButton
              onClick={onSubscribeClick}
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
            >
              Получить подписку
            </NeumorphicButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
