'use client'

import { useEffect } from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import { i18nConfig } from '@/lib/i18n'

// Initialize i18n only once
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      ...i18nConfig,
      lng: typeof window !== 'undefined' ? (localStorage.getItem('language') || 'en') : 'en',
    })
}

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Load saved language preference
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language')
      if (savedLang && savedLang !== i18n.language) {
        i18n.changeLanguage(savedLang)
      }

      // Handle language changes
      const handleLanguageChange = (lng: string) => {
        localStorage.setItem('language', lng)
      }
      
      i18n.on('languageChanged', handleLanguageChange)
      
      return () => {
        i18n.off('languageChanged', handleLanguageChange)
      }
    }
  }, [])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

