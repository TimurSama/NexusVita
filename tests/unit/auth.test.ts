import { describe, it, expect } from 'vitest'
import { hashPassword, verifyPassword } from '@/lib/auth/password'
import { generateAuthToken, verifyAuthToken } from '@/lib/auth/token'

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

  it('should generate and verify JWT token', () => {
    const payload = { userId: 'test-user-id', role: 'USER' }
    const token = generateAuthToken(payload)
    expect(token).toBeTruthy()
    expect(typeof token).toBe('string')

    const decoded = verifyAuthToken(token)
    expect(decoded).toBeTruthy()
    expect(decoded?.userId).toBe(payload.userId)
    expect(decoded?.role).toBe(payload.role)
  })

  it('should reject invalid token', () => {
    const invalidToken = 'invalid.token.here'
    const decoded = verifyAuthToken(invalidToken)
    expect(decoded).toBeNull()
  })
})
