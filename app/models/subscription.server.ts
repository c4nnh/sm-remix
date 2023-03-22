import { dayjs } from '~/libs'
import { db } from '~/services'
import type {
  StripeCreateSubscriptionMetadata,
  StripePaymentIntentMetadata,
  StripeUpdateSubscriptionMetadata,
} from '~/types'

export const getSubscriptionByMembership = (membershipId: string) =>
  db.subscription.findFirst({ where: { membershipId } })

export const extendSubscription = (metaData: StripePaymentIntentMetadata) => {
  const { subscriptionId } = metaData as StripeUpdateSubscriptionMetadata
  const newExpiredDate = dayjs().add(1, 'month').toDate()
  if (subscriptionId) {
    return db.subscription.update({
      data: {
        expiredDate: newExpiredDate,
      },
      where: {
        id: subscriptionId,
      },
    })
  } else {
    const { service, membershipId } =
      metaData as StripeCreateSubscriptionMetadata
    return db.subscription.create({
      data: {
        service,
        membershipId,
        expiredDate: newExpiredDate,
      },
    })
  }
}
