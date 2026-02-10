'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import VitruvianMan from '@/components/vitruvian/VitruvianMan'
import { sectors } from './data'
import { cn } from '@/lib/utils/cn'
import { useI18n } from '@/lib/i18n/I18nProvider'

interface HeroSectionProps {
  onStartClick: () => void
  onSubscribeClick: () => void
  onSectorClick: (sectorId: string) => void
}

const sectorHotspots = [
  { id: 'medicine', labelRu: 'Медицина', labelEn: 'Medicine', colorClass: 'text-red-600', pos: 'top-[8%] left-1/2 -translate-x-1/2' },
  { id: 'sport', labelRu: 'Спорт', labelEn: 'Sport', colorClass: 'text-warmBlue-600', pos: 'top-[25%] right-[6%]' },
  { id: 'psycho', labelRu: 'Психо', labelEn: 'Mind', colorClass: 'text-purple-600', pos: 'top-[55%] right-[2%]' },
  { id: 'nutrition', labelRu: 'Питание', labelEn: 'Nutrition', colorClass: 'text-green-600', pos: 'bottom-[12%] right-[18%]' },
  { id: 'social', labelRu: 'Социальное', labelEn: 'Social', colorClass: 'text-orange-600', pos: 'bottom-[12%] left-[18%]' },
  { id: 'sleep', labelRu: 'Сон', labelEn: 'Sleep', colorClass: 'text-indigo-600', pos: 'top-[55%] left-[2%]' },
  { id: 'prevention', labelRu: 'Профилактика', labelEn: 'Prevention', colorClass: 'text-teal-600', pos: 'top-[25%] left-[6%]' },
] as const

export default function HeroSection({
  onStartClick,
  onSubscribeClick,
  onSectorClick,
}: HeroSectionProps) {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const ringsRotation = useTransform(scrollYProgress, [0, 1], [0, 180])
  const { lang, t } = useI18n()

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-br from-warmGreen-50 via-warmBlue-50 to-warmBeige-50"
      />
      
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-warmGraphite-800 mb-4 sm:mb-6">
            NexusVita
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-warmGraphite-600 mb-3 sm:mb-4">
            {t('hero.subtitle')}
          </p>
          <p className="text-base sm:text-lg lg:text-xl text-warmGraphite-500 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <NeumorphicButton
              primary
              onClick={onStartClick}
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
            >
              {t('hero.cta.primary')}
            </NeumorphicButton>
            <NeumorphicButton
              onClick={onSubscribeClick}
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
            >
              {t('hero.cta.secondary')}
            </NeumorphicButton>
          </div>
        </motion.div>

        {/* Vitruvian Man Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-8 sm:mt-12 lg:mt-16 relative"
        >
          <div className="relative w-full max-w-xl sm:max-w-2xl mx-auto aspect-square">
            <NeumorphicCard className="w-full h-full flex items-center justify-center p-4 sm:p-6">
              <div className="relative w-full h-full">
                {/* Витрувианский человек */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <VitruvianMan width={400} height={400} className="max-w-full max-h-full" />
                </div>

                {/* Hotspots секторов */}
                {sectorHotspots.map((hs) => {
                  const sector = sectors.find((s) => s.id === hs.id)
                  if (!sector) return null
                  const label = lang === 'en' ? hs.labelEn : hs.labelRu
                  return (
                    <button
                      key={hs.id}
                      onClick={() => onSectorClick(hs.id)}
                      className={cn(
                        'absolute z-20 px-2 sm:px-3 py-1 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold',
                        'bg-warmBeige-50/90 backdrop-blur-sm hover:scale-105 active:scale-95 transition-transform',
                        hs.pos
                      )}
                      aria-label={label}
                    >
                      <span className={cn('inline-flex items-center gap-1 sm:gap-2', hs.colorClass)}>
                        <span className="opacity-90">{sector.icon}</span>
                        <span className="text-warmGraphite-800 hidden sm:inline">{label}</span>
                      </span>
                    </button>
                  )
                })}

                <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 text-xs text-warmGraphite-600 bg-warmBeige-50/80 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-xl sm:rounded-2xl">
                  <span className="hidden sm:inline">{t('hero.hotspot.desktop')}</span>
                  <span className="sm:hidden">{t('hero.hotspot.mobile')}</span>
                </div>
              </div>
            </NeumorphicCard>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-warmGraphite-400 animate-bounce" />
      </motion.div>
    </section>
  )
}
