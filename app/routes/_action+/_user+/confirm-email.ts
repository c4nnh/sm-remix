import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { unauthorized } from 'remix-utils'
import { ROUTES } from '~/constants'
import { authenticator } from '~/services'

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  await new Promise(res => setTimeout(res, 4000))

  const user = await authenticator.isAuthenticated(request)

  if (!user) {
    throw unauthorized('You must login first to use this feature')
  }

  return authenticator.authenticate('confirm', request, {
    successRedirect: ROUTES.ROOT,
  })
}

export default function Route() {
  return null
}
