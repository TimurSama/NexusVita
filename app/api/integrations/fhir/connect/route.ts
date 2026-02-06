import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { ensureSelfOrRole } from '@/lib/auth/requireRole'

const schema = z.object({
  userId: z.string().uuid(),
  baseUrl: z.string().url(),
  accessToken: z.string().min(10),
  patientId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = schema.parse(await request.json())
    const auth = ensureSelfOrRole(request, body.userId, ['ADMIN', 'DOCTOR'])
    if (auth.error) return auth.error

    const token = await prisma.integrationToken.upsert({
      where: { userId_provider: { userId: body.userId, provider: 'FHIR' } },
      update: {
        accessToken: body.accessToken,
        metadata: { baseUrl: body.baseUrl, patientId: body.patientId },
      },
      create: {
        userId: body.userId,
        provider: 'FHIR',
        accessToken: body.accessToken,
        metadata: { baseUrl: body.baseUrl, patientId: body.patientId },
      },
    })

    await prisma.userIntegration.upsert({
      where: { userId_provider: { userId: body.userId, provider: 'FHIR' } },
      update: { status: 'CONNECTED' },
      create: { userId: body.userId, provider: 'FHIR', status: 'CONNECTED' },
    })

    return NextResponse.json(token)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('FHIR connect error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
