'use client'

import { useState } from 'react'

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

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(event.currentTarget)
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
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-ink-800">Импорт данных</h1>
          <p className="text-ink-600">
            Загрузите результаты анализов или выписки (PDF/CSV). Мы преобразуем
            их в структурированные записи.
          </p>
        </header>

        <div className="sketch-card p-4 text-sm text-ink-700">
          ⚠️ Интеграции с клиниками и FHIR в разработке. Сейчас импорт работает как
          прием файлов и создание черновика.
        </div>

        <form onSubmit={handleUpload} className="sketch-card p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-ink-700">Файл</label>
            <input
              type="file"
              name="file"
              accept=".pdf,.csv"
              className="sketch-input"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-ink-700">Тип данных</label>
            <select name="type" className="sketch-input" defaultValue="analysis">
              <option value="analysis">Анализы</option>
              <option value="discharge">Выписки</option>
              <option value="vaccination">Вакцинации</option>
            </select>
          </div>
          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}
          <button className="sketch-button" type="submit" disabled={loading}>
            {loading ? 'Загрузка...' : 'Импортировать'}
          </button>
        </form>

        {result && (
          <div className="sketch-card p-6">
            <h2 className="text-2xl font-semibold text-ink-800 mb-2">
              Черновик импорта
            </h2>
            <div className="text-sm text-ink-700">
              Файл: {result.fileName} · {Math.round(result.size / 1024)} KB
            </div>
            <div className="text-sm text-ink-600 mt-2">
              Статус: {result.status}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
