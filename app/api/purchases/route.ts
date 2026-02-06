import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  merchantId: z.string().uuid(),
  offerId: z.string().uuid().optional(),
  amountNXT: z.number().int().positive(),
})

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const body = schema.parse(await request.json())

    const offer = body.offerId
      ? await prisma.cashbackOffer.findUnique({ where: { id: body.offerId } })
      : null

    const purchase = await prisma.purchase.create({
      data: {
        userId: auth.session!.userId,
        merchantId: body.merchantId,
        offerId: body.offerId,
        amountNXT: body.amountNXT,
      },
    })

    if (offer && offer.active) {
      const cashbackAmount = Math.round((body.amountNXT * offer.percent) / 100)
      if (cashbackAmount > 0) {
        const redemption = await prisma.cashbackRedemption.create({
          data: {
            offerId: offer.id,
            userId: auth.session!.userId,
            amountNXT: cashbackAmount,
          },
        })
        await prisma.transaction.create({
          data: {
            amountNXT: cashbackAmount,
            transactionType: 'REWARD',
            recipientId: auth.session!.userId,
            relatedEntity: redemption.id,
          },
        })
      }
    }

    return NextResponse.json(purchase)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Purchase error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const merchantId = request.nextUrl.searchParams.get('merchantId')
    if (!merchantId) {
      return NextResponse.json({ error: 'merchantId is required' }, { status: 400 })
    }
    if (auth.session!.userId !== merchantId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const purchases = await prisma.purchase.findMany({
      where: { merchantId },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(purchases)
  } catch (error) {
    console.error('Purchase list error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
