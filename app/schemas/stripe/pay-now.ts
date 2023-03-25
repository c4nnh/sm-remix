import { z } from 'zod'

export const PayNowSchema = z.object({
  amount: z.number(),
  currency: z.string(),
  customer: z.string(),
  paymentMethod: z.string(),
})
