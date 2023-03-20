import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { useState } from 'react'
import type Stripe from 'stripe'
import { Button } from '~/components'
import { useStripePromise } from '~/hooks'
import { createPaymentIntent } from '~/models'

type LoaderData = {
  paymentIntent: Stripe.Response<Stripe.PaymentIntent>
}

export const loader: LoaderFunction = async ({ request }) => {
  const paymentIntent = await createPaymentIntent()

  return { paymentIntent }
}

export default function ExtendProjectsSubscription() {
  const { stripePromise } = useStripePromise()
  const { paymentIntent } = useLoaderData<LoaderData>()

  return (
    <div>
      <Elements
        stripe={stripePromise}
        options={{ clientSecret: paymentIntent.client_secret || '' }}
      >
        <SubmitForm />
      </Elements>
    </div>
  )
}

const SubmitForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setErrorMsg('')
    setIsLoading(true)

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: { return_url: 'http://localhost:3000' },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setErrorMsg(String(error.message))
    } else {
      setErrorMsg('An unexpected error occurred.')
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button disabled={!stripe}>{isLoading ? 'Submitting' : 'Submit'}</Button>
      {/* Show error message to your customers */}
      {!!errorMsg && <div>{errorMsg}</div>}
    </form>
  )
}
