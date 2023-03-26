import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { forbidden, notFound } from 'remix-utils'
import { ROUTES } from '~/constants'
import { db } from '~/services'
import { getCurrentMembership } from '~/utils'

export const loader: LoaderFunction = async ({ request, params }) => {
  const membership = await getCurrentMembership(request)

  const { id } = params

  const tontine = await db.tontine.findUnique({ where: { id } })

  if (!tontine) {
    throw notFound('Tontine does not exist')
  }

  if (tontine.membershipId !== membership.id) {
    throw forbidden('This tontine does not belong to you')
  }

  await db.tontine.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  })

  return redirect(ROUTES.TONTINES)
}
