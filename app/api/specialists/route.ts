import { NextRequest, NextResponse } from 'next/server'
import { prisma, isDatabaseAvailable } from '@/lib/db/prisma'
import { UserRole } from '@prisma/client'
import { mockSpecialists } from '@/lib/demo/mock-data'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const dbAvailable = await isDatabaseAvailable()

    // Демо-режим: возвращаем демо-специалистов
    if (!dbAvailable) {
      const role = request.nextUrl.searchParams.get('role')
      const q = request.nextUrl.searchParams.get('q')?.toLowerCase() || ''
      
      let filtered = mockSpecialists
      
      if (role) {
        const roleMap: Record<string, string> = {
          'TRAINER': 'TRAINER',
          'DOCTOR': 'DOCTOR',
          'PSYCHOLOGIST': 'PSYCHOLOGIST',
        }
        filtered = filtered.filter(s => s.role === roleMap[role])
      }
      
      if (q) {
        filtered = filtered.filter(s => 
          s.name.toLowerCase().includes(q) ||
          s.specialization.toLowerCase().includes(q)
        )
      }
      
      return NextResponse.json(filtered.map(s => ({
        id: s.id,
        username: s.name.toLowerCase().replace(/\s+/g, '_'),
        firstName: s.name.split(' ')[0],
        lastName: s.name.split(' ')[1] || '',
        role: s.role,
      })))
    }

    // Режим с БД
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
