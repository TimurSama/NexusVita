import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  itemId: z.string().uuid(),
  status: z.enum(['VERIFIED', 'REJECTED']),
  note: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    if (!['ADMIN', 'DOCTOR', 'TRAINER', 'PSYCHOLOGIST'].includes(auth.session!.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const body = schema.parse(await request.json())

    await prisma.knowledgeVerification.create({
      data: {
        itemId: body.itemId,
        verifierId: auth.session!.userId,
        status: body.status,
        note: body.note,
      },
    })

    const updated = await prisma.knowledgeItem.update({
      where: { id: body.itemId },
      data: { status: body.status },
    })
    return NextResponse.json(updated)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Knowledge verify error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
