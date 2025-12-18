import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Pročitaj robots.txt iz public foldera
    const filePath = path.join(process.cwd(), 'public', 'robots.txt')
    const robotsTxt = fs.readFileSync(filePath, 'utf8')
    
    return new NextResponse(robotsTxt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'X-Robots-Tag': 'noindex', // Ne indexiraj sam robots.txt
      },
    })
  } catch (error) {
    // Fallback robots.txt ako fajl ne postoji
    const fallback = `User-agent: *
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Facebot
Allow: /

Sitemap: https://edin.live/sitemap.xml`
    
    return new NextResponse(fallback, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  }
}

