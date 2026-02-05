import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/requireRole'
import { evaluateAchievements } from '@/lib/achievements/evaluate'

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const earned = await evaluateAchievements(auth.session!.userId)
    return NextResponse.json({ earned })
  } catch (error) {
    console.error('Evaluate achievements error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
