import { prisma } from '@/lib/db/prisma'

const baseUrl = process.env.OURA_API_BASE_URL || 'https://api.ouraring.com'

export async function syncOura(userId: string, startDate?: string, endDate?: string) {
  const token = await prisma.integrationToken.findUnique({
    where: { userId_provider: { userId, provider: 'Oura' } },
  })
  if (!token) {
    throw new Error('Oura not connected')
  }

  const from =
    startDate || new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10)
  const to = endDate || new Date().toISOString().slice(0, 10)
  const headers = { Authorization: `Bearer ${token.accessToken}` }

  const sleepResp = await fetch(
    `${baseUrl}/v2/usercollection/daily_sleep?start_date=${from}&end_date=${to}`,
    { headers }
  )
  const sleepData = await sleepResp.json()
  const activityResp = await fetch(
    `${baseUrl}/v2/usercollection/daily_activity?start_date=${from}&end_date=${to}`,
    { headers }
  )
  const activityData = await activityResp.json()
  const readinessResp = await fetch(
    `${baseUrl}/v2/usercollection/daily_readiness?start_date=${from}&end_date=${to}`,
    { headers }
  )
  const readinessData = await readinessResp.json()

  const sleepItems = sleepData?.data || []
  for (const item of sleepItems) {
    if (!item.day || item.total_sleep_duration == null) continue
    await prisma.healthMetric.upsert({
      where: {
        userId_source_type_measuredAt: {
          userId,
          source: 'Oura',
          type: 'SLEEP',
          measuredAt: new Date(item.day),
        },
      },
      update: { value: item.total_sleep_duration / 3600, unit: 'hours', raw: item },
      create: {
        userId,
        source: 'Oura',
        type: 'SLEEP',
        value: item.total_sleep_duration / 3600,
        unit: 'hours',
        measuredAt: new Date(item.day),
        raw: item,
      },
    })
  }

  const activityItems = activityData?.data || []
  for (const item of activityItems) {
    if (!item.day || item.steps == null) continue
    await prisma.healthMetric.upsert({
      where: {
        userId_source_type_measuredAt: {
          userId,
          source: 'Oura',
          type: 'STEPS',
          measuredAt: new Date(item.day),
        },
      },
      update: { value: item.steps, unit: 'steps', raw: item },
      create: {
        userId,
        source: 'Oura',
        type: 'STEPS',
        value: item.steps,
        unit: 'steps',
        measuredAt: new Date(item.day),
        raw: item,
      },
    })
  }

  const readinessItems = readinessData?.data || []
  for (const item of readinessItems) {
    if (!item.day || item.resting_heart_rate == null) continue
    await prisma.healthMetric.upsert({
      where: {
        userId_source_type_measuredAt: {
          userId,
          source: 'Oura',
          type: 'HEART_RATE',
          measuredAt: new Date(item.day),
        },
      },
      update: { value: item.resting_heart_rate, unit: 'bpm', raw: item },
      create: {
        userId,
        source: 'Oura',
        type: 'HEART_RATE',
        value: item.resting_heart_rate,
        unit: 'bpm',
        measuredAt: new Date(item.day),
        raw: item,
      },
    })
  }
  return { ok: true }
}
