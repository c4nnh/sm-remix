import { z } from 'zod'
import { getErrorMessage } from '~/utils'

export const LoginSchema = z.object({
  email: z
    .string()
    .email({
      message: getErrorMessage().isEmail,
    })
    .trim(),
  password: z
    .string()
    .trim()
    .min(6, getErrorMessage({ min: 6 }).minLength),
})
