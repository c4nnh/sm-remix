import invariant from 'tiny-invariant'

invariant(process.env.DATABASE_URL, 'DATABASE_URL is not set')
invariant(process.env.SESSION_SECRET, 'SESSION_SECRET is not set')
invariant(process.env.TOKEN_SECRET, 'TOKEN_SECRET is not set')
invariant(process.env.PRODUCT_NAME, 'PRODUCT_NAME is not set')
invariant(process.env.PRODUCT_URL, 'PRODUCT_URL is not set')
invariant(
  process.env.EXPIRED_EXTEND_SUBSCRIPTION_SERVICE_REMINDER_EXPRESSION,
  'EXPIRED_EXTEND_SUBSCRIPTION_SERVICE_REMINDER_EXPRESSION is not set'
)
invariant(
  process.env.EXPIRED_AUTO_PAY_REMINDER_EXPRESSION,
  'EXPIRED_AUTO_PAY_REMINDER_EXPRESSION is not set'
)
invariant(
  process.env.EXPIRED_AUTO_PAY_EXPRESSION,
  'EXPIRED_AUTO_PAY_EXPRESSION is not set'
)

export const DATABASE_URL = process.env.DATABASE_URL
export const SESSION_SECRET = process.env.SESSION_SECRET
export const TOKEN_SECRET = process.env.TOKEN_SECRET
export const PRODUCT_NAME = process.env.PRODUCT_NAME
export const PRODUCT_URL = process.env.PRODUCT_URL
export const EXPIRED_EXTEND_SUBSCRIPTION_SERVICE_REMINDER_EXPRESSION =
  process.env.EXPIRED_EXTEND_SUBSCRIPTION_SERVICE_REMINDER_EXPRESSION
export const EXPIRED_AUTO_PAY_REMINDER_EXPRESSION =
  process.env.EXPIRED_AUTO_PAY_REMINDER_EXPRESSION
export const EXPIRED_AUTO_PAY_EXPRESSION =
  process.env.EXPIRED_AUTO_PAY_EXPRESSION
export const NODE_ENV = process.env.NODE_ENV || 'development'

declare global {
  interface Window {
    ENV: {
      STRIPE_PUBLIC_KEY: string
    }
  }
}
