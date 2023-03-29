import { SubscriptionServiceType } from '@prisma/client'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { ROUTES } from '~/constants'
import { stripe } from '~/services'

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData()
  const price = body.get('price')
  const currency = body.get('currency')
  const customer = body.get('customer')
  const paymentMethod = body.get('paymentMethod')
  const subscriptionServiceId = body.get('subscriptionServiceId')
  const subscriptionId = body.get('subscriptionId')
  const membershipId = body.get('membershipId')
  const service = body.get('service')
  const redirectUrl = body.get('redirectUrl') || ROUTES.ROOT

  invariant(typeof price === 'string')
  invariant(typeof +price === 'number')
  invariant(typeof currency === 'string')
  invariant(typeof customer === 'string')
  invariant(typeof paymentMethod === 'string')
  invariant(typeof subscriptionServiceId === 'string')
  if (subscriptionId) {
    invariant(typeof subscriptionId === 'string')
  } else {
    invariant(typeof membershipId === 'string')
    invariant(typeof service === 'string')
    invariant(
      Object.values(SubscriptionServiceType)
        .map(item => item.toString())
        .includes(service)
    )
  }
  invariant(typeof redirectUrl === 'string')

  const metadata = {
    subscriptionServiceId,
    ...(subscriptionId
      ? {
          subscriptionId,
        }
      : {
          membershipId: membershipId?.toString() || '',
          service: service as SubscriptionServiceType,
        }),
  }

  await stripe.paymentIntents.create({
    amount: +price * 100,
    currency,
    customer,
    payment_method: paymentMethod,
    off_session: true,
    confirm: true,
    metadata,
  })

  return redirect(redirectUrl)
}

export const loader: LoaderFunction = () => {
  return redirect(ROUTES.ROOT)
}
