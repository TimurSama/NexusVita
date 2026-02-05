import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { stripe } from '@/lib/payments/stripe'

const schema = z.object({
  userId: z.string().uuid(),
  planId: z.string().min(2),
  amount: z.number().positive(),
  currency: z.string().default('RUB'),
})

export async function POST(request: NextRequest) {
  try {
    const body = schema.parse(await request.json())

    if (!stripe) {
      return NextResponse.json(
        {
          error:
            'Платежи не подключены. Добавьте STRIPE_SECRET_KEY для включения.',
        },
        { status: 501 }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: body.currency.toLowerCase(),
            product_data: { name: `Nexus Vita - ${body.planId}` },
            unit_amount: Math.round(body.amount * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: body.userId,
        planId: body.planId,
      },
      success_url: `${baseUrl}/subscriptions?checkout=success`,
      cancel_url: `${baseUrl}/subscriptions?checkout=cancel`,
    })

    return NextResponse.json({
      status: 'pending',
      provider: 'stripe',
      checkoutUrl: session.url,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
