import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'
import { logAudit } from '@/lib/audit/log'

const schema = z.object({
  proposalId: z.string().uuid(),
  userId: z.string().uuid(),
  support: z.boolean(),
  weight: z.number().int().positive().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const body = schema.parse(await request.json())
    if (auth.session && auth.session.userId !== body.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const vote = await prisma.daoVote.upsert({
      where: {
        proposalId_userId: {
          proposalId: body.proposalId,
          userId: body.userId,
        },
      },
      update: {
        support: body.support,
        weight: body.weight ?? 1,
      },
      create: {
        proposalId: body.proposalId,
        userId: body.userId,
        support: body.support,
        weight: body.weight ?? 1,
      },
    })
    if (auth.session) {
      logAudit(auth.session.userId, 'dao_vote', 'DaoProposal', body.proposalId, {
        support: body.support,
      })
    }
    return NextResponse.json(vote)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('DAO vote error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
