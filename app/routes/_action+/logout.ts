import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { ROUTES } from '~/constants'
import { authenticator } from '~/services'

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  await authenticator.logout(request, { redirectTo: ROUTES.LOGIN })
}
