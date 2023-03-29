import { MembershipRole } from '@prisma/client'
import { makeDomainFunction } from 'domain-functions'
import { createOrganization, updateOrganization } from '~/models'
import {
  CreateOrganizationEnvironmentSchema,
  OrganizationSchema,
  UpdateOrganizationEnvironmentSchema,
} from '~/schemas'
import { db } from '~/services'

export const createOrganizationMutation = makeDomainFunction(
  OrganizationSchema,
  CreateOrganizationEnvironmentSchema
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

  return createOrganization(userId, orgName)
})

export const updateOrganizationMutation = makeDomainFunction(
  OrganizationSchema,
  UpdateOrganizationEnvironmentSchema
)(async ({ name: orgName }, { userId, orgId }) => {
  const organization = await db.organization.findUnique({
    where: { id: orgId },
  })

  if (!organization) {
    throw 'This organization does not exist'
  }

  const membership = await db.membership.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId: orgId,
      },
    },
  })

  const existedOrg = await db.organization.findFirst({
    where: {
      name: orgName,
      id: {
        not: orgId,
      },
      memberships: {
        some: {
          userId,
        },
      },
    },
  })

  if (existedOrg) {
    throw `You are members of organization with same name ${orgName}`
  }

  if (!membership) {
    throw 'You are not membership of this organization'
  }

  if (membership.role !== MembershipRole.OWNER) {
    throw 'Only organization owner can edit organization'
  }

  return updateOrganization(orgId, orgName)
})
