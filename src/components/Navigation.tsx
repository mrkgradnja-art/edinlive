'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { playButtonSound } from '@/lib/sound'
import Image from 'next/image'
import Link from 'next/link'

const menuItems = [
  { id: 'portfolio', labelKey: 'portfolio.title' },
  { id: 'skills', labelKey: 'skills.title' },
  { id: 'packages', labelKey: 'packages.title' },
  { id: 'contact', labelKey: 'contact.title' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [rightPosition, setRightPosition] = useState(16) // Default padding
  const [logoTop, setLogoTop] = useState(32) // Default top-8
  const { t } = useTranslation()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const updatePosition = () => {
      // Pronađi language switcher
      const languageSwitcher = document.querySelector('[data-language-switcher]')
      if (languageSwitcher) {
        const rect = languageSwitcher.getBoundingClientRect()
        const switcherWidth = rect.width
        // Language switcher right pozicija (od desnog ruba)
        const switcherRight = window.innerWidth - rect.left
        // Hamburger je lijevo od switchera, dakle veća right vrijednost
        // right pozicija hamburgera = right pozicija switchera + širina switchera + razmak
        setRightPosition(switcherRight + switcherWidth + 12) // 12px razmak
      } else {
        // Fallback: koristi isti padding sistem kao container
        const getPadding = () => {
          if (window.innerWidth >= 1024) return 32
          if (window.innerWidth >= 640) return 24
          return 16
        }
        // Language switcher je na padding poziciji, hamburger je poslije njega
        const padding = getPadding()
        // Procjeni širinu language switchera (oko 120-150px)
        const estimatedSwitcherWidth = window.innerWidth >= 640 ? 150 : 60
        setRightPosition(padding + estimatedSwitcherWidth + 12) // padding + switcher + razmak
      }

      // Pronađi Hero naslov i postavi logo iznad njega
      const heroTitle = document.querySelector('h1.text-gradient-gold')
      if (heroTitle && logoRef.current) {
        const titleRect = heroTitle.getBoundingClientRect()
        const logoHeight = logoRef.current.offsetHeight || 64 // Default height
        // Logo treba biti iznad naslova s malim razmakom
        // titleRect.top je gornji rub naslova, logo treba biti iznad toga
        setLogoTop(titleRect.top - logoHeight - 16) // 16px razmak iznad naslova
      }
    }

    // Ažuriraj poziciju na mount i resize
    updatePosition()
    const interval = setInterval(updatePosition, 100) // Ažuriraj svakih 100ms dok se ne učita
    window.addEventListener('resize', updatePosition)

    // Očisti interval nakon 2 sekunde
    setTimeout(() => clearInterval(interval), 2000)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', updatePosition)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    playButtonSound()
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Logo */}
      <Link
        ref={logoRef}
        href="/"
        className="fixed left-4 sm:left-6 lg:left-8 z-50 flex items-center"
        style={{ top: `${logoTop}px` }}
        onClick={() => playButtonSound()}
      >
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 glass-effect rounded-lg hover:luxury-glow transition-all duration-300 overflow-hidden">
          <Image
            src="/images/glavni.png"
            alt="Logo"
            fill
            className="object-contain p-2"
            priority
            unoptimized
          />
        </div>
      </Link>

      {/* Hamburger Button */}
      <button
        ref={buttonRef}
        onClick={() => {
          playButtonSound()
          setIsOpen(!isOpen)
        }}
        className="fixed top-8 z-50 w-12 h-12 flex items-center justify-center glass-effect rounded-lg hover:luxury-glow transition-all duration-300 text-luxury-gold hover:text-luxury-gold-light"
        style={{ right: `${rightPosition}px` }}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-luxury-black/90 backdrop-blur-sm z-40"
              onClick={() => {
                playButtonSound()
                setIsOpen(false)
              }}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-80 max-w-[85vw] glass-effect z-50 p-8 overflow-y-auto"
            >
              <div className="flex flex-col gap-6 mt-16">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left px-6 py-4 text-2xl font-serif font-bold text-luxury-gold hover:text-luxury-gold-light hover:bg-luxury-gold/10 rounded-lg transition-all duration-300 border border-transparent hover:border-luxury-gold/30"
                  >
                    {t(item.labelKey)}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

