import type { ActionArgs, ActionFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { makeDomainFunction } from 'domain-functions'
import { AuthorizationError } from 'remix-auth'
import { performMutation } from 'remix-forms'
import { RemixForm } from '~/components'
import { FORM_STRATEGY, ROUTES } from '~/constants'
import { AuthLayout } from '~/layouts'
import { RegisterSchema } from '~/schemas'
import { authenticator } from '~/services/auth.server'

export default function Register() {
  return (
    <AuthLayout>
      <RemixForm schema={RegisterSchema} buttonLabel="Register">
        {({ Field, Button, Errors }) => {
          return (
            <>
              <Field name="email" />
              <Field name="name" />
              <Field name="password" type="password" />
              <Errors />
              <p className="-mb-3 text-center text-sm text-text">
                <Link to={ROUTES.LOGIN}>
                  Already have an account?&nbsp;
                  <span className="font-semibold text-primary hover:text-primary-accent">
                    Login
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
    schema: RegisterSchema,
    mutation: makeDomainFunction(RegisterSchema)(async () => {}),
  })

  try {
    return await authenticator.authenticate(FORM_STRATEGY.REGISTER, request, {
      successRedirect: ROUTES.ROOT,
    })
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return { errors: { password: ['Invalid email or password'] } }
    }
    throw error
  }
}
