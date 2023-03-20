import { stripe } from '~/services'

export const createStripeAccount = (email: string) =>
  stripe.accounts.create({
    type: 'standard',
    email,
  })
