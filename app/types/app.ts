import type { Organization, Subscription } from '@prisma/client'
import type { AuthSession } from './auth'

export type AppLoaderData = {
  user: AuthSession
  organizations: Organization[]
  subscriptions: Subscription[]
}
