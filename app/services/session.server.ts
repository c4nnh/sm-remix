import { createCookieSessionStorage } from '@remix-run/node'
import { SESSION_SECRET } from './env'

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    maxAge: 12 * 60 * 60,
    secrets: [SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
})

export const { getSession, commitSession, destroySession } =
  sessionStorage || {}
