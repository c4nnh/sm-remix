import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { createPaymentIntent } from '~/models'

export const loader: LoaderFunction = async ({ request }) => {
  const paymentIntent = await createPaymentIntent()

  return paymentIntent
}

export default function ExtendProjectsSubscription() {
  const paymentIntent = useLoaderData()

  return <div>{JSON.stringify(paymentIntent)}Extend projects subscription</div>
}
