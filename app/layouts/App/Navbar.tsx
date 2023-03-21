import { Menu, Transition } from '@headlessui/react'
import {
  ArrowLeftOnRectangleIcon,
  Bars4Icon,
  BellIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { UserStatus } from '@prisma/client'
import { Form, Link, useLoaderData, useLocation } from '@remix-run/react'
import { Fragment } from 'react'
import { ROUTES } from '~/constants'
import type { AppLoaderData } from '~/types'
import { OrganizationSelect } from './OrganizationSelect'

type Props = {
  openSidebar: () => void
}

export const Navbar: React.FC<Props> = ({ openSidebar }) => {
  const { pathname } = useLocation()
  const { user } = useLoaderData<AppLoaderData>()

  return (
    <nav className="relative z-20 flex h-16 flex-1 shrink-0 items-center space-x-2 bg-layer-2 pr-4 shadow sm:pr-6">
      <div className="flex items-center space-x-2 md:hidden">
        <button
          type="button"
          onClick={openSidebar}
          className="inline-flex cursor-pointer items-center justify-center rounded-xl border-none border-transparent bg-transparent p-2.5 font-semibold text-text hover:bg-heading/5 hover:text-heading focus:bg-heading/5 focus:outline-none focus:ring-2 focus:ring-heading/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text"
        >
          <Bars4Icon className="h-6 w-6" />
        </button>
      </div>
      <div className="!ml-0 flex flex-1 items-center space-x-3">
        <div className="mobile:hidden">
          <OrganizationSelect />
        </div>
        <div className="flex-1" />
        <div className="flex items-center space-x-3">
          <button
            type="button"
            className="hidden cursor-pointer items-center justify-center rounded-xl border-none border-transparent bg-transparent p-2.5 font-semibold text-text hover:bg-heading/5 hover:text-heading focus:bg-heading/5 focus:outline-none focus:ring-2 focus:ring-heading/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text sm:flex"
          >
            <BellIcon className="h-6 w-6" />
          </button>
          <Menu as="div" className="relative">
            <Menu.Button type="button">
              <img
                src="/assets/avatars/nicholas-turner.png"
                alt="avatar"
                className="inline-block h-8 w-8 rounded-full"
              />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl bg-layer-3 py-3 shadow-xl focus:outline-none">
                {user.status === UserStatus.ACTIVE && (
                  <Menu.Item>
                    <Link to={ROUTES.PROFILE}>
                      <button
                        className={`${
                          pathname === ROUTES.PROFILE
                            ? 'bg-muted-1 text-heading'
                            : 'text-text'
                        } flex w-full cursor-pointer items-center px-4 py-2 text-sm font-semibold`}
                      >
                        <UserIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                        Profile
                      </button>
                    </Link>
                  </Menu.Item>
                )}
                <Menu.Item>
                  <Form method="get" action={ROUTES.LOGOUT}>
                    <button
                      type="submit"
                      className="flex w-full cursor-pointer items-center px-4 py-2 text-sm font-semibold text-text hover:text-heading"
                    >
                      <ArrowLeftOnRectangleIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                      Logout
                    </button>
                  </Form>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  )
}
