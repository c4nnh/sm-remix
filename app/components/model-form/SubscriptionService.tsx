import type { SubscriptionService } from '@prisma/client'
import { useLoaderData } from '@remix-run/react'
import { SubscriptionServiceSchema } from '~/schemas'
import { RemixForm } from '../form'

type LoaderData = {
  subscriptionService: SubscriptionService
}

export const SubscriptionServiceForm = () => {
  const { subscriptionService } = useLoaderData<LoaderData>()

  return (
    <div className="mb-96 flex w-full max-w-[500px] flex-col gap-10 rounded-lg bg-layer-3 p-10 text-text mobile:p-5">
      <div className="flex flex-col gap-1">
        <span className="text-3xl">Update subscription service</span>
      </div>
      <RemixForm
        schema={SubscriptionServiceSchema}
        values={subscriptionService}
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
