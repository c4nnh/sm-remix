import type Stripe from 'stripe'
import { stripe } from '~/services'
import type { PaymentIntentMetadata } from '~/types'

export const createPaymentIntent = async (
  params: Omit<Stripe.PaymentIntentCreateParams, 'currency' | 'metadata'> & {
    metadata: PaymentIntentMetadata
    currency?: string
  }
) => {
  const { amount, ...rest } = params

  const defaultParams: Omit<Stripe.PaymentIntentCreateParams, 'amount'> = {
    currency: 'usd',
    customer: 'cus_NZEOC0uyFiFBDX',
    // save payment info (for first time)
    // setup_future_usage: 'off_session',
    payment_method: 'pm_1Mo6BVAeRaf2RkSwnB0tKGv9',
  }

  return stripe.paymentIntents.create({
    amount: amount * 100,
    ...defaultParams,
    ...rest,
  })
}

export const retrievePaymentIntent = async (id: string) => {
  return stripe.paymentIntents.retrieve(id)
}
