import type { Organization } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { notFound } from 'remix-utils'
import { RemixForm } from '~/components'
import { OrganizationSchema } from '~/schemas'
import { db } from '~/services'
import { requiredRole } from '~/utils'

type LoaderData = {
  organization: Organization
}

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
  const { organization } = useLoaderData<LoaderData>()

  return (
    <div>
      <RemixForm
        schema={OrganizationSchema}
        values={organization}
        buttonLabel="Update"
        pendingButtonLabel="Updating..."
      >
        {({ Field, Button, Errors }) => {
          return (
            <>
              <Field name="name" label="Name" />
              <Errors />
              <Button />
            </>
          )
        }}
      </RemixForm>
    </div>
  )
}
