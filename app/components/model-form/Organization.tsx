import type { Organization } from '@prisma/client'
import React from 'react'
import { OrganizationSchema } from '~/schemas'
import { RemixForm } from '../form'

type Props = {
  isOwner?: boolean
  organization?: Organization
}

export const OrganizationForm: React.FC<Props> = ({
  isOwner,
  organization,
}) => {
  const isCreate = !organization
  const isEdiable = isCreate || isOwner

  return (
    <div className="-mt-80 flex w-full max-w-[500px] flex-col gap-10 rounded-lg bg-layer-3 p-10 text-text mobile:p-5">
      <div className="flex flex-col gap-1">
        <span className="text-3xl">
          {isCreate ? 'Create your organization' : 'Update your organization'}
        </span>
        {!isEdiable && (
          <span className="text-xs text-orange-400">
            You can not edit this organization because you are not owner
          </span>
        )}
      </div>
      <RemixForm
        schema={OrganizationSchema}
        values={organization}
        buttonLabel={isCreate ? 'Create' : 'Update'}
        pendingButtonLabel={isCreate ? 'Creating...' : 'Updating...'}
        readOnlyFields={isEdiable ? [] : ['name']}
      >
        {({ Field, Button, Errors }) => {
          return (
            <>
              <Field name="name" label="Name" />
              <Errors />
              {isEdiable && <Button />}
            </>
          )
        }}
      </RemixForm>
    </div>
  )
}
