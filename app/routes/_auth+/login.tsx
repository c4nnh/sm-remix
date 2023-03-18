import type { ActionArgs, ActionFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { makeDomainFunction } from 'domain-functions'
import { AuthorizationError } from 'remix-auth'
import { performMutation } from 'remix-forms'
import { RemixForm } from '~/components'
import { FORM_STRATEGY, ROUTES } from '~/constants'
import { AuthLayout } from '~/layouts'
import { LoginSchema } from '~/schemas'
import { authenticator } from '~/services'

export default function Login() {
  return (
    <AuthLayout>
      <RemixForm schema={LoginSchema} buttonLabel="Login">
        {({ Field, Button, Errors }) => {
          return (
            <>
              <Field name="email" />
              <Field name="password" type="password" />
              <Errors />
              <p className="-mb-3 text-center text-sm text-text">
                No account?&nbsp;
                <Link to={ROUTES.REGISTER}>
                  <span className="font-semibold text-primary hover:text-primary-accent">
                    Register
                  </span>
                </Link>
              </p>
              <Button />
            </>
          )
        }}
      </RemixForm>
    </AuthLayout>
  )
}

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  await performMutation({
    request,
    schema: LoginSchema,
    mutation: makeDomainFunction(LoginSchema)(async () => {}),
  })

  try {
    return authenticator.authenticate(FORM_STRATEGY.LOGIN, request, {
      successRedirect: ROUTES.ROOT,
    })
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return { errors: { password: ['Invalid email or password'] } }
    }
    throw error
  }
}
