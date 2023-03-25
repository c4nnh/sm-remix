import { MembershipRole, MembershipStatus } from '@prisma/client'
import { forbidden } from 'remix-utils'
import { db } from '~/services'

export const getOrganizations = async (userId: string) =>
  db.organization.findMany({
    where: {
      memberships: {
        some: {
          userId,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

export const getDefaultOrganization = async (userId: string) =>
  db.organization.findFirst({
    where: {
      memberships: {
        some: {
          userId,
          isDefault: true,
        },
      },
    },
  })

export const createOrganization = async (userId: string, orgName: string) => {
  const res = await db.$transaction(async tx => {
    const organization = await tx.organization.create({
      data: { name: orgName.trim() },
    })
    const defaultOrg = await tx.membership.findFirst({
      where: {
        userId,
        isDefault: true,
      },
    })

    await tx.membership.create({
      data: {
        userId,
        organizationId: organization.id,
        isDefault: !defaultOrg,
        role: MembershipRole.OWNER,
        status: MembershipStatus.ACTIVE,
      },
    })

    return {
      organization,
      needSetDefault: !defaultOrg,
    }
  })

  return res
}

export const setDefaultOrganization = async (
  userId: string,
  organizationId?: string
) => {
  let defaultOrgId = organizationId
  if (!defaultOrgId) {
    const firstMembership = await db.membership.findFirst({
      where: {
        userId,
      },
    })
    if (!firstMembership) return undefined
    await db.membership.update({
      where: { id: firstMembership?.id },
      data: { isDefault: true },
    })
    return firstMembership?.organizationId
  }

  const membership = await db.membership.findFirst({
    where: { userId, organizationId },
  })

  if (!membership) {
    throw forbidden('You are not membership')
  }

  const otherDefaultMemberships = await db.membership.findMany({
    where: {
      userId,
      isDefault: true,
      id: {
        not: membership.id,
      },
    },
  })

  await db.$transaction(async tx => {
    if (otherDefaultMemberships.length) {
      await tx.membership.updateMany({
        where: {
          id: {
            in: otherDefaultMemberships.map(item => item.id),
          },
        },
        data: {
          isDefault: false,
        },
      })
    }

    if (!membership.isDefault) {
      await tx.membership.update({
        where: {
          id: membership.id,
        },
        data: { isDefault: true },
      })
    }
  })

  return membership.organizationId
}
