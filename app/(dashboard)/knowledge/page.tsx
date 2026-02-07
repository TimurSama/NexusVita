'use client'

import { useEffect, useState } from 'react'
import { BookOpen, Plus, CheckCircle, XCircle, ShoppingCart } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicTextarea from '@/components/ui/NeumorphicTextarea'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import NeumorphicModal from '@/components/ui/NeumorphicModal'
import { cn } from '@/lib/utils/cn'

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
  const [showCreateModal, setShowCreateModal] = useState(false)
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
    setShowCreateModal(false)
    setError(null)
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
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-fadeIn">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800">
              Библиотека знаний
            </h1>
            <p className="text-base sm:text-lg text-warmGraphite-600 mt-2">
              Литература, видео и методики от специалистов и сообщества.
            </p>
          </div>
          <NeumorphicButton primary onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Добавить материал
          </NeumorphicButton>
        </header>

        {error && (
          <NeumorphicCard
            soft
            className="p-4 bg-warmRed-50 border-2 border-warmRed-200 animate-shake"
          >
            <p className="text-sm text-warmRed-700">{error}</p>
          </NeumorphicCard>
        )}

        {/* Материалы */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
            Материалы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.length === 0 && (
              <div className="col-span-full text-sm text-warmGray-600 text-center py-12">
                Материалов пока нет. Добавьте первый материал!
              </div>
            )}
            {items.map((item, index) => (
              <NeumorphicCard
                key={item.id}
                soft
                className="p-4 hover:scale-105 transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 neumorphic-card-soft rounded-neumorphic-sm">
                    <BookOpen className="w-4 h-4 text-warmBlue-600" />
                  </div>
                  <NeumorphicBadge
                    variant={item.status === 'VERIFIED' ? 'success' : 'warning'}
                    size="sm"
                  >
                    {item.status === 'VERIFIED' ? 'Проверено' : 'На проверке'}
                  </NeumorphicBadge>
                </div>
                <h3 className="font-semibold text-warmGraphite-800 text-sm sm:text-base mb-1">
                  {item.title}
                </h3>
                <div className="text-xs text-warmGray-600 mb-2">{item.type}</div>
                {item.description && (
                  <p className="text-xs sm:text-sm text-warmGraphite-600 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                )}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((tag) => (
                      <NeumorphicBadge key={tag} variant="info" size="sm">
                        #{tag}
                      </NeumorphicBadge>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-warmGray-300/50">
                  <NeumorphicBadge variant="info" size="sm">
                    {item.priceNXT} NVT
                  </NeumorphicBadge>
                  <div className="flex items-center gap-2">
                    <NeumorphicButton
                      className="text-xs px-3 py-1"
                      onClick={() => handlePurchase(item.id, item.priceNXT)}
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Купить
                    </NeumorphicButton>
                    {item.status !== 'VERIFIED' && (
                      <NeumorphicButton
                        className="text-xs px-3 py-1"
                        onClick={() => handleVerify(item.id, 'VERIFIED')}
                      >
                        <CheckCircle className="w-3 h-3" />
                      </NeumorphicButton>
                    )}
                  </div>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </NeumorphicCard>

        {/* Модальное окно создания */}
        <NeumorphicModal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false)
            setError(null)
          }}
          title="Добавить материал"
          size="md"
        >
          <div className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-warmRed-50 border border-warmRed-200 text-sm text-warmRed-700">
                {error}
              </div>
            )}
            <NeumorphicInput
              label="Название"
              placeholder="Название материала"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <NeumorphicInput
              label="Тип"
              placeholder="книга, видео, протокол"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
            <NeumorphicInput
              label="Ссылка"
              placeholder="URL материала"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
            <NeumorphicTextarea
              label="Описание"
              placeholder="Описание материала"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
            />
            <NeumorphicInput
              label="Теги"
              placeholder="через запятую"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
            <NeumorphicInput
              label="Цена (NVT)"
              type="number"
              placeholder="0"
              value={form.priceNXT}
              onChange={(e) => setForm({ ...form, priceNXT: Number(e.target.value) })}
            />
            <div className="flex items-center gap-3">
              <NeumorphicButton
                primary
                onClick={handleCreate}
                disabled={!form.title.trim()}
                className="flex-1"
              >
                Добавить
              </NeumorphicButton>
              <NeumorphicButton
                onClick={() => {
                  setShowCreateModal(false)
                  setError(null)
                }}
              >
                Отмена
              </NeumorphicButton>
            </div>
          </div>
        </NeumorphicModal>
      </div>
    </div>
  )
}
