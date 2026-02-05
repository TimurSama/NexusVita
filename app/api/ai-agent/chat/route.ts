import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/prisma'
import { requireAIAccess } from '@/lib/auth/requireRole'

const schema = z.object({
  sessionId: z.string().uuid(),
  message: z.string().min(1),
})

const systemPrompt =
  'Ты персональный AI агент здоровья. Дай краткий план и рекомендации. Не ставь диагнозы.'

async function callOpenAI(messages: Array<{ role: string; content: string }>) {
  const apiKey = process.env.OPENAI_API_KEY || ''
  if (!apiKey) return null
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages,
      temperature: 0.7,
    }),
  })
  if (!response.ok) return null
  const data = await response.json()
  return data.choices?.[0]?.message?.content as string | undefined
}

async function callAnthropic(messages: Array<{ role: string; content: string }>) {
  const apiKey = process.env.ANTHROPIC_API_KEY || ''
  if (!apiKey) return null
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || 'claude-3-haiku-20240307',
      system: systemPrompt,
      max_tokens: 400,
      messages,
    }),
  })
  if (!response.ok) return null
  const data = await response.json()
  return data.content?.[0]?.text as string | undefined
}

function fallbackReply(message: string) {
  const lower = message.toLowerCase()
  if (lower.includes('сон')) {
    return 'Рекомендую 7–8 часов сна, отход ко сну до 23:30 и исключение кофеина после 16:00.'
  }
  if (lower.includes('пит')) {
    return 'Сформирую план питания на 7 дней: баланс БЖУ 30/40/30 и контроль микронутриентов.'
  }
  if (lower.includes('трен')) {
    return 'Подготовлю программу: 3 силовые + 2 кардио, акцент на восстановление.'
  }
  return 'Я зафиксировал запрос. Готов сформировать план на неделю и дать рекомендации по метрикам.'
}

export async function POST(request: NextRequest) {
  try {
    const auth = await requireAIAccess(request)
    if (auth.error) return auth.error
    if (!auth.hasAccess) {
      return NextResponse.json(
        { error: 'AI Health+ subscription required. Start your free trial!' },
        { status: 403 }
      )
    }
    const body = schema.parse(await request.json())
    const session = await prisma.aiChatSession.findUnique({
      where: { id: body.sessionId },
    })
    if (!session || session.userId !== auth.session!.userId) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    await prisma.aiChatMessage.create({
      data: {
        sessionId: body.sessionId,
        role: 'user',
        content: body.message,
      },
    })

    const history = await prisma.aiChatMessage.findMany({
      where: { sessionId: body.sessionId },
      orderBy: { createdAt: 'asc' },
      take: 12,
    })

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.map((m) => ({ role: m.role, content: m.content })),
    ]

    const provider = (process.env.AI_PROVIDER || 'fallback').toLowerCase()
    let reply: string | undefined
    if (provider === 'anthropic') {
      reply = await callAnthropic(
        history.map((m) => ({ role: m.role, content: m.content }))
      )
    } else if (provider === 'openai') {
      reply = await callOpenAI(messages)
    }
    if (!reply) {
      reply = fallbackReply(body.message)
    }

    await prisma.aiChatMessage.create({
      data: {
        sessionId: body.sessionId,
        role: 'assistant',
        content: reply,
      },
    })

    return NextResponse.json({
      reply,
      tasks: ['Обновить дневник сна', 'Проверить уровень стресса', 'Запланировать тренировку'],
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('AI agent error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
