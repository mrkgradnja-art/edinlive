import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, packageId, packageName, name, email, message } = body

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        packageId,
        packageName,
        name,
        email,
        message: message || '',
      },
    })

    // Create inquiry record
    await prisma.inquiry.create({
      data: {
        packageId,
        packageName,
        name,
        email,
        message: message || null,
        questions: {},
        paymentMethod: 'stripe',
        paymentId: paymentIntent.id,
        amount,
        currency: 'USD',
        status: 'pending',
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error: any) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

