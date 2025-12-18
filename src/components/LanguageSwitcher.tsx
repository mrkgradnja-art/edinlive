'use client'

import { useTranslation } from 'react-i18next'
import { useState, useEffect, useRef } from 'react'
import { UKFlag, CroatianFlag, GermanFlag } from './Flags'
import { playButtonSound } from '@/lib/sound'

const languages = [
  { code: 'en', Flag: UKFlag, name: 'English' },
  { code: 'hr', Flag: CroatianFlag, name: 'Hrvatski' },
  { code: 'de', Flag: GermanFlag, name: 'Deutsch' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && i18n && typeof i18n.changeLanguage === 'function') {
      const savedLang = localStorage.getItem('language')
      if (savedLang && savedLang !== i18n.language) {
        i18n.changeLanguage(savedLang).catch((err: Error) => {
          console.error('Error changing language:', err)
        })
      }
    }
  }, [i18n])

  const currentLang = languages.find(lang => lang.code === (i18n?.language || 'en')) || languages[0]
  const CurrentFlag = currentLang.Flag

  const changeLanguage = (langCode: string) => {
    playButtonSound()
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(langCode).catch((err: Error) => {
        console.error('Error changing language:', err)
      })
    }
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} data-language-switcher className="relative h-full">
      <button
        onClick={() => {
          playButtonSound()
          setIsOpen(!isOpen)
        }}
        className="h-12 flex items-center justify-center gap-1.5 px-3 glass-effect rounded-lg hover:luxury-glow transition-all duration-300 min-w-[48px]"
      >
        <CurrentFlag className="w-5 h-4 flex-shrink-0" />
        <span className="hidden md:inline text-xs font-medium whitespace-nowrap">{currentLang.name}</span>
        <svg
          className={`w-3 h-3 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              playButtonSound()
              setIsOpen(false)
            }}
          />
          <div className="absolute right-0 mt-2 w-48 glass-effect rounded-lg shadow-xl z-[60]">
            {languages.map((lang) => {
              const FlagComponent = lang.Flag
              return (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-luxury-gold/10 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    (i18n?.language || 'en') === lang.code ? 'bg-luxury-gold/20' : ''
                  }`}
                >
                  <FlagComponent className="w-6 h-4" />
                  <span>{lang.name}</span>
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

