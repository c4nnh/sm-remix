import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { SubscriptionSuccess } from '~/components'
import { ROUTES } from '~/constants'
import { retrievePaymentIntent } from '~/models'

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const id = url.searchParams.get('payment_intent') || ''

  const paymentIntent = await retrievePaymentIntent(id)

  if (paymentIntent.status !== 'succeeded') {
    return redirect(ROUTES.PROJECTS)
  }

  return { paymentIntent }
}

export default function ExtendSubscriptionSuccess() {
  return <SubscriptionSuccess redirectPath={ROUTES.PROJECTS} />
}
