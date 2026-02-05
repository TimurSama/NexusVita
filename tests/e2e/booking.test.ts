import { describe, it, expect, beforeAll } from 'vitest'

describe('Specialist Booking Flow', () => {
  let userSession: string
  let specialistSession: string
  let specialistId: string
  let serviceId: string
  let slotId: string

  beforeAll(async () => {
    // Создание пользователя
    const userRes = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `user-${Date.now()}@test.com`,
        username: `user-${Date.now()}`,
        password: 'test123',
      }),
    })
    userSession = userRes.headers.get('set-cookie')?.split(';')[0] || ''

    // Создание специалиста (требует админских прав или отдельный endpoint)
    // В реальном тесте это может быть через seed или админ API
  })

  it('should list specialists', async () => {
    const res = await fetch('http://localhost:3000/api/specialists', {
      headers: { Cookie: userSession },
    })
    expect(res.ok).toBe(true)
    const specialists = await res.json()
    expect(Array.isArray(specialists)).toBe(true)
  })

  it('should create booking request', async () => {
    // Предполагаем, что specialistId, serviceId, slotId уже созданы
    const res = await fetch('http://localhost:3000/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: userSession,
      },
      body: JSON.stringify({
        specialistId,
        serviceId,
        slotId,
        date: new Date().toISOString(),
      }),
    })
    expect(res.ok).toBe(true)
    const booking = await res.json()
    expect(booking.status).toBe('REQUESTED')
  })
})
