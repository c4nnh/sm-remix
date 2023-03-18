import { ConfirmEmailTokenSchema } from '~/schemas'
import { Token } from './token.server'

export const confirmEmailToken = new Token(ConfirmEmailTokenSchema)
