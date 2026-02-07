import crypto from 'crypto'

type SessionPayload = {
  userId: string
  role: string
  exp: number
}

const encoder = new TextEncoder()

function getAuthSecret() {
  return process.env.AUTH_SECRET || 'dev-secret-change-me'
}

function base64UrlEncode(input: string) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function base64UrlDecode(input: string) {
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/')
  const padded =
    normalized + '='.repeat((4 - (normalized.length % 4)) % 4)
  return Buffer.from(padded, 'base64').toString('utf-8')
}

function sign(data: string) {
  return crypto
    .createHmac('sha256', encoder.encode(getAuthSecret()))
    .update(data)
    .digest('base64url')
}

export function createSessionToken(payload: Omit<SessionPayload, 'exp'>) {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
  const body = { ...payload, exp }
  const encoded = base64UrlEncode(JSON.stringify(body))
  const signature = sign(encoded)
  return `${encoded}.${signature}`
}

export function verifySessionToken(token: string): SessionPayload | null {
  const [encoded, signature] = token.split('.')
  if (!encoded || !signature) return null
  const expected = sign(encoded)
  
  // Проверяем длину буферов перед сравнением
  const signatureBuf = Buffer.from(signature)
  const expectedBuf = Buffer.from(expected)
  if (signatureBuf.length !== expectedBuf.length) {
    return null
  }
  
  if (!crypto.timingSafeEqual(signatureBuf, expectedBuf)) {
    return null
  }
  try {
    const payload = JSON.parse(base64UrlDecode(encoded)) as SessionPayload
    if (payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}
