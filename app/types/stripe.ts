import type { SubscriptionService } from '@prisma/client'

export type StripeUpdateSubscriptionMetadata = {
  subscriptionId: string
}

export type StripeCreateSubscriptionMetadata = {
  membershipId: string
  service: SubscriptionService
}

export type PaymentIntentMetadata =
  | StripeUpdateSubscriptionMetadata
  | StripeCreateSubscriptionMetadata

export type WebhookEventDataObject<M> = {
  metadata: M
}
