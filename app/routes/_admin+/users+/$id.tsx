import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import type { Prisma, User } from '@prisma/client'
import { UserStatus } from '@prisma/client'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { Form, useLoaderData, useNavigation } from '@remix-run/react'
import { useMemo } from 'react'
import { notFound } from 'remix-utils'
import { Button } from '~/components'
import { db } from '~/services'

type LoaderData = {
  user: User
}

const userSelect: Prisma.UserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  status: true,
  createdAt: true,
}

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params

  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: userSelect,
  })

  if (!user) {
    throw notFound('User does not exist')
  }

  return { user }
}

export const action: ActionFunction = async ({ params }) => {
  const { id } = params

  const existUser = await db.user.findUnique({ where: { id } })

  if (!existUser) {
    throw notFound('User does not exist')
  }

  const user = await db.user.update({
    where: { id },
    data: { status: UserStatus.ACTIVE },
    select: userSelect,
  })

  return { user }
}

export default function UserDetail() {
  const navigation = useNavigation()
  const { user } = useLoaderData<LoaderData>()

  const isSubmitting = useMemo(
    () => navigation.state === 'submitting',
    [navigation]
  )

  return (
    <div className="flex flex-col gap-5 rounded-xl bg-layer-3 p-10 text-white">
      <span className="text-3xl font-semibold">Name: {user.name}</span>
      <span className="font-semibold">Email: {user.email}</span>
      <span className="font-semibold">Role: {user.role}</span>
      <div className="flex items-center gap-2">
        Active:
        {user.status === UserStatus.ACTIVE ? (
          <CheckCircleIcon className="h-6 w-6 text-green-500" />
        ) : (
          <XMarkIcon className="h-6 w-6 text-text" />
        )}
      </div>
      {user.status !== UserStatus.ACTIVE && (
        <Form className="flex w-full justify-center pt-5" method="post">
          <Button type="submit" disabled={isSubmitting} buttonType="success">
            {isSubmitting ? 'Activating' : 'Active'}
          </Button>
        </Form>
      )}
    </div>
  )
}
