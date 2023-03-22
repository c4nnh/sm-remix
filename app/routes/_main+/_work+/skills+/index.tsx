import { CheckCircleIcon } from '@heroicons/react/24/outline'
import type { Skill } from '@prisma/client'
import { UserRole } from '@prisma/client'
import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { Column } from '~/components'
import { Table } from '~/components'
import { db } from '~/services'
import { requiredRole } from '~/utils'

type LoaderData = {
  skills: Skill[]
}

export const loader: LoaderFunction = async ({
  request,
}: LoaderArgs): Promise<LoaderData> => {
  const { id, organizationId } = await requiredRole(request, [UserRole.USER])

  const skills = await db.skill.findMany({
    where: {
      membership: {
        userId: id,
        organizationId,
      },
    },
    orderBy: {
      yoe: 'desc',
    },
  })

  return { skills }
}

export default function Skills() {
  const { skills } = useLoaderData<LoaderData>()

  return (
    <div className="h-full w-full">
      <Table columns={columns} data={skills} />
    </div>
  )
}

const columns: Column<Skill>[] = [
  { label: 'Name', dataIndex: 'name' },
  { label: 'Year of experience', dataIndex: 'yoe' },
  {
    label: 'Is main skill',
    render: ({ isMain }) =>
      isMain ? <CheckCircleIcon className="h-5 w-5 text-green-500" /> : '',
  },
]
