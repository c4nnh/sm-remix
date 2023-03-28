import invariant from 'tiny-invariant'

invariant(process.env.DATABASE_URL, 'DATABASE_URL is not set')
invariant(process.env.SESSION_SECRET, 'SESSION_SECRET is not set')
invariant(process.env.TOKEN_SECRET, 'TOKEN_SECRET is not set')
invariant(process.env.PRODUCT_NAME, 'PRODUCT_NAME is not set')
invariant(process.env.PRODUCT_URL, 'PRODUCT_URL is not set')
invariant(process.env.POSTMARK_API_KEY, 'POSTMARK_API_KEY is not set')
invariant(
  process.env.POSTMARK_MESSAGE_STREAM,
  'POSTMARK_MESSAGE_STREAM is not set'
)
invariant(
  process.env.POSTMARK_CONFIRM_EMAIL_TEMPLATE_ID,
  'POSTMARK_CONFIRM_EMAIL_TEMPLATE_ID is not set'
)
invariant(
  /^\d+$/.test(process.env.POSTMARK_CONFIRM_EMAIL_TEMPLATE_ID),
  'POSTMARK_CONFIRM_EMAIL_TEMPLATE_ID is invalid'
)
invariant(
  process.env.POSTMARK_EMAIL_FROM_ADDRESS,
  'POSTMARK_EMAIL_FROM_ADDRESS is not set'
)
invariant(process.env.STRIPE_PUBLIC_KEY, 'STRIPE_PUBLIC_KEY is not set')
invariant(process.env.STRIPE_SECRET_KEY, 'STRIPE_SECRET_KEY is not set')
invariant(process.env.STRIPE_WEBHOOK_SECRET, 'STRIPE_WEBHOOK_SECRET is not set')

export const DATABASE_URL = process.env.DATABASE_URL
export const SESSION_SECRET = process.env.SESSION_SECRET
export const TOKEN_SECRET = process.env.TOKEN_SECRET
export const PRODUCT_NAME = process.env.PRODUCT_NAME
export const PRODUCT_URL = process.env.PRODUCT_URL
export const POSTMARK_API_KEY = process.env.POSTMARK_API_KEY
export const POSTMARK_MESSAGE_STREAM = process.env.POSTMARK_MESSAGE_STREAM
export const POSTMARK_EMAIL_FROM_ADDRESS =
  process.env.POSTMARK_EMAIL_FROM_ADDRESS
export const POSTMARK_CONFIRM_EMAIL_TEMPLATE_ID =
  process.env.POSTMARK_CONFIRM_EMAIL_TEMPLATE_ID
export const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET
export const NODE_ENV = process.env.NODE_ENV || 'development'

declare global {
  interface Window {
    ENV: {
      STRIPE_PUBLIC_KEY: string
    }
  }
}
