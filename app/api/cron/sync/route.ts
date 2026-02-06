import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { syncFhir } from '@/lib/sync/fhir'
import { syncOura } from '@/lib/sync/oura'
import { syncGarmin } from '@/lib/sync/garmin'
import { evaluateAchievements } from '@/lib/achievements/evaluate'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-cron-secret') || ''
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const integrations = await prisma.userIntegration.findMany({
    where: { status: 'CONNECTED' },
  })

  const results: Record<string, number> = {}
  const processedUsers = new Set<string>()
  for (const item of integrations) {
    try {
      if (item.provider === 'FHIR') {
        await syncFhir(item.userId)
      }
      if (item.provider === 'Oura') {
        await syncOura(item.userId)
      }
      if (item.provider === 'Garmin') {
        await syncGarmin(item.userId)
      }
      results[item.provider] = (results[item.provider] || 0) + 1
      processedUsers.add(item.userId)
    } catch (error) {
      console.error('Cron sync error:', item.provider, error)
    }
  }

  for (const userId of processedUsers) {
    try {
      await evaluateAchievements(userId)
    } catch (error) {
      console.error('Cron achievements error:', error)
    }
  }

  return NextResponse.json({ ok: true, results })
}
