import type { Project, ProjectRole, Skill } from '@prisma/client'
import { useLoaderData } from '@remix-run/react'
import { DATA_DATE_FORMAT } from '~/constants'
import { dayjs } from '~/libs'
import { ProjectDetailSchema } from '~/schemas'
import { Input, MultiSelect } from '../elements'
import { RemixForm } from '../form'

type LoaderData = {
  project?: Project
  skills: Skill[]
  projectRoles: ProjectRole[]
}

export const ProjectForm = () => {
  const { project, skills, projectRoles } = useLoaderData<LoaderData>()
  const isCreate = !project

  return (
    <div className="flex w-full max-w-[500px] flex-col gap-10 rounded-lg bg-layer-3 p-10 text-text mobile:p-5">
      <div className="flex flex-col gap-1">
        <span className="text-3xl">
          {isCreate ? 'Create your project' : 'Update your project'}
        </span>
      </div>

      <RemixForm
        schema={ProjectDetailSchema}
        values={project}
        buttonLabel={isCreate ? 'Create' : 'Update'}
        pendingButtonLabel={isCreate ? 'Creating...' : 'Updating...'}
      >
        {({ Field, Button, Errors, watch, getValues, setValue, register }) => {
          return (
            <>
              <Field name="name" label="Name" />
              <Field name="teamSize" label="Team size" type="number" />
              <Field name="fromDate" label="From date">
                {({ Label, Errors }) => (
                  <>
                    <Label />
                    <Input
                      type="date"
                      value={dayjs(
                        watch('fromDate') || project?.fromDate
                      ).format(DATA_DATE_FORMAT)}
                      onChange={e =>
                        setValue('fromDate', e.target.value as unknown as Date)
                      }
                    />
                    <Errors />
                  </>
                )}
              </Field>
              <Field name="toDate" label="To date">
                {({ Label, Errors }) => (
                  <>
                    <Label />
                    <Input
                      type="date"
                      value={dayjs(watch('toDate') || project?.toDate).format(
                        DATA_DATE_FORMAT
                      )}
                      onChange={e =>
                        setValue('toDate', e.target.value as unknown as Date)
                      }
                    />
                    <Errors />
                  </>
                )}
              </Field>
              <Field name="description" label="Description" multiline />
              <MultiSelect
                label="Skills in project"
                options={skills.map(item => ({
                  label: item.name,
                  value: item.id,
                }))}
                values={getValues('skillIds') || []}
                onChange={values => {
                  setValue('skillIds', values)
                }}
              />
              <Field name="skillIds">
                {({ SmartInput, Errors }) => (
                  <>
                    <Errors className="!-mt-2" />
                    <SmartInput className="hidden" />
                  </>
                )}
              </Field>
              <MultiSelect
                label="Roles in project"
                options={projectRoles.map(item => ({
                  label: item.name,
                  value: item.id,
                }))}
                values={getValues('roleIds') || []}
                onChange={values => {
                  setValue('roleIds', values)
                }}
              />
              <Field name="roleIds">
                {({ SmartInput, Errors }) => (
                  <>
                    <Errors className="!-mt-2" />
                    <SmartInput className="hidden" />
                  </>
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
