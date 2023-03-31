import { makeDomainFunction } from 'domain-functions'
import { QUERY_KEY, ROUTES } from '~/constants'
import {
  ForgotPasswordEnvironmentSchema,
  ForgotPasswordSchema,
} from '~/schemas'
import { db, forgotPasswordToken, sendResetPassword } from '~/services'

export const forgotPasswordMutation = makeDomainFunction(
  ForgotPasswordSchema,
  ForgotPasswordEnvironmentSchema
)(async ({ email }, { originUrl }) => {
  const user = await db.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw 'This email does not exist'
  }

  const token = await forgotPasswordToken.create(
    {
      email,
    },
    {
      expiresIn: '5m',
    }
  )

  sendResetPassword({
    to: email,
    template: {
      resetUrl: `${originUrl}${ROUTES.RESET_PASSWORD}?${QUERY_KEY.TOKEN}=${token}`,
    },
  })

  return true
})
