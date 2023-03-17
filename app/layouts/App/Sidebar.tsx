import {
  ArrowLeftIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { UserRole } from "@prisma/client";
import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData, useLocation } from "@remix-run/react";
import { LogoIcon } from "~/components";
import { ROUTES } from "~/constants";
import { authenticator } from "~/services/auth.server";
import type { AuthSession } from "~/types/auth";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request);
  return user;
};

export const Sidebar = () => {
  const { pathname } = useLocation();
  const user = useLoaderData<AuthSession>();

  return (
    <div className="relative z-30 flex h-full flex-col bg-layer-2 shadow">
      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Logo */}
        <div className="flex text-xl mt-5 h-8 flex-shrink-0 px-4 text-blue-500">
          <LogoIcon viewBox="0 0 32 28" />
          Self management
        </div>
        <div className="mt-5 space-y-1 px-1 sm:px-2">
          {links
            .filter((link) => !link.roles || link.roles.includes(user.role))
            .map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`${
                    pathname === link.href
                      ? "bg-layer-3 text-heading"
                      : "text-text hover:bg-layer-3 hover:text-heading"
                  } group relative flex items-center rounded-xl px-2 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-heading/80`}
                >
                  <Icon className="mr-3 h-6 w-6 flex-shrink-0" />
                  <span className="flex-1 font-semibold">{link.label}</span>
                  {/* {link.notificationCount ? (
                  <span className="ml-3 inline-block rounded-lg bg-primary py-0.5 px-2 text-sm font-semibold text-white">
                    {link.notificationCount}
                  </span>
                ) : null} */}
                </a>
              );
            })}
        </div>
      </div>
      <div className="mb-2 space-y-1 px-1 sm:px-2">
        <Form action={ROUTES.LOGOUT} method="post">
          <button
            type="submit"
            className="w-full text-text hover:bg-layer-3 hover:text-heading group relative flex items-center rounded-xl px-2 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-heading/80"
          >
            <ArrowLeftIcon className="mr-3 h-6 w-6 flex-shrink-0" />
            <span className="flex-1 flex items-start font-semibold">
              Logout
            </span>
          </button>
        </Form>
      </div>
    </div>
  );
};

type LinkItem = {
  label: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  href: string;
  roles?: UserRole[];
};

const links: LinkItem[] = [
  { label: "Home", icon: HomeIcon, href: ROUTES.ROOT },
  {
    label: "Users",
    icon: UsersIcon,
    href: ROUTES.USERS,
    roles: [UserRole.ADMIN],
  },
  {
    label: "Currencies",
    icon: UsersIcon,
    href: ROUTES.CURRENCIES,
    roles: [UserRole.ADMIN],
  },
  {
    label: "Transactions",
    icon: UsersIcon,
    href: ROUTES.TRANSACTIONS,
  },
  {
    label: "Tontines",
    icon: UsersIcon,
    href: ROUTES.TONTINES,
  },
  {
    label: "Projects",
    icon: UsersIcon,
    href: ROUTES.PROJECTS,
  },
  {
    label: "Skills",
    icon: UsersIcon,
    href: ROUTES.SKILLS,
  },
];
