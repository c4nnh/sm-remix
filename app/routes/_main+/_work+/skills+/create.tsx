import type { ActionFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { performMutation } from 'remix-forms'
import { SkillForm } from '~/components'
import { ROUTES } from '~/constants'
import { createSkillMutation } from '~/domains'
import { SkillSchema } from '~/schemas'
import { getCurrentMembership } from '~/utils'

export const action: ActionFunction = async ({ request }) => {
  const membership = await getCurrentMembership(request)

  const result = await performMutation({
    request,
    schema: SkillSchema,
    mutation: createSkillMutation,
    environment: {
      membershipId: membership.id,
    },
  })

  if (!result.success) return json(result, 400)

  return redirect(ROUTES.SKILLS)
}

export default function CreateSkill() {
  return <SkillForm />
}
