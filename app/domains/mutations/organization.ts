import { makeDomainFunction } from 'domain-functions'
import { createOrganization } from '~/models'
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

  return createOrganization(userId, orgName)
})
