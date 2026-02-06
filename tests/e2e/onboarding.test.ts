import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Onboarding Flow', () => {
  let testUserId: string
  let testSessionCookie: string

  beforeAll(async () => {
    // Регистрация тестового пользователя
    const registerRes = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `test-${Date.now()}@example.com`,
        username: `testuser-${Date.now()}`,
        password: 'testpass123',
        firstName: 'Test',
        lastName: 'User',
      }),
    })
    expect(registerRes.ok).toBe(true)
    const cookies = registerRes.headers.get('set-cookie')
    testSessionCookie = cookies?.split(';')[0] || ''
    const userData = await registerRes.json()
    testUserId = userData.id
  })

  it('should create onboarding progress on registration', async () => {
    const res = await fetch('http://localhost:3000/api/onboarding', {
      headers: {
        Cookie: testSessionCookie,
      },
    })
    expect(res.ok).toBe(true)
    const progress = await res.json()
    expect(progress.step).toBe(1)
    expect(progress.completedSteps).toEqual([])
  })

  it('should update onboarding step', async () => {
    const res = await fetch('http://localhost:3000/api/onboarding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: testSessionCookie,
      },
      body: JSON.stringify({ step: 1, completed: true }),
    })
    expect(res.ok).toBe(true)
    const progress = await res.json()
    expect(progress.step1Completed).toBe(true)
    expect(progress.step).toBe(2)
  })

  it('should complete onboarding', async () => {
    // Завершаем все шаги
    for (let step = 1; step <= 5; step++) {
      await fetch('http://localhost:3000/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: testSessionCookie,
        },
        body: JSON.stringify({ step, completed: true }),
      })
    }

    const res = await fetch('http://localhost:3000/api/onboarding', {
      headers: {
        Cookie: testSessionCookie,
      },
    })
    const progress = await res.json()
    expect(progress.step5Completed).toBe(true)
  })

  afterAll(async () => {
    // Очистка тестовых данных (если нужно)
  })
})
