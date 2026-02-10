'use client'

import { motion } from 'framer-motion'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import { useI18n } from '@/lib/i18n/I18nProvider'

export default function ConclusionSection() {
  const { lang } = useI18n()

  return (
    <section
      id="conclusion"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <NeumorphicCard className="p-4 sm:p-6 lg:p-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
              {lang === 'en' ? 'Conclusion' : 'Заключение'}
            </h2>
            <p className="text-sm sm:text-base text-warmGraphite-700 mb-3 sm:mb-4">
              {lang === 'en'
                ? 'NexusVita is a next‑generation ecosystem that unites data, people, technology and economics in a single digital environment.'
                : 'NexusVita — это экосистема нового поколения, объединяющая данные, людей, технологии и экономику в единой цифровой среде.'}
            </p>
            <p className="text-sm sm:text-base text-warmGraphite-700 mb-3 sm:mb-4">
              {lang === 'en'
                ? 'The platform solves fundamental problems of the fragmented digital health market and creates a foundation for a sustainable, scalable product with high long‑term value for users, specialists and partners.'
                : 'Платформа решает фундаментальные проблемы фрагментированного рынка цифрового здоровья и создаёт основу для устойчивого масштабируемого продукта с высокой долгосрочной ценностью для пользователей, специалистов и партнёров.'}
            </p>
          </NeumorphicCard>
        </motion.div>
      </div>
    </section>
  )
}

