import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { ensureSelfOrRole } from '@/lib/auth/requireRole'

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }
    const auth = ensureSelfOrRole(request, userId, ['ADMIN', 'DOCTOR'])
    if (auth.error) return auth.error

    const items = await prisma.healthIngestion.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Ingestion list error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
