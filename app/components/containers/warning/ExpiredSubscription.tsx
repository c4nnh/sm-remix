import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Link } from '@remix-run/react'
import React from 'react'
import { Button } from '~/components/elements'

type Props = {
  extendLink: string
}

export const ExpiredSubscription: React.FC<Props> = ({ extendLink }) => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="mb-40 flex flex-col rounded-2xl bg-layer-2">
        <div className="flex flex-col items-center space-x-2.5 px-6 pt-8 text-center text-orange-400">
          <div className="flex items-center space-x-2 pb-5">
            <ExclamationCircleIcon className="h-6 w-6 flex-shrink-0" />
            <div className="text-sm font-semibold">
              Your subscription for this service is expired!
            </div>
          </div>
          <div className="my-2 text-xs font-medium text-text">
            Click here to extend more.
          </div>
        </div>
        <div className="flex items-center justify-center space-x-3 px-6 pt-1 pb-8">
          <Link to={extendLink}>
            <Button>Paynow</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
