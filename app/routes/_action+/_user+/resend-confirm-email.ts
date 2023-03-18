import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { unauthorized } from 'remix-utils'
import { ROUTES } from '~/constants'
import { authenticator, confirmEmailToken, sendEmail } from '~/services'

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  await new Promise(res => setTimeout(res, 4000))

  const user = await authenticator.isAuthenticated(request)

  if (!user) {
    throw unauthorized('You must login first to use this feature')
  }

  // SEND EMAIL
  const token = await confirmEmailToken.create({
    userId: user.id,
    email: user.email,
  })
  const url = new URL(request.url)
  const confirmUrl = `${url.origin}/confirm-email?token=${token}}`
  sendEmail({
    to: user.email,
    subject: 'User Registration',
    text: `Welcome! Please use this link to finish user registration: ${confirmUrl}`,
  })

  return redirect(ROUTES.ROOT)
}
