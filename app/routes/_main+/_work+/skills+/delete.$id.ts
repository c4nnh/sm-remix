import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { forbidden, notFound } from 'remix-utils'
import { ROUTES } from '~/constants'
import { db } from '~/services'
import { getCurrentMembership } from '~/utils'

export const loader: LoaderFunction = async ({ request, params }) => {
  const membership = await getCurrentMembership(request)

  const { id } = params

  const skill = await db.skill.findUnique({ where: { id } })

  if (!skill) {
    throw notFound('Skill does not exist')
  }

  if (skill.membershipId !== membership.id) {
    throw forbidden('This skill does not belong to you')
  }

  await db.skill.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  })

  return redirect(ROUTES.SKILLS)
}
