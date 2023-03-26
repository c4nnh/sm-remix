import type { ActionFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { performMutation } from 'remix-forms'
import { TransactionForm } from '~/components'
import { ROUTES } from '~/constants'
import { createTransactionMutation } from '~/domains'
import { TransactionSchema } from '~/schemas'
import { getCurrentMembership } from '~/utils'

export const action: ActionFunction = async ({ request }) => {
  const membership = await getCurrentMembership(request)

  const result = await performMutation({
    request,
    schema: TransactionSchema,
    mutation: createTransactionMutation,
    environment: {
      membershipId: membership.id,
    },
  })

  if (!result.success) return json(result, 400)

  return redirect(ROUTES.TRANSACTIONS)
}

export default function CreateTransaction() {
  return <TransactionForm />
}
