'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
  content: React.ReactNode
}

interface NeumorphicTabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
  onTabChange?: (tabId: string) => void
}

export default function NeumorphicTabs({
  tabs,
  defaultTab,
  className,
  onTabChange,
}: NeumorphicTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content

  return (
    <div className={cn('w-full', className)}>
      <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              'px-4 sm:px-6 py-2 sm:py-3 rounded-neumorphic-sm neumorphic-card-soft',
              'text-sm sm:text-base font-medium transition-all',
              'flex items-center gap-2 whitespace-nowrap',
              activeTab === tab.id
                ? 'text-warmBlue-600 neumorphic-card-pressed'
                : 'text-warmGraphite-600 hover:text-warmGraphite-800'
            )}
          >
            {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTabContent}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
