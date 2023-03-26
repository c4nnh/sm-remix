import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { forbidden, notFound } from 'remix-utils'
import { ROUTES } from '~/constants'
import { db } from '~/services'
import { getCurrentMembership } from '~/utils'

export const loader: LoaderFunction = async ({ request, params }) => {
  const membership = await getCurrentMembership(request)

  const { id } = params

  const project = await db.project.findUnique({ where: { id } })

  if (!project) {
    throw notFound('Project does not exist')
  }

  if (project.membershipId !== membership.id) {
    throw forbidden('This project does not belong to you')
  }

  await db.project.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  })

  return redirect(ROUTES.PROJECTS)
}
