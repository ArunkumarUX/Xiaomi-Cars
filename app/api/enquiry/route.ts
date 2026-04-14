import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, carInterest, message } = body

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Name, phone and email are required' },
        { status: 400 }
      )
    }

    // In production: store to database + send email via Resend/SendGrid
    console.log('New enquiry:', { name, phone, email, carInterest, message, createdAt: new Date() })

    return NextResponse.json(
      { success: true, message: 'Enquiry received. We will contact you within 24 hours.' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json({ error: 'Failed to process enquiry' }, { status: 500 })
  }
}
