'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Sparkles, Plus, BookOpen, Calendar, Heart } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicTextarea from '@/components/ui/NeumorphicTextarea'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { cn } from '@/lib/utils/cn'

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
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(!!data?.user?.id)
        setHasSubscription(false)
      })
      .catch(() => setIsAuthenticated(false))

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
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800 mb-2">
            Личный дневник
          </h1>
          <p className="text-base sm:text-lg text-warmGraphite-600">
            Планирование дня, заметки о здоровье и отслеживание прогресса.
          </p>
        </div>

        {/* AI Subscription Banner */}
        {!hasSubscription && (
          <NeumorphicCard
            className="p-4 sm:p-6 bg-gradient-to-r from-warmBlue-50/50 to-warmPink-50/50 border-2 border-warmBlue-200/50 animate-fadeIn"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 neumorphic-card-soft rounded-neumorphic-sm">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-warmBlue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-warmGraphite-800 mb-1 text-base sm:text-lg">
                  AI-помощник в дневнике
                </h3>
                <p className="text-sm text-warmGraphite-700 mb-3">
                  Получите персональные рекомендации и анализ ваших записей с помощью AI
                  Health+. Бесплатный тестовый период на 7 дней.
                </p>
                <Link href="/subscriptions">
                  <NeumorphicButton primary className="text-sm">
                    Подключить подписку
                  </NeumorphicButton>
                </Link>
              </div>
            </div>
          </NeumorphicCard>
        )}

        {/* New Entry Form */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-4">
            Новая запись
          </h2>
          <div className="space-y-4">
            <NeumorphicInput
              label="Заголовок"
              placeholder="Например: Сон, Тренировка, Настроение..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <NeumorphicTextarea
              label="Заметка"
              placeholder="Что важного сегодня? Как вы себя чувствуете?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={6}
              showCounter
              maxLength={1000}
            />
            <NeumorphicButton
              primary
              onClick={handleSave}
              disabled={!title.trim() || !note.trim()}
              className="w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Сохранить запись
            </NeumorphicButton>
          </div>
        </NeumorphicCard>

        {/* Entries List */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-warmBlue-600" />
            <h2 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
              История записей
            </h2>
          </div>
          {entries.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-warmGray-400" />
              <p className="text-warmGray-600">Пока нет записей. Создайте первую запись выше.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry, index) => (
                <NeumorphicCard
                  key={entry.id}
                  soft
                  className="p-4 hover:scale-[1.01] transition-all duration-300 animate-fadeIn"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-warmGraphite-800 text-base sm:text-lg">
                      {entry.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-warmGray-600">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(entry.createdAt).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-warmGraphite-700 whitespace-pre-wrap leading-relaxed">
                    {entry.note}
                  </p>
                </NeumorphicCard>
              ))}
            </div>
          )}
        </NeumorphicCard>
      </div>
    </div>
  )
}
