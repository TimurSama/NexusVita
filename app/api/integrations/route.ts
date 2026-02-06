import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { ensureSelfOrRole } from '@/lib/auth/requireRole'
import { logAudit } from '@/lib/audit/log'

const schema = z.object({
  userId: z.string().uuid(),
  provider: z.string().min(2),
  status: z.enum(['PENDING', 'CONNECTED', 'DISCONNECTED']).optional(),
  externalId: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }
    const auth = ensureSelfOrRole(request, userId, ['ADMIN'])
    if (auth.error) return auth.error
    const integrations = await prisma.userIntegration.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })
    if (auth.session) {
      logAudit(auth.session.userId, 'integrations_view', 'UserIntegration', userId)
    }
    return NextResponse.json(integrations)
  } catch (error) {
    console.error('Integrations error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = schema.parse(await request.json())
    const auth = ensureSelfOrRole(request, body.userId, ['ADMIN'])
    if (auth.error) return auth.error
    const integration = await prisma.userIntegration.upsert({
      where: {
        userId_provider: {
          userId: body.userId,
          provider: body.provider,
        },
      },
      update: {
        status: body.status ?? 'PENDING',
        externalId: body.externalId,
      },
      create: {
        userId: body.userId,
        provider: body.provider,
        status: body.status ?? 'PENDING',
        externalId: body.externalId,
      },
    })
    if (auth.session) {
      logAudit(auth.session.userId, 'integration_update', 'UserIntegration', integration.id)
    }
    return NextResponse.json(integration)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Integrations update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
