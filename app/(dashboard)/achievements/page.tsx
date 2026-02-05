'use client'

import { useEffect, useState } from 'react'
import { Trophy } from 'lucide-react'

const fallbackAchievements = [
  {
    id: 'sleep',
    title: '7 дней сна',
    description: 'Стабильный режим сна в течение недели',
    rewardNXT: 25,
  },
  {
    id: 'training',
    title: '10 тренировок',
    description: 'Регулярность и дисциплина в тренировках',
    rewardNXT: 40,
  },
  {
    id: 'nutrition',
    title: 'Питание 80%',
    description: 'План питания соблюдается 5 дней подряд',
    rewardNXT: 20,
  },
]

const fallbackRewards = [
  { id: 'bonus', title: 'Бонус на консультацию', costNXT: 150 },
  { id: 'discount', title: 'Скидка на абонемент', costNXT: 300 },
  { id: 'ai', title: 'Доступ к AI Health+ на месяц', costNXT: 500 },
]

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<any[]>([])
  const [rewards, setRewards] = useState<any[]>([])
  const [earned, setEarned] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      const achievementsData = await fetch('/api/achievements').then((res) =>
        res.json()
      )
      setAchievements(
        Array.isArray(achievementsData) && achievementsData.length > 0
          ? achievementsData
          : fallbackAchievements
      )

      const rewardsData = await fetch('/api/rewards').then((res) => res.json())
      setRewards(
        Array.isArray(rewardsData) && rewardsData.length > 0
          ? rewardsData
          : fallbackRewards
      )

      const me = await fetch('/api/auth/me').then((res) => res.json())
      if (me?.user?.id) {
        await fetch('/api/achievements/evaluate', { method: 'POST' })
        const earnedData = await fetch(
          `/api/achievements/user?userId=${me.user.id}`
        ).then((res) => res.json())
        const earnedIds = Array.isArray(earnedData)
          ? earnedData.map((item) => item.achievementId)
          : []
        setEarned(earnedIds)
      }
    }
    load()
  }, [])

  const handleRedeem = async (rewardId: string) => {
    const response = await fetch('/api/rewards/redeem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rewardId }),
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Не удалось обменять награду.')
      return
    }
    setError(null)
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-ink-800">Достижения и награды</h1>
            <p className="text-ink-600">
              Выполняйте цели, получайте токены и обменивайте на бонусы.
            </p>
          </div>
          <button className="sketch-button">Получить награду</button>
        </header>

        {error && (
          <div className="sketch-card p-4 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item) => {
            return (
              <div key={item.id} className="sketch-card p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-6 h-6 text-ink-700" />
                  <h2 className="text-xl font-semibold text-ink-800">{item.title}</h2>
                </div>
                <p className="text-sm text-ink-600">{item.description}</p>
                <div className="mt-3 text-sm font-semibold text-ink-800">
                  Награда: +{item.rewardNXT} NVT
                </div>
                {earned.includes(item.id) && (
                  <div className="mt-2 text-xs text-green-700">Получено</div>
                )}
              </div>
            )
          })}
        </section>

        <section className="sketch-card p-6">
          <h2 className="text-2xl font-semibold text-ink-800 mb-4">
            Магазин наград
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
              >
                <div className="font-semibold text-ink-800">{reward.title}</div>
                <div className="text-sm text-ink-600 mt-1">{reward.costNXT} NVT</div>
                <button
                  className="mt-3 w-full sketch-button"
                  onClick={() => handleRedeem(reward.id)}
                >
                  Обменять
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
