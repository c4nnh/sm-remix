import { UserRole, UserStatus } from '@prisma/client'
import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { ROUTES } from '~/constants'
import { AppLayout } from '~/layouts'
import { requiredRole } from '~/services'
import type { AuthSession } from '~/types'

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const user = (await requiredRole(request, [UserRole.USER])) as AuthSession

  if (user.status !== UserStatus.ACTIVE) {
    return redirect(ROUTES.ROOT)
  }

  return user
}

export default function Main() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}
