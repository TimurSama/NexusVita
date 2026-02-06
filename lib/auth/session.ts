import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { verifySessionToken } from '@/lib/auth/token'

export type SessionUser = {
  userId: string
  role: string
}

export function getSessionFromRequest(request: NextRequest): SessionUser | null {
  const token = request.cookies.get('nv_session')?.value
  if (!token) return null
  const payload = verifySessionToken(token)
  if (!payload) return null
  return { userId: payload.userId, role: payload.role }
}

export function getSessionFromCookies(): SessionUser | null {
  const token = cookies().get('nv_session')?.value
  if (!token) return null
  const payload = verifySessionToken(token)
  if (!payload) return null
  return { userId: payload.userId, role: payload.role }
}
