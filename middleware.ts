import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth/session'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Публичные маршруты - все страницы доступны без регистрации
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/r/') ||
    pathname.startsWith('/pricing') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next()
  }

  // Все остальные страницы доступны без авторизации для просмотра
  // Авторизация требуется только для действий (создание, редактирование, удаление)
  const session = getSessionFromRequest(request)

  // Главная страница - всегда дашборд (для всех)
  // Редирект /landing на /about (лендинг-презентация)
  if (pathname === '/landing') {
    return NextResponse.redirect(new URL('/about', request.url))
  }

  // Проверка онбординга только для авторизованных пользователей
  if (session && !pathname.startsWith('/onboarding') && !pathname.startsWith('/api')) {
    try {
      const { prisma } = await import('@/lib/db/prisma')
      const user = await prisma.user.findUnique({
        where: { id: session.userId },
        select: { onboardingCompleted: true },
      })

      if (user && !user.onboardingCompleted && pathname !== '/onboarding') {
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
