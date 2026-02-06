import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { requireAuth } from '@/lib/auth/requireRole'

export async function GET(request: NextRequest) {
  const auth = requireAuth(request)
  if (auth.error) return auth.error

  const clientId = process.env.OURA_CLIENT_ID || ''
  const redirectUri =
    process.env.OURA_REDIRECT_URI ||
    `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/oura/callback`

  if (!clientId) {
    return NextResponse.json({ error: 'OURA_CLIENT_ID not set' }, { status: 501 })
  }

  const state = crypto.randomUUID()
  const url = new URL('https://cloud.ouraring.com/oauth/authorize')
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('client_id', clientId)
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('scope', 'daily')
  url.searchParams.set('state', state)

  const response = NextResponse.redirect(url.toString())
  response.cookies.set('oauth_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 10,
  })
  response.cookies.set('oauth_user', auth.session?.userId || '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 10,
  })
  return response
}
