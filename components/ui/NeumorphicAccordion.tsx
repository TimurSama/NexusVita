'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
  icon?: React.ReactNode
}

interface NeumorphicAccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultOpen?: string[]
  className?: string
}

export default function NeumorphicAccordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className,
}: NeumorphicAccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen)

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      if (allowMultiple) {
        return prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      } else {
        return prev.includes(id) ? [] : [id]
      }
    })
  }

  return (
    <div className={cn('space-y-2 sm:space-y-3', className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)

        return (
          <div key={item.id} className="neumorphic-card overflow-hidden">
            <button
              onClick={() => toggleItem(item.id)}
              className={cn(
                'w-full px-4 sm:px-6 py-3 sm:py-4',
                'flex items-center justify-between',
                'text-left transition-colors',
                'hover:bg-warmBeige-50/50'
              )}
            >
              <div className="flex items-center gap-3">
                {item.icon && <span className="text-warmBlue-500">{item.icon}</span>}
                <span className="font-semibold text-warmGraphite-800 text-sm sm:text-base">
                  {item.title}
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-warmGraphite-600" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 text-sm sm:text-base text-warmGraphite-600">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
