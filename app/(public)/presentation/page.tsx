'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import { sectors, modules } from '@/components/presentation/data'
import { questions } from '@/components/presentation/questions'
import HeroSection from '@/components/presentation/HeroSection'
import ExecutiveSummarySection from '@/components/presentation/ExecutiveSummarySection'
import EcosystemOverviewSection from '@/components/presentation/EcosystemOverviewSection'
import MarketAnalysisSection from '@/components/presentation/MarketAnalysisSection'
import ArchitectureSection from '@/components/presentation/ArchitectureSection'
import BodyExplorerSection from '@/components/presentation/BodyExplorerSection'
import ProductModulesSection from '@/components/presentation/ProductModulesSection'
import SectorsSection from '@/components/presentation/SectorsSection'
import ModulesSection from '@/components/presentation/ModulesSection'
import AIPlannerSection from '@/components/presentation/AIPlannerSection'
import DashboardPreviewSection from '@/components/presentation/DashboardPreviewSection'
import UserFlowsSection from '@/components/presentation/UserFlowsSection'
import SpecialistsSection from '@/components/presentation/SpecialistsSection'
import MarketplaceSection from '@/components/presentation/MarketplaceSection'
import RoadmapSection from '@/components/presentation/RoadmapSection'
import EconomicsSection from '@/components/presentation/EconomicsSection'
import EconomicsModelSection from '@/components/presentation/EconomicsModelSection'
import GrowthStrategySection from '@/components/presentation/GrowthStrategySection'
import SubscriptionsSection from '@/components/presentation/SubscriptionsSection'
import FAQSection from '@/components/presentation/FAQSection'
import CTASection from '@/components/presentation/CTASection'
import ConclusionSection from '@/components/presentation/ConclusionSection'
import PresentationFooter from '@/components/presentation/PresentationFooter'
import ChatWidget from '@/components/presentation/ChatWidget'
import SectorModal from '@/components/presentation/SectorModal'
import ModuleModal from '@/components/presentation/ModuleModal'
import PlanModal from '@/components/presentation/PlanModal'
import PresentationPlannerPane from '@/components/presentation/PresentationPlannerPane'
import TrainingNutritionInteractive from '@/components/presentation/TrainingNutritionInteractive'

