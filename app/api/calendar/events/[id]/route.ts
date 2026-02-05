import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  status: z.enum(['PLANNED', 'CONFIRMED', 'DECLINED', 'CANCELED', 'REQUESTED']),
})

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const body = schema.parse(await request.json())

    const event = await prisma.calendarEvent.findUnique({
      where: { id: params.id },
    })
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    if (
      auth.session!.userId !== event.userId &&
      auth.session!.userId !== event.specialistId
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const updated = await prisma.calendarEvent.update({
      where: { id: params.id },
      data: { status: body.status },
    })
    await prisma.calendarEventLog.create({
      data: {
        eventId: updated.id,
        actorId: auth.session!.userId,
        action: body.status,
      },
    })
    return NextResponse.json(updated)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Calendar status error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
