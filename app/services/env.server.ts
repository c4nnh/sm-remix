import invariant from 'tiny-invariant'

invariant(process.env.DATABASE_URL, 'DATABASE_URL is not set')
invariant(process.env.SESSION_SECRET, 'SESSION_SECRET is not set')
invariant(process.env.POSTMARK_API_KEY, 'POSTMARK_API_KEY is not set')
invariant(
  process.env.POSTMARK_MESSAGE_STREAM,
  'POSTMARK_MESSAGE_STREAM is not set'
)
invariant(process.env.EMAIL_FROM_ADDRESS, 'EMAIL_FROM_ADDRESS is not set')
invariant(process.env.TOKEN_SECRET, 'TOKEN_SECRET is not set')
invariant(process.env.STRIPE_PUBLIC_KEY, 'STRIPE_PUBLIC_KEY is not set')
invariant(process.env.STRIPE_SECRET_KEY, 'STRIPE_SECRET_KEY is not set')

export const DATABASE_URL = process.env.DATABASE_URL
export const SESSION_SECRET = process.env.SESSION_SECRET
export const POSTMARK_API_KEY = process.env.POSTMARK_API_KEY
export const POSTMARK_MESSAGE_STREAM = process.env.POSTMARK_MESSAGE_STREAM
export const EMAIL_FROM_ADDRESS = process.env.EMAIL_FROM_ADDRESS
export const TOKEN_SECRET = process.env.TOKEN_SECRET
export const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
export const NODE_ENV = process.env.NODE_ENV || 'development'

declare global {
  interface Window {
    ENV: {
      STRIPE_PUBLIC_KEY: string
    }
  }
}
