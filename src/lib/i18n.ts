import en from '../locales/en.json'
import hr from '../locales/hr.json'
import de from '../locales/de.json'

// Export resources and config for client-side initialization
export const i18nResources = {
  en: { translation: en },
  hr: { translation: hr },
  de: { translation: de },
}

export const i18nConfig = {
  resources: i18nResources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
}
