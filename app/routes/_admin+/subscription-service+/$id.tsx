import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { performMutation } from 'remix-forms'
import { notFound } from 'remix-utils'
import { SubscriptionServiceForm } from '~/components'
import { updateSubscriotionServiceMutation } from '~/domains'
import { SubscriptionServiceSchema } from '~/schemas'
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

export const action: ActionFunction = async ({ request, params }) => {
  const { id } = params

  return performMutation({
    request,
    schema: SubscriptionServiceSchema,
    mutation: updateSubscriotionServiceMutation,
    environment: {
      subscriptionServiceId: id,
    },
  })
}

export default function SubscriptionServiceDetail() {
  return <SubscriptionServiceForm />
}
