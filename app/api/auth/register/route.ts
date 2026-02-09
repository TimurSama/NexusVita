import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma, isDatabaseAvailable } from '@/lib/db/prisma'
import { hashPassword } from '@/lib/auth/password'
import { createSessionToken } from '@/lib/auth/token'

const schema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(8),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = schema.parse(await request.json())
    const dbAvailable = await isDatabaseAvailable()

    // Демо-режим: создаем демо-пользователя
    if (!dbAvailable) {
      const demoUser = {
        id: `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email: body.email,
        username: body.username,
        firstName: body.firstName,
        lastName: body.lastName,
        role: 'USER',
      }
      const session = createSessionToken({ userId: demoUser.id, role: demoUser.role })
      const response = NextResponse.json({
        id: demoUser.id,
        email: demoUser.email,
        username: demoUser.username,
        role: demoUser.role,
      })
      response.cookies.set('nv_session', session, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
      return response
    }

    // Режим с БД
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email: body.email }, { username: body.username }],
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Email или username уже используется' },
        { status: 409 }
      )
    }

    const passwordHash = hashPassword(body.password)
    const trialEndsAt = new Date()
    trialEndsAt.setDate(trialEndsAt.getDate() + 7) // 7 дней пробного периода
    
    const user = await prisma.user.create({
      data: {
        email: body.email,
        username: body.username,
        passwordHash,
        firstName: body.firstName,
        lastName: body.lastName,
        role: 'USER',
        aiTrialEndsAt: trialEndsAt, // Автоматический пробный период AI
        onboardingProgress: {
          create: {
            step: 1,
            completedSteps: [],
          },
        },
      },
    })

    const session = createSessionToken({ userId: user.id, role: user.role })
    const response = NextResponse.json({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    })
    response.cookies.set('nv_session', session, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
