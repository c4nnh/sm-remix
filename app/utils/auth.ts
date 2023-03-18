import type { UserRole } from '@prisma/client'
import { redirect } from '@remix-run/node'
import { forbidden } from 'remix-utils'
import { ROUTES } from '~/constants'
import { authenticator } from '~/services'

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
