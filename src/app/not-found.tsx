'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import { playButtonSound } from '@/lib/sound'

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-9xl font-serif font-bold text-gradient-gold mb-6"
        >
          404
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-luxury-gold mb-4">
          Page Not Found
        </h1>
        
        <p className="text-xl text-luxury-text-muted mb-8 font-montserrat">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            onClick={playButtonSound}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-gold text-luxury-black font-semibold rounded-lg hover:luxury-glow transition-all duration-300 transform hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
          
          <button
            onClick={() => {
              playButtonSound()
              window.history.back()
            }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-luxury-gold/10 text-luxury-gold border-2 border-luxury-gold/30 font-semibold rounded-lg hover:bg-luxury-gold/20 hover:border-luxury-gold transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-luxury-gold/20">
          <p className="text-luxury-text-muted mb-4 font-montserrat">Popular Pages:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#portfolio"
              onClick={playButtonSound}
              className="text-luxury-gold hover:text-luxury-gold-light transition-colors font-montserrat"
            >
              Portfolio
            </Link>
            <Link
              href="/#skills"
              onClick={playButtonSound}
              className="text-luxury-gold hover:text-luxury-gold-light transition-colors font-montserrat"
            >
              Skills
            </Link>
            <Link
              href="/#packages"
              onClick={playButtonSound}
              className="text-luxury-gold hover:text-luxury-gold-light transition-colors font-montserrat"
            >
              Packages
            </Link>
            <Link
              href="/#contact"
              onClick={playButtonSound}
              className="text-luxury-gold hover:text-luxury-gold-light transition-colors font-montserrat"
            >
              Contact
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

