import { UserStatus } from '@prisma/client'
import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { ConfirmEmail } from '~/components'
import { AppLayout } from '~/layouts'
import { getActiveOrganizations } from '~/models'
import type { AppLoaderData } from '~/types'
import { requiredRole } from '~/utils'

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const user = await requiredRole(request)

  const organizations = await getActiveOrganizations(user.id)

  return { user, organizations }
}

export default function Index() {
  const { user } = useLoaderData<AppLoaderData>()

  return (
    <AppLayout>
      {user.status === UserStatus.PENDING && <ConfirmEmail />}
      <Outlet />
    </AppLayout>
  )
}
