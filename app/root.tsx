import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from '@remix-run/react'

import stylesheet from '~/styles/tailwind.generated.css'
import { ErrorLayout } from './layouts/Error'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Self management',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-screen w-screen bg-muted-1 text-text dark">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  let content

  switch (caught.status) {
    case 404:
      content = {
        title: 'The page your were looking for could not be found.',
        description:
          'It seems this page is missing. Please check the URL or go home.',
      }
      break
    case 403:
      content = {
        title: 'You are unauthorized',
        description: 'It seems you have no permission to access this page',
      }
      break
    default:
      content = {
        title: caught.statusText,
      }
  }

  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="h-screen w-screen bg-muted-1 text-text dark">
        <ErrorLayout status={caught.status} {...content} />
        <Scripts />
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="h-screen overflow-hidden bg-muted-1 text-text dark">
        <ErrorLayout title="Something went wrong" />;
        <Scripts />
      </body>
    </html>
  )
}
