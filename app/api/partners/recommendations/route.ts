import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  description: z.string().optional(),
  cashbackOfferId: z.string().uuid().optional(),
})

export async function GET() {
  try {
    const list = await prisma.partnerRecommendation.findMany({
      orderBy: { createdAt: 'desc' },
      include: { cashbackOffer: true },
    })
    return NextResponse.json(list)
  } catch (error) {
    console.error('Partner list error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const body = schema.parse(await request.json())
    const rec = await prisma.partnerRecommendation.create({
      data: {
        specialistId: auth.session!.userId,
        name: body.name,
        category: body.category,
        description: body.description,
        cashbackOfferId: body.cashbackOfferId,
      },
    })
    return NextResponse.json(rec)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Partner create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
