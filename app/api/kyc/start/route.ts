import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { kycConfig } from '@/lib/payments/config'
import { requireAuth } from '@/lib/auth/requireRole'
import { logAudit } from '@/lib/audit/log'

const schema = z.object({
  level: z.enum(['basic', 'advanced', 'full']).default('basic'),
})

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error

    const body = schema.parse(await request.json())

    if (kycConfig.provider === 'disabled') {
      return NextResponse.json(
        {
          error:
            'KYC не подключен. Укажите KYC_PROVIDER и KYC_API_KEY для активации.',
        },
        { status: 501 }
      )
    }

    // Интеграция с Sumsub (пример)
    let verificationUrl = ''
    if (kycConfig.provider === 'sumsub') {
      // Здесь будет реальная интеграция с Sumsub API
      // const sumsubResponse = await fetch('https://api.sumsub.com/...', {...})
      verificationUrl = `https://sumsub.com/verify?userId=${auth.session!.userId}&level=${body.level}`
    } else if (kycConfig.provider === 'onfido') {
      // Интеграция с Onfido
      verificationUrl = `https://onfido.com/verify?userId=${auth.session!.userId}&level=${body.level}`
    }

    logAudit(auth.session!.userId, 'kyc_started', 'KYC', auth.session!.userId, {
      provider: kycConfig.provider,
      level: body.level,
    })

    return NextResponse.json({
      status: 'pending',
      provider: kycConfig.provider,
      userId: auth.session!.userId,
      level: body.level,
      verificationUrl,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('KYC start error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
