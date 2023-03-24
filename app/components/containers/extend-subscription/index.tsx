import { useLoaderData } from '@remix-run/react'
import { Elements } from '@stripe/react-stripe-js'
import type Stripe from 'stripe'
import { useStripePromise } from '~/hooks'
import { SubmitStripeForm } from './SubmitStripeForm'
import { SubscriptionBanner } from './SubscriptionBanner'

type Props = {
  bannerImage: string
  cancelRedirectPath: string
  returnPath: string
}

type LoaderData = {
  paymentIntent: Stripe.Response<Stripe.PaymentIntent>
}

export const ExtendSubscription: React.FC<Props> = ({
  bannerImage,
  cancelRedirectPath,
  returnPath,
}) => {
  const { stripePromise } = useStripePromise()
  const { paymentIntent } = useLoaderData<LoaderData>()

  return (
    <div className="flex rounded-2xl bg-layer-2 p-10 mobile:flex-col mobile:px-5">
      <SubscriptionBanner image={bannerImage} />
      <Elements
        stripe={stripePromise}
        options={{
          locale: 'en',
          clientSecret: paymentIntent.client_secret || '',
          appearance: {
            rules: {
              '.Label': {
                color: 'white',
              },
            },
          },
        }}
      >
        <SubmitStripeForm
          cancelRedirectPath={cancelRedirectPath}
          returnPath={returnPath}
        />
      </Elements>
    </div>
  )
}
