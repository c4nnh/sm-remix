import { z } from 'zod'

export const ConfirmEmailTokenSchema = z.object({
  userId: z.string().uuid(),
  email: z.string(),
})
