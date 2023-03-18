import invariant from 'tiny-invariant'

invariant(process.env.SESSION_SECRET, 'SESSION_SECRET is not set')

export const SESSION_SECRET = process.env.SESSION_SECRET
export const NODE_ENV = process.env.NODE_ENV || 'development'
