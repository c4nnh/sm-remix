import { json } from '@remix-run/node'

export const action = async () => {
  console.log('Log for test qstash')

  return json('ok', 200)
}
