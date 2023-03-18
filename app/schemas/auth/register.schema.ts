import { z } from 'zod'
import { getErrorMessage } from '~/utils'

export const RegisterSchema = z.object({
  email: z
    .string()
    .email({
      message: getErrorMessage().isEmail,
    })
    .trim(),
  name: z
    .string()
    .trim()
    .min(6, getErrorMessage({ min: 6 }).minLength),
  password: z
    .string()
    .trim()
    .min(6, getErrorMessage({ min: 6 }).minLength),
})
