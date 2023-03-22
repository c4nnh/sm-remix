import { PspType } from '@prisma/client'
import type { ActionFunction } from '@remix-run/node'
import {
  createPaymentCustomer,
  extendSubscription,
  updatePaymentCustomer,
} from '~/models'
import { stripe } from '~/services'
import { STRIPE_WEBHOOK_SECRET } from '~/services/env.server'
import type {
  StripeCustomerMetadata,
  StripePaymentIntentMetadata,
  StripeWebhookEventDataObject,
} from '~/types'

export const action: ActionFunction = async ({ request }) => {
  const sig = request.headers.get('stripe-signature')

  if (!sig) {
    return false
  }

  try {
    const body = await request.text()
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      STRIPE_WEBHOOK_SECRET
    )

    const eventDataObj = event.data.object as StripeWebhookEventDataObject<
      StripePaymentIntentMetadata | StripeCustomerMetadata
    >
    const { metadata } = eventDataObj
    switch (event.type) {
      case 'payment_intent.succeeded':
        await extendSubscription(metadata as StripePaymentIntentMetadata)
        break
      case 'customer.created':
        const { id: customerId } = eventDataObj
        const userId = (metadata as StripeCustomerMetadata).userId
        if (!customerId || !userId) break
        await createPaymentCustomer({
          pspId: customerId,
          pspType: PspType.STRIPE,
          userId,
        })
        break
      case 'payment_method.attached':
        const { id: paymentMethodPspId, customer: pspId } = eventDataObj
        if (!pspId || !paymentMethodPspId) break
        await updatePaymentCustomer({
          where: { pspId },
          data: { paymentMethodPspId },
        })
        break
      default:
        return true
    }
    return true
  } catch (e) {
    console.log(`Stripe webhook: ${e}`)
    return false
  }
}
