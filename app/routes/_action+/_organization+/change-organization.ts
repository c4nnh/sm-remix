import type { ActionFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { unauthorized } from 'remix-utils'
import invariant from 'tiny-invariant'
import { ROUTES } from '~/constants'
import { setDefaultOrganization } from '~/models'
import { authenticator, commitSession, getSession } from '~/services'

export const action: ActionFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)

  if (!user) {
    throw unauthorized('You must login first to use this feature')
  }

  const body = await request.formData()
  const organizationId = body.get('organizationId')

  invariant(typeof organizationId === 'string')

  await setDefaultOrganization(user.id, organizationId)

  const session = await getSession(request.headers.get('Cookie'))
  session.set(authenticator.sessionKey, {
    ...session.data[authenticator.sessionKey],
    organizationId,
  })

  const previousUrl = request.headers.get('Referer')
  return redirect(previousUrl || ROUTES.ROOT, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}

export default function ChangeOrganization() {
  return null
}
