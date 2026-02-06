import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  referralId: z.string().uuid(),
})

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const body = schema.parse(await request.json())

    const referral = await prisma.referral.findUnique({
      where: { id: body.referralId },
    })
    if (!referral) {
      return NextResponse.json({ error: 'Referral not found' }, { status: 404 })
    }

    if (referral.status === 'COMPLETED') {
      return NextResponse.json(referral)
    }

    const updated = await prisma.referral.update({
      where: { id: body.referralId },
      data: { status: 'COMPLETED', completedAt: new Date() },
    })

    if (referral.rewardNXT > 0) {
      await prisma.transaction.create({
        data: {
          amountNXT: referral.rewardNXT,
          transactionType: 'REWARD',
          recipientId: referral.referrerId,
          relatedEntity: referral.id,
        },
      })
    }

    return NextResponse.json(updated)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Referral complete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
