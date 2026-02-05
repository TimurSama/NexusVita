import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const createSchema = z.object({
  referredId: z.string().uuid(),
  type: z.enum(['FRIEND', 'SPECIALIST', 'MERCHANT']),
})

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const list = await prisma.referral.findMany({
      where: { referrerId: auth.session!.userId },
      orderBy: { createdAt: 'desc' },
      include: {
        referred: { select: { id: true, username: true, role: true } },
      },
    })
    return NextResponse.json(list)
  } catch (error) {
    console.error('Referrals error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const body = createSchema.parse(await request.json())

    const reward =
      body.type === 'FRIEND' ? 50 : body.type === 'SPECIALIST' ? 150 : 100

    const referral = await prisma.referral.create({
      data: {
        referrerId: auth.session!.userId,
        referredId: body.referredId,
        type: body.type,
        rewardNXT: reward,
      },
    })
    return NextResponse.json(referral)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Referrals create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
