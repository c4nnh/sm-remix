import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { unauthorized } from 'remix-utils'
import { FORM_STRATEGY, ROUTES } from '~/constants'
import { authenticator } from '~/services'

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request)

  if (!user) {
    throw unauthorized('You must login first to use this feature')
  }

  return authenticator.authenticate(FORM_STRATEGY.CONFIRM_EMAIL, request, {
    successRedirect: ROUTES.ROOT,
  })
}
