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
    default: 'Edin Live - Luxury Web Solutions',
    template: '%s | Edin Live',
  },
  description: 'Premium Web Design, Development & AI Integration Services. Expert in React, Next.js, TypeScript, and AI Development. Transform your business with luxury web solutions.',
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
    url: siteUrl,
    siteName: 'Edin Live',
    title: 'Edin Live - Luxury Web Solutions',
    description: 'Premium Web Design, Development & AI Integration Services. Expert in React, Next.js, TypeScript, and AI Development.',
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: 'Edin Live - Luxury Web Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edin Live - Luxury Web Solutions',
    description: 'Premium Web Design, Development & AI Integration Services. Expert in React, Next.js, TypeScript, and AI Development.',
    images: ['/images/og.png'],
    creator: '@edinlive',
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'Technology',
  classification: 'Web Development Services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
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

