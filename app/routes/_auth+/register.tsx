import type { ActionArgs, ActionFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { makeDomainFunction } from 'domain-functions'
import { AuthorizationError } from 'remix-auth'
import { performMutation } from 'remix-forms'
import { RemixForm } from '~/components'
import { FORM_STRATEGY, ROUTES } from '~/constants'
import { AuthLayout } from '~/layouts'
import { RegisterSchema } from '~/schemas'
import { authenticator } from '~/services'

export default function Register() {
  return (
    <AuthLayout>
      <RemixForm
        schema={RegisterSchema}
        buttonLabel="Register"
        pendingButtonLabel="Registering"
      >
        {({ Field, Button, Errors }) => {
          return (
            <>
              <Field name="email" />
              <Field name="name" />
              <Field name="password" type="password" />
              <Errors />
              <p className="-mb-1 mt-1 text-center text-sm text-text">
                <Link to={ROUTES.LOGIN}>
                  Already have an account?&nbsp;
                  <span className="font-semibold text-blue-400 hover:text-blue-300">
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
      context: {
        originUrl: new URL(request.url).origin,
      },
    })
  } catch (error: any) {
    if (error instanceof AuthorizationError) {
      return { errors: { password: [error.message] } }
    }
    throw error
  }
}
