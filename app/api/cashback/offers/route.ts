import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  percent: z.number().min(0).max(100),
  referralCode: z.string().min(4),
})

export async function GET() {
  try {
    const offers = await prisma.cashbackOffer.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(offers)
  } catch (error) {
    console.error('Cashback list error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    if (!['MERCHANT', 'ADMIN'].includes(auth.session!.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const body = schema.parse(await request.json())
    const offer = await prisma.cashbackOffer.create({
      data: {
        merchantId: auth.session!.userId,
        title: body.title,
        description: body.description,
        percent: body.percent,
        referralCode: body.referralCode,
      },
    })
    return NextResponse.json(offer)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Cashback create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
