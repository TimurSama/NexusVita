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

    const clientId = process.env.GARMIN_CLIENT_ID || ''
    const clientSecret = process.env.GARMIN_CLIENT_SECRET || ''
    const tokenUrl = process.env.GARMIN_TOKEN_URL || ''
    const redirectUri =
      process.env.GARMIN_REDIRECT_URI ||
      `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/garmin/callback`

    if (!clientId || !clientSecret || !tokenUrl) {
      return NextResponse.json({ error: 'Garmin OAuth not configured' }, { status: 501 })
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    })

    const tokenResponse = await fetch(tokenUrl, {
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
      where: { userId_provider: { userId, provider: 'Garmin' } },
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
        provider: 'Garmin',
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt: tokenData.expires_in
          ? new Date(Date.now() + tokenData.expires_in * 1000)
          : null,
        scope: tokenData.scope,
      },
    })

    await prisma.userIntegration.upsert({
      where: { userId_provider: { userId, provider: 'Garmin' } },
      update: { status: 'CONNECTED' },
      create: { userId, provider: 'Garmin', status: 'CONNECTED' },
    })

    const response = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/profile`
    )
    response.cookies.delete('oauth_state')
    response.cookies.delete('oauth_user')
    return response
  } catch (error) {
    console.error('Garmin OAuth error:', error)
    return NextResponse.json({ error: 'OAuth error' }, { status: 500 })
  }
}
