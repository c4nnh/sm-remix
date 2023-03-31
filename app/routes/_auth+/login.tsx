import type { ActionArgs, ActionFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { makeDomainFunction } from 'domain-functions'
import { AuthorizationError } from 'remix-auth'
import { performMutation } from 'remix-forms'
import { RemixForm } from '~/components'
import { FORM_STRATEGY, ROUTES } from '~/constants'
import { LoginSchema } from '~/schemas'
import { authenticator } from '~/services'

export default function Login() {
  return (
    <RemixForm
      schema={LoginSchema}
      buttonLabel="Login"
      pendingButtonLabel="Logining"
    >
      {({ Field, Button, Errors }) => {
        return (
          <>
            <Field name="email" placeholder="Enter your email" />
            <Field
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            <Errors />
            <p className="-mb-1 mt-1 text-center text-sm text-text">
              No account?&nbsp;
              <Link to={ROUTES.REGISTER}>
                <span className="font-semibold text-blue-400 hover:text-blue-300">
                  Register
                </span>
              </Link>
            </p>
            <Button />
            <Link to={ROUTES.FORGOT_PASSWORD} className="text-center">
              <span className="text-xs font-semibold text-blue-400 hover:text-blue-300">
                Forgot your password?
              </span>
            </Link>
          </>
        )
      }}
    </RemixForm>
  )
}

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  await performMutation({
    request,
    schema: LoginSchema,
    mutation: makeDomainFunction(LoginSchema)(async () => {}),
  })

  try {
    return await authenticator.authenticate(FORM_STRATEGY.LOGIN, request, {
      successRedirect: ROUTES.ROOT,
    })
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return { errors: { password: ['Invalid email or password'] } }
    }
    throw error
  }
}
