import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { getContactFormEmailTemplate, getPackageInquiryEmailTemplate } from '@/lib/emailTemplates'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: parseInt(process.env.EMAIL_PORT || '587') === 465, // true for 465, false for other ports
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
    
    // Send email (with error handling for email issues)
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration missing:', {
        EMAIL_HOST: !!process.env.EMAIL_HOST,
        EMAIL_USER: !!process.env.EMAIL_USER,
        EMAIL_PASS: !!process.env.EMAIL_PASS,
      })
      return NextResponse.json(
        { error: 'Email configuration is missing. Please contact the administrator.' },
        { status: 500 }
      )
    }

    try {
      // Verify transporter connection
      await transporter.verify()
      console.log('Email server connection verified')
    } catch (verifyError: any) {
      console.error('Email server verification failed:', verifyError)
      return NextResponse.json(
        { error: 'Email server connection failed. Please try again later.' },
        { status: 500 }
      )
    }

    try {
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
        
        const mailOptions = {
          from: `"${name}" <${process.env.EMAIL_USER}>`,
          to: 'info@edin.live',
          replyTo: email,
          subject: `New Package Inquiry: ${packageName} - ${name}`,
          html: emailTemplate,
        }
        
        const result = await transporter.sendMail(mailOptions)
        console.log('Package inquiry email sent successfully:', result.messageId)
      } else {
        // Regular contact form
        const emailTemplate = getContactFormEmailTemplate({
          name,
          email,
          phone: phone || undefined,
          message,
        })
        
        const mailOptions = {
          from: `"${name}" <${process.env.EMAIL_USER}>`,
          to: 'info@edin.live',
          replyTo: email,
          subject: `New Contact Form Submission from ${name}`,
          html: emailTemplate,
        }
        
        const result = await transporter.sendMail(mailOptions)
        console.log('Contact form email sent successfully:', result.messageId)
      }
    } catch (emailError: any) {
      console.error('Email sending error:', {
        message: emailError.message,
        code: emailError.code,
        command: emailError.command,
        response: emailError.response,
      })
      return NextResponse.json(
        { error: `Failed to send email: ${emailError.message}` },
        { status: 500 }
      )
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

