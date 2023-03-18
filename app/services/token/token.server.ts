import jwt from 'jsonwebtoken'
import invariant from 'tiny-invariant'
import type { z } from 'zod'
import { TOKEN_SECRET } from '../env.server'

export class Token<Schema extends z.Schema> {
  private schema: Schema

  constructor(schema: Schema) {
    this.schema = schema
  }

  public create(
    payload: z.infer<Schema>,
    options: jwt.SignOptions = {}
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        this.schema.parse(payload),
        TOKEN_SECRET,
        options,
        (error, token) => {
          if (error) reject(error)
          invariant(typeof token === 'string', 'token must be a string')
          resolve(token)
        }
      )
    })
  }

  public verify(
    token: string,
    options: jwt.VerifyOptions = {}
  ): Promise<z.infer<Schema>> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, TOKEN_SECRET, options, (error, payload) => {
        if (error) reject(error)
        resolve(this.schema.parse(payload))
      })
    })
  }
}
