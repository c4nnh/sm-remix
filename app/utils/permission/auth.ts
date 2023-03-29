import type { Membership, UserRole } from '@prisma/client'
import { redirect } from '@remix-run/node'
import { forbidden } from 'remix-utils'
import { ROUTES } from '~/constants'
import { authenticator, db } from '~/services'
import type { AuthSession } from '~/types'

export const requiredRole = async (
  request: Request,
  roles?: UserRole[]
): Promise<AuthSession> => {
  const user = await authenticator.isAuthenticated(request)

  if (!user) {
    throw redirect(ROUTES.LOGIN) as any
  }

  if (roles && roles.length && !roles.includes(user.role)) {
    throw forbidden('You have no permission')
  }

  return user
}

export const getCurrentMembership = async (
  request: Request
): Promise<Membership> => {
  const { id, organizationId } = await requiredRole(request)

  const membership = await db.membership.findUnique({
    where: { userId_organizationId: { userId: id, organizationId } },
  })

  if (!membership) {
    throw forbidden('You are not member of this organization')
  }

  return membership
}
