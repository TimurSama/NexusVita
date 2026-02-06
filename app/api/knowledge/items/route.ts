import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

const schema = z.object({
  title: z.string().min(2),
  type: z.string().min(2),
  url: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  priceNXT: z.number().int().nonnegative().optional(),
})

export async function GET() {
  try {
    const items = await prisma.knowledgeItem.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Knowledge list error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const body = schema.parse(await request.json())
    const item = await prisma.knowledgeItem.create({
      data: {
        authorId: auth.session!.userId,
        title: body.title,
        type: body.type,
        url: body.url,
        description: body.description,
        tags: body.tags || [],
        priceNXT: body.priceNXT ?? 0,
        status: 'PENDING',
      },
    })
    return NextResponse.json(item)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Knowledge create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
