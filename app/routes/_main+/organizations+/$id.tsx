import type { Organization } from '@prisma/client'
import { MembershipRole } from '@prisma/client'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { performMutation } from 'remix-forms'
import { notFound } from 'remix-utils'
import { OrganizationForm } from '~/components'
import { updateOrganizationMutation } from '~/domains'
import { OrganizationSchema } from '~/schemas'
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
    include: {
      memberships: true,
    },
  })

  if (!organization) {
    throw notFound('Organization does not exist')
  }

  const isOwner = organization.memberships.some(
    membership =>
      membership.userId === user.id && membership.role === MembershipRole.OWNER
  )

  return { organization, isOwner }
}

export const action: ActionFunction = async ({ request, params }) => {
  const user = await requiredRole(request)
  const { id: orgId } = params

  return performMutation({
    request,
    schema: OrganizationSchema,
    mutation: updateOrganizationMutation,
    environment: {
      userId: user.id,
      orgId,
    },
  })
}

type LoaderData = {
  organization: Organization
  isOwner: boolean
}

export default function OrganizationDetail() {
  const { organization, isOwner } = useLoaderData<LoaderData>()

  return (
    <OrganizationForm
      organization={organization as unknown as Organization}
      isOwner={isOwner}
    />
  )
}
