import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    const analyses = await prisma.medicalAnalysisRecord.findMany({
      where: { userId },
      include: {
        indicators: true,
      },
      orderBy: {
        dateOfAnalysis: 'desc',
      },
    })

    return NextResponse.json(analyses)
  } catch (error) {
    console.error('Error fetching analyses:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      dateOfAnalysis,
      analysisType,
      sourceLab,
      documentUpload,
      trainerAccess,
      notes,
      indicators,
    } = body

    if (!userId || !dateOfAnalysis || !analysisType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const analysis = await prisma.medicalAnalysisRecord.create({
      data: {
        userId,
        dateOfAnalysis: new Date(dateOfAnalysis),
        analysisType,
        sourceLab,
        documentUpload,
        trainerAccess: trainerAccess || false,
        notes,
        indicators: {
          create: indicators || [],
        },
      },
      include: {
        indicators: true,
      },
    })

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Error creating analysis:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


