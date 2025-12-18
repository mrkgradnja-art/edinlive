import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to database (with error handling for database issues)
    try {
      await prisma.contact.create({
        data: {
          name,
          email,
          phone: phone || null,
          message,
        },
      })
    } catch (dbError: any) {
      console.error('Database error:', dbError)
      // Continue even if database fails, try to send email
    }

    // Send email (with error handling for email issues)
    try {
      if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: 'info@edin.live',
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #d4af37;">New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
              <p><strong>Message:</strong></p>
              <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</p>
              <p style="color: #666; font-size: 12px; margin-top: 20px;">
                This message was sent from the contact form on edin.live
              </p>
            </div>
          `,
        })
      } else {
        console.warn('Email configuration missing, skipping email send')
      }
    } catch (emailError: any) {
      console.error('Email error:', emailError)
      // Continue even if email fails, return success since data was received
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

