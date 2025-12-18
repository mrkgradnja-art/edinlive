'use client'

import { useEffect, useState } from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import { i18nConfig } from '@/lib/i18n'

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Initialize i18n with React integration
    if (!i18n.isInitialized) {
      i18n
        .use(initReactI18next)
        .init({
          ...i18nConfig,
          lng: typeof window !== 'undefined' ? (localStorage.getItem('language') || 'en') : 'en',
        })
    }

    // Load saved language preference
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language')
      if (savedLang && savedLang !== i18n.language) {
        i18n.changeLanguage(savedLang)
      }

      // Handle language changes
      i18n.on('languageChanged', (lng) => {
        localStorage.setItem('language', lng)
      })
    }

    setIsReady(true)
  }, [])

  if (!isReady) {
    return <>{children}</>
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

