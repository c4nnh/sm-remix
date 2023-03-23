import type { SubscriptionService } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { Column } from '~/components'
import { Table } from '~/components'
import { DISPLAY_DATE_FORMAT } from '~/constants'
import { dayjs } from '~/libs/dayjs'
import { db } from '~/services'

type LoaderData = {
  subscriptionServices: SubscriptionService[]
}

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const subscriptionServices = await db.subscriptionService.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return { subscriptionServices }
}

export default function SubscriptionServices() {
  const { subscriptionServices } = useLoaderData<LoaderData>()

  return (
    <div className="h-full w-full">
      <Table columns={columns} data={subscriptionServices} />
    </div>
  )
}

const columns: Column<SubscriptionService>[] = [
  { label: 'Name', dataIndex: 'name' },
  { label: 'Type', dataIndex: 'type' },
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
