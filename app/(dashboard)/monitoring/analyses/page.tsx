'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, FileText, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { cn } from '@/lib/utils/cn'

interface AnalysisRecord {
  id: string
  dateOfAnalysis: string
  analysisType: string
  sourceLab: string | null
  indicators: Array<{
    name: string
    value: number
    unit: string
    status: string
  }>
}

export default function AnalysesPage() {
  const [analyses, setAnalyses] = useState<AnalysisRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setAnalyses([
      {
        id: '1',
        dateOfAnalysis: '2024-01-15',
        analysisType: 'GENERAL_BIOCHEMICAL',
        sourceLab: 'Лаборатория №1',
        indicators: [
          { name: 'Гемоглобин', value: 145, unit: 'г/л', status: 'NORMAL' },
          { name: 'Глюкоза', value: 5.2, unit: 'ммоль/л', status: 'NORMAL' },
        ],
      },
    ])
    setLoading(false)
  }, [])

  const getAnalysisTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      GENERAL_BIOCHEMICAL: 'Общий биохимический',
      HORMONES: 'Гормоны',
      VITAMINS: 'Витамины',
      OTHER: 'Другое',
    }
    return labels[type] || type
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
      NORMAL: 'success',
      LOW: 'warning',
      HIGH: 'warning',
      CRITICAL: 'error',
    }
    return variants[status] || 'info'
  }

  return (
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="mb-6 sm:mb-8 animate-fadeIn">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-warmBlue-600 hover:text-warmBlue-700 mb-4 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800 mb-2">
                Медицинские Анализы
              </h1>
              <p className="text-base sm:text-lg text-warmGraphite-600">
                История ваших лабораторных исследований
              </p>
            </div>
            <NeumorphicButton primary>
              <Plus className="w-4 h-4 mr-2" />
              Добавить анализ
            </NeumorphicButton>
          </div>
        </div>

        {/* Список анализов */}
        {loading ? (
          <NeumorphicCard className="p-8 text-center">
            <p className="text-warmGray-600">Загрузка...</p>
          </NeumorphicCard>
        ) : analyses.length === 0 ? (
          <NeumorphicCard className="p-8 sm:p-12 text-center animate-fadeIn">
            <FileText className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-warmGray-400" />
            <p className="text-warmGraphite-600 text-base sm:text-lg mb-4">
              У вас пока нет записей анализов
            </p>
            <NeumorphicButton primary>Добавить первый анализ</NeumorphicButton>
          </NeumorphicCard>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {analyses.map((analysis, index) => (
              <NeumorphicCard
                key={analysis.id}
                className="p-4 sm:p-6 hover:scale-[1.01] transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-1">
                      {getAnalysisTypeLabel(analysis.analysisType)}
                    </h3>
                    <div className="text-xs sm:text-sm text-warmGray-600">
                      {new Date(analysis.dateOfAnalysis).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                    {analysis.sourceLab && (
                      <div className="text-xs text-warmGray-600 mt-1">
                        {analysis.sourceLab}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  {analysis.indicators.map((indicator, idx) => (
                    <NeumorphicCard
                      key={idx}
                      soft
                      className="p-3 flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-warmGraphite-800 text-sm sm:text-base">
                          {indicator.name}
                        </div>
                        <div className="text-xs text-warmGray-600 mt-0.5">
                          {indicator.value} {indicator.unit}
                        </div>
                      </div>
                      <NeumorphicBadge
                        variant={getStatusBadge(indicator.status)}
                        size="sm"
                        className="ml-3"
                      >
                        {indicator.status === 'NORMAL' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 mr-1" />
                        )}
                        {indicator.status}
                      </NeumorphicBadge>
                    </NeumorphicCard>
                  ))}
                </div>
              </NeumorphicCard>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
