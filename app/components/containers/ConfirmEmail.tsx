import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Form, useNavigation } from '@remix-run/react'
import { useMemo } from 'react'
import { ROUTES } from '~/constants'
import { Button } from '../elements'

export const ConfirmEmail = () => {
  const navigation = useNavigation()

  const isSubmitting = useMemo(
    () => navigation.state === 'loading',
    [navigation]
  )

  return (
    <div className="flex h-full items-center justify-center">
      <div className="mb-40 flex flex-col rounded-2xl bg-layer-2">
        <div className="flex flex-col items-center space-x-2.5 px-6 pt-8 text-center text-orange-400">
          <div className="flex items-center space-x-2 pb-5">
            <ExclamationCircleIcon className="h-6 w-6 flex-shrink-0" />
            <div className="text-sm font-semibold">
              Please confirm your email
            </div>
          </div>
          <div className="my-2 text-xs font-medium text-text">
            If you didn't receive an email before. Click to resend
          </div>
        </div>
        <div className="flex items-center justify-center space-x-3 px-6 pt-1 pb-8">
          <Form method="get" action={ROUTES.RESEND_CONFIRM_EMAIL}>
            <Button disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Resend'}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
