'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import { 
  Heart, 
  Activity, 
  Brain, 
  Droplets, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Info,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Microscope,
  Zap,
  Users,
  Calendar,
  Settings,
  PieChart,
  ShoppingBag,
  Layout,
  Layers,
  Globe,
  Plus,
  Moon,
  TrendingUp,
  Target,
  BarChart3,
  Dna,
  UserCheck,
  MessageCircle,
  Clock,
  X,
} from 'lucide-react'
import { sectors, modules } from '@/components/presentation/data'
import { getIcon } from '@/components/presentation/iconMap'
import { useI18n } from '@/lib/i18n/I18nProvider'
import { cn } from '@/lib/utils/cn'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicModal from '@/components/ui/NeumorphicModal'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import NeumorphicTabs from '@/components/ui/NeumorphicTabs'
import NeumorphicAccordion from '@/components/ui/NeumorphicAccordion'
import NeumorphicChart from '@/components/ui/NeumorphicChart'
import NeumorphicCarousel from '@/components/ui/NeumorphicCarousel'
import VitruvianMan from '@/components/vitruvian/VitruvianMan'
import ChatWidget from '@/components/presentation/ChatWidget'
import { questions } from '@/components/presentation/questions'
import { generateMockEvents, generateMockGoals, generateMockMetrics } from '@/lib/mocks/data-generators'
// Dynamic import for canvas-confetti (client-side only)
const loadConfetti = async () => {
  if (typeof window !== 'undefined') {
    const confetti = (await import('canvas-confetti')).default
    return confetti
  }
  return null
}

// --- Types ---
type Lang = 'ru' | 'en'

// --- Mock Data ---
const TOKENOMICS = [
  { name: 'Investors', value: 30, color: '#2b1d18' },
  { name: 'Team', value: 20, color: '#4d3b33' },
  { name: 'Reserve', value: 15, color: '#7a665e' },
  { name: 'Marketing', value: 15, color: '#a68c81' },
  { name: 'Liquidity', value: 10, color: '#c9b4aa' },
  { name: 'Rewards', value: 10, color: '#e8dad2' },
]

const GROWTH_DATA = [
  { month: 'Q1', users: 1000, arr: 50 },
  { month: 'Q2', users: 10000, arr: 500 },
  { month: 'Q3', users: 50000, arr: 2500 },
  { month: 'Q4', users: 200000, arr: 10000 },
]

