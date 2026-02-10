'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'

export default function SpecialistsSection() {
  const specialists = [
    { name: 'Анна Петрова', specialization: 'Фитнес-тренер', rating: 4.9, price: '$20/час', image: '👩‍🏋️' },
    { name: 'Дмитрий Соколов', specialization: 'Нутрициолог', rating: 4.8, price: '$25/час', image: '👨‍⚕️' },
    { name: 'Мария Иванова', specialization: 'Психолог', rating: 5.0, price: '$30/час', image: '👩‍⚕️' },
  ]

  return (
    <section id="specialists" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-warmBeige-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
            Персональная поддержка профессионалов
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto">
            Выбирайте тренеров и коучей по направлениям: фитнес, реабилитация, питание
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {specialists.map((specialist, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <NeumorphicCard className="p-4 sm:p-6 hover:scale-105 transition-transform cursor-pointer">
                <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 text-center">{specialist.image}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-1 sm:mb-2 text-center">
                  {specialist.name}
                </h3>
                <p className="text-sm sm:text-base text-warmGraphite-600 text-center mb-2 sm:mb-3">
                  {specialist.specialization}
                </p>
                <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-warmYellow-500 fill-current" />
                  <span className="font-semibold text-sm sm:text-base text-warmGraphite-800">{specialist.rating}</span>
                </div>
                <p className="text-sm sm:text-base text-warmGraphite-700 font-medium text-center mb-3 sm:mb-4">
                  {specialist.price}
                </p>
                <NeumorphicButton primary className="w-full text-sm sm:text-base">
                  Записаться
                </NeumorphicButton>
              </NeumorphicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
