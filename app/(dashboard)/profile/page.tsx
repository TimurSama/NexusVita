'use client'

import { useEffect, useState } from 'react'

const profileSummary = [
  { label: 'Статус', value: 'Активный участник' },
  { label: 'Уровень', value: 'Nexus Core' },
  { label: 'Подписка', value: 'AI Health+' },
  { label: 'KYC', value: 'Не завершен' },
]

const achievementsPreview = [
  { title: '7 дней сна', desc: 'Стабильный режим сна', reward: '+25 NVT' },
  { title: '10 тренировок', desc: 'Регулярность', reward: '+40 NVT' },
]

const privacy = [
  { title: 'Публичный профиль', desc: 'Виден для сообщества', enabled: true },
  { title: 'Обезличенные данные', desc: 'Использование в исследованиях', enabled: true },
  { title: 'Доступ специалистам', desc: 'Доступ к медкарте', enabled: false },
]

export default function ProfilePage() {
  const [integrations, setIntegrations] = useState<
    Array<{ provider: string; status: string }>
  >([])
  const [userId, setUserId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [posts, setPosts] = useState<
    Array<{ id: string; content: string; createdAt: string }>
  >([])
  const [newPost, setNewPost] = useState('')

  const loadIntegrations = async (id: string) => {
    const data = await fetch(`/api/integrations?userId=${id}`).then((res) =>
      res.json()
    )
    setIntegrations(Array.isArray(data) ? data : [])
  }

  const loadPosts = async (id: string) => {
    const data = await fetch(`/api/posts?userId=${id}`).then((res) => res.json())
    setPosts(Array.isArray(data) ? data : [])
  }

  useEffect(() => {
    const load = async () => {
      const me = await fetch('/api/auth/me').then((res) => res.json())
      if (me?.user?.id) {
        setUserId(me.user.id)
        loadIntegrations(me.user.id)
        loadPosts(me.user.id)
      }
    }
    load()
  }, [])

  const handleIntegration = async (provider: string, status: string) => {
    if (!userId) {
      setError('Войдите в аккаунт для подключения интеграций.')
      return
    }
    setError(null)
    if (provider === 'Oura') {
      window.location.href = '/api/oauth/oura/start'
      return
    }
    if (provider === 'Garmin') {
      window.location.href = '/api/oauth/garmin/start'
      return
    }
    await fetch('/api/integrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, provider, status }),
    })
    loadIntegrations(userId)
  }

  const handleCreatePost = async () => {
    if (!userId) {
      setError('Войдите, чтобы создать запись.')
      return
    }
    if (!newPost.trim()) return
    setError(null)
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, content: newPost }),
    })
    setNewPost('')
    loadPosts(userId)
  }

  const handleSync = async (provider: string) => {
    if (!userId) return
    setError(null)
    const endpoint =
      provider === 'Oura'
        ? '/api/integrations/oura/sync'
        : provider === 'Garmin'
        ? '/api/integrations/garmin/sync'
        : null
    if (!endpoint) return
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось синхронизировать данные.')
    }
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-ink-800">Профиль</h1>
            <p className="text-ink-600">
              Управляйте данными, безопасностью и интеграциями.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="sketch-button">Редактировать профиль</button>
            <button className="px-5 py-2.5 rounded-lg border-2 border-ink-300 text-ink-700 hover:bg-parchment-200">
              Пройти KYC
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {profileSummary.map((item) => (
            <div key={item.label} className="sketch-card p-4">
              <div className="text-xs uppercase tracking-widest text-ink-500">
                {item.label}
              </div>
              <div className="text-lg font-semibold text-ink-800 mt-2">
                {item.value}
              </div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-6">
          <div className="sketch-card p-6">
            <h2 className="text-2xl font-semibold text-ink-800 mb-4">
              Основная информация
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-ink-700">
              <div className="p-4 rounded-lg border border-ink-200 bg-parchment-100">
                Имя: Алина В.
              </div>
              <div className="p-4 rounded-lg border border-ink-200 bg-parchment-100">
                Город: Москва · Онлайн
              </div>
              <div className="p-4 rounded-lg border border-ink-200 bg-parchment-100">
                Цели: сон, стресс, сила
              </div>
              <div className="p-4 rounded-lg border border-ink-200 bg-parchment-100">
                Уровень доступа: базовый + AI
              </div>
            </div>
            <div className="mt-4 text-sm text-ink-600">
              Профиль связан с DAO-кошельком и используется для доступа к
              аналитике, подпискам и медкарте.
            </div>
          </div>

          <div className="sketch-card p-6">
            <h2 className="text-2xl font-semibold text-ink-800 mb-4">
              Интеграции и устройства
            </h2>
            {error && (
              <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                {error}
              </div>
            )}
            <div className="space-y-3 text-sm text-ink-700">
              {[
                { provider: 'Apple Health' },
                { provider: 'Garmin' },
                { provider: 'Whoop' },
                { provider: 'Oura' },
              ].map((item) => {
                const integration = integrations.find(
                  (i) => i.provider === item.provider
                )
                const status = integration?.status || 'DISCONNECTED'
                return (
                <div
                  key={item.provider}
                  className="flex items-center justify-between p-3 rounded-lg border border-ink-200 bg-parchment-100"
                >
                  <span>{item.provider}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        status === 'CONNECTED'
                          ? 'bg-green-100 text-green-800'
                          : status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-ink-200 text-ink-700'
                      }`}
                    >
                      {status === 'CONNECTED'
                        ? 'Подключено'
                        : status === 'PENDING'
                        ? 'Ожидает'
                        : 'Не подключено'}
                    </span>
                    <button
                      className="px-3 py-1 rounded-md border border-ink-300 text-xs text-ink-700 hover:bg-parchment-200"
                      onClick={() =>
                        handleIntegration(
                          item.provider,
                          status === 'CONNECTED' ? 'DISCONNECTED' : 'PENDING'
                        )
                      }
                    >
                      {status === 'CONNECTED' ? 'Отключить' : 'Подключить'}
                    </button>
                    {status === 'CONNECTED' &&
                      (item.provider === 'Oura' || item.provider === 'Garmin') && (
                        <button
                          className="px-3 py-1 rounded-md border border-ink-300 text-xs text-ink-700 hover:bg-parchment-200"
                          onClick={() => handleSync(item.provider)}
                        >
                          Синхронизировать
                        </button>
                      )}
                  </div>
                </div>
              })}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-6">
          <div className="sketch-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-ink-800">Стена профиля</h2>
            </div>
            <div className="flex items-center gap-3">
              <input
                className="sketch-input"
                placeholder="Поделиться обновлением"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
              <button className="sketch-button" onClick={handleCreatePost}>
                Опубликовать
              </button>
            </div>
            <div className="space-y-3">
              {posts.length === 0 && (
                <div className="text-sm text-ink-600">
                  Пока нет записей. Поделитесь первым обновлением.
                </div>
              )}
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
                >
                  <div className="text-sm text-ink-500">
                    {new Date(post.createdAt).toLocaleDateString('ru-RU')}
                  </div>
                  <div className="text-sm text-ink-800 mt-1">{post.content}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="sketch-card p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-ink-800">Достижения</h3>
              <a className="ink-link text-sm" href="/achievements">
                Все
              </a>
            </div>
            <div className="space-y-3 text-sm text-ink-700">
              {achievementsPreview.map((item) => (
                <div
                  key={item.title}
                  className="p-3 rounded-lg border border-ink-200 bg-parchment-100"
                >
                  <div className="font-semibold text-ink-800">{item.title}</div>
                  <div className="text-xs text-ink-500">{item.desc}</div>
                  <div className="text-xs text-ink-700 mt-1">{item.reward}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sketch-card p-6">
          <h2 className="text-2xl font-semibold text-ink-800 mb-4">
            Приватность и доступы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-ink-700">
            {privacy.map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
              >
                <div className="font-semibold text-ink-800">{item.title}</div>
                <div className="text-xs text-ink-500 mt-1">{item.desc}</div>
                <button className="mt-3 text-xs ink-link">
                  {item.enabled ? 'Отключить' : 'Включить'}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
