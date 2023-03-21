import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type Stripe from 'stripe'
import { retrievePaymentIntent } from '~/models'

type LoaderData = {
  paymentIntent: Stripe.PaymentIntent
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const id = url.searchParams.get('payment_intent') || ''

  const paymentIntent = await retrievePaymentIntent(id)

  return { paymentIntent }
}

export default function ExtendSubscriptionSuccess() {
  const { paymentIntent } = useLoaderData<LoaderData>()

  return <div>{JSON.stringify(paymentIntent.metadata)}Success</div>
}
