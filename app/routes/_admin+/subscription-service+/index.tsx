import type { Prisma, SubscriptionService } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { Column } from '~/components'
import { ListHeader, Pagination, Table } from '~/components'
import { DISPLAY_DATE_FORMAT } from '~/constants'
import { dayjs } from '~/libs/dayjs'
import { db } from '~/services'
import type { ListLoaderData } from '~/types'
import { getPaginationAndSearchParams, renderYearMonthDay } from '~/utils'

type LoaderData = ListLoaderData<SubscriptionService, 'subscriptionServices'>

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const { search, take, skip } = getPaginationAndSearchParams(request)

  const where: Prisma.SubscriptionServiceWhereInput = {
    name: {
      contains: search,
      mode: 'insensitive',
    },
  }

  const subscriptionServices = await db.subscriptionService.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where,
    take,
    skip,
  })

  const totalItems = await db.subscriptionService.count({
    where,
  })

  return { subscriptionServices, totalItems }
}

export default function SubscriptionServices() {
  const { subscriptionServices, totalItems } = useLoaderData<LoaderData>()

  return (
    <div className="flex h-full w-full flex-col gap-5">
      <ListHeader />
      <Table<SubscriptionService>
        columns={columns}
        data={subscriptionServices}
      />
      <Pagination total={totalItems} />
    </div>
  )
}

const columns: Column<SubscriptionService>[] = [
  { label: 'Name', dataIndex: 'name' },
  { label: 'Type', dataIndex: 'type' },
  {
    label: 'Duration',
    render: ({ year, month, day }) => renderYearMonthDay(year, month, day),
  },
  {
    label: 'Price',
    render: transaction => (
      <div>
        <span>{transaction.price}</span>
        <span className="pl-1 text-xs text-gray-300">
          {transaction.currency}
        </span>
      </div>
    ),
  },
  {
    label: 'Created at',
    render: ({ createdAt }) => dayjs(createdAt).format(DISPLAY_DATE_FORMAT),
  },
]
