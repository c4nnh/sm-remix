import { SubscriptionService } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Elements } from '@stripe/react-stripe-js'
import type Stripe from 'stripe'
import invariant from 'tiny-invariant'
import { SubmitStripeForm } from '~/components'
import { ROUTES } from '~/constants'
import { useStripePromise } from '~/hooks'
import {
  createPaymentIntent,
  getMembershipByUserAndOrg,
  getSubscriptionByMembership,
} from '~/models'
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

  const paymentIntent = await createPaymentIntent({
    amount: 100,
    metadata: subscription
      ? {
          subscriptionId: subscription.id,
        }
      : {
          membershipId: membership.id,
          service: SubscriptionService.PROJECT_MANAGEMENT,
        },
  })
  return { paymentIntent }
}

export default function ExtendProjectsSubscription() {
  const { stripePromise } = useStripePromise()
  const { paymentIntent } = useLoaderData<LoaderData>()

  return (
    <div>
      <Elements
        stripe={stripePromise}
        options={{ clientSecret: paymentIntent.client_secret || '' }}
      >
        <SubmitStripeForm
          returnPath={ROUTES.EXTEND_PROJECTS_SUBSCRIPTION_SUCCESS}
        />
      </Elements>
    </div>
  )
}
