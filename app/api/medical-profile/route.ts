import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { ensureSelfOrRole } from '@/lib/auth/requireRole'
import { logAudit } from '@/lib/audit/log'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const auth = ensureSelfOrRole(request, userId, [
      'ADMIN',
      'DOCTOR',
      'PSYCHOLOGIST',
      'TRAINER',
    ])
    if (auth.error) return auth.error

    const profile = await prisma.medicalProfile.findUnique({
      where: { userId },
    })

    if (auth.session) {
      logAudit(auth.session.userId, 'medical_profile_view', 'MedicalProfile', userId)
    }
    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error fetching medical profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      bloodType,
      allergies,
      chronicConditions,
      emergencyContactName,
      emergencyContactPhone,
      medications,
      vaccinations,
    } = body

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    const auth = ensureSelfOrRole(request, userId, [
      'ADMIN',
      'DOCTOR',
      'PSYCHOLOGIST',
      'TRAINER',
    ])
    if (auth.error) return auth.error

    const profile = await prisma.medicalProfile.upsert({
      where: { userId },
      update: {
        bloodType,
        allergies: allergies ?? [],
        chronicConditions: chronicConditions ?? [],
        emergencyContactName,
        emergencyContactPhone,
        medications,
        vaccinations,
      },
      create: {
        userId,
        bloodType,
        allergies: allergies ?? [],
        chronicConditions: chronicConditions ?? [],
        emergencyContactName,
        emergencyContactPhone,
        medications,
        vaccinations,
      },
    })

    if (auth.session) {
      logAudit(auth.session.userId, 'medical_profile_update', 'MedicalProfile', profile.id)
    }
    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error saving medical profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
