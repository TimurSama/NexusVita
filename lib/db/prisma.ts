import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Демо-режим: если нет DATABASE_URL, используем мок
export const isDemoMode = !process.env.DATABASE_URL || process.env.DEMO_MODE === 'true'

let prismaInstance: PrismaClient | null = null

if (!isDemoMode) {
  try {
    prismaInstance = globalForPrisma.prisma ?? new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prismaInstance
    }
  } catch (error) {
    console.warn('Prisma initialization failed, using demo mode:', error)
  }
}

// Экспортируем мок-объект в демо-режиме
export const prisma = prismaInstance as PrismaClient

// Проверка доступности БД
export async function isDatabaseAvailable(): Promise<boolean> {
  if (isDemoMode) return false
  if (!prismaInstance) return false
  try {
    await prismaInstance.$queryRaw`SELECT 1`
    return true
  } catch {
    return false
  }
}


