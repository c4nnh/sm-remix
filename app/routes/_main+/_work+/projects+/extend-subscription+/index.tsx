import { SubscriptionServiceType } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { projectImage } from '~/assets'
import { ExtendSubscription } from '~/components'
import { ROUTES } from '~/constants'
import {
  createPaymentIntent,
  getMembershipByUserAndOrg,
  getPaymentMethodInfo,
  getSubscriptionByMembership,
} from '~/models'
import { db } from '~/services'
import { requiredRole } from '~/utils'

export const loader: LoaderFunction = async ({ request }) => {
  const { id: userId, organizationId } = await requiredRole(request)

  invariant(organizationId)

  const membership = await getMembershipByUserAndOrg(userId, organizationId)
  if (!membership) {
    return redirect(ROUTES.PROJECTS)
  }

  const subscription = await getSubscriptionByMembership(membership.id)

  const subscriptionService = await db.subscriptionService.findUnique({
    where: { type: SubscriptionServiceType.PROJECT_MANAGEMENT },
  })

  if (!subscriptionService) {
    return redirect(ROUTES.PROJECTS)
  }

  const { price, currency } = subscriptionService

  const paymentCustomer = await db.paymentCustomer.findFirst({
    where: {
      userId,
    },
  })

  if (paymentCustomer && paymentCustomer.paymentMethodPspId) {
    const paymentMethod = await getPaymentMethodInfo(
      paymentCustomer.paymentMethodPspId
    )

    if (paymentMethod) {
      return {
        subscriptionService,
        paymentMethod,
        subscription,
        membership,
      }
    }
  }

  const paymentIntent = await createPaymentIntent({
    amount: price,
    currency,
    customer: paymentCustomer?.pspId,
    payment_method: paymentCustomer?.paymentMethodPspId || '',
    metadata: {
      subscriptionServiceId: subscriptionService.id,
      ...(subscription
        ? {
            subscriptionId: subscription.id,
          }
        : {
            membershipId: membership.id,
            service: SubscriptionServiceType.PROJECT_MANAGEMENT,
          }),
    },
  })

  return { paymentIntent, subscriptionService }
}

export default function ExtendProjectsSubscription() {
  return (
    <ExtendSubscription
      bannerImage={projectImage}
      cancelRedirectPath={ROUTES.PROJECTS}
      returnPath={ROUTES.EXTEND_PROJECTS_SUBSCRIPTION_SUCCESS}
    />
  )
}
