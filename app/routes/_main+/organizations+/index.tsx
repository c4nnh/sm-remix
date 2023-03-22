import type { Organization } from '@prisma/client'
import { UserRole } from '@prisma/client'
import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { Column } from '~/components'
import { Table } from '~/components'
import { DISPLAY_DATE_FORMAT } from '~/constants'
import { dayjs } from '~/libs'
import { db } from '~/services'
import { requiredRole } from '~/utils'

type OrganizationQueryResponse = Organization & {
  _count: {
    memberships: number
  }
}

type LoaderData = {
  organizations: OrganizationQueryResponse[]
}

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const user = await requiredRole(request, [UserRole.USER])

  const organizations = await db.organization.findMany({
    where: {
      memberships: {
        some: {
          userId: user.id,
        },
      },
    },
    include: {
      _count: {
        select: {
          memberships: true,
        },
      },
    },
  })

  return { organizations }
}

export default function Organizations() {
  const { organizations } = useLoaderData<LoaderData>()

  return (
    <div className="h-full w-full">
      <Table<OrganizationQueryResponse>
        columns={columns}
        data={organizations}
      />
    </div>
  )
}

const columns: Column<OrganizationQueryResponse>[] = [
  { label: 'Name', dataIndex: 'name' },
  {
    label: 'Number of members',
    render: organization => organization._count.memberships,
  },
  {
    label: 'Created at',
    render: organization =>
      dayjs(organization.createdAt).format(DISPLAY_DATE_FORMAT),
  },
]
