import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'
import { getContactFormEmailTemplate, getPackageInquiryEmailTemplate } from '@/lib/emailTemplates'

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

    // Check if this is a package inquiry (message contains "Package:" and "Payment Method:")
    const isPackageInquiry = message.includes('Package:') && message.includes('Payment Method:')
    
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
        if (isPackageInquiry) {
          // Parse package inquiry data
          const packageMatch = message.match(/Package:\s*(.+?)(?:\n|$)/m)
          const priceMatch = message.match(/Price:\s*(.+?)(?:\n|$)/m)
          const projectDetailsMatch = message.match(/Project Details:\s*([\s\S]+?)(?:\n\nPayment Method:|$)/m)
          const paymentMethodMatch = message.match(/Payment Method:\s*(.+?)(?:\n|$)/m)
          
          const packageName = packageMatch ? packageMatch[1].trim() : 'Unknown Package'
          const packagePrice = priceMatch ? priceMatch[1].trim() : 'N/A'
          const projectDetails = projectDetailsMatch ? projectDetailsMatch[1].trim() : 'No details provided'
          const paymentMethod = paymentMethodMatch ? paymentMethodMatch[1].trim() : 'Not specified'
          
          const emailTemplate = getPackageInquiryEmailTemplate({
            packageName,
            packagePrice,
            name,
            email,
            phone: phone || 'Not provided',
            projectDetails,
            paymentMethod,
          })
          
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'info@edin.live',
            subject: `New Package Inquiry: ${packageName} - ${name}`,
            html: emailTemplate,
          })
        } else {
          // Regular contact form
          const emailTemplate = getContactFormEmailTemplate({
            name,
            email,
            phone: phone || undefined,
            message,
          })
          
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'info@edin.live',
            subject: `New Contact Form Submission from ${name}`,
            html: emailTemplate,
          })
        }
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

