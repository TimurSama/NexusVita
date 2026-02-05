import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  title: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const body = schema.parse(await request.json())
    const session = await prisma.aiChatSession.create({
      data: {
        userId: auth.session!.userId,
        title: body.title || 'Новая сессия',
      },
    })
    return NextResponse.json(session)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('AI session error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
