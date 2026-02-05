'use client'

import { useEffect, useState } from 'react'

type Entry = {
  id: string
  title: string
  note: string
  createdAt: string
}

export default function JournalPage() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [note, setNote] = useState('')

  useEffect(() => {
    setEntries([
      {
        id: '1',
        title: 'Сон',
        note: '7ч 20м, самочувствие хорошее',
        createdAt: new Date().toISOString(),
      },
    ])
  }, [])

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-ink-800">Личный дневник</h1>
            <p className="text-ink-600">
              Планирование дня, заметки о здоровье и отслеживание прогресса.
            </p>
          </div>
          <button className="sketch-button">Создать запись</button>
        </header>

        <div className="sketch-card p-4 text-sm text-ink-700">
          AI‑помощник в дневнике доступен по подписке AI Health+. Есть бесплатный
          тестовый период на 7 дней.
        </div>

        <section className="sketch-card p-6 space-y-3">
          <h2 className="text-xl font-semibold text-ink-800">Новая запись</h2>
          <textarea
            className="sketch-input min-h-[120px]"
            placeholder="Что важного сегодня?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button className="sketch-button">Сохранить</button>
        </section>

        <section className="sketch-card p-6">
          <h2 className="text-xl font-semibold text-ink-800 mb-4">История</h2>
          <div className="space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
              >
                <div className="font-semibold text-ink-800">{entry.title}</div>
                <div className="text-sm text-ink-600 mt-1">{entry.note}</div>
                <div className="text-xs text-ink-500 mt-2">
                  {new Date(entry.createdAt).toLocaleDateString('ru-RU')}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
