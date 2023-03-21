import { SubscriptionService } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { ExpiredSubscription, Table } from '~/components'
import { ROUTES } from '~/constants'
import { getActiveSubscriptions } from '~/utils'

type LoaderData = {
  hasSubscription: boolean
}

export const loader: LoaderFunction = async ({ request }) => {
  const activeSubscriptions = await getActiveSubscriptions(
    request,
    SubscriptionService.PROJECT_MANAGEMENT
  )

  const hasSubscription = activeSubscriptions.length

  return {
    hasSubscription,
  }
}

export default function Projects() {
  const { hasSubscription } = useLoaderData<LoaderData>()

  if (!hasSubscription) {
    return (
      <ExpiredSubscription extendLink={ROUTES.EXTEND_PROJECTS_SUBSCRIPTION} />
    )
  }

  return (
    <div className="h-full w-full">
      <Table />
    </div>
  )
}
