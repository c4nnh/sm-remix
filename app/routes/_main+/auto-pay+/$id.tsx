import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import type { Subscription, SubscriptionService } from '@prisma/client'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Form, useLoaderData, useNavigation } from '@remix-run/react'
import { useMemo } from 'react'
import { forbidden, notFound } from 'remix-utils'
import { Button } from '~/components'
import { DISPLAY_DATE_TIME_FORMAT, ROUTES } from '~/constants'
import { dayjs } from '~/libs'
import { db } from '~/services'
import { getCurrentMembership, renderYearMonthDay } from '~/utils'

type Model = Subscription & {
  subscriptionService: Pick<
    SubscriptionService,
    'name' | 'price' | 'currency' | 'year' | 'month' | 'day'
  >
}

type LoaderData = {
  subscription: Model
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const membership = await getCurrentMembership(request)
  const { id } = params

  const subscription = await db.subscription.findUnique({
    where: {
      id,
    },
    include: {
      subscriptionService: {
        select: {
          name: true,
          price: true,
          currency: true,
          year: true,
          month: true,
          day: true,
        },
      },
    },
  })

  if (!subscription) {
    throw notFound('Subscription does not exist')
  }

  if (subscription.membershipId !== membership.id) {
    throw forbidden('This subscription does not belong to you')
  }

  return { subscription }
}

export const action: ActionFunction = async ({ request, params }) => {
  const membership = await getCurrentMembership(request)
  const { id } = params

  const url = new URL(request.url)
  const autoPay = (url.searchParams.get('autoPay') || '').trim() === 'true'

  const subscription = await db.subscription.findUnique({
    where: {
      id,
    },
  })

  if (!subscription) {
    throw notFound('Subscription does not exist')
  }

  if (subscription.membershipId !== membership.id) {
    throw forbidden('This subscription does not belong to you')
  }

  await db.subscription.update({
    where: { id },
    data: { autoPay },
    include: {
      subscriptionService: {
        select: {
          name: true,
          price: true,
          currency: true,
          year: true,
          month: true,
          day: true,
        },
      },
    },
  })

  return redirect(`${ROUTES.AUTO_PAY}/${id}`)
}

export default function SubscriptionDetail() {
  const navigation = useNavigation()
  const {
    subscription: { subscriptionService, ...subscriptionData },
  } = useLoaderData<LoaderData>()

  const isSubmitting = useMemo(
    () => navigation.state === 'submitting',
    [navigation]
  )

  return (
    <div className="flex flex-col gap-5 rounded-xl bg-layer-3 p-10 text-white">
      <span className="w-full text-center text-3xl font-semibold">
        {subscriptionService.name}
      </span>
      <span>
        Expired at:{' '}
        {dayjs(subscriptionData.expiredDate)
          .endOf('day')
          .format(DISPLAY_DATE_TIME_FORMAT)}
      </span>
      <span>Price: {subscriptionService.price}</span>
      <span>
        Duration:{' '}
        {renderYearMonthDay(
          subscriptionService.year,
          subscriptionService.month,
          subscriptionService.day
        )}
      </span>
      <div className="flex items-center gap-2">
        Auto pay:{' '}
        {subscriptionData.autoPay ? (
          <CheckCircleIcon className="h-6 w-6 text-green-500" />
        ) : (
          <XMarkIcon className="h-6 w-6 text-text" />
        )}
      </div>
      <Form
        className="flex w-full justify-center pt-5"
        action={`${ROUTES.AUTO_PAY}/${subscriptionData.id}?autoPay=${
          subscriptionData.autoPay ? 'false' : 'true'
        }`}
        method="post"
      >
        <Button
          type="submit"
          disabled={isSubmitting}
          buttonType={subscriptionData.autoPay ? 'danger' : 'primary'}
        >
          {isSubmitting
            ? 'Executing'
            : subscriptionData.autoPay
            ? 'Turn off auto pay'
            : 'Turn on auto pay'}
        </Button>
      </Form>
    </div>
  )
}
