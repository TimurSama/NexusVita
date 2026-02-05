import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  code: z.string().min(4),
  type: z.enum(['FRIEND', 'SPECIALIST', 'MERCHANT']),
})
const defaultSchema = z.object({
  type: z.enum(['FRIEND', 'SPECIALIST', 'MERCHANT']).optional(),
})

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const list = await prisma.referralCode.findMany({
      where: { referrerId: auth.session!.userId },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(list)
  } catch (error) {
    console.error('Referral codes error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const body = schema.parse(await request.json())
    const reward =
      body.type === 'FRIEND' ? 50 : body.type === 'SPECIALIST' ? 150 : 100
    const code = await prisma.referralCode.create({
      data: {
        referrerId: auth.session!.userId,
        code: body.code.toUpperCase(),
        type: body.type,
        rewardNXT: reward,
      },
    })
    return NextResponse.json(code)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Referral code create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const body = defaultSchema.parse(await request.json())
    const type = body.type || 'FRIEND'
    const reward = type === 'FRIEND' ? 50 : type === 'SPECIALIST' ? 150 : 100
    const existing = await prisma.referralCode.findFirst({
      where: { referrerId: auth.session!.userId, type, active: true },
    })
    if (existing) {
      return NextResponse.json(existing)
    }
    const code = await prisma.referralCode.create({
      data: {
        referrerId: auth.session!.userId,
        code: `${auth.session!.userId.slice(0, 6)}${Date.now()
          .toString()
          .slice(-4)}`.toUpperCase(),
        type,
        rewardNXT: reward,
      },
    })
    return NextResponse.json(code)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Referral default code error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
