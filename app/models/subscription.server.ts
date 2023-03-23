import type { Subscription, SubscriptionServiceType } from '@prisma/client'
import { dayjs } from '~/libs'
import { db } from '~/services'
import type {
  StripeCreateSubscriptionMetadata,
  StripePaymentIntentMetadata,
  StripeUpdateSubscriptionMetadata,
} from '~/types'

export const getSubscriptionByMembership = (membershipId: string) =>
  db.subscription.findFirst({ where: { membershipId } })

export const extendSubscription = async (
  metaData: StripePaymentIntentMetadata
) => {
  const { subscriptionId, subscriptionServiceId } =
    metaData as StripeUpdateSubscriptionMetadata

  // TODO: Get duration from here
  const subscriptionService = await db.subscriptionService.findUnique({
    where: { id: subscriptionServiceId },
  })
  if (!subscriptionService) return

  const newExpiredDate = dayjs().add(1, 'month').toDate()
  if (subscriptionId) {
    // new expired date from old expired date
    return db.subscription.update({
      data: {
        expiredDate: newExpiredDate,
      },
      where: {
        id: subscriptionId,
      },
    })
  } else {
    const { membershipId } = metaData as StripeCreateSubscriptionMetadata

    // new expired date from current date
    return db.subscription.create({
      data: {
        subscriptionServiceId: subscriptionService.id,
        membershipId,
        expiredDate: newExpiredDate,
      },
    })
  }
}

export const getActiveSubscriptions = async (
  userId: string,
  organizationId: string,
  service?: SubscriptionServiceType
): Promise<Subscription[]> => {
  const subscriptions = await db.subscription.findMany({
    where: {
      membership: {
        userId,
        organizationId,
      },
      subscriptionService: {
        type: service,
      },
    },
  })

  return subscriptions.filter(subscription => {
    const expiredDate = dayjs(subscription.expiredDate).endOf('d')
    const currentDate = dayjs().startOf('d')
    return expiredDate.isAfter(currentDate)
  })
}
