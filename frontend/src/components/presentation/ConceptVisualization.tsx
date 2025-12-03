'use client'

import { motion } from 'framer-motion'

interface ConceptVisualizationProps {
  concept: {
    id: string
    title: string
    visualizations: string[]
  }
}

export default function ConceptVisualization({ concept }: ConceptVisualizationProps) {
  return (
    <div className="mt-8">
      <h4 className="text-xl font-bold mb-4">Визуализация компонентов:</h4>
      <div className="grid md:grid-cols-2 gap-4">
        {concept.visualizations.map((viz, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-4 bg-ink-50 rounded-lg border-2 border-ink-200 hover:border-accent-turquoise transition-colors"
          >
            <div className="w-3 h-3 rounded-full bg-accent-turquoise"></div>
            <span className="text-ink-700 font-medium">{viz}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

