import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { requireAuth } from '@/lib/auth/requireRole'

export async function GET(request: NextRequest) {
  const auth = requireAuth(request)
  if (auth.error) return auth.error

  const clientId = process.env.GARMIN_CLIENT_ID || ''
  const authorizeUrl = process.env.GARMIN_AUTHORIZE_URL || ''
  const redirectUri =
    process.env.GARMIN_REDIRECT_URI ||
    `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/garmin/callback`

  if (!clientId || !authorizeUrl) {
    return NextResponse.json({ error: 'Garmin OAuth not configured' }, { status: 501 })
  }

  const state = crypto.randomUUID()
  const url = new URL(authorizeUrl)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('client_id', clientId)
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('scope', 'health')
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
