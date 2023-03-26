import { ArrowRightIcon } from '@heroicons/react/24/outline'
import type { Prisma, Project } from '@prisma/client'
import { SubscriptionServiceType } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { Column } from '~/components'
import {
  ExpiredSubscription,
  ListHeader,
  Pagination,
  Table,
} from '~/components'
import { DISPLAY_DATE_FORMAT, ROUTES } from '~/constants'
import { dayjs } from '~/libs/dayjs'
import { getActiveSubscriptions } from '~/models'
import { db } from '~/services'
import type { ListLoaderData } from '~/types'
import { getPaginationAndSearchParams, requiredRole } from '~/utils'

type LoaderData = ListLoaderData<Project, 'projects'> & {
  hasSubscription: boolean
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const { id, organizationId } = await requiredRole(request)

  const activeSubscriptions = await getActiveSubscriptions(
    id,
    organizationId,
    SubscriptionServiceType.PROJECT_MANAGEMENT
  )

  const hasSubscription = !!activeSubscriptions.length

  if (!hasSubscription) {
    return {
      hasSubscription,
      projects: [],
      totalItems: 0,
    }
  }

  const { search, take, skip } = getPaginationAndSearchParams(request)

  const where: Prisma.ProjectWhereInput = {
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

  const projects = await db.project.findMany({
    where,
    orderBy: {
      fromDate: 'desc',
    },
    skip,
    take,
  })

  const totalItems = await db.project.count({
    where,
  })

  return {
    hasSubscription,
    projects,
    totalItems,
  }
}

export default function Projects() {
  const { hasSubscription, projects, totalItems } = useLoaderData<LoaderData>()

  if (!hasSubscription) {
    return (
      <ExpiredSubscription extendLink={ROUTES.EXTEND_PROJECTS_SUBSCRIPTION} />
    )
  }

  return (
    <div className="flex h-full w-full flex-col gap-5">
      <ListHeader createPath={ROUTES.CREATE_PROJECT} />
      <Table<Project>
        columns={columns}
        data={projects}
        deleteUrl={ROUTES.DELETE_PROJECT}
        deleteTitle="Delete project"
        deleteMessage="Are you sure you wish to delete this project?"
      />
      <Pagination total={totalItems} />
    </div>
  )
}

const columns: Column<Project>[] = [
  { label: 'Name', dataIndex: 'name' },
  { label: 'Team size', dataIndex: 'teamSize' },
  {
    label: 'Duration',
    render: ({ fromDate, toDate }) => (
      <div className="flex items-center gap-5">
        <span>{dayjs(fromDate).format(DISPLAY_DATE_FORMAT)}</span>
        <ArrowRightIcon className="h-4 w-4" />
        <span>
          {toDate ? dayjs(toDate).format(DISPLAY_DATE_FORMAT) : 'On going'}
        </span>
      </div>
    ),
  },
]
