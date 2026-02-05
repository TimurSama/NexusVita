import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  code: z.string().min(4),
})

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const body = schema.parse(await request.json())

    const code = await prisma.referralCode.findUnique({
      where: { code: body.code.toUpperCase() },
    })
    if (!code || !code.active) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 404 })
    }
    if (code.referrerId === auth.session!.userId) {
      return NextResponse.json({ error: 'Self referral not allowed' }, { status: 400 })
    }

    const referral = await prisma.referral.create({
      data: {
        referrerId: code.referrerId,
        referredId: auth.session!.userId,
        type: code.type,
        rewardNXT: code.rewardNXT,
        referralCodeId: code.id,
      },
    })
    return NextResponse.json(referral)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Referral redeem error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
