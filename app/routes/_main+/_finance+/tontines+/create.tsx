import type { ActionFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { performMutation } from 'remix-forms'
import { TontineForm } from '~/components'
import { ROUTES } from '~/constants'
import { createTontineMutation } from '~/domains'
import { TontineSchema } from '~/schemas'
import { getCurrentMembership } from '~/utils'

export const action: ActionFunction = async ({ request }) => {
  const membership = await getCurrentMembership(request)

  const result = await performMutation({
    request,
    schema: TontineSchema,
    mutation: createTontineMutation,
    environment: {
      membershipId: membership.id,
    },
  })

  if (!result.success) return json(result, 400)

  return redirect(ROUTES.TONTINES)
}

export default function CreateTontine() {
  return <TontineForm />
}
