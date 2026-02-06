import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET(request: NextRequest) {
  try {
    // В реальном приложении здесь будет проверка авторизации
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    const metrics = await prisma.personalMetrics.findUnique({
      where: { userId },
    })

    return NextResponse.json(metrics || {})
  } catch (error) {
    console.error('Error fetching metrics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, ...metricsData } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    const metrics = await prisma.personalMetrics.upsert({
      where: { userId },
      update: metricsData,
      create: {
        userId,
        ...metricsData,
      },
    })

    return NextResponse.json(metrics)
  } catch (error) {
    console.error('Error saving metrics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


