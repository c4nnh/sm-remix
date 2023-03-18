import type { UserRole } from '@prisma/client'
import { redirect } from '@remix-run/node'
import bcrypt from 'bcryptjs'
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from 'jsonwebtoken'
import { Authenticator, AuthorizationError } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'
import { forbidden } from 'remix-utils'
import invariant from 'tiny-invariant'
import { FORM_STRATEGY, ROUTES } from '~/constants'
import { confirmEmail, createUser, getUserByEmail } from '~/models'
import { confirmEmailToken, sessionStorage } from '~/services'
import type { AuthSession } from '~/types'
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
  new FormStrategy(async ({ form }) => {
    const email = form.get('email')
    const name = form.get('name')
    const password = form.get('password')

    invariant(typeof email === 'string')
    invariant(typeof name === 'string')
    invariant(typeof password === 'string')

    const existedEmail = await getUserByEmail(email)

    if (existedEmail) {
      throw new AuthorizationError('Email has already been taken')
    }

    const user = await createUser({ email, name, password })

    const { id, role, status } = user

    return { id, email, name, role, status }
  }),
  FORM_STRATEGY.REGISTER
)

authenticator.use(
  new TokenStrategy(async ({ token }) => {
    let user: AuthSession

    try {
      const { userId } = await confirmEmailToken.verify(token)
      user = await confirmEmail(userId)
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

    return user
  }),
  FORM_STRATEGY.CONFIRM_EMAIL
)

export const requiredRole = async (request: Request, roles?: UserRole[]) => {
  const user = await authenticator.isAuthenticated(request)

  if (!user) {
    return redirect(ROUTES.LOGIN)
  }

  if (roles && roles.length && !roles.includes(user.role)) {
    throw forbidden('You have no permission')
  }

  return user
}
