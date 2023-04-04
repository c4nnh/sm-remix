import type { LoaderFunction } from '@remix-run/node'

export const loader: LoaderFunction = async () => {
  console.log('Cron job on vercel')
}
