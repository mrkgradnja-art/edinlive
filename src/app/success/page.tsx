'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function SuccessPage() {
  const router = useRouter()
  const { t } = useTranslation()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-black px-4">
      <div className="text-center glass-effect rounded-xl p-12 max-w-md">
        <CheckCircle className="w-20 h-20 text-luxury-gold mx-auto mb-6" />
        <h1 className="text-3xl font-serif font-bold text-luxury-gold mb-4">
          {t('success.title')}
        </h1>
        <p className="text-luxury-text-muted mb-6">
          {t('success.message')}
        </p>
        <p className="text-sm text-luxury-text-muted">
          {t('success.redirect')}
        </p>
      </div>
    </div>
  )
}

