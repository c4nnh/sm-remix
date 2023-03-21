import { UserRole, UserStatus } from '@prisma/client'
import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { ROUTES } from '~/constants'
import { AppLayout } from '~/layouts'
import { requiredRole } from '~/utils'

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const user = await requiredRole(request, [UserRole.ADMIN])

  if (user.status !== UserStatus.ACTIVE) {
    return redirect(ROUTES.ROOT)
  }

  return { user, organizations: [] }
}

export default function Admin() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}
