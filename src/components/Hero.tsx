'use client'

import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { playButtonSound } from '@/lib/sound'

export default function Hero() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })

  // Parallax transform za sliku - pomjera se sporije od scroll-a
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3])

  const scrollToPackages = () => {
    playButtonSound()
    const packagesSection = document.getElementById('packages')
    packagesSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-start overflow-hidden pt-24"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 -top-[20%] -bottom-[20%]">
            <Image
              src="/shillka.png"
              alt="Luxury Background"
              fill
              className="object-cover"
              style={{ objectPosition: '65% 5%' }}
              priority
            />
          </div>
        </motion.div>
        {/* Asymmetric gradient - darker on left (text), lighter on right (face) */}
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/70 via-luxury-black/40 to-luxury-black/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/50 via-luxury-black/30 to-luxury-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mt-[20vh]"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 text-gradient-gold text-left">
            {t('hero.title')}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-3xl text-luxury-text-light mb-4 text-left font-montserrat"
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-luxury-text-muted mb-12 max-w-2xl text-left font-montserrat"
          >
            {t('hero.description')}
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onClick={scrollToPackages}
            className="px-8 py-4 bg-gradient-gold text-luxury-black font-semibold rounded-lg text-lg hover:luxury-glow transition-all duration-300 transform hover:scale-105"
          >
            {t('hero.cta')}
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-luxury-gold rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-luxury-gold rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

