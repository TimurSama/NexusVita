import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { UserRole } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const role = request.nextUrl.searchParams.get('role')
    const q = request.nextUrl.searchParams.get('q')
    const roles: UserRole[] = role ? [role as UserRole] : ['TRAINER', 'DOCTOR', 'PSYCHOLOGIST']
    const list = await prisma.user.findMany({
      where: {
        role: { in: roles },
        OR: q
          ? [
              { username: { contains: q, mode: 'insensitive' } },
              { firstName: { contains: q, mode: 'insensitive' } },
              { lastName: { contains: q, mode: 'insensitive' } },
            ]
          : undefined,
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(list)
  } catch (error) {
    console.error('Specialists list error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
