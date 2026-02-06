import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { ensureSelfOrRole } from '@/lib/auth/requireRole'

const schema = z.object({
  userId: z.string().uuid(),
  title: z.string().min(2),
  description: z.string().optional(),
  type: z.string().min(2),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime().optional(),
  specialistId: z.string().uuid().optional(),
  location: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    const specialistId = request.nextUrl.searchParams.get('specialistId')
    if (!userId && !specialistId) {
      return NextResponse.json(
        { error: 'userId or specialistId is required' },
        { status: 400 }
      )
    }
    if (userId) {
      const auth = ensureSelfOrRole(request, userId, ['ADMIN', 'DOCTOR', 'TRAINER'])
      if (auth.error) return auth.error
    }
    if (specialistId) {
      const auth = ensureSelfOrRole(request, specialistId, [
        'ADMIN',
        'DOCTOR',
        'TRAINER',
      ])
      if (auth.error) return auth.error
    }

    const events = await prisma.calendarEvent.findMany({
      where: userId ? { userId } : { specialistId: specialistId || undefined },
      orderBy: { startsAt: 'asc' },
      include: { specialist: { select: { id: true, username: true, role: true } } },
    })
    return NextResponse.json(events)
  } catch (error) {
    console.error('Calendar events error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = schema.parse(await request.json())
    const auth = ensureSelfOrRole(request, body.userId, ['ADMIN', 'DOCTOR', 'TRAINER'])
    if (auth.error) return auth.error

    const event = await prisma.calendarEvent.create({
      data: {
        userId: body.userId,
        title: body.title,
        description: body.description,
        type: body.type,
        startsAt: new Date(body.startsAt),
        endsAt: body.endsAt ? new Date(body.endsAt) : null,
        specialistId: body.specialistId,
        location: body.location,
      },
    })
    return NextResponse.json(event)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Calendar create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
