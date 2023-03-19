import { forbidden } from 'remix-utils'
import { prisma } from '~/services'

export const getOrganizations = async (userId: string) =>
  prisma.organization.findMany({
    where: {
      memberships: {
        some: {
          userId,
        },
      },
    },
  })

export const getDefaultOrganization = async (userId: string) =>
  prisma.organization.findFirst({
    where: {
      memberships: {
        some: {
          userId,
          isDefault: true,
        },
      },
    },
  })

export const setDefaultOrganization = async (
  userId: string,
  organizationId?: string
) => {
  let defaultOrgId = organizationId
  if (!defaultOrgId) {
    const firstMembership = await prisma.membership.findFirst({
      where: {
        userId,
      },
    })
    if (!firstMembership) return undefined
    await prisma.membership.update({
      where: { id: firstMembership?.id },
      data: { isDefault: true },
    })
    return firstMembership?.organizationId
  }

  const membership = await prisma.membership.findFirst({
    where: { userId, organizationId },
  })

  if (!membership) {
    throw forbidden('You are not membership')
  }

  if (!membership.isDefault) {
    await prisma.membership.update({
      where: {
        id: membership.id,
      },
      data: { isDefault: true },
    })
  }

  return membership.organizationId
}
