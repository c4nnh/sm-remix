import type { SessionStorage } from '@remix-run/node'
import type { AuthenticateOptions } from 'remix-auth'
import { AuthorizationError, Strategy } from 'remix-auth'

export interface TokenStrategyVerifyParams {
  token: string
}

export class TokenStrategy<User> extends Strategy<
  User,
  TokenStrategyVerifyParams
> {
  name = 'token'
  async authenticate(
    request: Request,
    sessionStorage: SessionStorage,
    options: AuthenticateOptions
  ): Promise<User> {
    let user: User
    try {
      const url = new URL(request.url)
      const token = url.searchParams.get('token')
      if (!token) throw new AuthorizationError('error/no-token')
      user = await this.verify({ token })
    } catch (error) {
      let message = (error as Error).message
      return await this.failure(message, request, sessionStorage, options)
    }

    return this.success(user, request, sessionStorage, options)
  }
}
