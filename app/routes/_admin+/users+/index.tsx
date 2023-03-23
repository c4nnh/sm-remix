import type { Prisma, User } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { Column } from '~/components'
import { ListHeader, Pagination, Table, Tag } from '~/components'
import { DISPLAY_DATE_FORMAT } from '~/constants'
import { dayjs } from '~/libs/dayjs'
import { db } from '~/services'
import type { ListLoaderData } from '~/types'
import { getPaginationAndSearchParams } from '~/utils'

type LoaderData = ListLoaderData<User, 'users'>

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const { search, take, skip } = getPaginationAndSearchParams(request)

  const where: Prisma.UserWhereInput = {
    OR: [
      {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        email: {
          contains: search,
          mode: 'insensitive',
        },
      },
    ],
  }

  const users = await db.user.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
    skip,
    take,
  })

  const totalItems = await db.user.count({
    where,
  })

  return { users, totalItems }
}

export default function Users() {
  const { users, totalItems } = useLoaderData<LoaderData>()

  return (
    <div className="flex h-full w-full flex-col gap-5">
      <ListHeader />
      <Table<User> columns={columns} data={users} />
      <Pagination total={totalItems} />
    </div>
  )
}

const columns: Column<User>[] = [
  { label: 'Email', dataIndex: 'email' },
  { label: 'Name', dataIndex: 'name' },
  { label: 'Role', dataIndex: 'role' },
  {
    label: 'Status',
    render: ({ status }) => {
      return (
        <Tag
          label={status}
          type={
            status === 'ACTIVE'
              ? 'success'
              : status === 'PENDING'
              ? 'warning'
              : 'default'
          }
        />
      )
    },
  },
  {
    label: 'Join at',
    render: ({ createdAt }) => dayjs(createdAt).format(DISPLAY_DATE_FORMAT),
  },
]
