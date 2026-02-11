import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const rewards = await prisma.reward.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(rewards)
  } catch (error) {
    console.error('Rewards error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
