import { z } from 'zod'
import { dayjs } from '~/libs'
import { getErrorMessage } from '~/utils'

export const TontineSchema = z.object({
  title: z.string().trim().nonempty({
    message: getErrorMessage().notEmpty,
  }),
  amount: z.number().min(0, getErrorMessage({ min: 0 }).min),
  currency: z
    .string()
    .nonempty({
      message: getErrorMessage().notEmpty,
    })
    .toLowerCase(),
  date: z.date().default(dayjs().toDate()),
  description: z.optional(z.string()),
})

export const CreateTontineEnvironmentSchema = z.object({
  membershipId: z.string(),
})

export const UpdateTontineEnvironmentSchema = z.intersection(
  CreateTontineEnvironmentSchema,
  z.object({
    membershipId: z.string(),
    tontineId: z.string(),
  })
)
