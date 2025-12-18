'use client'

import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { playButtonSound } from '@/lib/sound'

export default function ContactForm() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    playButtonSound()
    setIsSubmitting(true)
    setStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-luxury-text mb-2">
            {t('contact.form.name')}
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-luxury-black-light/50 border border-luxury-gold/20 rounded-xl text-luxury-text focus:outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all duration-300"
            placeholder={t('common.placeholders.name')}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-luxury-text mb-2">
            {t('contact.form.email')}
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-luxury-black-light/50 border border-luxury-gold/20 rounded-xl text-luxury-text focus:outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all duration-300"
            placeholder={t('common.placeholders.email')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-luxury-text mb-2">
          {t('contact.form.message')}
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 bg-luxury-black-light/50 border border-luxury-gold/20 rounded-xl text-luxury-text focus:outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 resize-none transition-all duration-300"
          placeholder={t('common.placeholders.message')}
          style={{ height: '130px' }}
        />
      </div>

      {status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 flex items-center gap-3"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          {t('contact.form.success')}
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 flex items-center gap-3"
        >
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
          {t('contact.form.error')}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-gradient-gold text-luxury-black font-semibold rounded-xl hover:luxury-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" />
            {t('contact.form.sending')}
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            {t('contact.form.submit')}
          </>
        )}
      </button>
    </form>
  )
}

