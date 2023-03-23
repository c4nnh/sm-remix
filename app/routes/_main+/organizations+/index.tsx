import type { Organization } from '@prisma/client'
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

type OrganizationQueryResponse = Organization & {
  _count: {
    memberships: number
  }
}

type LoaderData = ListLoaderData<Organization, 'organizations'>

export const loader: LoaderFunction = async ({
  request,
}: LoaderArgs): Promise<LoaderData> => {
  const user = await requiredRole(request, [UserRole.USER])

  const { search, take, skip } = getPaginationAndSearchParams(request)

  const organizations = await db.organization.findMany({
    where: {
      memberships: {
        some: {
          userId: user.id,
        },
      },
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
    include: {
      _count: {
        select: {
          memberships: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
    skip,
    take,
  })

  const totalItems = await db.organization.count({
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
  })

  return { organizations, totalItems }
}

export default function Organizations() {
  const { organizations, totalItems } = useLoaderData<LoaderData>()

  return (
    <div className="flex h-full w-full flex-col gap-5">
      <ListHeader createPath={ROUTES.CREATE_ORGANIZATION} />
      <Table<OrganizationQueryResponse>
        columns={columns}
        data={organizations}
      />
      <Pagination total={totalItems} />
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
