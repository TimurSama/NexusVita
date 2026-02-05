import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    if (!file) {
      return NextResponse.json({ error: 'Файл обязателен' }, { status: 400 })
    }

    return NextResponse.json({
      id: crypto.randomUUID(),
      fileName: file.name,
      size: file.size,
      status: 'черновик',
    })
  } catch (error) {
    console.error('Import error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
