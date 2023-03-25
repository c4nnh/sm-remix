import { MembershipRole, MembershipStatus } from '@prisma/client'
import { makeDomainFunction } from 'domain-functions'
import { OrganizationEnvironmentSchema, OrganizationSchema } from '~/schemas'
import { db } from '~/services'

export const createOrganizationMutation = makeDomainFunction(
  OrganizationSchema,
  OrganizationEnvironmentSchema
)(async ({ name: orgName }, { userId }) => {
  const joinedOrgs = await db.organization.findMany({
    where: {
      memberships: {
        some: {
          userId,
        },
      },
    },
  })

  if (joinedOrgs.some(item => item.name === orgName.trim())) {
    throw `You have joined organization with name ${orgName}`
  }

  await db.$transaction(async tx => {
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
  })

  return {}
})
