import bcrypt from 'bcryptjs'
import { makeDomainFunction } from 'domain-functions'
import { ResetPasswordEnvironmentSchema, ResetPasswordSchema } from '~/schemas'
import { db, forgotPasswordToken } from '~/services'

export const resetPasswordMutation = makeDomainFunction(
  ResetPasswordSchema,
  ResetPasswordEnvironmentSchema
)(async ({ newPassword }, { token }) => {
  try {
    const { email } = await forgotPasswordToken.verify(token)

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await db.user.update({
      data: { password: hashedPassword },
      where: { email },
    })

    return true
  } catch {
    throw 'Token is invalid'
  }
})
