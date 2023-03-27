import { makeDomainFunction } from 'domain-functions'
import {
  SubscriptionServiceSchema,
  UpdateSubscriptionServiceEnvironmentSchema,
} from '~/schemas'
import { db } from '~/services'

export const updateSubscriotionServiceMutation = makeDomainFunction(
  SubscriptionServiceSchema,
  UpdateSubscriptionServiceEnvironmentSchema
)(async (updateSubscriotionServiceDto, { subscriptionServiceId }) => {
  const { year, month, day } = updateSubscriotionServiceDto

  if (!year && !month && !day) {
    throw `You must provide at least 1 year or month or day`
  }

  const subscriptionService = await db.subscriptionService.findUnique({
    where: { id: subscriptionServiceId },
  })

  if (!subscriptionService) {
    throw 'Subscription service does not exist'
  }

  return db.subscriptionService.update({
    data: updateSubscriotionServiceDto,
    where: { id: subscriptionServiceId },
  })
})
