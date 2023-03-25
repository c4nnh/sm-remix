import type { Organization } from '@prisma/client'
import React from 'react'
import { OrganizationSchema } from '~/schemas'
import { RemixForm } from '../form'

type Props = {
  editable?: boolean
  organization?: Organization
}

export const OrganizationForm: React.FC<Props> = ({
  editable,
  organization,
}) => {
  const isCreate = !organization

  return (
    <div className="mb-96 flex flex-col gap-10 rounded-lg bg-layer-3 p-10 text-text mobile:p-5">
      <span className="text-3xl">
        {isCreate ? 'Create your organization' : 'Update your organization'}
      </span>
      <RemixForm
        schema={OrganizationSchema}
        values={organization}
        buttonLabel={isCreate ? 'Create' : 'Update'}
        pendingButtonLabel={isCreate ? 'Creating...' : '"Updating..."'}
        readOnlyFields={!editable && !organization ? [] : ['name']}
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
