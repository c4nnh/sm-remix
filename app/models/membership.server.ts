import { db } from '~/services'

export const getMembershipByUserAndOrg = async (
  userId: string,
  organizationId: string
) =>
  db.membership.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId,
      },
    },
  })
