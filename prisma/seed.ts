import type { Prisma } from '@prisma/client'
import { PrismaClient, SubscriptionServiceType } from '@prisma/client'
const db = new PrismaClient()

const projectRolesSeed: Prisma.ProjectRoleUncheckedCreateInput[] = [
  {
    name: 'Developer',
  },
  {
    name: 'Tester',
  },
  {
    name: 'Project manager',
  },
  {
    name: 'Designer',
  },
  {
    name: 'Business analyst',
  },
]

const subscriptionServicesSeed: Prisma.SubscriptionServiceUncheckedCreateInput[] =
  [
    {
      name: 'Project management',
      type: SubscriptionServiceType.PROJECT_MANAGEMENT,
      price: 100,
      currency: 'usd',
      month: 1,
    },
  ]

async function seed() {
  await Promise.all([
    ...projectRolesSeed.map(item =>
      db.projectRole.upsert({
        where: { name: item.name },
        update: {},
        create: item,
      })
    ),
    ...subscriptionServicesSeed.map(item =>
      db.subscriptionService.upsert({
        where: { type: item.type },
        update: {},
        create: item,
      })
    ),
  ])
}

seed()
