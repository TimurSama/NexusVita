import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get('code')
    const state = request.nextUrl.searchParams.get('state')
    const storedState = request.cookies.get('oauth_state')?.value
    const userId = request.cookies.get('oauth_user')?.value

    if (!code || !state || !storedState || state !== storedState || !userId) {
      return NextResponse.json({ error: 'Invalid OAuth state' }, { status: 400 })
    }

    const clientId = process.env.OURA_CLIENT_ID || ''
    const clientSecret = process.env.OURA_CLIENT_SECRET || ''
    const redirectUri =
      process.env.OURA_REDIRECT_URI ||
      `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/oura/callback`

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: 'Oura OAuth not configured' }, { status: 501 })
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    })

    const tokenResponse = await fetch('https://api.ouraring.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })

    if (!tokenResponse.ok) {
      const errorBody = await tokenResponse.text()
      return NextResponse.json({ error: errorBody }, { status: 400 })
    }

    const tokenData = (await tokenResponse.json()) as {
      access_token: string
      refresh_token?: string
      expires_in?: number
      scope?: string
    }

    await prisma.integrationToken.upsert({
      where: { userId_provider: { userId, provider: 'Oura' } },
      update: {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt: tokenData.expires_in
          ? new Date(Date.now() + tokenData.expires_in * 1000)
          : null,
        scope: tokenData.scope,
      },
      create: {
        userId,
        provider: 'Oura',
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt: tokenData.expires_in
          ? new Date(Date.now() + tokenData.expires_in * 1000)
          : null,
        scope: tokenData.scope,
      },
    })

    await prisma.userIntegration.upsert({
      where: { userId_provider: { userId, provider: 'Oura' } },
      update: { status: 'CONNECTED' },
      create: { userId, provider: 'Oura', status: 'CONNECTED' },
    })

    const response = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/profile`
    )
    response.cookies.delete('oauth_state')
    response.cookies.delete('oauth_user')
    return response
  } catch (error) {
    console.error('Oura OAuth error:', error)
    return NextResponse.json({ error: 'OAuth error' }, { status: 500 })
  }
}
