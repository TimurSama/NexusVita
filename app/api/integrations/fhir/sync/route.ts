import { NextRequest, NextResponse } from 'next/server'
import { ensureSelfOrRole } from '@/lib/auth/requireRole'
import { syncFhir } from '@/lib/sync/fhir'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const userId = body.userId as string | undefined
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const auth = ensureSelfOrRole(request, userId, ['ADMIN', 'DOCTOR'])
    if (auth.error) return auth.error

    const result = await syncFhir(userId)
    return NextResponse.json({ ok: true, patientId: result.patientId })
  } catch (error) {
    console.error('FHIR sync error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
