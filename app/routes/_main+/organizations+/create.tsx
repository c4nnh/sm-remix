import type { ActionFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { performMutation } from 'remix-forms'
import { OrganizationForm } from '~/components'
import { ROUTES } from '~/constants'
import { createOrganizationMutation } from '~/domains'
import { OrganizationSchema } from '~/schemas'
import { requiredRole } from '~/utils'

export const action: ActionFunction = async ({ request }) => {
  const user = await requiredRole(request)

  const result = await performMutation({
    request,
    schema: OrganizationSchema,
    mutation: createOrganizationMutation,
    environment: {
      userId: user.id,
    },
  })
  if (!result.success) return json(result, 400)

  return redirect(ROUTES.ORGANIZATIONS)
}

export default function CreateOrganization() {
  return <OrganizationForm />
}
