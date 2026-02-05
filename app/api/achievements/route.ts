import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(achievements)
  } catch (error) {
    console.error('Achievements error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
