import type { ActionFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { performMutation } from 'remix-forms'
import { OrganizationForm } from '~/components'
import { ROUTES } from '~/constants'
import { createOrganizationMutation } from '~/domains'
import { OrganizationSchema } from '~/schemas'
import { authenticator, commitSession, getSession } from '~/services'
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

  const { organization, needSetDefault } = result.data

  if (needSetDefault) {
    const session = await getSession(request.headers.get('Cookie'))
    session.set(authenticator.sessionKey, {
      ...session.data[authenticator.sessionKey],
      organizationId: organization.id,
    })

    return redirect(ROUTES.ORGANIZATIONS, {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    })
  }

  return redirect(ROUTES.ORGANIZATIONS)
}

export default function CreateOrganization() {
  return <OrganizationForm />
}
