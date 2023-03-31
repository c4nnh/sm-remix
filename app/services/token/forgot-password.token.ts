import { ForgotPasswordSchema } from '~/schemas'
import { Token } from './token.server'

export const forgotPasswordToken = new Token(ForgotPasswordSchema)
