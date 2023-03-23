import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { Link } from '@remix-run/react'
import { Button } from '~/components/elements'

type Props = {
  redirectPath: string
}

export const SubscriptionSuccess: React.FC<Props> = ({ redirectPath }) => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="mb-40 flex flex-col rounded-2xl bg-layer-2">
        <div className="flex flex-col items-center space-x-2.5 px-6 pt-8 text-center text-green-500">
          <div className="flex items-center space-x-2 pb-1">
            <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
            <div className="text-sm font-semibold">
              Extend subscription successful!
            </div>
          </div>
          <div className="mb-2 text-xs font-medium text-text">
            Click here to go back to list page. If there is no change. Please
            wait some minutes or contact with admin
          </div>
        </div>
        <div className="flex items-center justify-center space-x-3 px-6 pt-1 pb-8">
          <Link to={redirectPath}>
            <Button buttonType="primary">Back to list</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
