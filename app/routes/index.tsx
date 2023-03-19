import { UserStatus } from '@prisma/client'
import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { ConfirmEmail, CreateOrganization } from '~/components'
import { AppLayout } from '~/layouts'
import { getOrganizations } from '~/models'
import type { AppLoaderData } from '~/types'
import { requiredRole } from '~/utils'

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const user = await requiredRole(request)

  const organizations = await getOrganizations(user.id)

  return { user, organizations }
}

export default function Index() {
  const { user, organizations } = useLoaderData<AppLoaderData>()

  const renderBody = () => {
    if (user.status === UserStatus.PENDING) {
      return <ConfirmEmail />
    }
    if (!organizations.length) {
      return <CreateOrganization />
    }
    return 'Homepage'
  }

  return (
    <AppLayout>
      {renderBody()}
      <Outlet />
    </AppLayout>
  )
}
