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
    <div className="flex w-full max-w-[1000px] flex-col gap-10 rounded-lg bg-layer-3 p-10 text-text mobile:p-5">
      <div className="flex flex-col gap-1">
        <span className="text-3xl">Update subscription service</span>
      </div>
      <RemixForm
        schema={SubscriptionServiceSchema}
        values={subscriptionService}
        buttonLabel="Update"
        pendingButtonLabel="Updating..."
        readOnlyFields={['type']}
      >
        {({ Field, Button, Errors }) => {
          return (
            <>
              <div className="flex justify-between gap-x-10 mobile:flex-col">
                <div className="flex flex-1 flex-col gap-5 mobile:gap-1">
                  <Field name="name" label="Name" />
                  <Field name="type" label="Type" />
                  <Field name="price" label="Price" type="number" />
                  <Field name="currency" label="Currency" />
                </div>
                <div className="flex flex-1 flex-col gap-5 mobile:gap-1">
                  <Field name="year" label="Year" type="number" />
                  <Field name="month" label="Month" type="number" />
                  <Field name="day" label="Day" type="number" />
                  <Field name="description" label="Description" multiline />
                </div>
              </div>
              <Errors />
              <Button />
            </>
          )
        }}
      </RemixForm>
    </div>
  )
}
