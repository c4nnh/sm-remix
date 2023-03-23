import type Stripe from 'stripe'
import { stripe } from '~/services'
import type { StripePaymentIntentMetadata } from '~/types'

export const createPaymentIntent = async (
  params: Omit<Stripe.PaymentIntentCreateParams, 'currency' | 'metadata'> & {
    metadata: StripePaymentIntentMetadata
    currency?: string
  }
) => {
  const { amount, payment_method, ...rest } = params

  const defaultParams: Omit<Stripe.PaymentIntentCreateParams, 'amount'> = {
    currency: 'usd',
  }

  return stripe.paymentIntents.create({
    amount: amount * 100,
    ...defaultParams,
    ...rest,
    ...(payment_method
      ? { payment_method }
      : { setup_future_usage: 'off_session' }),
  })
}

export const retrievePaymentIntent = async (id: string) => {
  return stripe.paymentIntents.retrieve(id)
}
