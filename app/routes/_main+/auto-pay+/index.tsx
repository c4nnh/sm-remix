import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import type { Prisma, Subscription } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { Column } from '~/components'
import { ListHeader, Pagination, Table } from '~/components'
import { DISPLAY_DATE_TIME_FORMAT } from '~/constants'
import { dayjs } from '~/libs'
import { db } from '~/services'
import type { ListLoaderData } from '~/types'
import { getCurrentMembership, getPaginationAndSearchParams } from '~/utils'

type Model = Subscription & {
  subscriptionService: {
    name: string
  }
}

type LoaderData = ListLoaderData<Model, 'subscriptions'>

export const loader: LoaderFunction = async ({ request }) => {
  const membership = await getCurrentMembership(request)

  const { search, take, skip } = getPaginationAndSearchParams(request)

  const where: Prisma.SubscriptionWhereInput = {
    membershipId: membership.id,
    subscriptionService: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
  }

  const subscriptions = await db.subscription.findMany({
    where,
    include: {
      subscriptionService: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
    skip,
    take,
  })

  const totalItems = await db.subscription.count({
    where,
  })

  return { subscriptions, totalItems }
}

export default function AutoPay() {
  const { subscriptions, totalItems } = useLoaderData<LoaderData>()

  return (
    <div className="flex h-full w-full flex-col gap-5">
      <ListHeader />
      <Table<Model> columns={columns} data={subscriptions} />
      <Pagination total={totalItems} />
    </div>
  )
}

const columns: Column<Model>[] = [
  { label: 'Service', render: ({ subscriptionService: { name } }) => name },
  {
    label: 'Expired at',
    render: ({ expiredDate }) =>
      dayjs(expiredDate).endOf('day').format(DISPLAY_DATE_TIME_FORMAT),
  },
  {
    label: 'Auto pay',
    render: ({ autoPay }) =>
      autoPay ? (
        <CheckCircleIcon className="h-5 w-5 text-green-500" />
      ) : (
        <XMarkIcon className="h-5 w-5 text-text" />
      ),
  },
]
