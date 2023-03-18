import type { Organization } from '@prisma/client'
import type { AuthSession } from './auth'

export type AppLoaderData = {
  user: AuthSession
  organizations: Organization[]
}
