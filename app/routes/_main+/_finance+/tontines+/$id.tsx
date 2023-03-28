import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { performMutation } from 'remix-forms'
import { forbidden, notFound } from 'remix-utils'
import { TontineForm } from '~/components'
import { updateTontineMutation } from '~/domains'
import { TontineSchema } from '~/schemas'
import { db } from '~/services'
import { getCurrentMembership } from '~/utils'

export const loader: LoaderFunction = async ({ params, request }) => {
  const membership = await getCurrentMembership(request)

  const { id } = params

  const tontine = await db.tontine.findUnique({ where: { id } })

  if (!tontine) {
    throw notFound('Tontine does not exist')
  }

  if (tontine.membershipId !== membership.id) {
    throw forbidden('This tontine does not belong to you')
  }

  return { tontine }
}

export const action: ActionFunction = async ({ request, params }) => {
  const membership = await getCurrentMembership(request)
  const { id } = params

  return performMutation({
    request,
    schema: TontineSchema,
    mutation: updateTontineMutation,
    environment: {
      membershipId: membership.id,
      tontineId: id,
    },
  })
}

export default function TontineDetail() {
  return <TontineForm />
}
