import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().optional(),
  percent: z.number().min(0).max(100).optional(),
  active: z.boolean().optional(),
})

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    if (!['MERCHANT', 'ADMIN'].includes(auth.session!.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const body = schema.parse(await request.json())
    const offer = await prisma.cashbackOffer.update({
      where: { id: params.id, merchantId: auth.session!.userId },
      data: {
        title: body.title,
        description: body.description,
        percent: body.percent,
        active: body.active,
      },
    })
    return NextResponse.json(offer)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Cashback update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
