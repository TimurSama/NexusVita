import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  rewardId: z.string().uuid(),
})

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const body = schema.parse(await request.json())

    const reward = await prisma.reward.findUnique({ where: { id: body.rewardId } })
    if (!reward) {
      return NextResponse.json({ error: 'Reward not found' }, { status: 404 })
    }

    const redemption = await prisma.rewardRedemption.create({
      data: {
        userId: auth.session!.userId,
        rewardId: body.rewardId,
      },
    })
    return NextResponse.json(redemption)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Redeem error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
