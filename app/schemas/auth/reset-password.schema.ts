import { z } from 'zod'
import { getErrorMessage } from '~/utils'

export const ResetPasswordSchema = z.object({
  newPassword: z
    .string()
    .trim()
    .min(6, getErrorMessage({ min: 6 }).minLength),
})

export const ResetPasswordEnvironmentSchema = z.object({
  token: z.string().trim(),
})
