import { prisma } from '@/lib/db/prisma'
import { Prisma } from '@prisma/client'

type FhirObservation = {
  id?: string
  code?: { text?: string; coding?: Array<{ code?: string; display?: string }> }
  valueQuantity?: { value?: number; unit?: string }
  effectiveDateTime?: string
  issued?: string
}

function detectMetric(observation: FhirObservation) {
  const code =
    observation.code?.coding?.[0]?.code?.toLowerCase() ||
    observation.code?.text?.toLowerCase() ||
    ''
  if (code.includes('8867-4') || code.includes('heart')) return 'HEART_RATE'
  if (code.includes('41950-7') || code.includes('step')) return 'STEPS'
  if (code.includes('sleep') || code.includes('93832-4')) return 'SLEEP'
  return null
}

export async function syncFhir(userId: string) {
  const token = await prisma.integrationToken.findUnique({
    where: { userId_provider: { userId, provider: 'FHIR' } },
  })
  if (!token || !token.accessToken) {
    throw new Error('FHIR not connected')
  }

  const metadata = (token.metadata || {}) as {
    baseUrl?: string
    patientId?: string
  }
  if (!metadata.baseUrl) {
    throw new Error('FHIR baseUrl missing')
  }

  let patientId = metadata.patientId
  if (!patientId) {
    const patientResp = await fetch(`${metadata.baseUrl}/Patient?_count=1`, {
      headers: { Authorization: `Bearer ${token.accessToken}` },
    })
    const patientBundle = await patientResp.json()
    patientId = patientBundle?.entry?.[0]?.resource?.id
    if (!patientId) {
      throw new Error('Patient not found')
    }
    await prisma.integrationToken.update({
      where: { id: token.id },
      data: { metadata: { ...metadata, patientId } },
    })
  }

  const patientResp = await fetch(`${metadata.baseUrl}/Patient/${patientId}`, {
    headers: { Authorization: `Bearer ${token.accessToken}` },
  })
  const patient = await patientResp.json()
  await prisma.fhirPatient.upsert({
    where: { userId_patientId: { userId, patientId } },
    update: { data: patient },
    create: { userId, patientId, data: patient },
  })

  const obsResp = await fetch(
    `${metadata.baseUrl}/Observation?patient=${patientId}&_count=50`,
    {
      headers: { Authorization: `Bearer ${token.accessToken}` },
    }
  )
  const obsBundle = await obsResp.json()
  const entries: Array<{ resource?: FhirObservation }> = obsBundle?.entry || []

  for (const entry of entries) {
    const resource = entry.resource
    if (!resource?.id) continue
    const value = resource.valueQuantity?.value
    const unit = resource.valueQuantity?.unit
    const effective = resource.effectiveDateTime || resource.issued
    await prisma.fhirObservation.upsert({
      where: { userId_observationId: { userId, observationId: resource.id } },
      update: {
        code: resource.code?.text || resource.code?.coding?.[0]?.display || null,
        value: value ?? null,
        unit: unit ?? null,
        effectiveDate: effective ? new Date(effective) : null,
        raw: resource as Prisma.InputJsonValue,
      },
      create: {
        userId,
        observationId: resource.id,
        code: resource.code?.text || resource.code?.coding?.[0]?.display || null,
        value: value ?? null,
        unit: unit ?? null,
        effectiveDate: effective ? new Date(effective) : null,
        raw: resource as Prisma.InputJsonValue,
      },
    })

    const metricType = detectMetric(resource)
    if (metricType && typeof value === 'number' && effective) {
      await prisma.healthMetric.upsert({
        where: {
          userId_source_type_measuredAt: {
            userId,
            source: 'FHIR',
            type: metricType,
            measuredAt: new Date(effective),
          },
        },
        update: { value, unit: unit ?? null, raw: resource as Prisma.InputJsonValue },
        create: {
          userId,
          source: 'FHIR',
          type: metricType,
          value,
          unit: unit ?? null,
          measuredAt: new Date(effective),
          raw: resource as Prisma.InputJsonValue,
        },
      })
    }
  }

  return { patientId }
}
