'use client'

import { useEffect, useState } from 'react'

type Item = {
  id: string
  title: string
  type: string
  url?: string | null
  description?: string | null
  tags?: string[]
  priceNXT: number
  status: string
}

export default function KnowledgePage() {
  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    title: '',
    type: '',
    url: '',
    description: '',
    tags: '',
    priceNXT: 0,
  })

  useEffect(() => {
    const load = async () => {
      const data = await fetch('/api/knowledge/items').then((res) => res.json())
      setItems(Array.isArray(data) ? data : [])
    }
    load()
  }, [])

  const handleCreate = async () => {
    const response = await fetch('/api/knowledge/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      }),
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось добавить материал')
      return
    }
    const item = await response.json()
    setItems((prev) => [item, ...prev])
    setForm({ title: '', type: '', url: '', description: '', tags: '', priceNXT: 0 })
  }

  const handleVerify = async (itemId: string, status: string) => {
    const response = await fetch('/api/knowledge/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId, status }),
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось подтвердить')
      return
    }
    const updated = await response.json()
    setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)))
  }

  const handlePurchase = async (itemId: string, priceNXT: number) => {
    const response = await fetch('/api/knowledge/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId, priceNXT }),
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось купить')
      return
    }
    setError(null)
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-ink-800">Библиотека знаний</h1>
          <p className="text-ink-600">
            Литература, видео и методики от специалистов и сообщества.
          </p>
        </header>

        {error && (
          <div className="sketch-card p-4 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <section className="sketch-card p-6 space-y-3">
          <h2 className="text-xl font-semibold text-ink-800">Добавить материал</h2>
          <input
            className="sketch-input"
            placeholder="Название"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="sketch-input"
            placeholder="Тип (книга, видео, протокол)"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          />
          <input
            className="sketch-input"
            placeholder="Ссылка"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
          <textarea
            className="sketch-input min-h-[100px]"
            placeholder="Описание"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            className="sketch-input"
            placeholder="Теги через запятую"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
          <input
            className="sketch-input"
            type="number"
            placeholder="Цена (NVT)"
            value={form.priceNXT}
            onChange={(e) => setForm({ ...form, priceNXT: Number(e.target.value) })}
          />
          <button className="sketch-button" onClick={handleCreate}>
            Добавить
          </button>
        </section>

        <section className="sketch-card p-6">
          <h2 className="text-xl font-semibold text-ink-800 mb-4">Материалы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.length === 0 && (
              <div className="text-sm text-ink-600">Материалов пока нет.</div>
            )}
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
              >
                <div className="font-semibold text-ink-800">{item.title}</div>
                <div className="text-xs text-ink-500">{item.type}</div>
                {item.description && (
                  <div className="text-sm text-ink-600 mt-1">{item.description}</div>
                )}
                <div className="text-xs text-ink-500 mt-2">
                  Статус: {item.status} · Цена: {item.priceNXT} NVT
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    className="px-3 py-1 rounded-md border border-ink-300 text-xs text-ink-700 hover:bg-parchment-200"
                    onClick={() => handlePurchase(item.id, item.priceNXT)}
                  >
                    Купить
                  </button>
                  <button
                    className="px-3 py-1 rounded-md border border-ink-300 text-xs text-ink-700 hover:bg-parchment-200"
                    onClick={() => handleVerify(item.id, 'VERIFIED')}
                  >
                    Подтвердить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
