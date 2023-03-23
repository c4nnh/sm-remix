import { Link } from '@remix-run/react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import { Button } from '~/components/elements'

type Props = {
  returnPath: string
  cancelRedirectPath: string
}

export const SubmitStripeForm: React.FC<Props> = ({
  returnPath,
  cancelRedirectPath,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setErrorMsg('')
    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}${returnPath}`,
      },
    })

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setErrorMsg(String(error.message))
    } else {
      setErrorMsg('An unexpected error occurred.')
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <span className="text-white">Enter card information</span>
      <PaymentElement className="mt-2" />
      <div className="mt-8 flex justify-between mobile:mt-3">
        <Link to={cancelRedirectPath}>
          <Button>Cancel</Button>
        </Link>
        <Button disabled={!stripe || isLoading} buttonType="primary">
          {isLoading ? 'Submitting' : 'Submit'}
        </Button>
      </div>
      {/* Show error message to your customers */}
      {!!errorMsg && <div>{errorMsg}</div>}
    </form>
  )
}
