import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { unauthorized } from 'remix-utils'
import { ROUTES } from '~/constants'
import { authenticator } from '~/services'
import { sendConfirmEmail } from '~/utils'

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  await new Promise(res => setTimeout(res, 2000))

  const user = await authenticator.isAuthenticated(request)

  if (!user) {
    throw unauthorized('You must login first to use this feature')
  }

  const originUrl = new URL(request.url).origin
  await sendConfirmEmail({ originUrl, userId: user.id, email: user.email })

  return redirect(ROUTES.ROOT)
}
