import type { Subscription, SubscriptionService } from '@prisma/client'
import { redirect } from '@remix-run/node'
import dayjs from 'dayjs'
import { ROUTES } from '~/constants'
import { authenticator, db } from '~/services'

export const getActiveSubscriptions = async (
  request: Request,
  service?: SubscriptionService
): Promise<Subscription[]> => {
  const user = await authenticator.isAuthenticated(request)

  if (!user) {
    return redirect(ROUTES.LOGIN) as any
  }

  const organizationId = user.organizationId

  if (!organizationId) {
    throw redirect(ROUTES.ORGANIZATIONS)
  }

  const subscriptions = await db.subscription.findMany({
    where: {
      membership: {
        userId: user.id,
        organizationId,
      },
      service,
    },
  })

  return subscriptions.filter(subscription => {
    const expiredDate = dayjs(subscription.expiredDate).endOf('d')
    const currentDate = dayjs().startOf('d')
    return expiredDate.isAfter(currentDate)
  })
}
