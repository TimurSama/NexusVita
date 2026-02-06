import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { ensureSelfOrRole } from '@/lib/auth/requireRole'
import { logAudit } from '@/lib/audit/log'

const schema = z.object({
  userId: z.string().uuid(),
  bundle: z.record(z.any()),
})

export async function POST(request: NextRequest) {
  try {
    const body = schema.parse(await request.json())
    const auth = ensureSelfOrRole(request, body.userId, ['ADMIN', 'DOCTOR'])
    if (auth.error) return auth.error

    const ingestion = await prisma.healthIngestion.create({
      data: {
        userId: body.userId,
        source: 'FHIR',
        payloadJson: body.bundle,
      },
    })

    if (auth.session) {
      logAudit(auth.session.userId, 'fhir_ingest', 'HealthIngestion', ingestion.id)
    }
    return NextResponse.json(ingestion)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('FHIR ingest error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
