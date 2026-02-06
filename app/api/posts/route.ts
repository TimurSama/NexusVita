import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { ensureSelfOrRole } from '@/lib/auth/requireRole'

const createSchema = z.object({
  userId: z.string().uuid(),
  content: z.string().min(1),
  images: z.array(z.string()).optional(),
})

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }
    const auth = ensureSelfOrRole(request, userId, ['ADMIN'])
    if (auth.error) return auth.error

    const posts = await prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, username: true, firstName: true } },
      },
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Posts error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = createSchema.parse(await request.json())
    const auth = ensureSelfOrRole(request, body.userId, ['ADMIN'])
    if (auth.error) return auth.error

    const post = await prisma.post.create({
      data: {
        userId: body.userId,
        content: body.content,
        images: body.images || [],
      },
      include: {
        user: { select: { id: true, username: true, firstName: true } },
      },
    })
    return NextResponse.json(post)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Posts create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
