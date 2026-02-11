import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get('code')
    if (!code) {
      return NextResponse.json({ error: 'code is required' }, { status: 400 })
    }
    const data = await prisma.referralCode.findUnique({
      where: { code: code.toUpperCase() },
      include: { referrer: { select: { username: true } } },
    })
    if (!data) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json({
      code: data.code,
      type: data.type,
      rewardNXT: data.rewardNXT,
      referrer: data.referrer?.username || null,
    })
  } catch (error) {
    console.error('Referral code lookup error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
