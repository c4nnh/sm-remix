import { stripe } from '~/services'

export const createStripeCustomer = (email: string, name: string) =>
  stripe.customers.create({ email, name })
