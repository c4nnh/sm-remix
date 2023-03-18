import { prisma } from '~/services'

export const getOrganizations = (userId: string) =>
  prisma.organization.findMany({
    where: {
      memberships: {
        some: {
          userId,
        },
      },
    },
  })
