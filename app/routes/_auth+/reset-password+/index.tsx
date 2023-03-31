import type { ActionFunction, MetaFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { performMutation } from 'remix-forms'
import { RemixForm } from '~/components'
import { QUERY_KEY, ROUTES } from '~/constants'
import { resetPasswordMutation } from '~/domains'
import { ResetPasswordSchema } from '~/schemas'

export const action: ActionFunction = async ({ request, params }) => {
  const url = new URL(request.url)
  const token = url.searchParams.get(QUERY_KEY.TOKEN) || ''

  const result = await performMutation({
    request,
    schema: ResetPasswordSchema,
    mutation: resetPasswordMutation,
    environment: {
      token,
    },
  })

  if (!result.success) return json(result, 400)

  return redirect(ROUTES.RESET_PASSWORD_SUCCESS)
}

export default function ResetPassword() {
  return (
    <RemixForm
      schema={ResetPasswordSchema}
      buttonLabel="Reset"
      pendingButtonLabel="Resetting"
    >
      {({ Field, Button, Errors }) => {
        return (
          <>
            <Field
              name="newPassword"
              type="password"
              placeholder="Enter your new password"
            />
            <Errors />
            <Button />
            <Link to={ROUTES.LOGIN} className="mt-2 text-center">
              <span className="text-sm font-semibold text-blue-400 hover:text-blue-300">
                Back to login
              </span>
            </Link>
          </>
        )
      }}
    </RemixForm>
  )
}

export const meta: MetaFunction = () => {
  return {
    title: 'Reset password',
  }
}
