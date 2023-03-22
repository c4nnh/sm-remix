import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
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

async function seed() {
  await Promise.all(
    projectRolesSeed.map(item =>
      db.projectRole.upsert({
        where: { name: item.name },
        update: item,
        create: item,
      })
    )
  )
}

seed()
