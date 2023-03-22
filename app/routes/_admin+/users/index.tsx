import type { User } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { Column } from '~/components'
import { Table, Tag } from '~/components'
import { DISPLAY_DATE_FORMAT } from '~/constants'
import { dayjs } from '~/libs/dayjs'
import { db } from '~/services'

type LoaderData = {
  users: User[]
}

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return { users }
}

export default function Users() {
  const { users } = useLoaderData<LoaderData>()

  return (
    <div className="h-full w-full">
      <Table columns={columns} data={users} />
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
