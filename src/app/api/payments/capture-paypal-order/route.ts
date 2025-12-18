import { NextRequest, NextResponse } from 'next/server'
import paypal from '@paypal/checkout-server-sdk'
import { prisma } from '@/lib/prisma'
import { sendInquiryEmail } from '@/lib/email'

function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID || ''
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || ''
  const mode = process.env.PAYPAL_MODE || 'sandbox'

  if (mode === 'live') {
    return new paypal.core.LiveEnvironment(clientId, clientSecret)
  }
  return new paypal.core.SandboxEnvironment(clientId, clientSecret)
}

function client() {
  return new paypal.core.PayPalHttpClient(environment())
}

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json()

    const request = new paypal.orders.OrdersCaptureRequest(orderId)
    request.requestBody({})

    const capture = await client().execute(request)

    if (capture.result.status === 'COMPLETED') {
      // Update inquiry status
      const inquiry = await prisma.inquiry.update({
        where: { paymentId: orderId },
        data: { status: 'paid' },
      })

      // Send email notification
      await sendInquiryEmail(inquiry)

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false }, { status: 400 })
  } catch (error: any) {
    console.error('Error capturing PayPal order:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