// --- Main Demo Page Component ---
export default function DemoPresentationPage() {
  const { lang, setLang, t: tI18n } = useI18n()
  const t = (key: string, fallback?: string) => {
    const translation = tI18n(key)
    return translation !== key ? translation : (fallback || key)
  }
  const [activeSector, setActiveSector] = useState<string | null>(null)
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [perspective, setPerspective] = useState<'users' | 'specialists' | 'partners'>('users')
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [chatOpen, setChatOpen] = useState(true)
  const [chatContext, setChatContext] = useState<string | null>('general')
  
  // Ensure modules and sectors are available
  const safeModules = modules || []
  const safeSectors = sectors || []
  
  // Survey State
  const [survey, setSurvey] = useState({
    height: 175,
    weight: 70,
    sleepGoal: 8,
    trainingsPerWeek: 3,
    caloriesGoal: 2200,
    intensity: 'Умеренный',
    mainGoal: 'Здоровье'
  })

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const handleSurveyChange = (key: keyof typeof survey, val: any) => {
    setSurvey(prev => ({ ...prev, [key]: val }))
  }

  const handleChatComplete = () => {
    setChatOpen(false)
    setShowPlanModal(true)
  }

  const selectedSectorData = activeSector ? safeSectors.find(s => s.id === activeSector) ?? null : null
  const selectedModuleData = activeModule ? safeModules.find(m => m.id === activeModule) ?? null : null

  return (
    <div className="min-h-screen bg-warmBeige-50 font-serif text-warmGraphite-800 selection:bg-warmGraphite-800 selection:text-warmBeige-50">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-warmGraphite-800 z-[100] origin-left" 
        style={{ scaleX }} 
      />

      {/* Language Switcher */}
      <div className="fixed top-6 right-6 z-[90] flex gap-4">
        <button 
          onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
          className="px-4 py-2 bg-warmGraphite-800 text-warmBeige-50 rounded-full font-mono text-xs uppercase hover:scale-105 transition-transform neumorphic-card"
        >
          {lang.toUpperCase()}
        </button>
      </div>

      {/* Chat Widget */}
      <ChatWidget
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        questions={questions}
        onComplete={handleChatComplete}
        context={chatContext}
      />

      {/* Chat Button */}
      {!chatOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-4 right-4 z-40"
        >
          <NeumorphicButton
            primary
            onClick={() => setChatOpen(true)}
            className="rounded-full p-3 sm:p-4 shadow-lg"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </NeumorphicButton>
        </motion.div>
      )}

      {/* 1. Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <BackgroundTexture />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10 max-w-5xl"
        >
          <NeumorphicBadge variant="info" className="mb-6">
            Project Code: NexusVita_v1.0
          </NeumorphicBadge>
          <h1 className="text-6xl sm:text-8xl lg:text-[10vw] font-bold leading-none mb-4 tracking-tight uppercase text-warmGraphite-800">
            NexusVita
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-warmGraphite-600 mb-6">
            {t('hero.subtitle')}
          </h2>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-12 opacity-70">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-24">
            <NeumorphicButton primary onClick={() => setChatOpen(true)} className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              {t('hero.cta.primary')}
            </NeumorphicButton>
            <NeumorphicButton onClick={() => window.location.href = '/subscriptions'} className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              {t('hero.cta.secondary')}
            </NeumorphicButton>
          </div>

          <div className="relative mt-12 scale-90 md:scale-100">
            <VitruvianMan 
              width={500} 
              height={500} 
              highlightedMuscles={activeSector ? [activeSector] : []}
            />
            <AnimatePresence mode="wait">
              {activeSector && (
                <motion.div 
                  key={activeSector}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute -right-12 top-0 w-64 text-left hidden lg:block"
                >
                  <NeumorphicCard className="p-4">
                    <h3 className="text-lg font-semibold text-warmGraphite-800 mb-2">
                      {selectedSectorData?.title}
                    </h3>
                    <p className="text-sm text-warmGraphite-600">
                      {selectedSectorData?.description}
                    </p>
                  </NeumorphicCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* 2 & 3. Executive Summary & Ecosystem */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <SectionHeader number="02" title="Executive Summary" subtitle={t('executive.overview.title', 'Ecosystem Executive Summary')} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <NeumorphicCard className="p-6">
              <h3 className="text-2xl font-semibold text-warmGraphite-800 mb-4">
                {t('executive.overview.title', 'Что такое NexusVita?')}
              </h3>
              <p className="text-xl mb-6">
                {t('executive.description', 'NexusVita — экосистемная платформа для комплексного управления здоровьем, образом жизни и развитием человека с устойчивой экономической моделью.')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FeatureItem icon={Activity} label={t('executive.overview.item1', 'Долгосрочное сопровождение')} />
                <FeatureItem icon={Users} label={t('executive.overview.item2', 'Профессиональная сеть')} />
                <FeatureItem icon={PieChart} label={t('executive.overview.item3', 'Экономические механизмы')} />
                <FeatureItem icon={Globe} label={t('executive.overview.text', 'Социальная среда')} />
              </div>
            </NeumorphicCard>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SummaryCard 
                perspective="users" 
                active={perspective === 'users'} 
                onClick={() => setPerspective('users')} 
                title={t('executive.users', 'Пользователи')} 
              />
              <SummaryCard 
                perspective="specialists" 
                active={perspective === 'specialists'} 
                onClick={() => setPerspective('specialists')} 
                title={t('executive.specialists', 'Специалисты')} 
              />
              <SummaryCard 
                perspective="partners" 
                active={perspective === 'partners'} 
                onClick={() => setPerspective('partners')} 
                title={t('executive.partners', 'Партнёры')} 
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={perspective}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <NeumorphicCard className="p-6">
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-4">
                    {t('executive.value.title', `Ценность для ${perspective === 'users' ? 'пользователей' : perspective === 'specialists' ? 'специалистов' : 'партнёров'}`)}
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(getValuePoints(perspective, lang) || []).map((point: string, i: number) => (
                      <li key={i} className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 mt-1 text-warmGreen-500 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </NeumorphicCard>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <NeumorphicCard className="p-6 h-full">
              <h3 className="text-xl font-semibold text-warmGraphite-800 mb-4">
                {t('ecosystem.title', 'Продукты')}
              </h3>
              <div className="space-y-6">
                <ProductLine icon={Layout} label={t('ecosystem.description', 'B2C Приложение')} sub={t('ecosystem.description', 'Дневники, планы, ИИ')} />
                <ProductLine icon={Layout} label={t('ecosystem.description', 'B2B Кабинеты')} sub={t('ecosystem.description', 'Управление клиентами')} />
                <ProductLine icon={Globe} label={t('ecosystem.description', 'Экосистемные проекты')} sub={t('ecosystem.description', 'DAO, Исследования')} />
              </div>
            </NeumorphicCard>
          </div>
        </div>
      </section>

      {/* 4. Market Analysis */}
      <section className="py-32 px-8 bg-warmGray-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeader number="04" title="Market Analysis" subtitle={t('market.title', 'Проблематика и потенциал')} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <NeumorphicCard className="mb-8 p-6">
                <h4 className="text-2xl font-semibold mb-4">{t('market.description', 'Текущая проблема: Фрагментация')}</h4>
                <p className="opacity-70 mb-6 italic">
                  {t('market.description', 'Digital health растёт, но рынок фрагментирован: отдельные приложения для активности, питания, сна, тренировок и общения со специалистами.')}
                </p>
                <div className="space-y-4">
                  <ProblemItem label={t('market.description', 'Нет единого контекста данных')} />
                  <ProblemItem label={t('market.description', 'Слабая интеграция сервисов')} />
                  <ProblemItem label={t('market.description', 'Разрыв между советом и действием')} />
                  <ProblemItem label={t('market.description', 'Низкая вовлеченность (LTV)')} />
                </div>
              </NeumorphicCard>
            </div>

            <div className="relative">
              <NeumorphicCard className="p-6">
                <h3 className="text-xl font-semibold mb-4">{t('market.description', 'Решение: Единый Контур')}</h3>
                <div className="h-80 w-full relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-warmGraphite-800 rounded-full animate-spin-slow flex items-center justify-center">
                      <div className="w-32 h-32 border-2 border-warmGraphite-800 rounded-full animate-spin-reverse" />
                    </div>
                    <div className="absolute inset-0 grid grid-cols-2 gap-12 p-8">
                      <div className="font-mono text-xs uppercase">{t('market.description', 'Данные')}</div>
                      <div className="font-mono text-xs uppercase text-right">{t('market.description', 'Планы')}</div>
                      <div className="font-mono text-xs uppercase mt-auto">{t('market.description', 'Социум')}</div>
                      <div className="font-mono text-xs uppercase text-right mt-auto">{t('market.description', 'Услуги')}</div>
                    </div>
                    <Dna className="w-12 h-12 absolute z-10 text-warmBlue-500" />
                  </div>
                </div>
              </NeumorphicCard>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Product Modules */}
      <section className="py-32 px-8 bg-warmGraphite-800 text-warmBeige-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <NeumorphicBadge variant="info" className="bg-warmBeige-50 text-warmGraphite-800 mb-4">
              {t('ecosystem.description', 'Инструменты здоровья')}
            </NeumorphicBadge>
            <h2 className="text-5xl sm:text-6xl font-serif font-bold mt-4">{t('ecosystem.description', 'Продуктовые Модули')}</h2>
            <p className="text-xl opacity-60 mt-4 max-w-2xl">{t('ecosystem.description', 'Каждый модуль — самостоятельная единица с полным функционалом')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <NeumorphicCard 
                  className="h-full p-6 border-warmBeige-50/20 bg-warmBeige-50/5 cursor-pointer"
                  onClick={() => setActiveModule(module.id)}
                >
                  <div className="mb-6 p-4 bg-warmBeige-50 text-warmGraphite-800 rounded-lg w-fit">
                    {(() => {
                      if (!module.icon || typeof module.icon !== 'string') return null
                      const IconComponent = getIcon(module.icon)
                      if (!IconComponent || typeof IconComponent !== 'function') return null
                      return <IconComponent className="w-6 h-6" />
                    })()}
                  </div>
                  <h4 className="text-2xl font-semibold mb-3 text-warmBeige-50 font-serif tracking-tight">
                    {module.title}
                  </h4>
                  <p className="text-sm opacity-60 text-warmBeige-50 leading-relaxed mb-4">
                    {module.description}
                  </p>
                  <ul className="space-y-2">
                    {module.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-warmBeige-50/80">
                        <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </NeumorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Sectors Section */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <SectionHeader number="08" title="Секторы здоровья" subtitle={t('ecosystem.description', 'Все аспекты здоровья в одной экосистеме')} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeSectors.map((sector, index) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <NeumorphicCard 
                className="h-full p-6 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setActiveSector(sector.id)}
              >
                <div className={`text-${sector.color}-500 text-4xl mb-4`}>
                  {(() => {
                    if (!sector.icon || typeof sector.icon !== 'string') return null
                    const IconComponent = getIcon(sector.icon)
                    if (!IconComponent || typeof IconComponent !== 'function') return null
                    return <IconComponent className="w-10 h-10" />
                  })()}
                </div>
                <h3 className="text-xl font-semibold text-warmGraphite-800 mb-2">
                  {sector.title}
                </h3>
                <p className="text-sm text-warmGraphite-600 mb-4">
                  {sector.description}
                </p>
                <NeumorphicButton className="text-xs w-full">
                  Подробнее →
                </NeumorphicButton>
              </NeumorphicCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9, 10, 11. AI Planner & Interactive Survey */}
      <section id="survey" className="py-32 px-8 max-w-7xl mx-auto">
        <SectionHeader number="09" title="Interactive Planner" subtitle={t('planner.title', 'Настройте свой профиль')} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <NeumorphicCard className="p-6">
              <h3 className="text-xl font-semibold mb-6">{t('planner.title', 'Параметры здоровья')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                <SliderInput 
                  label={t('planner.height', 'Рост')} 
                  min={100} 
                  max={250} 
                  unit="cm" 
                  value={survey.height} 
                  onChange={(v: number) => handleSurveyChange('height', v)} 
                />
                <SliderInput 
                  label={t('planner.weight', 'Вес')} 
                  min={30} 
                  max={200} 
                  unit="kg" 
                  value={survey.weight} 
                  onChange={(v: number) => handleSurveyChange('weight', v)} 
                />
                <SliderInput 
                  label={t('planner.sleep', 'Цель по сну')} 
                  min={4} 
                  max={12} 
                  unit="h" 
                  value={survey.sleepGoal} 
                  onChange={(v: number) => handleSurveyChange('sleepGoal', v)} 
                />
                <SliderInput 
                  label={t('training.weekly', 'Тренировок в неделю')} 
                  min={1} 
                  max={7} 
                  unit="" 
                  value={survey.trainingsPerWeek} 
                  onChange={(v: number) => handleSurveyChange('trainingsPerWeek', v)} 
                />
              </div>

              <div className="mt-8 space-y-6">
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase opacity-60">{t('planner.goal.title', 'Главная цель')}</label>
                  <div className="flex flex-wrap gap-3">
                    {['Здоровье', 'Форма', 'Долголетие', 'Профилактика'].map(goal => (
                      <button 
                        key={goal}
                        onClick={() => handleSurveyChange('mainGoal', goal)}
                        className={cn(
                          "px-6 py-2 border-2 border-warmGraphite-800 rounded-lg transition-all",
                          survey.mainGoal === goal ? "bg-warmGraphite-800 text-warmBeige-50" : "hover:bg-warmGraphite-800/5"
                        )}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase opacity-60">{t('planner.intensity.title', 'Интенсивность плана')}</label>
                  <div className="flex flex-wrap gap-3">
                    {['Мягкий', 'Умеренный', 'Интенсивный'].map(level => (
                      <button 
                        key={level}
                        onClick={() => handleSurveyChange('intensity', level)}
                        className={cn(
                          "px-6 py-2 border-2 border-warmGraphite-800 rounded-lg transition-all",
                          survey.intensity === level ? "bg-warmGraphite-800 text-warmBeige-50" : "hover:bg-warmGraphite-800/5"
                        )}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </NeumorphicCard>
          </div>

          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={survey.intensity}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full"
              >
                <NeumorphicCard className="h-full p-6 border-2 border-warmGraphite-800 bg-warmGraphite-800/5">
                  <h3 className="text-xl font-semibold mb-6">{t('planner.title', 'Ваш ИИ-Прогноз')}</h3>
                  <div className="space-y-12">
                    <div className="text-center">
                      <div className="text-7xl font-mono font-bold">{calculateBMI(survey.weight, survey.height)}</div>
                      <NeumorphicBadge variant="info" className="mt-4">Body Mass Index</NeumorphicBadge>
                    </div>

                    <div className="space-y-6">
                      <ForecastRow label={t('planner.title', 'Метаболическая адаптация')} percent={survey.trainingsPerWeek * 12} />
                      <ForecastRow label={t('planner.title', 'Когнитивный потенциал')} percent={survey.sleepGoal * 10} />
                      <ForecastRow label={t('planner.title', 'Индекс долголетия')} percent={75} />
                    </div>

                    <NeumorphicButton className="w-full" onClick={() => setShowPlanModal(true)}>
                      {t('planner.title', 'Сгенерировать Blueprint')}
                    </NeumorphicButton>
                  </div>
                </NeumorphicCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 12. Dashboard Preview */}
      <section className="py-32 px-8 bg-warmBeige-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader number="12" title="Dashboard Preview" subtitle={t('dashboard.title', 'Ваш центр управления жизнью')} />
          <DashboardDemo lang={lang} />
        </div>
      </section>

      {/* 16, 17, 18. Roadmap & Stats */}
      <section className="py-32 px-8 bg-warmGray-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeader number="16" title="Roadmap & Stats" subtitle={t('roadmap.title', 'Путь развития и метрики')} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <NeumorphicCard className="p-6">
              <h3 className="text-2xl font-semibold mb-6">{t('roadmap.title', 'Дорожная карта 2025')}</h3>
              <div className="space-y-8">
                <RoadmapItem quarter="Q1" title={t('roadmap.title', 'Запуск и база')} items={['✅ MVP', '✅ Landing', '⏳ Token sale']} active />
                <RoadmapItem quarter="Q2" title={t('roadmap.title', 'Масштабирование')} items={['⏳ Android App', '⏳ AI Health+', '⏳ 10,000 users']} />
                <RoadmapItem quarter="Q3" title={t('roadmap.title', 'Экосистема')} items={['⏳ DAO Governance', '⏳ Crypto integration', '⏳ 50,000 users']} />
                <RoadmapItem quarter="Q4" title={t('roadmap.title', 'Экспансия')} items={['⏳ EU Market', '⏳ Series A ($5M)', '⏳ 200,000 users']} />
              </div>
            </NeumorphicCard>

            <NeumorphicCard className="p-6">
              <h3 className="text-2xl font-semibold mb-6">{t('roadmap.title', 'Прогноз Роста')}</h3>
              <NeumorphicChart
                type="bar"
                data={GROWTH_DATA.map(d => ({ label: d.month, value: d.users }))}
                height={200}
                showLabels={true}
              />
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="text-center p-4 border border-warmGraphite-800/10 rounded-lg">
                  <div className="text-2xl font-bold font-mono">1M+</div>
                  <div className="text-xs uppercase opacity-60">Target 2026</div>
                </div>
                <div className="text-center p-4 border border-warmGraphite-800/10 rounded-lg">
                  <div className="text-2xl font-bold font-mono">$10M+</div>
                  <div className="text-xs uppercase opacity-60">Target ARR</div>
                </div>
              </div>
            </NeumorphicCard>
          </div>
        </div>
      </section>

      {/* 19. Economics & Tokenomics */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <SectionHeader number="19" title="Economics" subtitle={t('economics.title', 'Токеномика NVT и модель монетизации')} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <NeumorphicCard className="p-6">
              <h3 className="text-xl font-semibold mb-6">{t('economics.title', 'Распределение NVT')}</h3>
              <NeumorphicChart
                type="pie"
                data={TOKENOMICS.map(t => ({ label: t.name, value: t.value, color: t.color }))}
                height={300}
                showLabels={true}
              />
              <div className="grid grid-cols-2 gap-4 mt-8">
                {TOKENOMICS.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded" style={{ background: item.color }} />
                    <span className="opacity-70">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </NeumorphicCard>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <NeumorphicCard className="p-6">
              <h3 className="text-xl font-semibold mb-6">{t('economics.title', 'Модель монетизации')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EconomicsItem label={t('economics.title', 'B2C Подписки')} desc={t('economics.title', 'Повторяющиеся доходы от пользователей.')} />
                <EconomicsItem label={t('economics.title', 'B2B Кабинеты')} desc={t('economics.title', 'Плата за проф. аккаунты специалистов.')} />
                <EconomicsItem label={t('economics.title', 'Комиссия маркетплейса')} desc={t('economics.title', 'Доля от продаж услуг и товаров.')} />
                <EconomicsItem label={t('economics.title', 'Партнерские программы')} desc={t('economics.title', 'Рекламные и интеграционные доходы.')} />
              </div>
              <div className="mt-12 pt-8 border-t border-warmGraphite-800/10">
                <h5 className="font-semibold mb-4 uppercase text-sm">{t('economics.title', 'Финансирование')}</h5>
                <div className="flex gap-12">
                  <div>
                    <div className="text-3xl font-mono font-bold">$500K</div>
                    <div className="text-xs opacity-60">Seed Round</div>
                  </div>
                  <div>
                    <div className="text-3xl font-mono font-bold">$5M</div>
                    <div className="text-xs opacity-60">Series A Target</div>
                  </div>
                </div>
              </div>
            </NeumorphicCard>
          </div>
        </div>
      </section>

      {/* 22. Subscriptions */}
      <section className="py-32 px-8 bg-warmGraphite-800 text-warmBeige-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeader number="22" title="Subscriptions" subtitle={t('subscriptions.title', 'Подписка на здоровье, которая работает')} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <PriceCard 
              title={t('subscriptions.basic', 'Базовый')} 
              price={t('subscriptions.basic', 'Бесплатно')} 
              items={[t('subscriptions.basic', 'Дневник здоровья'), t('subscriptions.basic', 'Базовый ИИ-план'), t('subscriptions.basic', 'Сообщество')]} 
            />
            <PriceCard 
              title={t('subscriptions.premium', 'Премиум')} 
              price="$25/мес" 
              popular
              items={[t('subscriptions.premium', 'Личный ИИ-коуч 24/7'), t('subscriptions.premium', 'Глубокая аналитика'), t('subscriptions.premium', 'Скидки в магазине')]} 
            />
            <PriceCard 
              title={t('subscriptions.specialist', 'Специалист')} 
              price="$49/мес" 
              items={[t('subscriptions.specialist', 'Управление клиентами'), t('subscriptions.specialist', 'Встроенный биллинг'), t('subscriptions.specialist', 'Профиль в каталоге')]} 
            />
            <PriceCard 
              title={t('subscriptions.business', 'Бизнес')} 
              price={t('subscriptions.business', 'По запросу')} 
              items={[t('subscriptions.business', 'Командные дашборды'), t('subscriptions.business', 'HR-интеграции'), t('subscriptions.business', 'Групповые программы')]} 
            />
          </div>
        </div>
      </section>

      {/* 23. FAQ Section */}
      <section className="py-32 px-8 max-w-4xl mx-auto">
        <SectionHeader number="23" title="FAQ" subtitle={t('faq.title', 'Часто задаваемые вопросы')} />
        <NeumorphicAccordion
          items={[
            {
              id: 'faq-1',
              title: t('faq.q1', 'Как работает ИИ-планировщик?'),
              content: t('faq.a1', 'ИИ анализирует ваши цели, предпочтения и данные трекеров, создавая динамический план, который адаптируется ежедневно.'),
            },
            {
              id: 'faq-2',
              title: t('faq.q2', 'Безопасны ли мои данные?'),
              content: t('faq.a2', 'Все данные шифруются по стандарту AES-256 и соответствуют требованиям GDPR и HIPAA.'),
            },
            {
              id: 'faq-3',
              title: t('faq.q3', 'Можно ли использовать бесплатно?'),
              content: t('faq.a3', 'Да, базовая версия с дневником и базовыми планами доступна бесплатно навсегда.'),
            },
          ]}
        />
      </section>

      {/* 24. Final CTA */}
      <section className="py-48 px-8 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto z-10 relative">
          <SectionHeader number="24" title="Start Your Journey" subtitle={t('cta.title', 'Начните путь к полному здоровью')} />
          <p className="text-2xl mb-12 opacity-80 leading-relaxed">
            {t('conclusion.text', 'NexusVita — это экосистема нового поколения, объединяющая данные, людей, технологии и экономику в единой цифровой среде.')}
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <NeumorphicButton 
              primary
              className="px-16 py-8 text-2xl" 
              onClick={async () => {
                const confetti = await loadConfetti()
                if (confetti) {
                  confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } })
                }
                setChatOpen(true)
              }}
            >
              {t('cta.button', 'Начать прямо сейчас')}
            </NeumorphicButton>
          </div>
        </div>
      </section>

      {/* Modals */}
      <EnhancedSectorModal
        sector={selectedSectorData}
        isOpen={!!activeSector}
        onClose={() => setActiveSector(null)}
        lang={lang}
      />

      <EnhancedModuleModal
        module={selectedModuleData}
        isOpen={!!activeModule}
        onClose={() => setActiveModule(null)}
        lang={lang}
      />

      <EnhancedPlanModal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        survey={survey}
        lang={lang}
      />
    </div>
  )
}

// --- Sub-components ---

function BackgroundTexture() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
      <div className="absolute top-20 left-10 w-[500px] h-[500px] border border-warmGraphite-800 rounded-full" />
      <div className="absolute bottom-20 right-10 w-[600px] h-[600px] border border-warmGraphite-800 rotate-45" />
    </div>
  )
}

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-4">
        <NeumorphicBadge variant="info">{number}</NeumorphicBadge>
        <div className="h-px flex-1 bg-warmGraphite-800/10" />
      </div>
      <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight mb-2 uppercase">{title}</h2>
      <p className="text-lg sm:text-xl text-warmGraphite-600 italic">{subtitle}</p>
    </div>
  )
}

function FeatureItem({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-4 p-4 border border-warmGraphite-800/10 rounded-lg hover:bg-warmGraphite-800/5 transition-colors">
      <div className="p-2 bg-warmGraphite-800/10 rounded-lg"><Icon className="w-5 h-5" /></div>
      <span className="font-semibold text-sm">{label}</span>
    </div>
  )
}

function SummaryCard({ active, onClick, title, perspective }: { active: boolean; onClick: () => void; title: string; perspective: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "p-6 border-2 rounded-lg transition-all text-center group",
        active ? "bg-warmGraphite-800 text-warmBeige-50 shadow-lg" : "bg-warmBeige-50 text-warmGraphite-800 hover:bg-warmGraphite-800/5"
      )}
    >
      <div className={cn("w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center transition-colors", active ? "bg-warmBeige-50 text-warmGraphite-800" : "bg-warmGraphite-800 text-warmBeige-50")}>
        {perspective === 'users' ? <Heart className="w-6 h-6" /> : perspective === 'specialists' ? <UserCheck className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
      </div>
      <h4 className="font-semibold uppercase tracking-widest text-xs">{title}</h4>
    </button>
  )
}

function ProductLine({ icon: Icon, label, sub }: { icon: any; label: string; sub: string }) {
  return (
    <div className="flex gap-4 items-center">
      <div className="w-12 h-12 bg-warmGraphite-800 text-warmBeige-50 rounded-lg flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h5 className="font-semibold text-lg">{label}</h5>
        <p className="text-xs opacity-60 uppercase font-mono">{sub}</p>
      </div>
    </div>
  )
}

function ProblemItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 bg-warmGraphite-800 rounded-full" />
      <span className="text-sm font-semibold opacity-80">{label}</span>
    </div>
  )
}

function SliderInput({ label, min, max, value, onChange, unit }: { label: string; min: number; max: number; value: number; onChange: (v: number) => void; unit: string }) {
  return (
    <div className="space-y-4 py-4">
      <div className="flex justify-between items-end">
        <label className="font-mono text-xs uppercase text-warmGraphite-600">{label}</label>
        <span className="font-serif text-2xl font-bold text-warmGraphite-800">{value}{unit}</span>
      </div>
      <div className="relative h-12 flex items-center">
        <div className="absolute inset-0 bg-warmGraphite-800/5 rounded-lg neumorphic-card-soft" />
        <input 
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-full opacity-0 cursor-pointer z-20"
        />
        <motion.div 
          className="absolute left-0 h-full bg-warmGraphite-800/10 rounded-l-lg"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        />
        <motion.div 
          className="absolute w-8 h-12 bg-warmBeige-50 border-2 border-warmGraphite-800 rounded-lg neumorphic-card z-10"
          style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 16px)` }}
        />
      </div>
    </div>
  )
}

function ForecastRow({ label, percent }: { label: string; percent: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] uppercase font-mono opacity-60">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 bg-warmGraphite-800/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-warmGraphite-800 opacity-40"
        />
      </div>
    </div>
  )
}

function RoadmapItem({ quarter, title, items, active }: { quarter: string; title: string; items: string[]; active?: boolean }) {
  return (
    <div className={cn("flex gap-8 group", active ? "opacity-100" : "opacity-40 hover:opacity-100 transition-opacity")}>
      <div className={cn("w-16 h-16 border-2 border-warmGraphite-800 rounded-lg flex items-center justify-center font-mono text-xl font-bold shrink-0 bg-warmBeige-50 group-hover:bg-warmGraphite-800 group-hover:text-warmBeige-50 transition-colors")}>
        {quarter}
      </div>
      <div className="space-y-2">
        <h5 className="text-xl font-semibold font-serif">{title}</h5>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {items.map((it, i) => (
            <span key={i} className="text-xs italic opacity-80">{it}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function EconomicsItem({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="p-4 bg-warmGraphite-800/5 border border-warmGraphite-800/10 rounded-lg">
      <h6 className="font-semibold mb-1 uppercase text-xs">{label}</h6>
      <p className="text-xs opacity-60 leading-tight">{desc}</p>
    </div>
  )
}

function PriceCard({ title, price, items, popular }: { title: string; price: string; items: string[]; popular?: boolean }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="h-full">
      <NeumorphicCard className={cn("h-full flex flex-col items-center text-center p-6", popular && "border-2 border-warmBeige-50 ring-4 ring-warmBeige-50/5")}>
        {popular && <NeumorphicBadge variant="info" className="mb-6 bg-warmBeige-50 text-warmGraphite-800">Popular choice</NeumorphicBadge>}
        <h4 className="text-2xl font-semibold mb-2 uppercase tracking-tighter text-warmBeige-50">{title}</h4>
        <div className="text-4xl font-mono font-bold mb-8 text-warmBeige-50">{price}</div>
        <div className="w-full h-px bg-warmBeige-50/10 mb-8" />
        <ul className="space-y-4 mb-12 flex-1 w-full text-left text-sm opacity-80">
          {items.map((it, i) => (
            <li key={i} className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> {it}</li>
          ))}
        </ul>
        <NeumorphicButton primary={popular} className="w-full py-4 text-sm">
          Get Started
        </NeumorphicButton>
      </NeumorphicCard>
    </motion.div>
  )
}

function DashboardDemo({ lang }: { lang: string }) {
  const [activeTab, setActiveTab] = useState('daily')
  const { t: tI18n } = useI18n()
  const t = (key: string, fallback?: string) => {
    const translation = tI18n(key)
    return translation !== key ? translation : (fallback || key)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      <div className="lg:col-span-4 space-y-4">
        {['daily', 'ai', 'experts', 'plan'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "w-full p-6 text-left border-2 rounded-lg transition-all",
              activeTab === tab ? "bg-warmGraphite-800 text-warmBeige-50 shadow-lg scale-105 z-10" : "bg-warmBeige-50 text-warmGraphite-800 opacity-60 hover:opacity-100"
            )}
          >
            <h4 className="font-semibold uppercase text-xs font-mono mb-2">{tab}</h4>
            <div className="text-xl font-serif font-semibold">
              {tab === 'daily' && t('dashboard.journal.title', 'Ежедневник')}
              {tab === 'ai' && t('dashboard.ai.title', 'ИИ-Рекомендации')}
              {tab === 'experts' && t('dashboard.specialists.title', 'Специалисты')}
              {tab === 'plan' && t('dashboard.preview.title', 'Мой План')}
            </div>
          </button>
        ))}
      </div>

      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full"
          >
            <NeumorphicCard className="h-full border-warmGraphite-800 bg-white/40 min-h-[400px] p-6">
              {activeTab === 'daily' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <NeumorphicBadge variant="info">Today / Feb 10, 2026</NeumorphicBadge>
                    <Sparkles className="text-warmGraphite-800/40" />
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 border border-warmGraphite-800/10 rounded-lg italic opacity-70">
                      {t('dashboard.journal.description', 'Заметки о дне: Чувствую бодрость, сон был глубоким...')}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border-2 border-warmGraphite-800 rounded-lg">
                        <div className="text-sm uppercase font-mono mb-1">{t('dashboard.journal.feature2', 'Настроение')}</div>
                        <div className="text-2xl">😊 Radiant</div>
                      </div>
                      <div className="p-4 border-2 border-warmGraphite-800 rounded-lg">
                        <div className="text-sm uppercase font-mono mb-1">{t('dashboard.journal.feature3', 'Энергия')}</div>
                        <div className="text-2xl">⚡ High</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'ai' && (
                <div className="space-y-6">
                  <div className="p-6 bg-warmGraphite-800 text-warmBeige-50 rounded-lg">
                    <h5 className="font-semibold text-xl mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5" /> Nexus AI Agent</h5>
                    <p className="opacity-80 italic">
                      {t('dashboard.ai.description', 'Ваш уровень кортизола повысился за последние 3 дня. Рекомендуем снизить интенсивность тренировок и добавить 15 минут дыхательных практик.')}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <FeatureItem icon={Activity} label={t('dashboard.ai.feature4', 'Адаптивный план питания')} />
                    <FeatureItem icon={Moon} label={t('dashboard.ai.feature3', 'Оптимизация сна')} />
                  </div>
                </div>
              )}
              {activeTab === 'experts' && (
                <div className="space-y-6">
                  <div className="flex gap-4 p-4 border border-warmGraphite-800/10 rounded-lg">
                    <div className="w-16 h-16 bg-warmGraphite-800/10 rounded-lg flex items-center justify-center font-semibold">JD</div>
                    <div className="flex-1">
                      <h6 className="font-semibold">Dr. James Da Vinci</h6>
                      <p className="text-xs opacity-60">Longevity Specialist</p>
                      <div className="mt-2 flex gap-2">
                        <NeumorphicButton primary className="px-3 py-1 text-xs">{t('dashboard.specialists.feature1', 'Чат')}</NeumorphicButton>
                        <NeumorphicButton className="px-3 py-1 text-xs">{t('dashboard.specialists.feature4', 'История')}</NeumorphicButton>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'plan' && (
                <div className="space-y-8">
                  <NeumorphicChart
                    type="bar"
                    data={[
                      { label: t('dashboard.preview.training', 'Training'), value: 40 },
                      { label: t('dashboard.preview.recovery', 'Rest'), value: 35 },
                      { label: t('dashboard.preview.psyche', 'Mental'), value: 25 },
                    ]}
                    height={200}
                    showLabels={true}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border-2 border-warmGraphite-800 rounded-lg">
                      <div className="text-[10px] font-mono opacity-60 mb-1">{t('dashboard.preview.title', 'Ближайшее событие')}</div>
                      <div className="text-sm font-semibold italic">Yoga Flow @ 18:00</div>
                    </div>
                    <div className="p-4 border-2 border-warmGraphite-800 rounded-lg">
                      <div className="text-[10px] font-mono opacity-60 mb-1">{t('dashboard.preview.title', 'Задач сегодня')}</div>
                      <div className="text-sm font-semibold italic">4 / 6 completed</div>
                    </div>
                  </div>
                </div>
              )}
            </NeumorphicCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// --- Enhanced Modals with Full Information ---

function EnhancedSectorModal({ sector, isOpen, onClose, lang }: { sector: any; isOpen: boolean; onClose: () => void; lang: string }) {
  const { t: tI18n } = useI18n()
  
  if (!sector) return null
  const t = (key: string, fallback?: string) => {
    const translation = tI18n(key)
    return translation !== key ? translation : (fallback || key)
  }

  return (
    <NeumorphicModal
      isOpen={isOpen}
      onClose={onClose}
      title={sector.title}
      size="xl"
    >
      <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">
        <div className={`text-${sector.color}-500 text-6xl mb-4 flex justify-center`}>
          {(() => {
            if (!sector.icon || typeof sector.icon !== 'string') return null
            const IconComponent = getIcon(sector.icon)
            if (!IconComponent || typeof IconComponent !== 'function') return null
            return <IconComponent className="w-16 h-16" />
          })()}
        </div>
        <p className="text-lg text-warmGraphite-600 text-center">
          {sector.description}
        </p>
        
        <NeumorphicTabs
          tabs={[
            {
              id: 'features',
              label: t('Функции', 'Features'),
              content: (
                <div>
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-4">
                    {t('Функции и возможности', 'Functions and Capabilities')}
                  </h3>
                  <ul className="space-y-2">
                    {sector.details.features.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-base text-warmGraphite-700">
                        <CheckCircle2 className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            },
            {
              id: 'benefits',
              label: t('Преимущества', 'Benefits'),
              content: (
                <div>
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-4">
                    {t('Преимущества', 'Benefits')}
                  </h3>
                  <ul className="space-y-2">
                    {sector.details.benefits.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-base text-warmGraphite-700">
                        <Sparkles className="w-5 h-5 text-warmYellow-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            },
            {
              id: 'examples',
              label: t('Примеры', 'Examples'),
              content: (
                <div>
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-4">
                    {t('Примеры использования', 'Usage Examples')}
                  </h3>
                  <ul className="space-y-2">
                    {sector.details.examples.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-base text-warmGraphite-700">
                        <Zap className="w-5 h-5 text-warmBlue-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </div>
    </NeumorphicModal>
  )
}

function EnhancedModuleModal({ module, isOpen, onClose, lang }: { module: any; isOpen: boolean; onClose: () => void; lang: string }) {
  const { t: tI18n } = useI18n()
  
  if (!module) return null
  const t = (key: string, fallback?: string) => {
    const translation = tI18n(key)
    return translation !== key ? translation : (fallback || key)
  }

  return (
    <NeumorphicModal
      isOpen={isOpen}
      onClose={onClose}
      title={module.title}
      size="xl"
    >
      <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">
        <div className="text-warmBlue-500 text-6xl mb-4 flex justify-center">
          {(() => {
            if (!module.icon || typeof module.icon !== 'string') return null
            const IconComponent = getIcon(module.icon)
            if (!IconComponent || typeof IconComponent !== 'function') return null
            return <IconComponent className="w-16 h-16" />
          })()}
        </div>
        <p className="text-lg text-warmGraphite-600 text-center">
          {module.description}
        </p>
        
        <NeumorphicTabs
          tabs={[
            {
              id: 'features',
              label: t('Функции', 'Features'),
              content: (
                <div>
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-4">
                    {t('Функции', 'Functions')}
                  </h3>
                  <ul className="space-y-2">
                    {module.features.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-base text-warmGraphite-700">
                        <CheckCircle2 className="w-5 h-5 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            },
            {
              id: 'benefits',
              label: t('Преимущества', 'Benefits'),
              content: (
                <div>
                  <h3 className="text-xl font-semibold text-warmGraphite-800 mb-4">
                    {t('Преимущества', 'Benefits')}
                  </h3>
                  <ul className="space-y-2">
                    {module.benefits.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-base text-warmGraphite-700">
                        <Sparkles className="w-5 h-5 text-warmYellow-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            },
          ]}
        />
      </div>
    </NeumorphicModal>
  )
}

function EnhancedPlanModal({ isOpen, onClose, survey, lang }: { isOpen: boolean; onClose: () => void; survey: any; lang: string }) {
  const { t: tI18n } = useI18n()
  const t = (key: string, fallback?: string) => {
    const translation = tI18n(key)
    return translation !== key ? translation : (fallback || key)
  }

  if (!isOpen) return null

  const planData = {
    level: survey.intensity,
    startDate: new Date().toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US'),
    trainingDays: Math.floor(survey.trainingsPerWeek * 4),
    recoveryDays: Math.floor((7 - survey.trainingsPerWeek) * 4),
    psycheDays: 7,
    specialists: [
      { name: 'Анна Петрова', role: 'Врач-терапевт', specialization: 'Общая медицина' },
      { name: 'Иван Сидоров', role: 'Фитнес-тренер', specialization: 'Силовые тренировки' },
    ],
    weekSchedule: [
      { day: t('Пн', 'Mon'), type: t('Тренировка', 'Training'), activity: 'Power Yoga + HIIT' },
      { day: t('Вт', 'Tue'), type: t('Восстановление', 'Recovery'), activity: 'Recovery + Breathwork' },
      { day: t('Ср', 'Wed'), type: t('Тренировка', 'Training'), activity: 'Zone 2 Cardio' },
      { day: t('Чт', 'Thu'), type: t('Тренировка', 'Training'), activity: 'Strength Training' },
      { day: t('Пт', 'Fri'), type: t('Восстановление', 'Recovery'), activity: 'Yoga Flow' },
      { day: t('Сб', 'Sat'), type: t('Психо-эмоциональное', 'Mental'), activity: 'Meditation + Journaling' },
      { day: t('Вс', 'Sun'), type: t('Восстановление', 'Recovery'), activity: 'Active Rest' },
    ],
  }

  return (
    <NeumorphicModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('plan.title', 'Ваш Персональный План')}
      size="xl"
    >
      <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-2">
        <p className="text-center text-warmGraphite-600 mb-6">
          {t('plan.description', 'План сформирован на основе ваших ответов в презентации. После регистрации он будет доступен в личном кабинете.')}
        </p>

        <NeumorphicTabs
          tabs={[
            {
              id: 'overview',
              label: t('Обзор', 'Overview'),
              content: (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-warmGraphite-800/5 rounded-lg">
                      <div className="text-xs font-mono opacity-60 mb-1">{t('plan.level', 'Уровень плана')}</div>
                      <div className="text-2xl font-semibold">{planData.level}</div>
                    </div>
                    <div className="p-4 bg-warmGraphite-800/5 rounded-lg">
                      <div className="text-xs font-mono opacity-60 mb-1">{t('plan.startDate', 'Старт')}</div>
                      <div className="text-2xl font-semibold">{planData.startDate}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3">{t('plan.load.title', 'Нагрузка')}</h4>
                    <p className="text-sm text-warmGraphite-600 mb-2">{t('plan.load.description', 'Основные тренировки и активные дни.')}</p>
                    <NeumorphicBadge variant="info">{planData.trainingDays} {t('plan.load.days', 'дней с фокусом на тренировках')}</NeumorphicBadge>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3">{t('plan.recovery.title', 'Восстановление и психика')}</h4>
                    <p className="text-sm text-warmGraphite-600 mb-2">{t('plan.recovery.description', 'Дни с практиками восстановления и заботой о психике.')}</p>
                    <NeumorphicBadge variant="success">{planData.recoveryDays} {t('plan.recovery.days', 'дней с мягкими активностями и практиками')}</NeumorphicBadge>
                  </div>
                </div>
              ),
            },
            {
              id: 'schedule',
              label: t('Расписание', 'Schedule'),
              content: (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold mb-4">{t('plan.week.title', 'Пример недели из плана')}</h4>
                  {planData.weekSchedule.map((day, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 border border-warmGraphite-800/10 rounded-lg">
                      <div>
                        <span className="font-semibold">{day.day}</span>
                        <span className="text-xs opacity-60 ml-2">{t('plan.week.type', 'Тип')}: {day.type}</span>
                      </div>
                      <span className="font-semibold italic">{day.activity}</span>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              id: 'specialists',
              label: t('Специалисты', 'Specialists'),
              content: (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold mb-4">{t('plan.specialists.title', 'Специалисты')}</h4>
                  <p className="text-sm text-warmGraphite-600 mb-4">{t('plan.specialists.description', 'Ключевые роли, с которыми вы можете работать.')}</p>
                  {planData.specialists.length > 0 ? (
                    planData.specialists.map((spec, idx) => (
                      <NeumorphicCard key={idx} soft className="p-4">
                        <h5 className="font-semibold">{spec.name}</h5>
                        <p className="text-sm text-warmGraphite-600">{spec.role}</p>
                        <p className="text-xs text-warmGraphite-500 mt-1">{spec.specialization}</p>
                      </NeumorphicCard>
                    ))
                  ) : (
                    <p className="text-sm text-warmGraphite-600 italic">{t('plan.specialists.empty', 'В демо‑версии список специалистов сокращён.')}</p>
                  )}
                </div>
              ),
            },
            {
              id: 'recommendations',
              label: t('Рекомендации', 'Recommendations'),
              content: (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold mb-4">{t('plan.title', 'ИИ-Советы')}</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      <span>{t('plan.title', 'Фокус на повышении фазы глубокого сна для восстановления.')}</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      <span>{t('plan.title', 'Контроль уровня гидратации в дни силовых нагрузок.')}</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-warmGreen-500 mt-0.5 flex-shrink-0" />
                      <span>{t('plan.title', 'Интеграция утренней практики осознанности на 5 минут.')}</span>
                    </li>
                  </ul>
                </div>
              ),
            },
          ]}
        />

        <div className="pt-6 border-t border-warmGraphite-800/10">
          <NeumorphicButton 
            primary
            className="w-full text-lg py-6" 
            onClick={async () => {
              const confetti = await loadConfetti()
              if (confetti) {
                confetti({ particleCount: 200, spread: 100 })
              }
              window.location.href = '/subscriptions?plan=premium'
            }}
          >
            {t('plan.cta.register', 'Зарегистрироваться и забрать план')}
          </NeumorphicButton>
          <button 
            onClick={onClose} 
            className="w-full mt-4 text-xs font-mono opacity-40 hover:opacity-100 uppercase transition-opacity"
          >
            {t('plan.cta.subscriptions', 'Продолжить изучение')}
          </button>
        </div>
      </div>
    </NeumorphicModal>
  )
}

// --- Utilities ---
function calculateBMI(w: number, h: number) {
  return (w / ((h / 100) ** 2)).toFixed(1)
}

function getValuePoints(perspective: string, lang: string) {
  const data: any = {
    users: {
      ru: [
        "Целостная картина здоровья и образа жизни",
        "Единый интерфейс для данных, планов, целей и действий",
        "Персональные рекомендации с учётом динамики и ограничений",
        "Встроенный календарь и планировщик",
        "Социальная среда поддержки и совместных активностей",
        "Доступ к проверенным специалистам и сервисам",
        "Прозрачная модель подписок и вознаграждений"
      ],
      en: [
        "Holistic health picture",
        "Unified data interface",
        "Personalized recommendations",
        "Social environment"
      ]
    },
    specialists: {
      ru: [
        "Доступ к целевой аудитории внутри экосистемы",
        "Контекст данных пользователя (с согласия)",
        "Инструменты управления программами и расписаниями",
        "Встроенная биллинговая инфраструктура",
        "Партнёрские и реферальные механизмы"
      ],
      en: [
        "Access to target audience",
        "Client data context",
        "Management tools",
        "Built-in billing"
      ]
    },
    partners: {
      ru: [
        "Канал продаж услуг и товаров, встроенный в сценарии",
        "Совместные программы с центрами и брендами",
        "Возможность создавать экосистемные проекты",
        "Метрики вовлечённости и эффективности"
      ],
      en: [
        "Sales channel for services",
        "Joint programs",
        "Efficiency metrics",
        "B2B integrations"
      ]
    }
  }
  const perspectiveData = data[perspective]
  if (!perspectiveData) return []
  const langData = perspectiveData[lang]
  if (!Array.isArray(langData)) return []
  return langData
}
