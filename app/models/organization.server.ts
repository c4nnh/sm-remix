import { MembershipStatus } from '@prisma/client'
import { prisma } from '~/services'

export const getActiveOrganizations = (userId: string) =>
  prisma.organization.findMany({
    where: {
      memberships: {
        some: {
          userId,
          status: MembershipStatus.ACTIVE,
        },
      },
    },
  })
