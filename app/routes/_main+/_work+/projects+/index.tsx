import { ArrowRightIcon } from '@heroicons/react/24/outline'
import type { Project } from '@prisma/client'
import { SubscriptionService } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { Column } from '~/components'
import { ExpiredSubscription, Table } from '~/components'
import { DISPLAY_DATE_FORMAT, ROUTES } from '~/constants'
import { dayjs } from '~/libs/dayjs'
import { getActiveSubscriptions } from '~/models'
import { db } from '~/services'
import { requiredRole } from '~/utils'

type LoaderData = {
  hasSubscription: boolean
  projects: Project[]
}

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const { id, organizationId } = await requiredRole(request)

  const activeSubscriptions = await getActiveSubscriptions(
    id,
    organizationId,
    SubscriptionService.PROJECT_MANAGEMENT
  )

  const hasSubscription = !!activeSubscriptions.length

  if (!hasSubscription) {
    return {
      hasSubscription,
      projects: [],
    }
  }

  const projects = await db.project.findMany({
    where: {
      membership: {
        userId: id,
        organizationId,
      },
    },
    orderBy: {
      fromDate: 'desc',
    },
  })

  return {
    hasSubscription,
    projects,
  }
}

export default function Projects() {
  const { hasSubscription, projects } = useLoaderData<LoaderData>()

  if (!hasSubscription) {
    return (
      <ExpiredSubscription extendLink={ROUTES.EXTEND_PROJECTS_SUBSCRIPTION} />
    )
  }

  return (
    <div className="h-full w-full">
      <Table columns={columns} data={projects} />
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
