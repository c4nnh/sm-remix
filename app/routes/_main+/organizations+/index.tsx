import type { Organization } from '@prisma/client'
import { UserRole } from '@prisma/client'
import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { Column } from '~/components'
import { Table } from '~/components'
import { getOrganizations } from '~/models'
import { requiredRole } from '~/utils'

type LoaderData = {
  organizations: Organization[]
}

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const user = await requiredRole(request, [UserRole.USER])

  const organizations = await getOrganizations(user.id)

  return { organizations }
}

export default function Organizations() {
  const { organizations } = useLoaderData<LoaderData>()

  return (
    <div className="h-full w-full">
      <Table<Organization> columns={columns} data={organizations} />
    </div>
  )
}

const columns: Column<Organization>[] = [
  // { label: 'Id', dataIndex: 'id' },
  { label: 'Name', dataIndex: 'name' },
  { label: 'Update at', dataIndex: 'updatedAt' },
  { label: 'Created at', dataIndex: 'createdAt' },
]
