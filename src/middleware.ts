import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Lista dozvoljenih bot user agenta
const allowedBots = [
  'facebookexternalhit',
  'Facebot',
  'facebookcatalog',
  'Twitterbot',
  'Twitter',
  'LinkedInBot',
  'LinkedIn',
  'Instagram',
  'Pinterestbot',
  'Pinterest',
  'WhatsApp',
  'TelegramBot',
  'Discordbot',
  'Redditbot',
  'Snapchat',
  'TikTokBot',
  'Googlebot',
  'Googlebot-Image',
  'Googlebot-Video',
  'Google-InspectionTool',
  'Bingbot',
  'Yandex',
  'Baiduspider',
]

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  
  // Provjeri da li je request od dozvoljenog bota
  const isAllowedBot = allowedBots.some(bot => 
    userAgent.toLowerCase().includes(bot.toLowerCase())
  )
  
  // Ako je bot, dodaj headers koji dozvoljavaju pristup
  if (isAllowedBot) {
    const response = NextResponse.next()
    
    // Dodaj headers koji dozvoljavaju botovima pristup
    response.headers.set('X-Robots-Tag', 'index, follow')
    response.headers.set('Cache-Control', 'public, max-age=3600')
    
    return response
  }
  
  // Za sve ostale requeste, nastavi normalno
  return NextResponse.next()
}

// Primijeni middleware samo na određene rute
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (image files)
     * - sounds (sound files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|sounds).*)',
  ],
}

