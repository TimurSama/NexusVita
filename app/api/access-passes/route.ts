import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { ensureSelfOrRole } from '@/lib/auth/requireRole'
import { logAudit } from '@/lib/audit/log'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const auth = ensureSelfOrRole(request, userId, ['ADMIN'])
    if (auth.error) return auth.error

    const passes = await prisma.accessPass.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    if (auth.session) {
      logAudit(auth.session.userId, 'access_passes_view', 'AccessPass', userId)
    }
    return NextResponse.json(passes)
  } catch (error) {
    console.error('Error fetching access passes:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, providerName, status, expiresAt, externalId } = body

    if (!userId || !providerName) {
      return NextResponse.json(
        { error: 'userId and providerName are required' },
        { status: 400 }
      )
    }

    const auth = ensureSelfOrRole(request, userId, ['ADMIN'])
    if (auth.error) return auth.error

    const pass = await prisma.accessPass.create({
      data: {
        userId,
        providerName,
        status,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        externalId,
      },
    })

    if (auth.session) {
      logAudit(auth.session.userId, 'access_pass_create', 'AccessPass', pass.id)
    }
    return NextResponse.json(pass)
  } catch (error) {
    console.error('Error creating access pass:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
