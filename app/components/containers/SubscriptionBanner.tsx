import type { SubscriptionService } from '@prisma/client'
import { useLoaderData } from '@remix-run/react'
import React from 'react'

type Props = {
  image?: string
}

type LoaderData = {
  subscriptionService: SubscriptionService
}

export const SubscriptionBanner: React.FC<Props> = ({ image }) => {
  const { subscriptionService } = useLoaderData<LoaderData>()

  return (
    <div className="flex flex-col">
      <div className="text-xl text-gray-400">{subscriptionService.name}</div>
      <div className="flex gap-2 text-3xl text-white">
        <span>{subscriptionService.price}</span>
        <span className="uppercase">{subscriptionService.currency}</span>
      </div>
      <img
        src={image}
        alt={subscriptionService.name}
        className="aspect-[2] w-full object-contain pt-5"
      />
    </div>
  )
}
