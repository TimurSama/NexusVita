import crypto from 'crypto'

const ITERATIONS = 120000
const KEYLEN = 64
const DIGEST = 'sha512'

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST)
    .toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string) {
  const [salt, originalHash] = stored.split(':')
  if (!salt || !originalHash) return false
  const hash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEYLEN, DIGEST)
    .toString('hex')
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(originalHash))
}
