import type { Transaction } from '@prisma/client'
import { TransactionSchema } from '~/schemas'
import { RemixForm } from '../form'

type Props = {
  transaction?: Transaction
}

export const TransactionForm: React.FC<Props> = ({ transaction }) => {
  const isCreate = !transaction

  return (
    <div className="-mt-80 flex w-full max-w-[500px] flex-col gap-10 rounded-lg bg-layer-3 p-10 text-text mobile:p-5">
      <div className="flex flex-col gap-1">
        <span className="text-3xl">
          {isCreate ? 'Create your transaction' : 'Update your transaction'}
        </span>
      </div>
      <RemixForm
        schema={TransactionSchema}
        values={transaction}
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
              <Field name="type" label="Type" />
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
