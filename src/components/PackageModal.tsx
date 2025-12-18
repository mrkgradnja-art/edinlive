'use client'

import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { playButtonSound } from '@/lib/sound'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

interface PackageModalProps {
  packageData: {
    id: string
    nameKey: string
    priceKey: string
    featuresKey: string
    amount: number
  }
  onClose: () => void
}

function CheckoutForm({ packageData, onClose }: PackageModalProps) {
  const { t } = useTranslation()
  const stripe = useStripe()
  const elements = useElements()
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleStripeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    playButtonSound()
    if (!stripe || !elements) return

    setIsProcessing(true)
    setError('')

    try {
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setError(submitError.message || '')
        setIsProcessing(false)
        return
      }

      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: packageData.amount,
          packageId: packageData.id,
          packageName: t(`packages.${packageData.nameKey}`),
          name,
          email,
          message,
        }),
      })

      const { clientSecret } = await response.json()

      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      })

      if (confirmError) {
        setError(confirmError.message || '')
      } else {
        setSuccess(true)
        setTimeout(() => {
          onClose()
        }, 2000)
      }
    } catch (err) {
      setError(t('packages.modal.error'))
    } finally {
      setIsProcessing(false)
    }
  }

  const createPayPalOrder = async () => {
    playButtonSound()
    try {
      const response = await fetch('/api/payments/create-paypal-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: packageData.amount,
          packageId: packageData.id,
          packageName: t(`packages.${packageData.nameKey}`),
          name,
          email,
          message,
        }),
      })
      const { orderId } = await response.json()
      return orderId
    } catch (err) {
      setError(t('packages.modal.error'))
      return null
    }
  }

  const onPayPalApprove = async (data: any) => {
    try {
      const response = await fetch('/api/payments/capture-paypal-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: data.orderID }),
      })
      const result = await response.json()
      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        setError(t('packages.modal.error'))
      }
    } catch (err) {
      setError(t('packages.modal.error'))
    }
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-luxury-gold mb-2">
          {t('packages.modal.success')}
        </h3>
        <p className="text-luxury-text-muted">
          {t('packages.modal.success')}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleStripeSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-luxury-text mb-2">
          {t('packages.modal.name')}
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 bg-luxury-black-light border border-luxury-gold/20 rounded-lg text-luxury-text focus:outline-none focus:border-luxury-gold"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-luxury-text mb-2">
          {t('packages.modal.email')}
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-luxury-black-light border border-luxury-gold/20 rounded-lg text-luxury-text focus:outline-none focus:border-luxury-gold"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-luxury-text mb-2">
          {t('packages.modal.message')}
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-luxury-black-light border border-luxury-gold/20 rounded-lg text-luxury-text focus:outline-none focus:border-luxury-gold"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-luxury-text mb-2">
          {t('packages.modal.paymentMethod')}
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => {
              playButtonSound()
              setPaymentMethod('stripe')
            }}
            className={`flex-1 px-4 py-3 rounded-lg border transition-all ${
              paymentMethod === 'stripe'
                ? 'border-luxury-gold bg-luxury-gold/20'
                : 'border-luxury-gold/20 bg-luxury-black-light'
            }`}
          >
            {t('packages.modal.stripe')}
          </button>
          <button
            type="button"
            onClick={() => {
              playButtonSound()
              setPaymentMethod('paypal')
            }}
            className={`flex-1 px-4 py-3 rounded-lg border transition-all ${
              paymentMethod === 'paypal'
                ? 'border-luxury-gold bg-luxury-gold/20'
                : 'border-luxury-gold/20 bg-luxury-black-light'
            }`}
          >
            {t('packages.modal.paypal')}
          </button>
        </div>
      </div>

      {paymentMethod === 'stripe' && (
        <div className="py-4">
          <PaymentElement />
        </div>
      )}

      {paymentMethod === 'paypal' && (
        <div className="py-4">
          <PayPalButtons
            createOrder={createPayPalOrder}
            onApprove={onPayPalApprove}
            style={{ layout: 'vertical' }}
          />
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {paymentMethod === 'stripe' && (
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full py-4 bg-gradient-gold text-luxury-black font-semibold rounded-lg hover:luxury-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? t('packages.modal.processing') : t('packages.modal.submit')}
        </button>
      )}
    </form>
  )
}

export default function PackageModal({ packageData, onClose }: PackageModalProps) {
  const { t } = useTranslation()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
        currency: 'USD',
      }}
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-luxury-black/80 backdrop-blur-sm"
          onClick={() => {
            playButtonSound()
            onClose()
          }}
        />
        <div className="relative bg-luxury-black-light border border-luxury-gold/20 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <button
            onClick={() => {
              playButtonSound()
              onClose()
            }}
            className="absolute top-4 right-4 text-luxury-text-muted hover:text-luxury-gold transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-3xl font-serif font-bold text-luxury-gold mb-6">
            {t('packages.modal.title')} - {t(`packages.${packageData.nameKey}`)}
          </h2>

          <Elements stripe={stripePromise}>
            <CheckoutForm packageData={packageData} onClose={onClose} />
          </Elements>
        </div>
      </div>
    </PayPalScriptProvider>
  )
}

