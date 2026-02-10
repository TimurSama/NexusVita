'use client'

import { motion } from 'framer-motion'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'

export default function MarketplaceSection() {
  const products = [
    { name: 'Протеин', price: '$25', image: '🥤', category: 'Питание' },
    { name: 'Витамины', price: '$15', image: '💊', category: 'БАДы' },
    { name: 'Гантели', price: '$50', image: '🏋️', category: 'Оборудование' },
    { name: 'Абонемент в зал', price: '$30/мес', image: '🏋️‍♂️', category: 'Абонементы' },
    { name: 'Йога-мат', price: '$20', image: '🧘', category: 'Оборудование' },
    { name: 'Омега-3', price: '$18', image: '🐟', category: 'БАДы' },
    { name: 'Спортивное питание', price: '$35', image: '💪', category: 'Питание' },
    { name: 'Фитнес-браслет', price: '$80', image: '⌚', category: 'Оборудование' },
    { name: 'Абонемент в бассейн', price: '$40/мес', image: '🏊', category: 'Абонементы' },
    { name: 'Креатин', price: '$22', image: '⚡', category: 'БАДы' },
    { name: 'Энергетические батончики', price: '$12', image: '🍫', category: 'Питание' },
    { name: 'Абонемент в спа', price: '$60/мес', image: '💆', category: 'Абонементы' },
  ]

  return (
    <section id="marketplace" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
            Все для здоровья и спорта в одном месте
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto">
            БАДы, питание, оборудование, абонементы с интеграцией в ваши планы
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
            >
              <NeumorphicCard className="p-3 sm:p-4 lg:p-6 hover:scale-105 transition-transform cursor-pointer h-full flex flex-col">
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-2 sm:mb-4 text-center">{product.image}</div>
                <p className="text-xs sm:text-sm text-warmGraphite-500 mb-1 sm:mb-2">{product.category}</p>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-warmGraphite-800 mb-1 sm:mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-base sm:text-lg lg:text-xl font-bold text-warmBlue-600 mb-2 sm:mb-4 mt-auto">
                  {product.price}
                </p>
                <NeumorphicButton primary className="w-full text-xs sm:text-sm py-2">
                  Добавить в план
                </NeumorphicButton>
              </NeumorphicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
