import { UserStatus } from '@prisma/client'
import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { ConfirmEmail } from '~/components'
import { AppLayout } from '~/layouts'
import { requiredRole } from '~/services'
import type { AuthSession } from '~/types'

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  return requiredRole(request)
}

export default function Index() {
  const user = useLoaderData<AuthSession>()

  return (
    <AppLayout>
      {user.status === UserStatus.PENDING && <ConfirmEmail />}
      <Outlet />
    </AppLayout>
  )
}
