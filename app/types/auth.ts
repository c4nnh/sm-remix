import type { User } from '@prisma/client'

export type AuthSession = Pick<
  User,
  'id' | 'email' | 'name' | 'role' | 'status'
>
