import { z } from 'zod'

export const ConfirmEmailTokenSchema = z.object({
  userId: z.string().cuid(),
  email: z.string(),
})
