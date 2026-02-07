'use client'

import { useState } from 'react'
import { Upload, FileText, CheckCircle, AlertTriangle } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'

type ImportResult = {
  id: string
  fileName: string
  size: number
  status: string
}

export default function ImportsPage() {
  const [result, setResult] = useState<ImportResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [type, setType] = useState('analysis')

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!file) {
      setError('Выберите файл для загрузки')
      return
    }
    setError(null)
    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)

    const response = await fetch('/api/imports/medical', {
      method: 'POST',
      body: formData,
    })

    setLoading(false)
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось загрузить файл')
      return
    }
    const data = await response.json()
    setResult(data)
    setFile(null)
  }

  return (
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        <header className="animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800">Импорт данных</h1>
          <p className="text-base sm:text-lg text-warmGraphite-600 mt-2">
            Загрузите результаты анализов или выписки (PDF/CSV). Мы преобразуем их в
            структурированные записи.
          </p>
        </header>

        <NeumorphicCard
          soft
          className="p-4 sm:p-6 bg-warmPink-50/50 border-2 border-warmPink-200/50 animate-fadeIn"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warmPink-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-warmGraphite-700">
              ⚠️ Интеграции с клиниками и FHIR в разработке. Сейчас импорт работает как прием
              файлов и создание черновика.
            </p>
          </div>
        </NeumorphicCard>

        <form onSubmit={handleUpload} className="space-y-4">
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-warmGraphite-700 mb-2">
                  Файл
                </label>
                <input
                  type="file"
                  accept=".pdf,.csv"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="neumorphic-input w-full"
                  required
                />
                {file && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-warmGray-600">
                    <FileText className="w-3 h-3" />
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-warmGraphite-700 mb-2">
                  Тип данных
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="neumorphic-input w-full"
                >
                  <option value="analysis">Анализы</option>
                  <option value="discharge">Выписки</option>
                  <option value="vaccination">Вакцинации</option>
                </select>
              </div>
              {error && (
                <NeumorphicCard
                  soft
                  className="p-3 bg-warmRed-50 border-2 border-warmRed-200"
                >
                  <p className="text-sm text-warmRed-700">{error}</p>
                </NeumorphicCard>
              )}
              <NeumorphicButton
                primary
                type="submit"
                disabled={loading || !file}
                className="w-full sm:w-auto"
              >
                <Upload className="w-4 h-4 mr-2" />
                {loading ? 'Загрузка...' : 'Импортировать'}
              </NeumorphicButton>
            </div>
          </NeumorphicCard>
        </form>

        {result && (
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-warmGreen-600" />
              <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
                Черновик импорта
              </h2>
            </div>
            <div className="space-y-2 text-sm text-warmGraphite-700">
              <div>
                <span className="font-medium">Файл:</span> {result.fileName} ·{' '}
                {Math.round(result.size / 1024)} KB
              </div>
              <div>
                <span className="font-medium">Статус:</span>{' '}
                <NeumorphicBadge variant="info" size="sm">
                  {result.status}
                </NeumorphicBadge>
              </div>
            </div>
          </NeumorphicCard>
        )}
      </div>
    </div>
  )
}
