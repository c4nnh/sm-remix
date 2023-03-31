import { z } from 'zod'
import { getErrorMessage } from '~/utils'

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email({
      message: getErrorMessage().isEmail,
    })
    .trim(),
})

export const ForgotPasswordEnvironmentSchema = z.object({
  originUrl: z.string(),
})
