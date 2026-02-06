import { NextRequest, NextResponse } from 'next/server'
import { ensureSelfOrRole } from '@/lib/auth/requireRole'
import { syncGarmin } from '@/lib/sync/garmin'

export async function POST(request: NextRequest) {
  try {
    const { userId, startDate, endDate } = await request.json()
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }
    const auth = ensureSelfOrRole(request, userId, ['ADMIN', 'DOCTOR'])
    if (auth.error) return auth.error

    await syncGarmin(userId, startDate, endDate)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Garmin sync error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
