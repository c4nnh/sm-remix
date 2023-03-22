import type { Tontine } from '@prisma/client'
import { UserRole } from '@prisma/client'
import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { Column } from '~/components'
import { Table } from '~/components'
import { DISPLAY_DATE_FORMAT } from '~/constants'
import { dayjs } from '~/libs'
import { db } from '~/services'
import { requiredRole } from '~/utils'

type LoaderData = {
  tontines: Tontine[]
}

export const loader: LoaderFunction = async ({
  request,
}: LoaderArgs): Promise<LoaderData> => {
  const { id, organizationId } = await requiredRole(request, [UserRole.USER])

  const tontines = await db.tontine.findMany({
    where: {
      membership: {
        userId: id,
        organizationId,
      },
    },
  })

  return { tontines }
}

export default function Tontines() {
  const { tontines } = useLoaderData<LoaderData>()

  return (
    <div className="h-full w-full">
      <Table columns={columns} data={tontines} />
    </div>
  )
}

const columns: Column<Tontine>[] = [
  { label: 'Title', dataIndex: 'title' },
  {
    label: 'Amount',
    render: transaction => (
      <div>
        <span>{transaction.amount}</span>
        <span className="pl-1 text-xs text-gray-300">
          {transaction.currency}
        </span>
      </div>
    ),
  },
  {
    label: 'Date',
    render: transaction => dayjs(transaction.date).format(DISPLAY_DATE_FORMAT),
  },
]
