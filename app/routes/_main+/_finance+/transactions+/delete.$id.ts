import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { forbidden, notFound } from 'remix-utils'
import { ROUTES } from '~/constants'
import { db } from '~/services'
import { getCurrentMembership } from '~/utils'

export const loader: LoaderFunction = async ({ request, params }) => {
  const membership = await getCurrentMembership(request)

  const { id } = params

  const transaction = await db.transaction.findUnique({ where: { id } })

  if (!transaction) {
    throw notFound('Transaction does not exist')
  }

  if (transaction.membershipId !== membership.id) {
    throw forbidden('This transaction does not belong to you')
  }

  await db.transaction.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  })

  return redirect(ROUTES.TRANSACTIONS)
}
