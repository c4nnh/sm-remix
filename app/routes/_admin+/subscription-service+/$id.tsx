import type { LoaderFunction } from '@remix-run/node'
import { notFound } from 'remix-utils'
import { SubscriptionServiceForm } from '~/components'
import { db } from '~/services'

export const loader: LoaderFunction = async ({ params, request }) => {
  const { id } = params

  const subscriptionService = await db.subscriptionService.findUnique({
    where: { id },
  })

  if (!subscriptionService) {
    throw notFound('Subscription service does not exist')
  }

  return { subscriptionService }
}

export default function SubscriptionServiceDetail() {
  return <SubscriptionServiceForm />
}
