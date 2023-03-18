import type { UserRole } from '@prisma/client'
import { redirect } from '@remix-run/node'
import { forbidden } from 'remix-utils'
import { ROUTES } from '~/constants'
import { authenticator, confirmEmailToken, sendEmail } from '~/services'

export const requiredRole = async (request: Request, roles?: UserRole[]) => {
  const user = await authenticator.isAuthenticated(request)

  if (!user) {
    return redirect(ROUTES.LOGIN)
  }

  if (roles && roles.length && !roles.includes(user.role)) {
    throw forbidden('You have no permission')
  }

  return user
}

export const sendConfirmEmail = async ({
  originUrl,
  userId,
  email,
}: {
  originUrl: string
  userId: string
  email: string
}) => {
  try {
    const token = await confirmEmailToken.create(
      {
        userId,
        email,
      },
      {
        expiresIn: '2d',
      }
    )
    const confirmUrl = `${originUrl}/confirm-email?token=${token}}`
    sendEmail({
      to: email,
      subject: 'User Registration',
      text: `Welcome! Please use this link to finish user registration: ${confirmUrl}`,
    })
  } catch {
    // do nothing
  }
}
