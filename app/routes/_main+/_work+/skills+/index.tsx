import { CheckCircleIcon } from '@heroicons/react/24/outline'
import type { Prisma, Skill } from '@prisma/client'
import { UserRole } from '@prisma/client'
import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { Column } from '~/components'
import { ListHeader, Pagination, Table } from '~/components'
import { ROUTES } from '~/constants'
import { db } from '~/services'
import type { ListLoaderData } from '~/types'
import { getPaginationAndSearchParams, requiredRole } from '~/utils'

type LoaderData = ListLoaderData<Skill, 'skills'>

export const loader: LoaderFunction = async ({
  request,
}: LoaderArgs): Promise<LoaderData> => {
  const { id, organizationId } = await requiredRole(request, [UserRole.USER])

  const { search, take, skip } = getPaginationAndSearchParams(request)

  const where: Prisma.SkillWhereInput = {
    membership: {
      userId: id,
      organizationId,
    },
    name: {
      contains: search,
      mode: 'insensitive',
    },
    isDeleted: false,
  }

  const skills = await db.skill.findMany({
    where,
    orderBy: [
      {
        yoe: 'desc',
      },
      {
        createdAt: 'desc',
      },
    ],
    skip,
    take,
  })

  const totalItems = await db.skill.count({
    where,
  })

  return { skills, totalItems }
}

export default function Skills() {
  const { skills, totalItems } = useLoaderData<LoaderData>()

  return (
    <div className="flex h-full w-full flex-col gap-5">
      <ListHeader createPath={ROUTES.CREATE_SKILL} />
      <Table<Skill>
        columns={columns}
        data={skills}
        deleteUrl={ROUTES.DELETE_SKILL}
        deleteTitle="Delete skill"
        deleteMessage="Are you sure you wish to delete this skill?"
      />
      <Pagination total={totalItems} />
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
