'use client'

import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowLeft, CheckCircle, Mail, Phone, MessageSquare, CreditCard } from 'lucide-react'
import Image from 'next/image'
import { playButtonSound } from '@/lib/sound'
import { AircashIcon, RevolutIcon, WiseIcon, CryptoIcon, PayPalIcon } from './PaymentIcons'

interface PackageInquiryModalProps {
  packageData: {
    id: string
    nameKey: string
    priceKey: string
    featuresKey: string
    amount: number
  }
  onClose: () => void
}

type Step = 1 | 2 | 3 | 'success'

const paymentMethods = [
  { id: 'aircash', name: 'Aircash', Icon: AircashIcon },
  { id: 'revolut', name: 'Revolut', Icon: RevolutIcon },
  { id: 'wise', name: 'Wise', Icon: WiseIcon },
  { id: 'crypto', name: 'Crypto', Icon: CryptoIcon },
  { id: 'paypal', name: 'PayPal', Icon: PayPalIcon },
]

export default function PackageInquiryModal({ packageData, onClose }: PackageInquiryModalProps) {
  const { t } = useTranslation()
  const [step, setStep] = useState<Step>(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    paymentMethod: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = t('packages.modal.validation.nameRequired')
    if (!formData.email.trim()) newErrors.email = t('packages.modal.validation.emailRequired')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('packages.modal.validation.emailInvalid')
    if (!formData.phone.trim()) newErrors.phone = t('packages.modal.validation.phoneRequired')
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    if (!formData.message.trim()) {
      setErrors({ message: t('packages.modal.validation.messageRequired') })
      return false
    }
    setErrors({})
    return true
  }

  const validateStep3 = () => {
    console.log('Validating step 3, paymentMethod:', formData.paymentMethod)
    if (!formData.paymentMethod || formData.paymentMethod.trim() === '') {
      setErrors({ paymentMethod: t('packages.modal.validation.paymentRequired') })
      return false
    }
    setErrors({})
    return true
  }

  const handleNext = () => {
    playButtonSound()
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handleBack = () => {
    playButtonSound()
    if (step === 2) setStep(1)
    else if (step === 3) setStep(2)
  }

  const handleSubmit = async () => {
    console.log('Submitting form, paymentMethod:', formData.paymentMethod)
    if (!validateStep3()) {
      console.log('Validation failed')
      return
    }
    
    playButtonSound()
    setIsSubmitting(true)

    try {
      // Get payment method name
      const selectedPaymentMethod = paymentMethods.find(m => m.id === formData.paymentMethod)
      const paymentMethodName = selectedPaymentMethod ? selectedPaymentMethod.name : formData.paymentMethod

      const requestBody = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Package: ${t(`packages.${packageData.nameKey}`)}\nPrice: ${t(`packages.${packageData.priceKey}`)}\n\nProject Details:\n${formData.message}\n\nPayment Method: ${paymentMethodName}`,
      }

      console.log('Sending request:', requestBody)

      // Send inquiry to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })

      const data = await response.json()
      console.log('Response:', response.status, data)

      if (response.ok && data.success) {
        setStep('success')
      } else {
        console.error('Submit error:', data)
        setErrors({ submit: data.error || t('packages.modal.validation.submitFailed') })
      }
    } catch (error: any) {
      console.error('Submit error:', error)
      setErrors({ submit: error.message || t('packages.modal.validation.submitFailed') })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-luxury-black/95 backdrop-blur-md"
        onClick={() => {
          playButtonSound()
          onClose()
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative glass-effect rounded-2xl p-8 md:p-12 max-w-2xl w-full max-h-[90vh] overflow-y-auto luxury-shadow border-2 border-luxury-gold/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playButtonSound()
            onClose()
          }}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center glass-effect rounded-lg hover:luxury-glow transition-all duration-300 text-luxury-gold hover:text-luxury-gold-light z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16 glass-effect rounded-lg overflow-hidden">
            <Image
              src="/images/glavni.png"
              alt="Logo"
              fill
              className="object-contain p-2"
              unoptimized
            />
          </div>
        </div>

        {/* Progress Steps */}
        {step !== 'success' && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    step >= s
                      ? 'bg-luxury-gold border-luxury-gold text-luxury-black'
                      : 'border-luxury-gold/30 text-luxury-text-muted'
                  }`}
                >
                  {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 transition-all duration-300 ${
                      step > s ? 'bg-luxury-gold' : 'bg-luxury-gold/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Contact Information */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl font-serif font-bold text-gradient-gold mb-2">
                  {t('packages.modal.step1.title')}
                </h2>
                <p className="text-luxury-text-muted font-montserrat">
                  {t('packages.modal.step1.subtitle')}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-text mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-luxury-gold" />
                  {t('packages.modal.name')} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                    if (errors.name) setErrors({ ...errors, name: '' })
                  }}
                  className="w-full px-4 py-3 bg-luxury-black-light/50 border border-luxury-gold/20 rounded-xl text-luxury-text focus:outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all duration-300 font-montserrat"
                  placeholder={t('packages.modal.name')}
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-text mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-luxury-gold" />
                  {t('packages.modal.email')} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value })
                    if (errors.email) setErrors({ ...errors, email: '' })
                  }}
                  className="w-full px-4 py-3 bg-luxury-black-light/50 border border-luxury-gold/20 rounded-xl text-luxury-text focus:outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all duration-300 font-montserrat"
                  placeholder={t('packages.modal.email')}
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-text mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-luxury-gold" />
                  {t('packages.modal.phone')} *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value })
                    if (errors.phone) setErrors({ ...errors, phone: '' })
                  }}
                  className="w-full px-4 py-3 bg-luxury-black-light/50 border border-luxury-gold/20 rounded-xl text-luxury-text focus:outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all duration-300 font-montserrat"
                  placeholder={t('packages.modal.phone')}
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>

              <button
                onClick={handleNext}
                className="w-full py-4 bg-gradient-gold text-luxury-black font-semibold rounded-xl hover:luxury-glow transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                {t('packages.modal.next')}
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* Step 2: Project Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl font-serif font-bold text-gradient-gold mb-2">
                  {t('packages.modal.step2.title')}
                </h2>
                <p className="text-luxury-text-muted font-montserrat">
                  {t('packages.modal.step2.subtitle')}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-luxury-text mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-luxury-gold" />
                  {t('packages.modal.step2.descriptionLabel')} *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value })
                    if (errors.message) setErrors({ ...errors, message: '' })
                  }}
                  className="w-full px-4 py-3 bg-luxury-black-light/50 border border-luxury-gold/20 rounded-xl text-luxury-text focus:outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 resize-none transition-all duration-300 font-montserrat"
                  placeholder={t('packages.modal.step2.placeholder')}
                  style={{ height: '130px' }}
                />
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 py-4 bg-luxury-gold/10 text-luxury-gold border-2 border-luxury-gold/30 font-semibold rounded-xl hover:bg-luxury-gold/20 hover:border-luxury-gold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {t('packages.modal.back')}
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-4 bg-gradient-gold text-luxury-black font-semibold rounded-xl hover:luxury-glow transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  {t('packages.modal.next')}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment Method */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-3xl font-serif font-bold text-gradient-gold mb-2">
                  {t('packages.modal.step3.title')}
                </h2>
                <p className="text-luxury-text-muted font-montserrat">
                  {t('packages.modal.step3.subtitle')}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {paymentMethods.map((method) => {
                  const IconComponent = method.Icon
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        playButtonSound()
                        setFormData((prev) => {
                          const updated = { ...prev, paymentMethod: method.id }
                          console.log('Payment method selected:', method.id, 'Updated form data:', updated)
                          return updated
                        })
                        if (errors.paymentMethod) {
                          setErrors((prev) => ({ ...prev, paymentMethod: '' }))
                        }
                      }}
                      className={`p-6 glass-effect rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center ${
                        formData.paymentMethod === method.id
                          ? 'border-luxury-gold bg-luxury-gold/20 luxury-glow shadow-lg shadow-luxury-gold/30'
                          : 'border-luxury-gold/20 hover:border-luxury-gold/40 hover:luxury-glow'
                      }`}
                    >
                      <div className="w-12 h-12 mb-3 text-luxury-gold">
                        <IconComponent className="w-full h-full" />
                      </div>
                      <div className="text-sm font-semibold text-luxury-gold font-montserrat">
                        {method.name}
                      </div>
                    </button>
                  )
                })}
              </div>
              {errors.paymentMethod && (
                <p className="text-red-400 text-sm text-center">{errors.paymentMethod}</p>
              )}

              {errors.submit && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-center">
                  {errors.submit}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 py-4 bg-luxury-gold/10 text-luxury-gold border-2 border-luxury-gold/30 font-semibold rounded-xl hover:bg-luxury-gold/20 hover:border-luxury-gold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {t('packages.modal.back')}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 py-4 bg-gradient-gold text-luxury-black font-semibold rounded-xl hover:luxury-glow transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-luxury-black border-t-transparent rounded-full animate-spin" />
                      {t('packages.modal.processing')}
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      {t('packages.modal.submitInquiry')}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* Success Screen */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-20 h-20 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-luxury-gold" />
              </motion.div>
              <h2 className="text-3xl font-serif font-bold text-gradient-gold mb-4">
                {t('packages.modal.success.title')}
              </h2>
              <p className="text-lg text-luxury-text-muted mb-2 font-montserrat">
                {t('packages.modal.success.message1')} <span className="text-luxury-gold font-semibold">{t(`packages.${packageData.nameKey}`)}</span> {t('packages.modal.success.message2')}
              </p>
              <p className="text-base text-luxury-text-muted font-montserrat">
                {t('packages.modal.success.message3')}
              </p>
              <button
                onClick={() => {
                  playButtonSound()
                  onClose()
                }}
                className="mt-8 px-8 py-3 bg-gradient-gold text-luxury-black font-semibold rounded-xl hover:luxury-glow transition-all duration-300 transform hover:scale-105"
              >
                {t('packages.modal.close')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

