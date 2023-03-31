import { Link } from '@remix-run/react'
import { Button } from '~/components'
import { ROUTES } from '~/constants'

export default function ForgotPasswordSuccess() {
  return (
    <>
      <div className="flex flex-col items-center space-x-2.5 px-6 pt-8 text-center text-green-500">
        <div className="flex items-center pb-1">
          <div className="text-sm font-semibold">
            Send request to reset password successfully!
          </div>
        </div>
        <div className="mb-2 text-xs font-medium text-text">
          Please check your email
        </div>
      </div>
      <div className="flex items-center justify-center space-x-3 px-6 pt-1 pb-8">
        <Link to={ROUTES.LOGIN}>
          <Button buttonType="primary">Back to login</Button>
        </Link>
      </div>
    </>
  )
}
