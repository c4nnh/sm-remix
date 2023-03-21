import { SubscriptionService, UserRole, UserStatus } from '@prisma/client'
import type { LoaderArgs, LoaderFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import {
  organizationImage,
  projectImage,
  skillImage,
  tontineImage,
  transactionImage,
  userImage,
} from '~/assets'
import { ConfirmEmail, CreateOrganization, FeatureCard } from '~/components'
import { ROUTES } from '~/constants'
import { AppLayout } from '~/layouts'
import { getOrganizations } from '~/models'
import type { AppLoaderData } from '~/types'
import { requiredRole } from '~/utils'

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const user = await requiredRole(request)

  const organizations = await getOrganizations(user.id)

  return {
    user,
    organizations,
  }
}

export default function Index() {
  const { user, organizations } = useLoaderData<AppLoaderData>()

  const renderBody = () => {
    if (user.status === UserStatus.PENDING) {
      return <ConfirmEmail />
    }
    if (user.role !== UserRole.ADMIN && !organizations.length) {
      return <CreateOrganization />
    }
    return <HomepageBody />
  }

  return (
    <AppLayout>
      {renderBody()}
      <Outlet />
    </AppLayout>
  )
}

type Card = {
  name: string
  description: string
  image: string
  link: string
  roles?: UserRole[]
  subscriptionService?: SubscriptionService
}

const HomepageBody = () => {
  const { user } = useLoaderData<AppLoaderData>()

  const cards: Card[] = [
    {
      name: 'Organization',
      description: 'Manage your organizations',
      image: organizationImage,
      link: ROUTES.ORGANIZATIONS,
    },
    {
      name: 'Transaction',
      description: 'Manage your transactions',
      link: ROUTES.TRANSACTIONS,
      image: transactionImage,
    },
    {
      name: 'Tontine',
      description: 'Manage your tontines',
      link: ROUTES.TONTINES,
      image: tontineImage,
    },
    {
      name: 'Project',
      description: 'Manage your projects',
      link: ROUTES.PROJECTS,
      image: projectImage,
      subscriptionService: SubscriptionService.PROJECT_MANAGEMENT,
    },
    {
      name: 'Skill',
      description: 'Manage your skills',
      link: ROUTES.SKILLS,
      image: skillImage,
      subscriptionService: SubscriptionService.PROJECT_MANAGEMENT,
    },
    {
      name: 'User',
      description: 'Manage users',
      link: ROUTES.USERS,
      image: userImage,
      roles: [UserRole.ADMIN],
    },
  ]

  return (
    <div className="flex h-full w-full flex-col items-center gap-5 pt-10 mobile:gap-1 mobile:pt-2">
      <div className="text-6xl text-white mobile:text-3xl">
        WELCOME TO SELF MANAGEMENT APP
      </div>
      <div className="text-3xl text-text mobile:text-base">
        What do you want to manage?
      </div>
      <div
        className="grid w-full gap-32 gap-y-20 px-10 pt-10 mobile:gap-y-4"
        style={{
          gridTemplateColumns:
            'repeat(auto-fill, minmax(calc(5% + 175px), 1fr))',
        }}
      >
        {cards
          .filter(card => !card.roles || card.roles.includes(user.role))
          .map(card => (
            <FeatureCard key={card.name} {...card} />
          ))}
      </div>
    </div>
  )
}
