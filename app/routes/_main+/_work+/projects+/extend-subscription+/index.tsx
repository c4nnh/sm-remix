import { SubscriptionServiceType } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Elements } from '@stripe/react-stripe-js'
import type Stripe from 'stripe'
import invariant from 'tiny-invariant'
import { projectImage } from '~/assets'
import { SubmitStripeForm, SubscriptionBanner } from '~/components'
import { ROUTES } from '~/constants'
import { useStripePromise } from '~/hooks'
import {
  createPaymentIntent,
  getMembershipByUserAndOrg,
  getSubscriptionByMembership,
} from '~/models'
import { db } from '~/services'
import { requiredRole } from '~/utils'

type LoaderData = {
  paymentIntent: Stripe.Response<Stripe.PaymentIntent>
}

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
  const { stripePromise } = useStripePromise()
  const { paymentIntent } = useLoaderData<LoaderData>()

  return (
    <div className="flex rounded-2xl bg-layer-2 p-10 mobile:flex-col mobile:px-5">
      <SubscriptionBanner image={projectImage} />
      <Elements
        stripe={stripePromise}
        options={{
          locale: 'en',
          clientSecret: paymentIntent.client_secret || '',
          appearance: {
            labels: 'floating',
            variables: {
              colorBackground: '#e3e6e9',
            },
          },
        }}
      >
        <SubmitStripeForm
          cancelRedirectPath={ROUTES.PROJECTS}
          returnPath={ROUTES.EXTEND_PROJECTS_SUBSCRIPTION_SUCCESS}
        />
      </Elements>
    </div>
  )
}
