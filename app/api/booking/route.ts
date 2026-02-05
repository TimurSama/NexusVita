import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  specialistId: z.string().uuid(),
  slotId: z.string().uuid(),
  title: z.string().min(2),
  serviceId: z.string().uuid().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const body = schema.parse(await request.json())

    const slot = await prisma.specialistSlot.findUnique({
      where: { id: body.slotId },
    })
    if (!slot || slot.status !== 'OPEN') {
      return NextResponse.json({ error: 'Slot not available' }, { status: 400 })
    }

    const overlap = await prisma.calendarEvent.findFirst({
      where: {
        specialistId: body.specialistId,
        startsAt: { lt: slot.endsAt },
        endsAt: { gt: slot.startsAt },
      },
    })
    const status = overlap ? 'REQUESTED' : 'CONFIRMED'

    let service = null
    if (body.serviceId) {
      service = await prisma.specialistService.findUnique({
        where: { id: body.serviceId },
      })
      if (!service || service.specialistId !== body.specialistId) {
        return NextResponse.json({ error: 'Invalid service' }, { status: 400 })
      }
    }

    const event = await prisma.calendarEvent.create({
      data: {
        userId: auth.session!.userId,
        specialistId: body.specialistId,
        title: service?.title || body.title,
        type: 'BOOKING',
        startsAt: slot.startsAt,
        endsAt: slot.endsAt,
        status,
        serviceId: service?.id || null,
      },
    })

    if (status === 'CONFIRMED') {
      await prisma.specialistSlot.update({
        where: { id: slot.id },
        data: { status: 'BOOKED' },
      })
    }

    return NextResponse.json(event)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
