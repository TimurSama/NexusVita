import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  date: z.string().optional(),
  summary: z.string().optional(),
  items: z.array(z.object({ title: z.string(), detail: z.string() })).optional(),
})

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const dateParam = request.nextUrl.searchParams.get('date')
    const date = dateParam ? new Date(dateParam) : new Date()
    const day = new Date(date.toISOString().slice(0, 10))

    const plan = await prisma.aiDailyPlan.findUnique({
      where: { userId_date: { userId: auth.session!.userId, date: day } },
    })
    return NextResponse.json(plan)
  } catch (error) {
    console.error('AI plan get error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const body = schema.parse(await request.json())
    const date = body.date ? new Date(body.date) : new Date()
    const day = new Date(date.toISOString().slice(0, 10))

    const plan = await prisma.aiDailyPlan.upsert({
      where: { userId_date: { userId: auth.session!.userId, date: day } },
      update: { summary: body.summary, items: body.items ?? [] },
      create: {
        userId: auth.session!.userId,
        date: day,
        summary: body.summary,
        items: body.items ?? [],
      },
    })
    return NextResponse.json(plan)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('AI plan save error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
