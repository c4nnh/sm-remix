import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_PUBLIC_KEY } from '~/services'

export const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)
