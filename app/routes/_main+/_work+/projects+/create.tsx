import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { performMutation } from 'remix-forms'
import { ProjectForm } from '~/components'
import { ROUTES } from '~/constants'
import { createProjectMutation } from '~/domains'
import { CreateUpdateProjectSchema } from '~/schemas'
import { db } from '~/services'
import { getCurrentMembership } from '~/utils'

export const action: ActionFunction = async ({ request }) => {
  const membership = await getCurrentMembership(request)

  const result = await performMutation({
    request,
    schema: CreateUpdateProjectSchema,
    mutation: createProjectMutation,
    environment: {
      membershipId: membership.id,
    },
  })

  if (!result.success) return json(result, 400)

  return redirect(ROUTES.PROJECTS)
}

export const loader: LoaderFunction = async ({ request }) => {
  const membership = await getCurrentMembership(request)

  const skills = await db.skill.findMany({
    where: {
      membershipId: membership.id,
      isDeleted: false,
    },
  })

  const projectRoles = await db.projectRole.findMany()

  return { skills, projectRoles }
}

export default function CreateProject() {
  return <ProjectForm />
}
