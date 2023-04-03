import invariant from 'tiny-invariant'

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
  process.env.POSTMARK_EXTEND_SUBSCRIPTION_REMINDER_TEMPLATE_ID,
  'POSTMARK_EXTEND_SUBSCRIPTION_REMINDER_TEMPLATE_ID is not set'
)
invariant(
  /^\d+$/.test(process.env.POSTMARK_EXTEND_SUBSCRIPTION_REMINDER_TEMPLATE_ID),
  'POSTMARK_EXTEND_SUBSCRIPTION_REMINDER_TEMPLATE_ID is invalid'
)
invariant(
  process.env.POSTMARK_AUTO_PAY_REMINDER_TEMPLATE_ID,
  'POSTMARK_AUTO_PAY_REMINDER_TEMPLATE_ID is not set'
)
invariant(
  /^\d+$/.test(process.env.POSTMARK_AUTO_PAY_REMINDER_TEMPLATE_ID),
  'POSTMARK_AUTO_PAY_REMINDER_TEMPLATE_ID is invalid'
)
invariant(
  process.env.POSTMARK_AUTO_PAY_SUCCESS_TEMPLATE_ID,
  'POSTMARK_AUTO_PAY_SUCCESS_TEMPLATE_ID is not set'
)
invariant(
  /^\d+$/.test(process.env.POSTMARK_AUTO_PAY_SUCCESS_TEMPLATE_ID),
  'POSTMARK_AUTO_PAY_SUCCESS_TEMPLATE_ID is invalid'
)
invariant(
  process.env.POSTMARK_AUTO_PAY_FAILED_TEMPLATE_ID,
  'POSTMARK_AUTO_PAY_FAILED_TEMPLATE_ID is not set'
)
invariant(
  /^\d+$/.test(process.env.POSTMARK_AUTO_PAY_FAILED_TEMPLATE_ID),
  'POSTMARK_AUTO_PAY_FAILED_TEMPLATE_ID is invalid'
)
invariant(
  process.env.POSTMARK_RESET_PASSWORD_TEMPLATE_ID,
  'POSTMARK_RESET_PASSWORD_TEMPLATE_ID is not set'
)
invariant(
  /^\d+$/.test(process.env.POSTMARK_RESET_PASSWORD_TEMPLATE_ID),
  'POSTMARK_RESET_PASSWORD_TEMPLATE_ID is invalid'
)
invariant(
  process.env.POSTMARK_WELCOME_TEMPLATE_ID,
  'POSTMARK_WELCOME_TEMPLATE_ID is not set'
)
invariant(
  /^\d+$/.test(process.env.POSTMARK_WELCOME_TEMPLATE_ID),
  'POSTMARK_WELCOME_TEMPLATE_ID is invalid'
)
invariant(
  process.env.POSTMARK_EMAIL_FROM_ADDRESS,
  'POSTMARK_EMAIL_FROM_ADDRESS is not set'
)

export const POSTMARK_API_KEY = process.env.POSTMARK_API_KEY
export const POSTMARK_MESSAGE_STREAM = process.env.POSTMARK_MESSAGE_STREAM
export const POSTMARK_EMAIL_FROM_ADDRESS =
  process.env.POSTMARK_EMAIL_FROM_ADDRESS
export const POSTMARK_CONFIRM_EMAIL_TEMPLATE_ID =
  process.env.POSTMARK_CONFIRM_EMAIL_TEMPLATE_ID
export const POSTMARK_EXTEND_SUBSCRIPTION_REMINDER_TEMPLATE_ID =
  process.env.POSTMARK_EXTEND_SUBSCRIPTION_REMINDER_TEMPLATE_ID
export const POSTMARK_AUTO_PAY_REMINDER_TEMPLATE_ID =
  process.env.POSTMARK_AUTO_PAY_REMINDER_TEMPLATE_ID
export const POSTMARK_AUTO_PAY_SUCCESS_TEMPLATE_ID =
  process.env.POSTMARK_AUTO_PAY_SUCCESS_TEMPLATE_ID
export const POSTMARK_AUTO_PAY_FAILED_TEMPLATE_ID =
  process.env.POSTMARK_AUTO_PAY_FAILED_TEMPLATE_ID
export const POSTMARK_RESET_PASSWORD_TEMPLATE_ID =
  process.env.POSTMARK_RESET_PASSWORD_TEMPLATE_ID
export const POSTMARK_WELCOME_TEMPLATE_ID =
  process.env.POSTMARK_WELCOME_TEMPLATE_ID
