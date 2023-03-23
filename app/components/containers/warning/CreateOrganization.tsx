import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Link } from '@remix-run/react'
import { ROUTES } from '~/constants'
import { Button } from '../../elements'

export const CreateOrganization = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="mb-40 flex flex-col rounded-2xl bg-layer-2">
        <div className="flex flex-col items-center space-x-2.5 px-6 pt-8 text-center text-orange-400">
          <div className="flex items-center space-x-2 pb-5">
            <ExclamationCircleIcon className="h-6 w-6 flex-shrink-0" />
            <div className="text-sm font-semibold">
              Create your own organization
            </div>
          </div>
          <div className="my-2 text-xs font-medium text-text">
            You need to create organization first to use other features.
            <br />
            Click here to create your organization
          </div>
        </div>
        <div className="flex items-center justify-center space-x-3 px-6 pt-1 pb-8">
          <Link to={ROUTES.CREATE_ORGANIZATION}>
            <Button buttonType="primary">Create</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
