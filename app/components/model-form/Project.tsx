import type { Project, ProjectRole, Skill } from '@prisma/client'
import { useLoaderData } from '@remix-run/react'
import { ProjectSchema } from '~/schemas'
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
    <div className="mb-96 flex w-full max-w-[500px] flex-col gap-10 rounded-lg bg-layer-3 p-10 text-text mobile:p-5">
      <div className="flex flex-col gap-1">
        <span className="text-3xl">
          {isCreate ? 'Create your project' : 'Update your project'}
        </span>
      </div>
      <RemixForm
        schema={ProjectSchema}
        values={project}
        buttonLabel={isCreate ? 'Create' : 'Update'}
        pendingButtonLabel={isCreate ? 'Creating...' : '"Updating..."'}
      >
        {({ Field, Button, Errors, register }) => {
          return (
            <>
              <Field name="name" label="Name" />
              <Field name="teamSize" label="Team size" type="number" />
              <Field name="fromDate" label="From date" type="date" />
              <Field name="toDate" label="To date" type="date" />
              <Field name="description" label="Description" multiline />
              <Field name="skillIds" label="Skills">
                {({ Label, Errors }) => (
                  <>
                    <Label />
                    <select {...register('skillIds')} multiple>
                      {skills.map(skill => (
                        <option key={skill.id} value={skill.id}>
                          {skill.name}
                        </option>
                      ))}
                    </select>
                    <Errors />
                  </>
                )}
              </Field>
              <Field
                name="roleIds"
                label="Roles in project"
                options={projectRoles.map(item => ({
                  name: item.name,
                  value: item.id,
                }))}
              />
              <Errors />
              <Button />
            </>
          )
        }}
      </RemixForm>
    </div>
  )
}
