import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
})

export async function GET(request: NextRequest) {
  try {
    const specialistId = request.nextUrl.searchParams.get('specialistId')
    if (!specialistId) {
      return NextResponse.json({ error: 'specialistId is required' }, { status: 400 })
    }
    const slots = await prisma.specialistSlot.findMany({
      where: { specialistId, status: 'OPEN' },
      orderBy: { startsAt: 'asc' },
    })
    return NextResponse.json(slots)
  } catch (error) {
    console.error('Slots list error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    if (!['TRAINER', 'DOCTOR', 'PSYCHOLOGIST', 'ADMIN'].includes(auth.session!.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const body = schema.parse(await request.json())
    const slot = await prisma.specialistSlot.create({
      data: {
        specialistId: auth.session!.userId,
        startsAt: new Date(body.startsAt),
        endsAt: new Date(body.endsAt),
      },
    })
    return NextResponse.json(slot)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Slot create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
