import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  goalId: z.string().uuid(),
  value: z.number().optional(),
  note: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const goalId = request.nextUrl.searchParams.get('goalId')
    if (!goalId) {
      return NextResponse.json({ error: 'goalId is required' }, { status: 400 })
    }
    const auth = requireAuth(request)
    if (auth.error) return auth.error

    const logs = await prisma.goalLog.findMany({
      where: { goalId },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(logs)
  } catch (error) {
    console.error('Goal logs error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const body = schema.parse(await request.json())
    const log = await prisma.goalLog.create({
      data: {
        goalId: body.goalId,
        value: body.value,
        note: body.note,
      },
    })
    return NextResponse.json(log)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Goal logs create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
