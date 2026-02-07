'use client'

import { useEffect, useState } from 'react'
import { Trophy, Gift, Star, CheckCircle } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { cn } from '@/lib/utils/cn'

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
      const achievementsData = await fetch('/api/achievements').then((res) => res.json())
      setAchievements(
        Array.isArray(achievementsData) && achievementsData.length > 0
          ? achievementsData
          : fallbackAchievements
      )

      const rewardsData = await fetch('/api/rewards').then((res) => res.json())
      setRewards(
        Array.isArray(rewardsData) && rewardsData.length > 0 ? rewardsData : fallbackRewards
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
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        <header className="animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800">
            Достижения и награды
          </h1>
          <p className="text-base sm:text-lg text-warmGraphite-600 mt-2">
            Отслеживайте прогресс, получайте достижения и обменивайте токены на награды.
          </p>
        </header>

        {error && (
          <NeumorphicCard
            soft
            className="p-4 bg-warmRed-50 border-2 border-warmRed-200 animate-shake"
          >
            <p className="text-sm text-warmRed-700">{error}</p>
          </NeumorphicCard>
        )}

        {/* Достижения */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-warmPink-600" />
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
              Достижения
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => {
              const isEarned = earned.includes(achievement.id)
              return (
                <NeumorphicCard
                  key={achievement.id}
                  soft={!isEarned}
                  className={cn(
                    'p-4 hover:scale-105 transition-all duration-300 animate-fadeIn',
                    isEarned && 'ring-2 ring-warmGreen-500'
                  )}
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-2 neumorphic-card-soft rounded-neumorphic-sm">
                      <Trophy
                        className={cn(
                          'w-5 h-5',
                          isEarned ? 'text-warmGreen-600' : 'text-warmGray-400'
                        )}
                      />
                    </div>
                    {isEarned && (
                      <NeumorphicBadge variant="success" size="sm">
                        Получено
                      </NeumorphicBadge>
                    )}
                  </div>
                  <h3 className="font-semibold text-warmGraphite-800 text-sm sm:text-base mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-warmGraphite-600 mb-2">
                    {achievement.description}
                  </p>
                  <NeumorphicBadge variant="warning" size="sm">
                    +{achievement.rewardNXT} NVT
                  </NeumorphicBadge>
                </NeumorphicCard>
              )
            })}
          </div>
        </NeumorphicCard>

        {/* Награды */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-2 mb-4">
            <Gift className="w-5 h-5 text-warmBlue-600" />
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
              Обменять токены
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rewards.map((reward, index) => (
              <NeumorphicCard
                key={reward.id}
                soft
                className="p-4 hover:scale-105 transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className="p-2 neumorphic-card-soft rounded-neumorphic-sm w-fit mb-2">
                  <Gift className="w-5 h-5 text-warmBlue-600" />
                </div>
                <h3 className="font-semibold text-warmGraphite-800 text-sm sm:text-base mb-1">
                  {reward.title}
                </h3>
                <div className="flex items-center justify-between mt-3">
                  <NeumorphicBadge variant="info" size="sm">
                    {reward.costNXT} NVT
                  </NeumorphicBadge>
                  <NeumorphicButton
                    className="text-xs px-3 py-1"
                    onClick={() => handleRedeem(reward.id)}
                  >
                    Обменять
                  </NeumorphicButton>
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </NeumorphicCard>
      </div>
    </div>
  )
}
