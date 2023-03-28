import type { Tontine } from '@prisma/client'
import { useLoaderData } from '@remix-run/react'
import { TontineSchema } from '~/schemas'
import { RemixForm } from '../form'

type LoaderData = {
  tontine: Tontine
}

export const TontineForm = () => {
  const { tontine } = useLoaderData<LoaderData>()
  const isCreate = !tontine

  return (
    <div className="-mt-80 flex w-full max-w-[500px] flex-col gap-10 rounded-lg bg-layer-3 p-10 text-text mobile:p-5">
      <div className="flex flex-col gap-1">
        <span className="text-3xl">
          {isCreate ? 'Create your tontine' : 'Update your tontine'}
        </span>
      </div>
      <RemixForm
        schema={TontineSchema}
        values={tontine}
        buttonLabel={isCreate ? 'Create' : 'Update'}
        pendingButtonLabel={isCreate ? 'Creating...' : 'Updating...'}
      >
        {({ Field, Button, Errors }) => {
          return (
            <>
              <Field name="title" label="Title" />
              <Field name="amount" label="Amount" type="number" />
              <Field name="currency" label="Currency" />
              <Field name="date" label="Date" type="date" />
              <Field name="description" label="Description" multiline />
              <Errors />
              <Button />
            </>
          )
        }}
      </RemixForm>
    </div>
  )
}
