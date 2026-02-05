import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  title: z.string().min(2),
  type: z.string().min(2),
  description: z.string().optional(),
  priceNXT: z.number().int().nonnegative().optional(),
  durationMin: z.number().int().positive().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const specialistId = request.nextUrl.searchParams.get('specialistId')
    if (!specialistId) {
      return NextResponse.json({ error: 'specialistId is required' }, { status: 400 })
    }
    const services = await prisma.specialistService.findMany({
      where: { specialistId, active: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(services)
  } catch (error) {
    console.error('Services list error:', error)
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
    const service = await prisma.specialistService.create({
      data: {
        specialistId: auth.session!.userId,
        title: body.title,
        type: body.type,
        description: body.description,
        priceNXT: body.priceNXT ?? 0,
        durationMin: body.durationMin ?? 60,
      },
    })
    return NextResponse.json(service)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Service create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
