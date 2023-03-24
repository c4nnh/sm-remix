import type { LoaderFunction } from '@remix-run/node'
import { notFound } from 'remix-utils'
import { OrganizationForm } from '~/components'
import { db } from '~/services'
import { requiredRole } from '~/utils'

export const loader: LoaderFunction = async ({ params, request }) => {
  const user = await requiredRole(request)
  const { id } = params

  const organization = await db.organization.findFirst({
    where: {
      id,
      memberships: {
        some: {
          userId: user.id,
        },
      },
    },
  })

  if (!organization) {
    throw notFound('Organization does not exist')
  }

  return { organization }
}

export default function OrganizationDetail() {
  return <OrganizationForm />
}
