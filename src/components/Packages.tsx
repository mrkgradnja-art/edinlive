'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useState } from 'react'
import PackageInquiryModal from './PackageInquiryModal'
import { playButtonSound } from '@/lib/sound'

const packages = [
  {
    id: 'essential',
    nameKey: 'essential.name',
    priceKey: 'essential.price',
    featuresKey: 'essential.features',
    amount: 299,
  },
  {
    id: 'professional',
    nameKey: 'professional.name',
    priceKey: 'professional.price',
    featuresKey: 'professional.features',
    amount: 999,
  },
  {
    id: 'enterprise',
    nameKey: 'enterprise.name',
    priceKey: 'enterprise.price',
    featuresKey: 'enterprise.features',
    amount: 1999,
  },
]

export default function Packages() {
  const { t } = useTranslation()
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null)

  return (
    <>
      <section id="packages" className="relative py-32 bg-luxury-black-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-gradient-gold">
              {t('packages.title')}
            </h2>
            <p className="text-xl md:text-2xl text-luxury-text-muted max-w-3xl mx-auto leading-relaxed font-montserrat">
              {t('packages.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg, index) => {
              const isPopular = pkg.id === 'professional'
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative group ${isPopular ? 'md:-mt-4 md:mb-4' : ''}`}
                >
                  {/* Popular badge */}
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-gold text-luxury-black px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                        {t('common.mostPopular')}
                      </div>
                    </div>
                  )}

                  {/* Card */}
                  <div className={`relative h-full glass-effect rounded-2xl p-8 border transition-all duration-500 ${
                    isPopular 
                      ? 'border-2 border-luxury-gold shadow-2xl shadow-luxury-gold/20' 
                      : 'border-luxury-gold/20 hover:border-luxury-gold/40'
                  } hover:luxury-glow`}>
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="text-center mb-8">
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-luxury-gold mb-4">
                          {t(`packages.${pkg.nameKey}`)}
                        </h3>
                        <div className="mb-2">
                          <span className="text-5xl md:text-6xl font-bold text-luxury-gold">
                            {t(`packages.${pkg.priceKey}`)}
                          </span>
                        </div>
                      </div>

                      {/* Features */}
                      <ul className="space-y-4 mb-8 min-h-[280px]">
                        {(() => {
                          try {
                            const features = t(`packages.${pkg.featuresKey}`, { returnObjects: true })
                            if (!Array.isArray(features)) {
                              console.warn(`Translation for packages.${pkg.featuresKey} is not an array:`, features)
                              return null
                            }
                            // Type assertion: we know it's an array of strings from the translation files
                            return (features as string[]).map((feature: string, featureIndex: number) => (
                              <motion.li
                                key={featureIndex}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 + featureIndex * 0.05 }}
                                className="flex items-start gap-3"
                              >
                                <div className="flex-shrink-0 mt-1">
                                  <div className="w-5 h-5 rounded-full bg-luxury-gold/20 flex items-center justify-center group-hover:bg-luxury-gold/30 transition-colors duration-300">
                                    <span className="text-luxury-gold text-sm font-bold">✓</span>
                                  </div>
                                </div>
                                <span className="text-luxury-text-muted group-hover:text-luxury-text transition-colors duration-300 text-base">
                                  {feature}
                                </span>
                              </motion.li>
                            ))
                          } catch (error) {
                            console.error(`Error rendering features for ${pkg.id}:`, error)
                            return null
                          }
                        })()}
                      </ul>

                      {/* CTA Button */}
                      <button
                        onClick={() => {
                          playButtonSound()
                          setSelectedPackage(pkg)
                        }}
                        className={`w-full py-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                          isPopular
                            ? 'bg-gradient-gold text-luxury-black hover:shadow-xl hover:shadow-luxury-gold/30'
                            : 'bg-luxury-gold/10 text-luxury-gold border-2 border-luxury-gold/30 hover:bg-luxury-gold/20 hover:border-luxury-gold hover:luxury-glow'
                        }`}
                      >
                        {t(`packages.${pkg.id}.cta`)}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {selectedPackage && (
        <PackageInquiryModal
          packageData={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </>
  )
}

