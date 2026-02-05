import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { verifyPassword } from '@/lib/auth/password'
import { createSessionToken } from '@/lib/auth/token'

const schema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(8),
})

export async function POST(request: NextRequest) {
  try {
    const body = schema.parse(await request.json())
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: body.identifier }, { username: body.identifier }],
      },
    })

    if (!user || !verifyPassword(body.password, user.passwordHash)) {
      return NextResponse.json(
        { error: 'Неверные учетные данные' },
        { status: 401 }
      )
    }

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
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
