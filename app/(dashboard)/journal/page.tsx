'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sparkles, Plus, BookOpen } from 'lucide-react'

type Entry = {
  id: string
  title: string
  note: string
  createdAt: string
}

export default function JournalPage() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [note, setNote] = useState('')
  const [title, setTitle] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasSubscription, setHasSubscription] = useState(false)

  useEffect(() => {
    // Check authentication
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(!!data?.user?.id)
        // Check subscription status (simplified)
        setHasSubscription(false) // Will be implemented with actual subscription check
      })
      .catch(() => setIsAuthenticated(false))

    // Load entries
    setEntries([
      {
        id: '1',
        title: 'Сон',
        note: '7ч 20м, самочувствие хорошее',
        createdAt: new Date().toISOString(),
      },
    ])
  }, [])

  const handleSave = async () => {
    if (!title.trim() || !note.trim()) return

    const newEntry: Entry = {
      id: Date.now().toString(),
      title: title.trim(),
      note: note.trim(),
      createdAt: new Date().toISOString(),
    }

    setEntries([newEntry, ...entries])
    setTitle('')
    setNote('')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Личный дневник</h1>
            <p className="text-gray-600">
              Планирование дня, заметки о здоровье и отслеживание прогресса.
            </p>
          </div>

          {/* AI Subscription Banner */}
          {!hasSubscription && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    AI-помощник в дневнике
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Получите персональные рекомендации и анализ ваших записей с помощью
                    AI Health+. Бесплатный тестовый период на 7 дней.
                  </p>
                  <Link
                    href="/subscriptions"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Подключить подписку
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* New Entry Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Новая запись</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Заголовок
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Например: Сон, Тренировка, Настроение..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Заметка
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Что важного сегодня? Как вы себя чувствуете?"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              <button
                onClick={handleSave}
                disabled={!title.trim() || !note.trim()}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-5 h-5" />
                Сохранить запись
              </button>
            </div>
          </div>

          {/* Entries List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">История записей</h2>
            </div>
            {entries.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Пока нет записей. Создайте первую запись выше.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{entry.title}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(entry.createdAt).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {entry.note}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
