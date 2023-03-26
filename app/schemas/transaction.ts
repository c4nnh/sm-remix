import { TransactionType } from '@prisma/client'
import { z } from 'zod'
import { dayjs } from '~/libs/dayjs'
import { getErrorMessage } from '~/utils'

export const TransactionSchema = z.object({
  title: z.string().trim().nonempty({
    message: getErrorMessage().notEmpty,
  }),
  amount: z.number().min(0, getErrorMessage({ min: 0 }).min),
  currency: z.string().nonempty({
    message: getErrorMessage().notEmpty,
  }),
  date: z.date().default(dayjs().toDate()),
  type: z
    .enum([TransactionType.EXPENDITURE, TransactionType.INCOME])
    .default(TransactionType.EXPENDITURE),
  description: z.optional(z.string()),
})

export const CreateTransactionEnvironmentSchema = z.object({
  membershipId: z.string(),
})

export const UpdateTransactionEnvironmentSchema = z.intersection(
  CreateTransactionEnvironmentSchema,
  z.object({
    membershipId: z.string(),
    transactionId: z.string(),
  })
)
