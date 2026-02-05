import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  offerId: z.string().uuid(),
  amountNXT: z.number().int().positive(),
})

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const body = schema.parse(await request.json())

    const offer = await prisma.cashbackOffer.findUnique({
      where: { id: body.offerId },
    })
    if (!offer || !offer.active) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 })
    }

    const redemption = await prisma.cashbackRedemption.create({
      data: {
        offerId: body.offerId,
        userId: auth.session!.userId,
        amountNXT: body.amountNXT,
      },
    })

    await prisma.transaction.create({
      data: {
        amountNXT: body.amountNXT,
        transactionType: 'REWARD',
        recipientId: auth.session!.userId,
        relatedEntity: redemption.id,
      },
    })

    return NextResponse.json(redemption)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Cashback redeem error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
