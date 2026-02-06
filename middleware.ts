import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth/session'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Публичные маршруты
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/r/') ||
    pathname.startsWith('/pricing') ||
    pathname.startsWith('/landing')
  ) {
    return NextResponse.next()
  }

  // Проверка авторизации для защищенных маршрутов
  const session = getSessionFromRequest(request)
  
  if (!session && pathname.startsWith('/onboarding')) {
    // Онбординг доступен только авторизованным
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Редирект неавторизованных с корня на лендинг
  if (!session && pathname === '/') {
    return NextResponse.redirect(new URL('/landing', request.url))
  }

  if (!session && pathname.startsWith('/')) {
    // Дашборд требует авторизации
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Проверка онбординга для новых пользователей
  if (session && !pathname.startsWith('/onboarding') && !pathname.startsWith('/api')) {
    try {
      const { prisma } = await import('@/lib/db/prisma')
      const user = await prisma.user.findUnique({
        where: { id: session.userId },
        select: { onboardingCompleted: true },
      })

      if (user && !user.onboardingCompleted) {
        // Перенаправляем на онбординг, если не завершен
        return NextResponse.redirect(new URL('/onboarding', request.url))
      }
    } catch (error) {
      console.error('Middleware error:', error)
      // Продолжаем, если ошибка
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
