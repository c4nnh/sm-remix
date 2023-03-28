import invariant from 'tiny-invariant'

invariant(process.env.STRIPE_PUBLIC_KEY, 'STRIPE_PUBLIC_KEY is not set')
invariant(process.env.STRIPE_SECRET_KEY, 'STRIPE_SECRET_KEY is not set')
invariant(process.env.STRIPE_WEBHOOK_SECRET, 'STRIPE_WEBHOOK_SECRET is not set')

export const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET
