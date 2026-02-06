import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  specialistId: z.string().uuid(),
  title: z.string().min(2),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime().optional(),
  description: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const body = schema.parse(await request.json())
    const event = await prisma.calendarEvent.create({
      data: {
        userId: auth.session!.userId,
        specialistId: body.specialistId,
        title: body.title,
        description: body.description,
        type: 'REQUEST',
        startsAt: new Date(body.startsAt),
        endsAt: body.endsAt ? new Date(body.endsAt) : null,
        status: 'REQUESTED',
      },
    })
    return NextResponse.json(event)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Calendar request error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
