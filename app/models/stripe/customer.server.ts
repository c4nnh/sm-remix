import { stripe } from '~/services'
import type { StripeCustomerMetadata } from '~/types'

export const createStripeCustomer = (
  email: string,
  metadata: StripeCustomerMetadata
) => stripe.customers.create({ email, metadata })
