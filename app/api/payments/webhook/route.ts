import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/payments/stripe'

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 501 })
  }

  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret missing' }, { status: 500 })
  }

  const payload = await request.text()
  try {
    stripe.webhooks.constructEvent(payload, signature, webhookSecret)
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Stripe webhook error:', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }
}
