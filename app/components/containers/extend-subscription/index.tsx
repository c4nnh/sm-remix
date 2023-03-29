import type {
  Membership,
  Subscription,
  SubscriptionService,
} from '@prisma/client'
import { Form, Link, useLoaderData, useNavigation } from '@remix-run/react'
import { Elements } from '@stripe/react-stripe-js'
import { cx } from 'class-variance-authority'
import { useEffect, useMemo, useState } from 'react'
import type Stripe from 'stripe'
import { jbcCardImage, masterCardImage, visaCardImage } from '~/assets'
import { Button } from '~/components/elements'
import { ROUTES } from '~/constants'
import { useStripePromise } from '~/hooks'
import { SubmitStripeForm } from './SubmitStripeForm'
import { SubscriptionBanner } from './SubscriptionBanner'

type Props = {
  bannerImage: string
  cancelRedirectPath: string
  returnPath: string
}

type LoaderData = {
  subscriptionService: SubscriptionService
  membership?: Membership
  subscription?: Subscription
  paymentMethod?: Stripe.Response<Stripe.PaymentMethod>
  paymentIntent?: Stripe.Response<Stripe.PaymentIntent>
}

export const ExtendSubscription: React.FC<Props> = ({
  bannerImage,
  cancelRedirectPath,
  returnPath,
}) => {
  const { stripePromise } = useStripePromise()
  const {
    paymentIntent,
    paymentMethod,
    subscriptionService,
    subscription,
    membership,
  } = useLoaderData<LoaderData>()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>()
  const navigation = useNavigation()
  const cardImages = [visaCardImage, masterCardImage, jbcCardImage]
  const [cardImageIndex, setCardImageIndex] = useState(0)

  useEffect(() => {
    const changeCardImage = setInterval(() => {
      setCardImageIndex(pre => {
        if (pre === 2) {
          return 0
        }
        return pre + 1
      })
    }, 2000)

    return () => {
      clearInterval(changeCardImage)
    }
  }, [])

  const isSubmitting = useMemo(
    () => navigation.state === 'submitting',
    [navigation]
  )

  return (
    <div className="flex rounded-2xl bg-layer-2 p-10 mobile:flex-col mobile:px-5">
      <SubscriptionBanner image={bannerImage} />
      {paymentMethod?.card ? (
        <div className="flex min-w-[250px] max-w-[300px] flex-col gap-2">
          <span>Select your card</span>
          <div
            className={cx([
              'flex items-center justify-between gap-2 rounded-lg border border-muted-3 px-2 py-1',
              'hover:cursor-pointer',
              selectedPaymentMethod === paymentMethod.id
                ? 'border-primary'
                : '',
            ])}
            onClick={() => setSelectedPaymentMethod(paymentMethod.id)}
          >
            <span>**** **** **** {paymentMethod.card?.last4}</span>
            <img
              className="aspect-[2] h-10 w-10 object-contain"
              src={cardImages[cardImageIndex]}
              alt="visa"
            />
          </div>
          {JSON.stringify(paymentIntent?.metadata)}
          <Form action={ROUTES.PAY_NOW} method="post">
            <div className="invisible h-0">
              <input name="price" value={subscriptionService.price} />
              <input name="currency" value={subscriptionService.currency} />
              <input
                name="customer"
                value={paymentMethod.customer?.toString()}
              />
              <input name="paymentMethod" value={paymentMethod.id} />
              <input
                name="subscriptionServiceId"
                value={subscriptionService.id}
              />
              <input name="subscriptionId" value={subscription?.id || ''} />
              <input
                name="membershipId"
                value={
                  membership?.id || paymentIntent?.metadata?.membershipId || ''
                }
              />
              <input name="service" value={subscriptionService.type} />
              <input name="redirectUrl" value={returnPath} />
            </div>
            <div className="mt-2 flex justify-between mobile:mt-3">
              <Link to={cancelRedirectPath}>
                <Button>Cancel</Button>
              </Link>
              <Button
                disabled={isSubmitting || !selectedPaymentMethod}
                buttonType="primary"
              >
                {isSubmitting ? 'Executing...' : 'Pay'}
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <Elements
          stripe={stripePromise}
          options={{
            locale: 'en',
            clientSecret: paymentIntent?.client_secret || '',
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
      )}
    </div>
  )
}
