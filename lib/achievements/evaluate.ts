import { prisma } from '@/lib/db/prisma'

async function ensureAchievement(
  id: string,
  title: string,
  description: string,
  rewardNXT: number
) {
  return prisma.achievement.upsert({
    where: { id },
    update: { title, description, rewardNXT },
    create: { id, title, description, rewardNXT },
  })
}

export async function evaluateAchievements(userId: string) {
  const achievements = await Promise.all([
    ensureAchievement(
      'sleep-7',
      '7 дней сна',
      'Стабильный сон 7+ часов 7 дней подряд',
      25
    ),
    ensureAchievement(
      'steps-10k',
      '10k шагов',
      '10 000 шагов 5 дней подряд',
      30
    ),
  ])

  const metrics = await prisma.healthMetric.findMany({
    where: {
      userId,
      type: { in: ['SLEEP', 'STEPS'] },
    },
    orderBy: { measuredAt: 'desc' },
    take: 30,
  })

  const sleepDays = new Set(
    metrics
      .filter((m) => m.type === 'SLEEP' && m.value >= 7)
      .map((m) => m.measuredAt.toISOString().slice(0, 10))
  )
  const stepDays = new Set(
    metrics
      .filter((m) => m.type === 'STEPS' && m.value >= 10000)
      .map((m) => m.measuredAt.toISOString().slice(0, 10))
  )

  const earnedIds: string[] = []
  if (sleepDays.size >= 7) {
    earnedIds.push(achievements[0].id)
  }
  if (stepDays.size >= 5) {
    earnedIds.push(achievements[1].id)
  }

  for (const achievementId of earnedIds) {
    const existing = await prisma.userAchievement.findUnique({
      where: { userId_achievementId: { userId, achievementId } },
    })
    if (!existing) {
      await prisma.userAchievement.create({
        data: { userId, achievementId },
      })
      const reward = achievements.find((a) => a.id === achievementId)
      if (reward && reward.rewardNXT > 0) {
        await prisma.transaction.create({
          data: {
            amountNXT: reward.rewardNXT,
            transactionType: 'REWARD',
            recipientId: userId,
            relatedEntity: achievementId,
          },
        })
      }
    }
  }

  return earnedIds
}
