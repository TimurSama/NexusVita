import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma, isDatabaseAvailable } from '@/lib/db/prisma'
import { requireAuth } from '@/lib/auth/requireRole'
import { logAudit } from '@/lib/audit/log'

const updateSchema = z.object({
  step: z.number().min(1).max(5),
  completed: z.boolean(),
})

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error

    const dbAvailable = await isDatabaseAvailable()

    // Демо-режим: возвращаем демо-прогресс
    if (!dbAvailable) {
      return NextResponse.json({
        id: 'demo_progress',
        userId: auth.session!.userId,
        step: 1,
        completedSteps: [],
        step1Completed: false,
        step2Completed: false,
        step3Completed: false,
        step4Completed: false,
        step5Completed: false,
      })
    }

    const progress = await prisma.onboardingProgress.findUnique({
      where: { userId: auth.session!.userId },
    })

    if (!progress) {
      // Создаем прогресс, если его нет
      const newProgress = await prisma.onboardingProgress.create({
        data: {
          userId: auth.session!.userId,
          step: 1,
        },
      })
      return NextResponse.json(newProgress)
    }

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Onboarding GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    if (auth.error) return auth.error

    const body = updateSchema.parse(await request.json())
    const { step, completed } = body

    const dbAvailable = await isDatabaseAvailable()

    // Демо-режим: возвращаем обновленный прогресс
    if (!dbAvailable) {
      const completedSteps = completed ? [step.toString()] : []
      return NextResponse.json({
        id: 'demo_progress',
        userId: auth.session!.userId,
        step: completed && step < 5 ? step + 1 : step,
        completedSteps,
        step1Completed: step === 1 && completed,
        step2Completed: step === 2 && completed,
        step3Completed: step === 3 && completed,
        step4Completed: step === 4 && completed,
        step5Completed: step === 5 && completed,
      })
    }

    const progress = await prisma.onboardingProgress.findUnique({
      where: { userId: auth.session!.userId },
    })

    if (!progress) {
      return NextResponse.json({ error: 'Onboarding progress not found' }, { status: 404 })
    }

    const updateData: Record<string, unknown> = { step }
    const completedSteps = [...progress.completedSteps]

    if (completed) {
      // Отмечаем шаг как завершенный
      const stepKey = `step${step}Completed` as keyof typeof progress
      updateData[stepKey] = true
      
      if (!completedSteps.includes(step.toString())) {
        completedSteps.push(step.toString())
      }

      // Переходим на следующий шаг, если не последний
      if (step < 5) {
        updateData.step = step + 1
      } else {
        // Завершаем онбординг
        await prisma.user.update({
          where: { id: auth.session!.userId },
          data: { onboardingCompleted: true },
        })
      }
    }

    updateData.completedSteps = completedSteps

    const updated = await prisma.onboardingProgress.update({
      where: { userId: auth.session!.userId },
      data: updateData,
    })

    logAudit(auth.session!.userId, 'onboarding_step_completed', 'OnboardingProgress', updated.id, {
      step,
      completed,
    })

    return NextResponse.json(updated)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 })
    }
    console.error('Onboarding POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
