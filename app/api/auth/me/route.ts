import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth/session'
import { prisma, isDatabaseAvailable } from '@/lib/db/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = getSessionFromRequest(request)
    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    const dbAvailable = await isDatabaseAvailable()

    // Демо-режим: возвращаем демо-пользователя
    if (!dbAvailable) {
      return NextResponse.json({
        user: {
          id: session.userId,
          email: 'demo@nexusvita.local',
          username: 'demo_user',
          firstName: 'Демо',
          lastName: 'Пользователь',
          role: session.role,
        },
      })
    }

    // Режим с БД
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Me error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
