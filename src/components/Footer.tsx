'use client'

import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-luxury-black-dark border-t border-luxury-gold/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <p className="text-luxury-text-muted">
          {t('footer.copyright')}
        </p>
        <p className="text-luxury-text-muted mt-2 text-sm">
          {t('footer.madeWith')} ❤️
        </p>
      </div>
    </footer>
  )
}

