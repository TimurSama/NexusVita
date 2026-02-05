import { prisma } from '@/lib/db/prisma'

export async function logAudit(
  userId: string,
  action: string,
  targetType?: string,
  targetId?: string,
  metadata?: Record<string, unknown>
) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        targetType,
        targetId,
        metadata: metadata ? JSON.stringify(metadata) : null,
        ipAddress: null, // Можно добавить из request
        userAgent: null, // Можно добавить из request
      },
    })
  } catch (error) {
    console.error('Audit log error:', error)
    // Не бросаем ошибку, чтобы не ломать основной флоу
  }
}

// Расширенное логирование с контекстом запроса
export async function logAuditWithContext(
  userId: string,
  action: string,
  targetType?: string,
  targetId?: string,
  metadata?: Record<string, unknown>,
  ipAddress?: string,
  userAgent?: string
) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        targetType,
        targetId,
        metadata: metadata ? JSON.stringify(metadata) : null,
        ipAddress,
        userAgent,
      },
    })
  } catch (error) {
    console.error('Audit log error:', error)
  }
}

// Логирование критичных действий (требует немедленного внимания)
export async function logCriticalAction(
  userId: string,
  action: string,
  targetType?: string,
  targetId?: string,
  metadata?: Record<string, unknown>
) {
  await logAudit(userId, `CRITICAL:${action}`, targetType, targetId, metadata)
  // Здесь можно добавить отправку уведомлений в Sentry или другие системы мониторинга
}
