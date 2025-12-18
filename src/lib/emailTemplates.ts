export function getContactFormEmailTemplate(data: {
  name: string
  email: string
  phone?: string
  message: string
}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #1a1a1a; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(212, 175, 55, 0.2);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #000; font-size: 28px; font-weight: bold; letter-spacing: 1px;">New Contact Form Submission</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px; background-color: #1a1a1a;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="width: 150px; padding: 10px 0;">
                              <span style="color: #d4af37; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Name:</span>
                            </td>
                            <td style="padding: 10px 0;">
                              <span style="color: #f5f5f5; font-size: 16px;">${data.name}</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <tr>
                      <td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="width: 150px; padding: 10px 0;">
                              <span style="color: #d4af37; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email:</span>
                            </td>
                            <td style="padding: 10px 0;">
                              <a href="mailto:${data.email}" style="color: #f4d03f; font-size: 16px; text-decoration: none;">${data.email}</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    ${data.phone ? `
                    <tr>
                      <td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="width: 150px; padding: 10px 0;">
                              <span style="color: #d4af37; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Phone:</span>
                            </td>
                            <td style="padding: 10px 0;">
                              <a href="tel:${data.phone.replace(/\s/g, '')}" style="color: #f4d03f; font-size: 16px; text-decoration: none;">${data.phone}</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    ` : ''}
                    
                    <tr>
                      <td style="padding: 20px 0;">
                        <div style="background-color: #0a0a0a; border-left: 4px solid #d4af37; padding: 20px; border-radius: 4px;">
                          <p style="margin: 0 0 10px 0; color: #d4af37; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message:</p>
                          <p style="margin: 0; color: #f5f5f5; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 30px; background-color: #0a0a0a; text-align: center; border-top: 1px solid #2a2a2a;">
                  <p style="margin: 0; color: #888; font-size: 12px; line-height: 1.5;">
                    This message was sent from the contact form on<br>
                    <a href="https://edin.live" style="color: #d4af37; text-decoration: none;">edin.live</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

export function getPackageInquiryEmailTemplate(data: {
  packageName: string
  packagePrice: string
  name: string
  email: string
  phone: string
  projectDetails: string
  paymentMethod: string
}) {
  const paymentMethodNames: Record<string, string> = {
    'aircash': 'Aircash',
    'revolut': 'Revolut',
    'wise': 'Wise',
    'crypto': 'Crypto',
  }
  
  const paymentMethodName = paymentMethodNames[data.paymentMethod.toLowerCase()] || data.paymentMethod

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Package Inquiry</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #0a0a0a;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #1a1a1a; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(212, 175, 55, 0.2);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #000; font-size: 28px; font-weight: bold; letter-spacing: 1px;">New Package Inquiry</h1>
                  <p style="margin: 10px 0 0 0; color: #000; font-size: 18px; font-weight: 600;">${data.packageName}</p>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 40px 30px; background-color: #1a1a1a;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="width: 150px; padding: 10px 0;">
                              <span style="color: #d4af37; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Package:</span>
                            </td>
                            <td style="padding: 10px 0;">
                              <span style="color: #f5f5f5; font-size: 16px; font-weight: 600;">${data.packageName}</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <tr>
                      <td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="width: 150px; padding: 10px 0;">
                              <span style="color: #d4af37; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Price:</span>
                            </td>
                            <td style="padding: 10px 0;">
                              <span style="color: #f4d03f; font-size: 18px; font-weight: bold;">${data.packagePrice}</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <tr>
                      <td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="width: 150px; padding: 10px 0;">
                              <span style="color: #d4af37; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Customer Name:</span>
                            </td>
                            <td style="padding: 10px 0;">
                              <span style="color: #f5f5f5; font-size: 16px;">${data.name}</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <tr>
                      <td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="width: 150px; padding: 10px 0;">
                              <span style="color: #d4af37; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email:</span>
                            </td>
                            <td style="padding: 10px 0;">
                              <a href="mailto:${data.email}" style="color: #f4d03f; font-size: 16px; text-decoration: none;">${data.email}</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <tr>
                      <td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="width: 150px; padding: 10px 0;">
                              <span style="color: #d4af37; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Phone:</span>
                            </td>
                            <td style="padding: 10px 0;">
                              <a href="tel:${data.phone.replace(/\s/g, '')}" style="color: #f4d03f; font-size: 16px; text-decoration: none;">${data.phone}</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <tr>
                      <td style="padding: 15px 0; border-bottom: 1px solid #2a2a2a;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="width: 150px; padding: 10px 0;">
                              <span style="color: #d4af37; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Payment Method:</span>
                            </td>
                            <td style="padding: 10px 0;">
                              <span style="color: #f5f5f5; font-size: 16px; font-weight: 600;">${paymentMethodName}</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <tr>
                      <td style="padding: 20px 0;">
                        <div style="background-color: #0a0a0a; border-left: 4px solid #d4af37; padding: 20px; border-radius: 4px;">
                          <p style="margin: 0 0 10px 0; color: #d4af37; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Project Details:</p>
                          <p style="margin: 0; color: #f5f5f5; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${data.projectDetails}</p>
                        </div>
                      </td>
                    </tr>
                    
                    <tr>
                      <td style="padding: 15px 0; border-top: 1px solid #2a2a2a;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="width: 150px; padding: 10px 0;">
                              <span style="color: #d4af37; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Date:</span>
                            </td>
                            <td style="padding: 10px 0;">
                              <span style="color: #888; font-size: 14px;">${new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 30px; background-color: #0a0a0a; text-align: center; border-top: 1px solid #2a2a2a;">
                  <p style="margin: 0; color: #888; font-size: 12px; line-height: 1.5;">
                    This inquiry was submitted through<br>
                    <a href="https://edin.live" style="color: #d4af37; text-decoration: none;">edin.live</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
}

