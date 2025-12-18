'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { playButtonSound } from '@/lib/sound'
import Image from 'next/image'
import Link from 'next/link'
import LanguageSwitcher from './LanguageSwitcher'

const menuItems = [
  { id: 'portfolio', labelKey: 'portfolio.title' },
  { id: 'skills', labelKey: 'skills.title' },
  { id: 'packages', labelKey: 'packages.title' },
  { id: 'contact', labelKey: 'contact.title' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useTranslation()
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50) // Postavi pozadinu nakon 50px scroll-a
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Provjeri na mount

    return () => {
      window.removeEventListener('scroll', handleScroll)
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
      {/* Top Bar - Fixed Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          isScrolled 
            ? 'bg-luxury-black/80 backdrop-blur-md border-luxury-gold/10' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Left */}
            <Link
              href="/"
              className="flex items-center h-12 w-12 glass-effect rounded-lg hover:luxury-glow transition-all duration-300 overflow-hidden"
              onClick={() => playButtonSound()}
            >
              <Image
                src="/images/glavni.png"
                alt="Logo"
                width={48}
                height={48}
                className="object-contain p-2"
                priority
                unoptimized
              />
            </Link>

            {/* Right Side - Language Switcher & Hamburger */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Hamburger Button */}
              <button
                ref={buttonRef}
                onClick={() => {
                  playButtonSound()
                  setIsOpen(!isOpen)
                }}
                className="h-12 w-12 flex items-center justify-center glass-effect rounded-lg hover:luxury-glow transition-all duration-300 text-luxury-gold hover:text-luxury-gold-light"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-luxury-black/95 backdrop-blur-md z-40"
              onClick={() => {
                playButtonSound()
                setIsOpen(false)
              }}
            />

            {/* Centered Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="glass-effect rounded-2xl p-8 luxury-shadow border-2 border-luxury-gold/30 relative">
                  {/* Close Button - Absolute positioned */}
                  <button
                    onClick={() => {
                      playButtonSound()
                      setIsOpen(false)
                    }}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center glass-effect rounded-lg hover:luxury-glow transition-all duration-300 text-luxury-gold hover:text-luxury-gold-light z-10"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  {/* Logo - Centered */}
                  <div className="flex justify-center mb-8">
                    <div className="relative w-20 h-20 glass-effect rounded-lg overflow-hidden">
                      <Image
                        src="/images/glavni.png"
                        alt="Logo"
                        fill
                        className="object-contain p-2"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="flex flex-col gap-4">
                    {menuItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => scrollToSection(item.id)}
                        className="text-left px-6 py-4 text-xl font-serif font-bold text-luxury-gold hover:text-luxury-gold-light hover:bg-luxury-gold/10 rounded-xl transition-all duration-300 border-2 border-transparent hover:border-luxury-gold/40 hover:luxury-glow"
                      >
                        {t(item.labelKey)}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

