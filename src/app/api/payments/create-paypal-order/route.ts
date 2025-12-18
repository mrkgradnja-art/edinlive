import { NextRequest, NextResponse } from 'next/server'
import paypal from '@paypal/checkout-server-sdk'
import { prisma } from '@/lib/prisma'

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
    const body = await request.json()
    const { amount, packageId, packageName, name, email, message } = body

    const request = new paypal.orders.OrdersCreateRequest()
    request.prefer('return=representation')
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: amount.toString(),
          },
          description: `Package: ${packageName}`,
        },
      ],
    })

    const order = await client().execute(request)

    // Create inquiry record
    await prisma.inquiry.create({
      data: {
        packageId,
        packageName,
        name,
        email,
        message: message || null,
        questions: {},
        paymentMethod: 'paypal',
        paymentId: order.result.id,
        amount,
        currency: 'USD',
        status: 'pending',
      },
    })

    return NextResponse.json({ orderId: order.result.id })
  } catch (error: any) {
    console.error('Error creating PayPal order:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

