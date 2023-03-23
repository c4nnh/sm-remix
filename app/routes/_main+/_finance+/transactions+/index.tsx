import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline'
import type { Transaction } from '@prisma/client'
import { TransactionType, UserRole } from '@prisma/client'
import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { Column } from '~/components'
import { ListHeader, Pagination, Table, Tag } from '~/components'
import { DISPLAY_DATE_FORMAT, ROUTES } from '~/constants'
import { dayjs } from '~/libs'
import { db } from '~/services'
import type { ListLoaderData } from '~/types'
import { getPaginationAndSearchParams, requiredRole } from '~/utils'

type LoaderData = ListLoaderData<Transaction, 'transactions'>

export const loader: LoaderFunction = async ({
  request,
}: LoaderArgs): Promise<LoaderData> => {
  const { id, organizationId } = await requiredRole(request, [UserRole.USER])

  const { search, take, skip } = getPaginationAndSearchParams(request)

  const transactions = await db.transaction.findMany({
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
    orderBy: {
      date: 'desc',
    },
    skip,
    take,
  })

  const totalItems = await db.transaction.count({
    where: {
      title: {
        contains: search,
        mode: 'insensitive',
      },
    },
  })

  return { transactions, totalItems }
}

export default function Transactions() {
  const { transactions, totalItems } = useLoaderData<LoaderData>()

  return (
    <div className="flex h-full w-full flex-col gap-5">
      <ListHeader createPath={ROUTES.CREATE_TRANSACTIONS} />
      <Table data={transactions} columns={columns} />
      <Pagination total={totalItems} />
    </div>
  )
}

const columns: Column<Transaction>[] = [
  { label: 'Title', dataIndex: 'title' },
  {
    label: 'Type',
    render: transaction => {
      const isIncome = transaction.type === TransactionType.INCOME
      return (
        <Tag
          label={transaction.type}
          icon={isIncome ? ArrowUpIcon : ArrowDownIcon}
          type={isIncome ? 'success' : 'danger'}
        />
      )
    },
  },
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
