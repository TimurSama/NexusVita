'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, FileText } from 'lucide-react'

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
    // В реальном приложении здесь будет загрузка из API
    // fetch('/api/analyses?userId=...')
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

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      NORMAL: 'bg-green-100 text-green-800',
      LOW: 'bg-yellow-100 text-yellow-800',
      HIGH: 'bg-orange-100 text-orange-800',
      CRITICAL: 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-ink-600 hover:text-ink-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-ink-800 mb-2">
                Медицинские Анализы
              </h1>
              <p className="text-ink-600">
                История ваших лабораторных исследований
              </p>
            </div>
            <button className="px-6 py-3 bg-ink-700 text-white rounded-lg hover:bg-ink-800 transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Добавить анализ
            </button>
          </div>
        </div>

        {/* Список анализов */}
        {loading ? (
          <div className="text-center py-12 text-ink-600">Загрузка...</div>
        ) : analyses.length === 0 ? (
          <div className="text-center py-12 bg-parchment-200/50 rounded-lg border-2 border-ink-200">
            <FileText className="w-16 h-16 mx-auto mb-4 text-ink-400" />
            <p className="text-ink-600 text-lg mb-4">
              У вас пока нет записей анализов
            </p>
            <button className="px-6 py-3 bg-ink-700 text-white rounded-lg hover:bg-ink-800 transition-colors">
              Добавить первый анализ
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {analyses.map((analysis) => (
              <div
                key={analysis.id}
                className="bg-parchment-200/80 backdrop-blur-sm border-2 border-ink-300 rounded-lg shadow-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-ink-800 mb-1">
                      {getAnalysisTypeLabel(analysis.analysisType)}
                    </h3>
                    <p className="text-ink-600">
                      {new Date(analysis.dateOfAnalysis).toLocaleDateString('ru-RU')}
                    </p>
                    {analysis.sourceLab && (
                      <p className="text-sm text-ink-500 mt-1">
                        {analysis.sourceLab}
                      </p>
                    )}
                  </div>
                </div>

                {/* Показатели */}
                {analysis.indicators.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-ink-700 mb-3">
                      Показатели:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {analysis.indicators.map((indicator, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-parchment-100 rounded border border-ink-200"
                        >
                          <div>
                            <div className="font-medium text-ink-800">
                              {indicator.name}
                            </div>
                            <div className="text-sm text-ink-600">
                              {indicator.value} {indicator.unit}
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              indicator.status
                            )}`}
                          >
                            {indicator.status === 'NORMAL'
                              ? 'Норма'
                              : indicator.status === 'LOW'
                              ? 'Низкий'
                              : indicator.status === 'HIGH'
                              ? 'Высокий'
                              : 'Критический'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


