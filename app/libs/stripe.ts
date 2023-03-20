import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_PUBLIC_KEY } from '~/services/env.server'

export const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)
