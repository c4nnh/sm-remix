import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from 'react'

export function useStripePromise(stripeAccountId?: string) {
  const [stripePromise, setStripePromise] = useState<ReturnType<
    typeof loadStripe
  > | null>(null)

  useEffect(() => {
    setStripePromise(
      loadStripe(
        typeof window === 'undefined' ? '' : window.ENV.STRIPE_PUBLIC_KEY,
        {
          stripeAccount: stripeAccountId,
        }
      )
    )
  }, [stripeAccountId])

  return { stripePromise }
}
