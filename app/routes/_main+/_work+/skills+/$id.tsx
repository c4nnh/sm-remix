import type { Skill } from '@prisma/client'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { performMutation } from 'remix-forms'
import { forbidden, notFound } from 'remix-utils'
import { SkillForm } from '~/components'
import { updateSkillMutation } from '~/domains'
import { SkillSchema } from '~/schemas'
import { db } from '~/services'
import { getCurrentMembership } from '~/utils'

export const loader: LoaderFunction = async ({ params, request }) => {
  const membership = await getCurrentMembership(request)

  const { id } = params

  const skill = await db.skill.findUnique({ where: { id } })

  if (!skill) {
    throw notFound('Skill does not exist')
  }

  if (skill.membershipId !== membership.id) {
    throw forbidden('This skill does not belong to you')
  }

  return { skill }
}

export const action: ActionFunction = async ({ request, params }) => {
  const membership = await getCurrentMembership(request)
  const { id } = params

  return performMutation({
    request,
    schema: SkillSchema,
    mutation: updateSkillMutation,
    environment: {
      membershipId: membership.id,
      skillId: id,
    },
  })
}

type LoaderData = {
  skill: Skill
}

export default function SkillDetail() {
  const { skill } = useLoaderData<LoaderData>()

  return <SkillForm skill={skill as unknown as Skill} />
}
