import { SubscriptionServiceType } from '@prisma/client'
import { z } from 'zod'
import { getErrorMessage } from '~/utils'

export const SubscriptionServiceSchema = z.object({
  name: z.string().trim().nonempty({
    message: getErrorMessage().notEmpty,
  }),
  description: z.optional(z.string().trim()),
  type: z.enum([SubscriptionServiceType.PROJECT_MANAGEMENT]),
  price: z.number().min(0, getErrorMessage({ min: 0 }).min),
  currency: z
    .string()
    .nonempty({
      message: getErrorMessage().notEmpty,
    })
    .toLowerCase(),
  year: z.optional(z.number().min(0, getErrorMessage({ min: 0 }).min)),
  month: z.optional(
    z
      .number()
      .min(0, getErrorMessage({ min: 0 }).min)
      .max(12, getErrorMessage({ max: 12 }).max)
  ),
  day: z.optional(
    z
      .number()
      .min(0, getErrorMessage({ min: 0 }).min)
      .max(30, getErrorMessage({ max: 30 }).max)
  ),
})

export const UpdateSubscriptionServiceEnvironmentSchema = z.object({
  subscriptionServiceId: z.string(),
})
