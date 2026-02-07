'use client'

import { useEffect, useState } from 'react'
import { User, Award, Shield, Link2, RefreshCw, CheckCircle, XCircle } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { cn } from '@/lib/utils/cn'

const profileSummary = [
  { label: 'Статус', value: 'Активный участник', icon: User },
  { label: 'Уровень', value: 'Nexus Core', icon: Award },
  { label: 'Подписка', value: 'AI Health+', icon: Shield },
  { label: 'KYC', value: 'Не завершен', icon: Shield },
]

const achievementsPreview = [
  { title: '7 дней сна', desc: 'Стабильный режим сна', reward: '+25 NVT' },
  { title: '10 тренировок', desc: 'Регулярность', reward: '+40 NVT' },
]

const privacy = [
  { title: 'Публичный профиль', desc: 'Виден для сообщества', enabled: true },
  {
    title: 'Обезличенные данные',
    desc: 'Использование в исследованиях',
    enabled: true,
  },
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
    const data = await fetch(`/api/integrations?userId=${id}`).then((res) => res.json())
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
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-fadeIn">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800">Профиль</h1>
            <p className="text-base sm:text-lg text-warmGraphite-600 mt-2">
              Управляйте данными, безопасностью и интеграциями.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <NeumorphicButton primary>Редактировать профиль</NeumorphicButton>
            <NeumorphicButton>Пройти KYC</NeumorphicButton>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {profileSummary.map((item, index) => {
            const Icon = item.icon
            return (
              <NeumorphicCard
                key={item.label}
                className="p-4 animate-fadeIn"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-warmBlue-600" />
                  <div className="text-xs uppercase tracking-widest text-warmGray-600">
                    {item.label}
                  </div>
                </div>
                <div className="text-base sm:text-lg font-semibold text-warmGraphite-800">
                  {item.value}
                </div>
              </NeumorphicCard>
            )
          })}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-4 sm:gap-6">
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
              Основная информация
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm text-warmGraphite-700">
              <NeumorphicCard soft className="p-3 sm:p-4">
                Имя: Алина В.
              </NeumorphicCard>
              <NeumorphicCard soft className="p-3 sm:p-4">
                Город: Москва · Онлайн
              </NeumorphicCard>
              <NeumorphicCard soft className="p-3 sm:p-4">
                Цели: сон, стресс, сила
              </NeumorphicCard>
              <NeumorphicCard soft className="p-3 sm:p-4">
                Уровень доступа: базовый + AI
              </NeumorphicCard>
            </div>
            <div className="mt-4 text-xs sm:text-sm text-warmGraphite-600">
              Профиль связан с DAO-кошельком и используется для доступа к аналитике,
              подпискам и медкарте.
            </div>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
              Интеграции и устройства
            </h2>
            {error && (
              <NeumorphicCard
                soft
                className="p-3 mb-4 bg-warmRed-50 border-2 border-warmRed-200"
              >
                <p className="text-sm text-warmRed-700">{error}</p>
              </NeumorphicCard>
            )}
            <div className="space-y-3">
              {[
                { provider: 'Apple Health' },
                { provider: 'Garmin' },
                { provider: 'Whoop' },
                { provider: 'Oura' },
              ].map((item, index) => {
                const integration = integrations.find((i) => i.provider === item.provider)
                const status = integration?.status || 'DISCONNECTED'
                return (
                  <NeumorphicCard
                    key={item.provider}
                    soft
                    className="p-3 flex items-center justify-between hover:scale-[1.01] transition-transform animate-fadeIn"
                    style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-2">
                      <Link2 className="w-4 h-4 text-warmGray-600" />
                      <span className="text-sm font-medium text-warmGraphite-800">
                        {item.provider}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <NeumorphicBadge
                        variant={
                          status === 'CONNECTED'
                            ? 'success'
                            : status === 'PENDING'
                              ? 'warning'
                              : 'default'
                        }
                        size="sm"
                      >
                        {status === 'CONNECTED'
                          ? 'Подключено'
                          : status === 'PENDING'
                            ? 'Ожидает'
                            : 'Не подключено'}
                      </NeumorphicBadge>
                      <NeumorphicButton
                        className="text-xs px-3 py-1"
                        onClick={() =>
                          handleIntegration(
                            item.provider,
                            status === 'CONNECTED' ? 'DISCONNECTED' : 'PENDING'
                          )
                        }
                      >
                        {status === 'CONNECTED' ? 'Отключить' : 'Подключить'}
                      </NeumorphicButton>
                      {status === 'CONNECTED' &&
                        (item.provider === 'Oura' || item.provider === 'Garmin') && (
                          <NeumorphicButton
                            className="text-xs px-3 py-1"
                            onClick={() => handleSync(item.provider)}
                          >
                            <RefreshCw className="w-3 h-3" />
                          </NeumorphicButton>
                        )}
                    </div>
                  </NeumorphicCard>
                )
              })}
            </div>
          </NeumorphicCard>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-4 sm:gap-6">
          <NeumorphicCard className="p-4 sm:p-6 space-y-4 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
                Стена профиля
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <NeumorphicInput
                placeholder="Поделиться обновлением"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="flex-1"
              />
              <NeumorphicButton primary onClick={handleCreatePost} disabled={!newPost.trim()}>
                Опубликовать
              </NeumorphicButton>
            </div>
            <div className="space-y-3">
              {posts.length === 0 && (
                <div className="text-sm text-warmGray-600 text-center py-8">
                  Пока нет записей. Поделитесь первым обновлением.
                </div>
              )}
              {posts.map((post, index) => (
                <NeumorphicCard
                  key={post.id}
                  soft
                  className="p-3 sm:p-4 hover:scale-[1.01] transition-transform animate-fadeIn"
                  style={{ animationDelay: `${0.9 + index * 0.05}s` }}
                >
                  <div className="text-xs text-warmGray-600 mb-1">
                    {new Date(post.createdAt).toLocaleDateString('ru-RU')}
                  </div>
                  <div className="text-sm text-warmGraphite-800">{post.content}</div>
                </NeumorphicCard>
              ))}
            </div>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '1s' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
                Достижения
              </h3>
              <a
                href="/achievements"
                className="text-xs sm:text-sm text-warmBlue-600 hover:text-warmBlue-700 font-medium transition-colors"
              >
                Все →
              </a>
            </div>
            <div className="space-y-3">
              {achievementsPreview.map((item, index) => (
                <NeumorphicCard
                  key={item.title}
                  soft
                  className="p-3 hover:scale-[1.01] transition-transform animate-fadeIn"
                  style={{ animationDelay: `${1.1 + index * 0.1}s` }}
                >
                  <div className="font-semibold text-warmGraphite-800 text-sm">{item.title}</div>
                  <div className="text-xs text-warmGray-600 mt-1">{item.desc}</div>
                  <NeumorphicBadge variant="success" size="sm" className="mt-2">
                    {item.reward}
                  </NeumorphicBadge>
                </NeumorphicCard>
              ))}
            </div>
          </NeumorphicCard>
        </section>

        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '1.2s' }}>
          <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
            Приватность и доступы
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {privacy.map((item, index) => (
              <NeumorphicCard
                key={item.title}
                soft
                className="p-4 hover:scale-[1.01] transition-transform animate-fadeIn"
                style={{ animationDelay: `${1.3 + index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-warmGraphite-800 text-sm">{item.title}</div>
                  {item.enabled ? (
                    <CheckCircle className="w-4 h-4 text-warmGreen-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-warmGray-400" />
                  )}
                </div>
                <div className="text-xs text-warmGray-600 mt-1 mb-3">{item.desc}</div>
                <NeumorphicButton className="text-xs px-3 py-1 w-full">
                  {item.enabled ? 'Отключить' : 'Включить'}
                </NeumorphicButton>
              </NeumorphicCard>
            ))}
          </div>
        </NeumorphicCard>
      </div>
    </div>
  )
}
