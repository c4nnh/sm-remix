import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { performMutation } from 'remix-forms'
import { forbidden, notFound } from 'remix-utils'
import { TransactionForm } from '~/components'
import { updateTransactionMutation } from '~/domains'
import { TransactionSchema } from '~/schemas'
import { db } from '~/services'
import { getCurrentMembership } from '~/utils'

export const loader: LoaderFunction = async ({ params, request }) => {
  const membership = await getCurrentMembership(request)

  const { id } = params

  const transaction = await db.transaction.findUnique({ where: { id } })

  if (!transaction) {
    throw notFound('Transaction does not exist')
  }

  if (transaction.membershipId !== membership.id) {
    throw forbidden('This transaction does not belong to you')
  }

  return { transaction }
}

export const action: ActionFunction = async ({ request, params }) => {
  const membership = await getCurrentMembership(request)
  const { id } = params

  return performMutation({
    request,
    schema: TransactionSchema,
    mutation: updateTransactionMutation,
    environment: {
      membershipId: membership.id,
      transactionId: id,
    },
  })
}

export default function TransactionDetail() {
  return <TransactionForm />
}
