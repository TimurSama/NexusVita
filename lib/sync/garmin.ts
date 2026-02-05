import { prisma } from '@/lib/db/prisma'

const baseUrl = process.env.GARMIN_API_BASE_URL || ''
const sleepEndpoint = process.env.GARMIN_SLEEP_ENDPOINT || ''
const stepsEndpoint = process.env.GARMIN_STEPS_ENDPOINT || ''
const hrEndpoint = process.env.GARMIN_HR_ENDPOINT || ''

export async function syncGarmin(userId: string, startDate?: string, endDate?: string) {
  if (!baseUrl || !sleepEndpoint || !stepsEndpoint || !hrEndpoint) {
    throw new Error('Garmin endpoints not configured')
  }

  const token = await prisma.integrationToken.findUnique({
    where: { userId_provider: { userId, provider: 'Garmin' } },
  })
  if (!token) {
    throw new Error('Garmin not connected')
  }

  const from =
    startDate || new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10)
  const to = endDate || new Date().toISOString().slice(0, 10)
  const headers = { Authorization: `Bearer ${token.accessToken}` }

  const sleepResp = await fetch(
    `${baseUrl}${sleepEndpoint}?start_date=${from}&end_date=${to}`,
    { headers }
  )
  const sleepData = await sleepResp.json()
  const stepsResp = await fetch(
    `${baseUrl}${stepsEndpoint}?start_date=${from}&end_date=${to}`,
    { headers }
  )
  const stepsData = await stepsResp.json()
  const hrResp = await fetch(
    `${baseUrl}${hrEndpoint}?start_date=${from}&end_date=${to}`,
    { headers }
  )
  const hrData = await hrResp.json()

  for (const item of sleepData?.data || []) {
    if (!item.day || item.sleep_hours == null) continue
    await prisma.healthMetric.upsert({
      where: {
        userId_source_type_measuredAt: {
          userId,
          source: 'Garmin',
          type: 'SLEEP',
          measuredAt: new Date(item.day),
        },
      },
      update: { value: item.sleep_hours, unit: 'hours', raw: item },
      create: {
        userId,
        source: 'Garmin',
        type: 'SLEEP',
        value: item.sleep_hours,
        unit: 'hours',
        measuredAt: new Date(item.day),
        raw: item,
      },
    })
  }

  for (const item of stepsData?.data || []) {
    if (!item.day || item.steps == null) continue
    await prisma.healthMetric.upsert({
      where: {
        userId_source_type_measuredAt: {
          userId,
          source: 'Garmin',
          type: 'STEPS',
          measuredAt: new Date(item.day),
        },
      },
      update: { value: item.steps, unit: 'steps', raw: item },
      create: {
        userId,
        source: 'Garmin',
        type: 'STEPS',
        value: item.steps,
        unit: 'steps',
        measuredAt: new Date(item.day),
        raw: item,
      },
    })
  }

  for (const item of hrData?.data || []) {
    if (!item.day || item.resting_hr == null) continue
    await prisma.healthMetric.upsert({
      where: {
        userId_source_type_measuredAt: {
          userId,
          source: 'Garmin',
          type: 'HEART_RATE',
          measuredAt: new Date(item.day),
        },
      },
      update: { value: item.resting_hr, unit: 'bpm', raw: item },
      create: {
        userId,
        source: 'Garmin',
        type: 'HEART_RATE',
        value: item.resting_hr,
        unit: 'bpm',
        measuredAt: new Date(item.day),
        raw: item,
      },
    })
  }

  return { ok: true }
}
