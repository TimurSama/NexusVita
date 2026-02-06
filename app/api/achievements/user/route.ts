import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { ensureSelfOrRole } from '@/lib/auth/requireRole'

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }
    const auth = ensureSelfOrRole(request, userId, ['ADMIN'])
    if (auth.error) return auth.error

    const earned = await prisma.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
      orderBy: { earnedAt: 'desc' },
    })
    return NextResponse.json(earned)
  } catch (error) {
    console.error('User achievements error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
