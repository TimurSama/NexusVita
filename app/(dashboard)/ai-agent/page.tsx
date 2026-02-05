'use client'

import { useEffect, useState } from 'react'

type Message = {
  id: string
  role: 'user' | 'assistant'
  text: string
}

const initialPlan = [
  { title: 'Сон', detail: 'Отбой 23:00, минимум 7ч 30м' },
  { title: 'Питание', detail: '1800–2100 ккал, белок 1.6 г/кг' },
  { title: 'Тренировки', detail: '3 силовые + 2 кардио' },
  { title: 'Стресс', detail: 'Дыхательные практики 10 мин' },
]

export default function AiAgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'intro',
      role: 'assistant',
      text: 'Я ваш персональный AI агент. Расскажите, что хотите улучшить?',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [planSaved, setPlanSaved] = useState(false)

  useEffect(() => {
    const init = async () => {
      const me = await fetch('/api/auth/me').then((res) => res.json())
      if (!me?.user?.id) {
        setError('Войдите в аккаунт, чтобы использовать AI агента.')
        return
      }
      const session = await fetch('/api/ai-agent/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }).then((res) => res.json())
      if (session?.id) setSessionId(session.id)
    }
    init()
  }, [])

  const handleSend = async () => {
    if (!input.trim()) return
    const userMessage: Message = {
      id: `${Date.now()}-user`,
      role: 'user',
      text: input,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    if (!sessionId) {
      setError('Сессия не создана. Перезагрузите страницу.')
      setLoading(false)
      return
    }
    const response = await fetch('/api/ai-agent/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, message: userMessage.text }),
    })
    setLoading(false)
    const data = await response.json().catch(() => ({}))
    const assistantMessage: Message = {
      id: `${Date.now()}-assistant`,
      role: 'assistant',
      text: data.reply || 'Я уточню ваши данные и составлю план.',
    }
    setMessages((prev) => [...prev, assistantMessage])
  }

  const handleSavePlan = async () => {
    const response = await fetch('/api/ai-agent/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        summary: 'План на 7 дней сформирован AI агентом',
        items: initialPlan,
      }),
    })
    if (response.ok) {
      setPlanSaved(true)
    }
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-ink-800">Персональный AI агент</h1>
            <p className="text-ink-600">
              Следит за показателями, формирует планы и поддерживает диалог.
            </p>
          </div>
          <button className="sketch-button" onClick={handleSavePlan}>
            {planSaved ? 'План сохранен' : 'Сохранить план'}
          </button>
        </header>

        <div className="sketch-card p-4 text-sm text-ink-700">
          AI Health+ — платная функция. Доступен бесплатный тестовый период на 7 дней.
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-6">
          <div className="sketch-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-ink-800">Диалог</h2>
            {error && (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </div>
            )}
            <div className="space-y-3 max-h-[420px] overflow-auto pr-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-lg border ${
                    msg.role === 'assistant'
                      ? 'border-ink-200 bg-parchment-100'
                      : 'border-ink-300 bg-parchment-200'
                  }`}
                >
                  <div className="text-xs text-ink-500 mb-1">
                    {msg.role === 'assistant' ? 'AI агент' : 'Вы'}
                  </div>
                  <div className="text-sm text-ink-800">{msg.text}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <input
                className="sketch-input"
                placeholder="Напишите запрос или цель"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleSend()
                  }
                }}
              />
              <button className="sketch-button" onClick={handleSend} disabled={loading}>
                {loading ? '...' : 'Отправить'}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="sketch-card p-6">
              <h3 className="text-xl font-semibold text-ink-800 mb-3">
                План на 7 дней
              </h3>
              <div className="space-y-3 text-sm text-ink-700">
                {initialPlan.map((item) => (
                  <div
                    key={item.title}
                    className="p-3 rounded-lg border border-ink-200 bg-parchment-100"
                  >
                    <div className="font-semibold text-ink-800">{item.title}</div>
                    <div className="text-xs text-ink-500">{item.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sketch-card p-6">
              <h3 className="text-xl font-semibold text-ink-800 mb-3">Мониторинг</h3>
              <div className="space-y-3 text-sm text-ink-700">
                <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                  Сон: 6ч 40м · ниже нормы
                </div>
                <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                  Стресс: высокий · рекомендации обновлены
                </div>
                <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                  Питание: дефицит белка 12%
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
