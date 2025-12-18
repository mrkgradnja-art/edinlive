'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Dodaj loading klasu na body
    document.body.classList.add('loading')
    
    setMounted(true)
    
    // Minimum 1 sekunda loadinga
    const minLoadingTime = 1000
    
    // Provjeri da li je stranica već učitana
    const startTime = Date.now()
    
    const handleLoad = () => {
      const elapsed = Date.now() - startTime
      const remainingTime = Math.max(0, minLoadingTime - elapsed)
      
      setTimeout(() => {
        setIsFading(true)
        
        // Nakon fade animacije, sakrij loading i omogući scroll
        setTimeout(() => {
          setIsVisible(false)
          document.body.classList.remove('loading')
          document.body.style.overflow = 'unset'
        }, 500) // Fade duration
      }, remainingTime)
    }
    
    // Ako je stranica već učitana
    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }
    
    // Fallback - ako se ništa ne dogodi, sakrij nakon 1.5s
    const fallbackTimer = setTimeout(() => {
      setIsFading(true)
      setTimeout(() => {
        setIsVisible(false)
        document.body.classList.remove('loading')
        document.body.style.overflow = 'unset'
      }, 500)
    }, 1500)
    
    return () => {
      window.removeEventListener('load', handleLoad)
      clearTimeout(fallbackTimer)
      document.body.classList.remove('loading')
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (!mounted || !isVisible) return null

  return (
    <div
      className={`loading-screen fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-luxury-black via-luxury-black-dark to-luxury-black transition-opacity duration-500 ease-in-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        willChange: 'opacity',
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-luxury-gold/20"
            style={{
              left: `${(i * 13.7) % 100}%`,
              top: `${(i * 17.3) % 100}%`,
              width: `${(i % 4) + 1}px`,
              height: `${(i % 4) + 1}px`,
              animation: `float-${i % 4} ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.15)}s`,
              opacity: 0.3 + (i % 3) * 0.2,
            }}
          />
        ))}
      </div>

      {/* Main logo container */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Floating gold particles around logo */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * (Math.PI / 180) // 30 degrees apart
          const radius = 120
          return (
            <div
              key={i}
              className="absolute w-2 h-2 bg-luxury-gold rounded-full luxury-glow"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateX(${radius}px)`,
                animation: `orbit-particle 4s linear infinite`,
                animationDelay: `${i * 0.1}s`,
                opacity: 0.6,
              }}
            />
          )
        })}

        {/* Rotating decorative lines */}
        {[...Array(8)].map((_, i) => {
          const angle = i * 45
          const length = 80
          return (
            <div
              key={`line-${i}`}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                width: `${length}px`,
                height: '1px',
                background: `linear-gradient(to right, transparent, rgba(212, 175, 55, ${0.3 + (i % 2) * 0.2}), transparent)`,
                transformOrigin: '0 0',
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                animation: `pulse-line 2s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          )
        })}

        {/* Glowing orbs around logo */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60) * (Math.PI / 180)
          const radius = 100
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          return (
            <div
              key={`orb-${i}`}
              className="absolute w-3 h-3 bg-luxury-gold rounded-full blur-sm"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
                animation: `glow-orb 3s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                opacity: 0.4,
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
              }}
            />
          )
        })}

        {/* Logo image - centered, no circle */}
        <div className="relative z-20 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 animate-scale-in">
          <div className="absolute inset-0 luxury-glow animate-pulse" style={{ animationDuration: '2s' }} />
          <Image
            src="/images/favicona.png"
            alt="Loading"
            fill
            className="object-contain drop-shadow-2xl animate-float-logo"
            priority
            unoptimized
          />
        </div>

        {/* Shimmer effect overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(212, 175, 55, 0.1) 50%, transparent 70%)',
            backgroundSize: '200% 200%',
            animation: 'shimmer 3s linear infinite',
            width: '200px',
            height: '200px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-15px); }
          75% { transform: translateY(-25px) translateX(5px); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(15px) translateX(-10px); }
          50% { transform: translateY(20px) translateX(15px); }
          75% { transform: translateY(5px) translateX(-5px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(-20px); }
          50% { transform: translateY(-25px) translateX(10px); }
          75% { transform: translateY(-10px) translateX(-10px); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(20px) translateX(15px); }
          50% { transform: translateY(10px) translateX(-20px); }
          75% { transform: translateY(25px) translateX(5px); }
        }
        @keyframes orbit-particle {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateX(120px) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        @keyframes pulse-line {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes glow-orb {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.3); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float-logo {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  )
}

