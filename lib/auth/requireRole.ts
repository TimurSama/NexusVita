import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth/session'

export function requireAuth(request: NextRequest) {
  const session = getSessionFromRequest(request)
  if (!session) {
    return { session: null, error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }
  return { session, error: null }
}

export function ensureSelfOrRole(
  request: NextRequest,
  userId: string,
  allowedRoles: string[]
) {
  const { session, error } = requireAuth(request)
  if (error || !session) return { session: null, error }
  if (session.userId !== userId && !allowedRoles.includes(session.role)) {
    return {
      session: null,
      error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
    }
  }
  return { session, error: null }
}

// Проверка роли специалиста (TRAINER, DOCTOR, PSYCHOLOGIST)
export function requireSpecialist(request: NextRequest) {
  const { session, error } = requireAuth(request)
  if (error || !session) return { session: null, error }
  const specialistRoles = ['TRAINER', 'DOCTOR', 'PSYCHOLOGIST', 'ADMIN']
  if (!specialistRoles.includes(session.role)) {
    return {
      session: null,
      error: NextResponse.json({ error: 'Forbidden: Specialist role required' }, { status: 403 }),
    }
  }
  return { session, error: null }
}

// Проверка роли мерчанта
export function requireMerchant(request: NextRequest) {
  const { session, error } = requireAuth(request)
  if (error || !session) return { session: null, error }
  const merchantRoles = ['MERCHANT', 'ADMIN']
  if (!merchantRoles.includes(session.role)) {
    return {
      session: null,
      error: NextResponse.json({ error: 'Forbidden: Merchant role required' }, { status: 403 }),
    }
  }
  return { session, error: null }
}

// Проверка роли администратора
export function requireAdmin(request: NextRequest) {
  const { session, error } = requireAuth(request)
  if (error || !session) return { session: null, error }
  if (session.role !== 'ADMIN') {
    return {
      session: null,
      error: NextResponse.json({ error: 'Forbidden: Admin role required' }, { status: 403 }),
    }
  }
  return { session, error: null }
}

// Проверка доступа к AI (активная подписка или пробный период)
export async function requireAIAccess(request: NextRequest) {
  const { session, error } = requireAuth(request)
  if (error || !session) return { session: null, error, hasAccess: false }
  
  // Проверяем пробный период
  const { prisma } = await import('@/lib/db/prisma')
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { aiTrialEndsAt: true },
  })
  
  if (user?.aiTrialEndsAt && new Date(user.aiTrialEndsAt) > new Date()) {
    return { session, error: null, hasAccess: true }
  }
  
  // Проверяем активную подписку AI Health+
  const aiSubscription = await prisma.subscription.findFirst({
    where: {
      subscriberId: session.userId,
      status: 'ACTIVE',
      provider: {
        role: 'ADMIN', // AI Health+ предоставляется системой
      },
    },
  })
  
  if (aiSubscription) {
    return { session, error: null, hasAccess: true }
  }
  
  return {
    session: null,
    error: NextResponse.json(
      { error: 'AI Health+ subscription required. Start your free trial!' },
      { status: 403 }
    ),
    hasAccess: false,
  }
}
