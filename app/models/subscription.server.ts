import type { Prisma } from '@prisma/client'
import { db } from '~/services'

export const getSubscriptions = (params: Prisma.SubscriptionWhereInput) =>
  db.subscription.findMany({
    where: params,
  })
