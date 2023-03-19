import { stripe } from '~/services'

export const createPaymentIntent = async () => {
  return stripe.paymentIntents.create({
    amount: 0.5,
    currency: 'USD',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      subscriptionId: 'hehehe',
    },
  })
}
