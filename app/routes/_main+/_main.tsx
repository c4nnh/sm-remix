import { UserRole, UserStatus } from '@prisma/client'
import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { ROUTES } from '~/constants'
import { AppLayout } from '~/layouts'
import { getOrganizations } from '~/models'
import { requiredRole } from '~/utils'

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const user = await requiredRole(request, [UserRole.USER])

  if (user.status !== UserStatus.ACTIVE) {
    return redirect(ROUTES.ROOT)
  }

  const organizations = await getOrganizations(user.id)

  const pathname = new URL(request.url).pathname

  if (!organizations.length && !pathname.includes(ROUTES.ORGANIZATIONS)) {
    return redirect(ROUTES.ROOT)
  }

  return { user, organizations }
}

export default function Main() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}
