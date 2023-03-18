import {
  ArrowLeftOnRectangleIcon,
  ArrowPathIcon,
  BuildingOfficeIcon,
  CubeIcon,
  CurrencyDollarIcon,
  HandRaisedIcon,
  HomeIcon,
  UsersIcon,
  WalletIcon,
} from '@heroicons/react/24/outline'
import { UserRole, UserStatus } from '@prisma/client'
import { Form, useLoaderData, useLocation } from '@remix-run/react'
import { cx } from 'class-variance-authority'
import { LogoIcon } from '~/components'
import { ROUTES } from '~/constants'
import type { AppLoaderData } from '~/types'

export const Sidebar = () => {
  const { pathname } = useLocation()
  const { user } = useLoaderData<AppLoaderData>()

  return (
    <div className="relative z-30 flex h-full flex-col bg-layer-2 shadow">
      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Logo */}
        <div className="mt-5 flex h-8 flex-shrink-0 px-4 text-xl text-blue-500">
          <LogoIcon viewBox="0 0 32 28" />
          Self management
        </div>
        <div className="mt-5 space-y-1 px-1 sm:px-2">
          {links
            .filter(link => !link.roles || link.roles.includes(user.role))
            .map(link => {
              const Icon = link.icon

              const className = cx(
                'group relative flex items-center rounded-xl px-2 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-heading/80',
                pathname === link.href
                  ? 'bg-layer-3 text-heading'
                  : 'text-text hover:bg-layer-3 hover:text-heading'
              )

              const children = (
                <>
                  <Icon className="mr-3 h-6 w-6 flex-shrink-0" />
                  <span className="flex-1 font-semibold">{link.label}</span>
                </>
              )

              if (user.status === UserStatus.PENDING) {
                return (
                  <span
                    className={cx(className, 'hover:cursor-not-allowed')}
                    key={link.href}
                  >
                    {children}
                  </span>
                )
              }

              return (
                <a key={link.href} href={link.href} className={className}>
                  {children}
                </a>
              )
            })}
        </div>
      </div>
      <div className="mb-2 space-y-1 px-1 sm:px-2">
        <Form action={ROUTES.LOGOUT} method="get">
          <button
            type="submit"
            className="group relative flex w-full items-center rounded-xl px-2 py-2 font-medium text-text hover:bg-layer-3 hover:text-heading focus:outline-none focus:ring-2 focus:ring-heading/80"
          >
            <ArrowLeftOnRectangleIcon className="mr-3 h-6 w-6 flex-shrink-0" />
            <span className="flex flex-1 items-start font-semibold">
              Logout
            </span>
          </button>
        </Form>
      </div>
    </div>
  )
}

type LinkItem = {
  label: string
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>
  href: string
  roles?: UserRole[]
}

const links: LinkItem[] = [
  { label: 'Home', icon: HomeIcon, href: ROUTES.ROOT },
  {
    label: 'Users',
    icon: UsersIcon,
    href: ROUTES.USERS,
    roles: [UserRole.ADMIN],
  },
  {
    label: 'Currencies',
    icon: CurrencyDollarIcon,
    href: ROUTES.CURRENCIES,
    roles: [UserRole.ADMIN],
  },
  {
    label: 'Organizations',
    icon: BuildingOfficeIcon,
    href: ROUTES.ORGANIZATIONS,
    roles: [UserRole.USER],
  },
  {
    label: 'Transactions',
    icon: ArrowPathIcon,
    href: ROUTES.TRANSACTIONS,
    roles: [UserRole.USER],
  },
  {
    label: 'Tontines',
    icon: WalletIcon,
    href: ROUTES.TONTINES,
    roles: [UserRole.USER],
  },
  {
    label: 'Projects',
    icon: CubeIcon,
    href: ROUTES.PROJECTS,
    roles: [UserRole.USER],
  },
  {
    label: 'Skills',
    icon: HandRaisedIcon,
    href: ROUTES.SKILLS,
    roles: [UserRole.USER],
  },
]
