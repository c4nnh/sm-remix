import bcrypt from 'bcryptjs'
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from 'jsonwebtoken'
import { Authenticator, AuthorizationError } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'
import invariant from 'tiny-invariant'
import { FORM_STRATEGY } from '~/constants'
import { confirmEmail, createUser, getUserByEmail } from '~/models'
import { sessionStorage } from '~/services/session.server'
import type { AuthSession } from '~/types/auth'
import { sendConfirmEmail } from '~/utils'
import { confirmEmailToken } from './token'
import { TokenStrategy } from './token/token.strategy'

export const authenticator = new Authenticator<AuthSession>(sessionStorage, {
  sessionKey: 'sessionKey',
  sessionErrorKey: 'sessionErrorKey',
  throwOnError: true,
})

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get('email')
    const password = form.get('password')

    invariant(typeof email === 'string')
    invariant(typeof password === 'string')

    const user = await getUserByEmail(email)

    if (!user) {
      throw new AuthorizationError('Email does not exist')
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      user.password || ''
    )
    if (!isPasswordMatched) {
      throw new AuthorizationError('Password is incorrect')
    }

    const { id, name, role, status } = user

    return { id, email, name, role, status }
  }),
  FORM_STRATEGY.LOGIN
)

authenticator.use(
  new FormStrategy(async ({ form, context }) => {
    const email = form.get('email')
    const name = form.get('name')
    const password = form.get('password')
    const originUrl = context?.originUrl

    invariant(typeof email === 'string')
    invariant(typeof name === 'string')
    invariant(typeof password === 'string')
    invariant(typeof originUrl === 'string')

    const existedEmail = await getUserByEmail(email)

    if (existedEmail) {
      throw new AuthorizationError('Email has already been taken')
    }

    const user = await createUser({ email, name, password })

    const { id, role, status } = user
    await sendConfirmEmail({ originUrl, email, userId: id })

    return { id, email, name, role, status }
  }),
  FORM_STRATEGY.REGISTER
)

authenticator.use(
  new TokenStrategy(async ({ token }) => {
    let authSession: AuthSession
    try {
      const payload = await confirmEmailToken.verify(token)
      const user = await confirmEmail(payload.userId)
      if (!user) {
        throw Error()
      }

      authSession = {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        status: user.status,
      }
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new AuthorizationError('error/token-invalid')
      }
      if (error instanceof TokenExpiredError) {
        throw new AuthorizationError('error/token-expired')
      }
      if (error instanceof NotBeforeError) {
        throw new AuthorizationError('error/token-not-active')
      }
      throw new AuthorizationError('error/unknown')
    }

    return authSession
  }),
  FORM_STRATEGY.CONFIRM_EMAIL
)
