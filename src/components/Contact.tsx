'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import ContactForm from './ContactForm'
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, MessageCircle, Send } from 'lucide-react'

const socialLinks = [
  { name: 'facebook', icon: Facebook, url: 'https://facebook.com' },
  { name: 'linkedin', icon: Linkedin, url: 'https://linkedin.com' },
  { name: 'twitter', icon: Twitter, url: 'https://twitter.com' },
  { name: 'whatsapp', icon: MessageCircle, url: 'https://wa.me' },
]

const getContactInfo = (t: (key: string) => string) => [
  {
    icon: Mail,
    label: t('contact.email'),
    value: 'info@edin.live',
    href: 'mailto:info@edin.live',
  },
  {
    icon: Phone,
    label: t('contact.phone'),
    value: '+385 97 667 1216',
    href: 'tel:+385976671216',
  },
  {
    icon: MapPin,
    label: t('contact.location'),
    value: 'Croatia',
    href: '#',
  },
]

export default function Contact() {
  const { t } = useTranslation()
  const contactInfo = getContactInfo(t)

  return (
    <section id="contact" className="relative py-32 bg-luxury-black overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-luxury-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-gradient-gold">
            {t('contact.title')}
          </h2>
          <p className="text-xl md:text-2xl text-luxury-text-muted max-w-2xl mx-auto font-montserrat">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="block glass-effect rounded-xl p-6 hover:luxury-glow transition-all duration-300 border border-luxury-gold/20 hover:border-luxury-gold/40 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-luxury-gold/10 rounded-lg group-hover:bg-luxury-gold/20 transition-colors">
                      <Icon className="w-6 h-6 text-luxury-gold" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-luxury-text-muted mb-1">{info.label}</p>
                      <p className="text-lg font-semibold text-luxury-gold group-hover:text-luxury-gold-light transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </div>
                </motion.a>
              )
            })}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-effect rounded-xl p-6 border border-luxury-gold/20"
            >
                <h3 className="text-lg font-serif font-bold text-luxury-gold mb-4">
                  {t('contact.followMe')}
                </h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center glass-effect rounded-lg hover:luxury-glow transition-all duration-300 text-luxury-gold hover:text-luxury-gold-light hover:scale-110"
                      aria-label={t(`contact.social.${social.name}`)}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="glass-effect rounded-2xl p-8 md:p-12 luxury-shadow border-2 border-luxury-gold/30">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 flex items-center justify-center bg-luxury-gold/10 rounded-lg">
                  <Send className="w-6 h-6 text-luxury-gold" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-gradient-gold">
                  {t('contact.sendMessage')}
                </h3>
              </div>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

