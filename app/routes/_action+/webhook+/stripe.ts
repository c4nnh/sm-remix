import type { ActionFunction } from '@remix-run/node'
import { extendSubscription } from '~/models'
import { stripe } from '~/services'
import { STRIPE_WEBHOOK_SECRET } from '~/services/env.server'
import type { PaymentIntentMetadata, WebhookEventDataObject } from '~/types'

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
    const eventDataObj = event.data
      .object as WebhookEventDataObject<PaymentIntentMetadata>
    const { metadata } = eventDataObj
    switch (event.type) {
      case 'payment_intent.succeeded':
        await extendSubscription(metadata)
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
