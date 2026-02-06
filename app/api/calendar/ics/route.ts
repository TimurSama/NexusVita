import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { ensureSelfOrRole } from '@/lib/auth/requireRole'

function formatDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }
    const auth = ensureSelfOrRole(request, userId, ['ADMIN', 'DOCTOR', 'TRAINER'])
    if (auth.error) return auth.error

    const events = await prisma.calendarEvent.findMany({
      where: { userId },
      orderBy: { startsAt: 'asc' },
    })

    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//NexusVita//Calendar//RU',
    ]
    for (const event of events) {
      lines.push('BEGIN:VEVENT')
      lines.push(`UID:${event.id}`)
      lines.push(`DTSTART:${formatDate(event.startsAt)}`)
      if (event.endsAt) {
        lines.push(`DTEND:${formatDate(event.endsAt)}`)
      }
      lines.push(`SUMMARY:${event.title}`)
      if (event.description) {
        lines.push(`DESCRIPTION:${event.description}`)
      }
      if (event.location) {
        lines.push(`LOCATION:${event.location}`)
      }
      lines.push('END:VEVENT')
    }
    lines.push('END:VCALENDAR')

    return new NextResponse(lines.join('\n'), {
      headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
    })
  } catch (error) {
    console.error('ICS export error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
