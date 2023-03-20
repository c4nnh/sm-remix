import { stripe } from '~/services'

export const createPaymentIntent = async () => {
  return stripe.paymentIntents.create({
    amount: 2000,
    currency: 'usd',
    // automatic_payment_methods: {
    //   enabled: true,
    // },
    // payment_method: 'card',
    // confirm: true,
    payment_method_types: ['card'],
    metadata: {
      subscriptionId: 'hehehe',
    },
  })
}
