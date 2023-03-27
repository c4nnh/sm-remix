import type { Organization, Subscription } from '@prisma/client'
import type { AuthSession } from './auth'

export type AppLoaderData = {
  user: AuthSession
  organizations: Organization[]
  subscriptions: Subscription[]
}

export type ListLoaderData<T, Name extends string> = {
  [key in Name]: T[]
} & {
  totalItems: number
}

export type SelectOption = {
  value: string
  label: string
}
