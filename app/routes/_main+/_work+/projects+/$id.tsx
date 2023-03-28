import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { performMutation } from 'remix-forms'
import { forbidden, notFound } from 'remix-utils'
import { ProjectForm } from '~/components'
import { updateProjectMutation } from '~/domains'
import { ProjectDetailSchema } from '~/schemas'
import { db } from '~/services'
import { getCurrentMembership } from '~/utils'

export const loader: LoaderFunction = async ({ params, request }) => {
  const membership = await getCurrentMembership(request)

  const { id } = params

  const project = await db.project.findUnique({
    where: { id },
    include: {
      rolesInProject: {
        select: { projectRoleId: true },
      },
      skillsInProject: {
        select: { skillId: true },
      },
    },
  })

  if (!project) {
    throw notFound('Project does not exist')
  }

  if (project.membershipId !== membership.id) {
    throw forbidden('This project does not belong to you')
  }

  const skills = await db.skill.findMany({
    where: {
      membershipId: membership.id,
      isDeleted: false,
    },
  })

  const projectRoles = await db.projectRole.findMany()

  return {
    project: {
      ...project,
      skillIds: project.skillsInProject.map(item => item.skillId),
      roleIds: project.rolesInProject.map(item => item.projectRoleId),
    },
    skills,
    projectRoles,
  }
}

export const action: ActionFunction = async ({ request, params }) => {
  const membership = await getCurrentMembership(request)
  const { id } = params

  return performMutation({
    request,
    schema: ProjectDetailSchema,
    mutation: updateProjectMutation,
    environment: {
      membershipId: membership.id,
      projectId: id,
    },
  })
}

export default function ProjectDetail() {
  return <ProjectForm />
}
