'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  Palette, 
  Code, 
  Brain, 
  GraduationCap, 
  Search, 
  ShoppingCart
} from 'lucide-react'

export default function Skills() {
  const { t } = useTranslation()

  const skillCategories = [
    {
      key: 'webDesign',
      Icon: Palette,
    },
    {
      key: 'webDevelopment',
      Icon: Code,
    },
    {
      key: 'aiDevelopment',
      Icon: Brain,
    },
    {
      key: 'aiLearning',
      Icon: GraduationCap,
    },
    {
      key: 'seo',
      Icon: Search,
    },
    {
      key: 'ecommerce',
      Icon: ShoppingCart,
    },
  ]

  return (
    <section id="skills" className="relative py-32 bg-luxury-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-gradient-gold">
            {t('skills.title')}
          </h2>
          <p className="text-xl md:text-2xl text-luxury-text-muted max-w-3xl mx-auto leading-relaxed font-montserrat">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.Icon
            return (
              <motion.div
                key={category.key}
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
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full glass-effect rounded-2xl p-8 border border-luxury-gold/20 hover:border-luxury-gold/40 hover:luxury-glow transition-all duration-500">
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="relative inline-flex">
                        <div className="absolute inset-0 bg-luxury-gold/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                        <div className="relative w-20 h-20 flex items-center justify-center bg-luxury-gold/10 rounded-2xl border border-luxury-gold/30 group-hover:border-luxury-gold group-hover:bg-luxury-gold/20 transition-all duration-500 group-hover:scale-110">
                          <IconComponent className="w-10 h-10 text-luxury-gold" strokeWidth={2} />
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-luxury-gold mb-6 group-hover:text-luxury-gold-light transition-colors duration-300">
                      {t(`skills.${category.key}.title`)}
                    </h3>

                    {/* Items */}
                    <ul className="space-y-4">
                      {(() => {
                        try {
                          const items = t(`skills.${category.key}.items`, { returnObjects: true })
                          if (!Array.isArray(items)) {
                            console.warn(`Translation for skills.${category.key}.items is not an array:`, items)
                            return null
                          }
                          // Type assertion: we know it's an array of strings from the translation files
                          return (items as string[]).map((item: string, itemIndex: number) => (
                            <motion.li
                              key={itemIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: index * 0.1 + itemIndex * 0.05 }}
                              className="flex items-center gap-4 text-luxury-text-muted group-hover:text-luxury-text transition-colors duration-300"
                            >
                              <div className="relative flex-shrink-0">
                                <div className="relative w-3 h-3 bg-luxury-gold rounded-full group-hover:scale-125 transition-transform duration-300" />
                              </div>
                              <span className="text-base font-medium">{item}</span>
                            </motion.li>
                          ))
                        } catch (error) {
                          console.error(`Error rendering skills for ${category.key}:`, error)
                          return null
                        }
                      })()}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

