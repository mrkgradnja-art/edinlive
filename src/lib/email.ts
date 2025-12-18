import nodemailer from 'nodemailer'
import { Inquiry } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendInquiryEmail(inquiry: Inquiry) {
  const emailTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background: #000;
          color: #f5f5f5;
        }
        .header {
          background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
          color: #000;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          background: #1a1a1a;
          padding: 30px;
          border: 1px solid #d4af37;
          border-top: none;
          border-radius: 0 0 10px 10px;
        }
        .info-row {
          margin: 15px 0;
          padding: 10px;
          background: #0a0a0a;
          border-left: 3px solid #d4af37;
        }
        .info-label {
          font-weight: bold;
          color: #d4af37;
          display: inline-block;
          min-width: 150px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          color: #b0b0b0;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>New Package Inquiry</h1>
      </div>
      <div class="content">
        <div class="info-row">
          <span class="info-label">Package:</span>
          <span>${inquiry.packageName}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Customer Name:</span>
          <span>${inquiry.name}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span>${inquiry.email}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Amount:</span>
          <span>${inquiry.currency} ${inquiry.amount}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Payment Method:</span>
          <span>${inquiry.paymentMethod.toUpperCase()}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Payment ID:</span>
          <span>${inquiry.paymentId || 'N/A'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Status:</span>
          <span>${inquiry.status.toUpperCase()}</span>
        </div>
        ${inquiry.message ? `
        <div class="info-row">
          <span class="info-label">Message:</span>
          <span>${inquiry.message}</span>
        </div>
        ` : ''}
        <div class="info-row">
          <span class="info-label">Date:</span>
          <span>${new Date(inquiry.createdAt).toLocaleString()}</span>
        </div>
      </div>
      <div class="footer">
        <p>This inquiry was submitted through edin.live</p>
      </div>
    </body>
    </html>
  `

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'info@edin.live',
    subject: `New Package Inquiry: ${inquiry.packageName} - ${inquiry.name}`,
    html: emailTemplate,
  })
}

