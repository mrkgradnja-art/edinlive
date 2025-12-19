import type { Metadata } from 'next'
import { Inter, Playfair_Display, Montserrat } from 'next/font/google'
import './globals.css'
import I18nProvider from '@/components/I18nProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://edin.live'

// Provjeri da li je siteUrl validan URL
const getMetadataBase = () => {
  try {
    return new URL(siteUrl)
  } catch {
    return new URL('https://edin.live')
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: 'Edin Live - Luxury Web Solutions | Premium Web Design & Development',
    template: '%s | Edin Live',
  },
  description: 'Premium Web Design, Development & AI Integration Services. Expert in React, Next.js, TypeScript, and AI Development. Transform your business with luxury web solutions. Professional web design, custom web development, e-commerce solutions, SEO optimization, and AI integration services.',
  keywords: [
    'web design',
    'web development',
    'AI integration',
    'SEO',
    'luxury web solutions',
    'React',
    'Next.js',
    'TypeScript',
    'AI development',
    'premium web design',
    'custom web development',
    'e-commerce solutions',
    'web applications',
  ],
  authors: [{ name: 'Edin', url: siteUrl }],
  creator: 'Edin',
  publisher: 'Edin Live',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/images/favicona.png',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/images/favicona.png',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${siteUrl}/`,
    siteName: 'Edin Live',
    title: 'Edin Live — Premium Web Design, Development & AI Integration',
    description: 'Transforming ideas into exceptional digital experiences. Expert in React, Next.js, TypeScript, and AI Development.',
    images: [
      {
        url: `${siteUrl}/images/og.png`,
        width: 1200,
        height: 630,
        alt: 'Edin Live - Luxury Web Solutions',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edin Live — Premium Web Design, Development & AI Integration',
    description: 'Transforming ideas into exceptional digital experiences. Expert in React, Next.js, TypeScript, and AI Development.',
    images: [`${siteUrl}/images/og.png`],
    creator: '@edinlive',
    site: '@edinlive',
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'Technology',
  classification: 'Web Development Services',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="facebook-domain-verification" content="u1itb2puzukgfh81ce1vpzebbdrq1n" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/`} />
        <meta property="og:title" content="Edin Live — Premium Web Design, Development & AI Integration" />
        <meta property="og:description" content="Transforming ideas into exceptional digital experiences. Expert in React, Next.js, TypeScript, and AI Development." />
        <meta property="og:image" content={`${siteUrl}/images/og.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Edin Live - Luxury Web Solutions" />
        <meta property="og:site_name" content="Edin Live" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Edin Live — Premium Web Design, Development & AI Integration" />
        <meta name="twitter:description" content="Transforming ideas into exceptional digital experiences. Expert in React, Next.js, TypeScript, and AI Development." />
        <meta name="twitter:image" content={`${siteUrl}/images/og.png`} />
        <meta name="twitter:image:alt" content="Edin Live - Luxury Web Solutions" />
        <meta name="twitter:creator" content="@edinlive" />
        <meta name="twitter:site" content="@edinlive" />
        
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${montserrat.variable} font-sans bg-luxury-black text-luxury-text antialiased loading`} suppressHydrationWarning>
        <LoadingScreen />
        <I18nProvider>
          <Header />
          {children}
          <Footer />
        </I18nProvider>
      </body>
    </html>
  )
}

