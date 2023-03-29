import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from '@remix-run/react'
import { STRIPE_PUBLIC_KEY } from '~/services'
import globalStylesheet from '~/styles/global.css'
import stylesheet from '~/styles/tailwind.generated.css'
import { ErrorLayout } from './layouts/Error'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  { rel: 'stylesheet', href: globalStylesheet },
]

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Self management',
  viewport: 'width=device-width,initial-scale=1',
})

type LoaderData = {
  ENV: {
    STRIPE_PUBLIC_KEY: string
  }
}

export const loader: LoaderFunction = () => {
  return {
    ENV: {
      STRIPE_PUBLIC_KEY,
    },
  }
}

export default function App() {
  const data = useLoaderData<LoaderData>()

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-screen w-screen bg-muted-2 text-text dark">
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
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
