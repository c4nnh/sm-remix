import type { Skill } from '@prisma/client'
import { SkillSchema } from '~/schemas'
import { RemixForm } from '../form'

type Props = {
  skill?: Skill
}

export const SkillForm: React.FC<Props> = ({ skill }) => {
  const isCreate = !skill

  return (
    <div className="mb-96 flex w-full max-w-[500px] flex-col gap-10 rounded-lg bg-layer-3 p-10 text-text mobile:p-5">
      <div className="flex flex-col gap-1">
        <span className="text-3xl">
          {isCreate ? 'Create your skill' : 'Update your skill'}
        </span>
      </div>
      <RemixForm
        schema={SkillSchema}
        values={skill}
        buttonLabel={isCreate ? 'Create' : 'Update'}
        pendingButtonLabel={isCreate ? 'Creating...' : 'Updating...'}
      >
        {({ Field, Button, Errors }) => {
          return (
            <>
              <Field name="name" label="Name" />
              <Field name="yoe" label="Year of experience" type="number" />
              <Field name="isMain">
                {({ Label, SmartInput }) => (
                  <div className="flex items-center gap-2">
                    <SmartInput />
                    <Label>Is main skill</Label>
                  </div>
                )}
              </Field>
              <Errors />
              <Button />
            </>
          )
        }}
      </RemixForm>
    </div>
  )
}