export default function PresentationPage() {
  const router = useRouter()
  
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [chatOpen, setChatOpen] = useState(true)
  const [showPlan, setShowPlan] = useState(false)
  const [chatContext, setChatContext] = useState<string | null>('general')

  // Автоматическое переключение контекста чата по видимой секции
  useEffect(() => {
    if (typeof window === 'undefined') return

    const sectionContextMap: Record<string, string> = {
      ecosystem: 'general',
      'ai-planner': 'sport',
      'body-explorer': 'body-explorer',
      'product-modules': 'product-modules',
      'user-flows': 'user-flows',
      roadmap: 'general',
      economics: 'general',
      specialists: 'psyche',
      marketplace: 'nutrition',
      dashboard: 'dashboard',
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]

        if (!visible) return
        const id = visible.target.id
        const mapped = sectionContextMap[id]
        if (mapped && chatOpen) {
          setChatContext(mapped)
        }
      },
      {
        threshold: [0.3, 0.6],
      }
    )

    const ids = Object.keys(sectionContextMap)
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [chatOpen])

  const handleStartClick = () => {
    setChatOpen(true)
    setChatContext('general')
  }

  const handleSubscribeClick = () => {
    router.push('/subscriptions')
  }

  const handleSectorClick = (sectorId: string) => {
    setSelectedSector(sectorId)
    setChatOpen(true)
    // Приводим id сектора к подходящему контексту чата
    if (sectorId === 'sport') setChatContext('sport')
    else if (sectorId === 'nutrition') setChatContext('nutrition')
    else if (sectorId === 'sleep') setChatContext('sleep')
    else if (sectorId === 'psycho') setChatContext('psyche')
    else if (sectorId === 'social') setChatContext('social')
    else if (sectorId === 'prevention') setChatContext('prevention')
    else if (sectorId === 'medicine') setChatContext('medicine')
    else setChatContext('general')
  }

  const handleModuleClick = (moduleId: string) => {
    setSelectedModule(moduleId)
    setChatOpen(true)
    // Для модулей маппим к близким по смыслу контекстам
    if (moduleId === 'journal') setChatContext('psyche')
    else if (moduleId === 'ai-planner') setChatContext('sport')
    else if (moduleId === 'marketplace') setChatContext('nutrition')
    else if (moduleId === 'calendar') setChatContext('sleep')
    else setChatContext('general')
  }

  const handleChatComplete = () => {
    setChatOpen(false)
          setShowPlan(true)
      }

  const handleSubscribe = (planId: string) => {
    router.push(`/subscriptions?plan=${planId}`)
  }

  const selectedSectorData = selectedSector ? sectors.find(s => s.id === selectedSector) ?? null : null
  const selectedModuleData = selectedModule ? modules.find(m => m.id === selectedModule) ?? null : null

  return (
    <div className="min-h-screen relative">
      <HeroSection 
        onStartClick={handleStartClick}
        onSubscribeClick={handleSubscribeClick}
        onSectorClick={handleSectorClick}
      />

      <ExecutiveSummarySection />

      <EcosystemOverviewSection />

      <MarketAnalysisSection />

      <ArchitectureSection />

      <BodyExplorerSection />

      <ProductModulesSection />

      {/* Интерактив по тренировкам и питанию рядом с модулями */}
      <section className="py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 bg-warmGray-50/60">
        <div className="max-w-6xl mx-auto space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-warmGraphite-800">
            Как часто вы готовы тренироваться и как питаться?
          </h2>
          <p className="text-xs sm:text-sm text-warmGraphite-600 max-w-2xl">
            Используйте интерактивное колесо для настройки частоты тренировок и таргета по
            калориям. Эти значения используются в демо‑плане и помогают лучше показать
            инвестору, как будет выглядеть реальная персонализация.
          </p>
          <TrainingNutritionInteractive />
        </div>
      </section>

      <SectorsSection onSectorClick={handleSectorClick} />

      <ModulesSection onModuleClick={handleModuleClick} />

      <AIPlannerSection onTryClick={handleStartClick} />

      {/* Интерактивный блок заполнения данных под план прямо в презентации */}
      <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-warmGray-50/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-warmGraphite-800 mb-3 sm:mb-4 text-center">
            Настройте свой профиль по ходу презентации
          </h2>
          <p className="text-sm sm:text-base text-warmGraphite-600 mb-4 sm:mb-6 text-center max-w-2xl mx-auto">
            Пока вы изучаете экосистему Nexus Vita, мы параллельно собираем ключевые данные о вас,
            чтобы в конце показать предварительный персональный план и предложить пробный период
            AI‑подписки.
          </p>
          <div className="max-w-xl mx-auto">
            <PresentationPlannerPane />
          </div>
        </div>
      </section>

      <DashboardPreviewSection
        onTryClick={handleStartClick}
        onSubscribeClick={handleSubscribeClick}
      />

      <UserFlowsSection />

      <SpecialistsSection />

      <MarketplaceSection />

      <RoadmapSection />

      <EconomicsSection />

      <EconomicsModelSection />

      <GrowthStrategySection />

      <SubscriptionsSection onSubscribe={handleSubscribe} />

      <FAQSection />

      <CTASection 
        onStartClick={handleStartClick}
        onSubscribeClick={handleSubscribeClick}
      />

      <ConclusionSection />

      <PresentationFooter />

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
            onClick={handleStartClick}
            className="rounded-full p-3 sm:p-4 shadow-lg"
          >
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
          </NeumorphicButton>
        </motion.div>
      )}

      {/* Modals */}
      <SectorModal
        sector={selectedSectorData}
            isOpen={!!selectedSector}
            onClose={() => setSelectedSector(null)}
      />

      <ModuleModal
        module={selectedModuleData}
            isOpen={!!selectedModule}
            onClose={() => setSelectedModule(null)}
      />

      <PlanModal
            isOpen={showPlan}
            onClose={() => setShowPlan(false)}
      />
    </div>
  )
}
