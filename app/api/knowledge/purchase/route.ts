import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  itemId: z.string().uuid(),
  priceNXT: z.number().int().nonnegative(),
})

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const body = schema.parse(await request.json())

    const item = await prisma.knowledgeItem.findUnique({
      where: { id: body.itemId },
    })
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }
    if (item.priceNXT !== body.priceNXT) {
      return NextResponse.json({ error: 'Price mismatch' }, { status: 400 })
    }

    const purchase = await prisma.knowledgePurchase.create({
      data: {
        itemId: body.itemId,
        buyerId: auth.session!.userId,
        priceNXT: body.priceNXT,
      },
    })

    if (body.priceNXT > 0) {
      await prisma.transaction.create({
        data: {
          amountNXT: body.priceNXT,
          transactionType: 'PURCHASE',
          recipientId: item.authorId,
          senderId: auth.session!.userId,
          relatedEntity: purchase.id,
        },
      })
    }

    return NextResponse.json(purchase)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Knowledge purchase error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
