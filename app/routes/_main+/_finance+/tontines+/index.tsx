import type { Tontine } from '@prisma/client'
import { UserRole } from '@prisma/client'
import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { Column } from '~/components'
import { ListHeader, Pagination, Table } from '~/components'
import { DISPLAY_DATE_FORMAT, ROUTES } from '~/constants'
import { dayjs } from '~/libs'
import { db } from '~/services'
import type { ListLoaderData } from '~/types'
import { getPaginationAndSearchParams, requiredRole } from '~/utils'

type LoaderData = ListLoaderData<Tontine, 'tontines'>

export const loader: LoaderFunction = async ({
  request,
}: LoaderArgs): Promise<LoaderData> => {
  const { id, organizationId } = await requiredRole(request, [UserRole.USER])

  const { search, take, skip } = getPaginationAndSearchParams(request)

  const tontines = await db.tontine.findMany({
    where: {
      membership: {
        userId: id,
        organizationId,
      },
      title: {
        contains: search,
        mode: 'insensitive',
      },
    },
    orderBy: { date: 'desc' },
    skip,
    take,
  })

  const totalItems = await db.tontine.count({
    where: {
      title: {
        contains: search,
        mode: 'insensitive',
      },
    },
  })

  return { tontines, totalItems }
}

export default function Tontines() {
  const { tontines, totalItems } = useLoaderData<LoaderData>()

  return (
    <div className="flex h-full w-full flex-col gap-5">
      <ListHeader createPath={ROUTES.CREATE_TONTINES} />
      <Table columns={columns} data={tontines} />
      <Pagination total={totalItems} />
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
