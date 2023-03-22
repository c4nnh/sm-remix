import type { Prisma } from '@prisma/client'
import { db } from '~/services'

export const createPaymentCustomer = async (
  data: Prisma.PaymentCustomerUncheckedCreateInput
) => db.paymentCustomer.create({ data })

export const updatePaymentCustomer = async (
  args: Prisma.PaymentCustomerUpdateArgs
) => db.paymentCustomer.update(args)
