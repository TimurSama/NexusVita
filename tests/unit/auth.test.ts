import { describe, it, expect } from 'vitest'
import { hashPassword, verifyPassword } from '@/lib/auth/password'
import { createSessionToken, verifySessionToken } from '@/lib/auth/token'

describe('Authentication Utils', () => {
  it('should hash and verify password', async () => {
    const password = 'testpassword123'
    const hash = hashPassword(password)
    expect(hash).not.toBe(password)
    expect(hash.length).toBeGreaterThan(20)

    const isValid = verifyPassword(password, hash)
    expect(isValid).toBe(true)

    const isInvalid = verifyPassword('wrongpassword', hash)
    expect(isInvalid).toBe(false)
  })

  it('should generate and verify session token', () => {
    const payload = { userId: 'test-user-id', role: 'USER' }
    const token = createSessionToken(payload)
    expect(token).toBeTruthy()
    expect(typeof token).toBe('string')

    const decoded = verifySessionToken(token)
    expect(decoded).toBeTruthy()
    expect(decoded?.userId).toBe(payload.userId)
    expect(decoded?.role).toBe(payload.role)
  })

  it('should reject invalid token', () => {
    const invalidToken = 'invalid.token.here'
    const decoded = verifySessionToken(invalidToken)
    expect(decoded).toBeNull()
  })
})
