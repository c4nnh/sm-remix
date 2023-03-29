import type { Subscription, SubscriptionServiceType } from '@prisma/client'
import { TransactionType } from '@prisma/client'
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

  // get duration of service
  const { year, month, day } = subscriptionService

  let oldExipredDate = dayjs()
  const subscription = subscriptionId
    ? await db.subscription.findUnique({
        where: { id: subscriptionId },
      })
    : undefined
  if (subscription && dayjs(subscription.expiredDate).isAfter(oldExipredDate)) {
    oldExipredDate = dayjs(subscription.expiredDate)
  }
  const newExpiredDate = dayjs(oldExipredDate)
    .add(year || 0, 'year')
    .add(month || 0, 'month')
    .add(day || 0, 'day')
    .toDate()

  await db.$transaction(async tx => {
    let membershipId

    if (subscription) {
      // new expired date from old expired date
      await tx.subscription.update({
        data: {
          expiredDate: newExpiredDate,
        },
        where: {
          id: subscriptionId,
        },
      })
      membershipId = subscription.membershipId
    } else {
      // new expired date from current date
      membershipId = (metaData as StripeCreateSubscriptionMetadata).membershipId
      await tx.subscription.create({
        data: {
          subscriptionServiceId: subscriptionService.id,
          membershipId,
          expiredDate: newExpiredDate,
        },
      })
    }

    await tx.transaction.create({
      data: {
        amount: subscriptionService.price,
        currency: subscriptionService.currency,
        type: TransactionType.EXPENDITURE,
        membershipId,
        title: 'Pay for subscription',
        description: `Pay for subscription service: ${subscriptionService.name}`,
      },
    })
  })
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
