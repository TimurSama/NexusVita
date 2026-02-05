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

    const subscriptions = await prisma.subscription.findMany({
      where: { subscriberId: userId },
      include: {
        provider: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (auth.session) {
      logAudit(auth.session.userId, 'subscriptions_view', 'Subscription', userId)
    }
    return NextResponse.json(subscriptions)
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { providerId, subscriberId, priceNXTMonthly, expiresAt } = body

    if (!providerId || !subscriberId || !priceNXTMonthly) {
      return NextResponse.json(
        { error: 'providerId, subscriberId, priceNXTMonthly are required' },
        { status: 400 }
      )
    }

    const auth = ensureSelfOrRole(request, subscriberId, ['ADMIN'])
    if (auth.error) return auth.error

    const subscription = await prisma.subscription.create({
      data: {
        providerId,
        subscriberId,
        priceNXTMonthly,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    })

    if (auth.session) {
      logAudit(auth.session.userId, 'subscription_create', 'Subscription', subscription.id)
    }
    return NextResponse.json(subscription)
  } catch (error) {
    console.error('Error creating subscription:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
