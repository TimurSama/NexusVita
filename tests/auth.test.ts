import { describe, expect, it } from 'vitest'
import { hashPassword, verifyPassword } from '@/lib/auth/password'
import { createSessionToken, verifySessionToken } from '@/lib/auth/token'

describe('auth utils', () => {
  it('hashes and verifies passwords', () => {
    const password = 'StrongPassword123!'
    const hash = hashPassword(password)
    expect(hash).toContain(':')
    expect(verifyPassword(password, hash)).toBe(true)
    expect(verifyPassword('wrong', hash)).toBe(false)
  })

  it('creates and verifies session tokens', () => {
    const token = createSessionToken({ userId: 'user-1', role: 'USER' })
    const payload = verifySessionToken(token)
    expect(payload?.userId).toBe('user-1')
    expect(payload?.role).toBe('USER')
  })
})
