import { UserStatus } from '@prisma/client'
import { Form, useLoaderData } from '@remix-run/react'
import { useRef } from 'react'
import { Select } from '~/components'
import { ROUTES } from '~/constants'
import type { AppLoaderData } from '~/types'

export const OrganizationSelect = () => {
  const { user, organizations } = useLoaderData<AppLoaderData>()
  const selectForm = useRef<HTMLFormElement>(null)

  const onSelectOrgChange = () => {
    if (selectForm.current) {
      selectForm.current.submit()
    }
  }

  if (user.status !== UserStatus.ACTIVE || !organizations.length) {
    return <></>
  }

  return (
    <div className="flex w-full min-w-[200px] items-center space-x-3">
      <Form
        action={ROUTES.CHANGE_ORGANIZATION}
        method="post"
        ref={selectForm}
        className="flex-1"
      >
        <Select
          name="organizationId"
          onChange={onSelectOrgChange}
          defaultValue={user.organizationId}
          className="flex-1"
          options={organizations.map(({ id, name }) => ({
            value: id,
            label: name,
          }))}
        />
      </Form>
    </div>
  )
}
