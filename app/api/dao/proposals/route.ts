import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'
import { logAudit } from '@/lib/audit/log'

const createSchema = z.object({
  title: z.string().min(4),
  description: z.string().min(10),
  createdById: z.string().uuid(),
  endsAt: z.string().datetime().optional(),
})

export async function GET() {
  try {
    const proposals = await prisma.daoProposal.findMany({
      include: {
        votes: true,
        creator: { select: { id: true, username: true, role: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(proposals)
  } catch (error) {
    console.error('DAO proposals error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const body = createSchema.parse(await request.json())
    if (auth.session && auth.session.userId !== body.createdById) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const proposal = await prisma.daoProposal.create({
      data: {
        title: body.title,
        description: body.description,
        createdById: body.createdById,
        endsAt: body.endsAt ? new Date(body.endsAt) : null,
      },
    })
    if (auth.session) {
      logAudit(auth.session.userId, 'dao_proposal_create', 'DaoProposal', proposal.id)
    }
    return NextResponse.json(proposal)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('DAO proposals create error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
