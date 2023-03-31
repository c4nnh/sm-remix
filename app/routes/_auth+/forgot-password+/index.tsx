import type { ActionFunction, MetaFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { performMutation } from 'remix-forms'
import { RemixForm } from '~/components'
import { ROUTES } from '~/constants'
import { forgotPasswordMutation } from '~/domains'
import { ForgotPasswordSchema } from '~/schemas'

export const action: ActionFunction = async ({ request }) => {
  const result = await performMutation({
    request,
    schema: ForgotPasswordSchema,
    mutation: forgotPasswordMutation,
    environment: {
      originUrl: new URL(request.url).origin,
    },
  })

  if (!result.success) return json(result, 400)

  return redirect(ROUTES.FORGOT_PASSWORD_SUCCESS)
}

export default function ForgotPassword() {
  return (
    <RemixForm
      schema={ForgotPasswordSchema}
      buttonLabel="Send"
      pendingButtonLabel="Sending"
    >
      {({ Field, Button, Errors }) => {
        return (
          <>
            <Field name="email" placeholder="Enter your email" />
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
    title: 'Forgot password',
  }
}
