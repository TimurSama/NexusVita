import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'

function parseIcs(content: string) {
  const events: Array<{ title: string; startsAt: string; endsAt?: string }> = []
  const lines = content.split(/\r?\n/)
  let current: Record<string, string> = {}
  for (const line of lines) {
    if (line.startsWith('BEGIN:VEVENT')) {
      current = {}
    } else if (line.startsWith('SUMMARY:')) {
      current.title = line.replace('SUMMARY:', '').trim()
    } else if (line.startsWith('DTSTART')) {
      const value = line.split(':')[1]?.trim()
      if (value) current.startsAt = value
    } else if (line.startsWith('DTEND')) {
      const value = line.split(':')[1]?.trim()
      if (value) current.endsAt = value
    } else if (line.startsWith('END:VEVENT')) {
      if (current.title && current.startsAt) {
        events.push({
          title: current.title,
          startsAt: current.startsAt,
          endsAt: current.endsAt,
        })
      }
    }
  }
  return events
}

function parseDate(value: string) {
  const normalized = value.endsWith('Z')
    ? value
    : `${value.slice(0, 8)}T${value.slice(9, 15)}Z`
  return new Date(normalized)
}

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 })
    }
    const text = await file.text()
    const parsed = parseIcs(text)
    const created = []
    for (const item of parsed) {
      const event = await prisma.calendarEvent.create({
        data: {
          userId: auth.session!.userId,
          title: item.title,
          type: 'IMPORT',
          startsAt: parseDate(item.startsAt),
          endsAt: item.endsAt ? parseDate(item.endsAt) : null,
        },
      })
      created.push(event)
    }
    return NextResponse.json({ imported: created.length })
  } catch (error) {
    console.error('ICS import error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
