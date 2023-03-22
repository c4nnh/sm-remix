import type { SubscriptionService } from '@prisma/client'

export type StripeUpdateSubscriptionMetadata = {
  subscriptionId: string
}

export type StripeCreateSubscriptionMetadata = {
  membershipId: string
  service: SubscriptionService
}

export type StripePaymentIntentMetadata =
  | StripeUpdateSubscriptionMetadata
  | StripeCreateSubscriptionMetadata

export type StripeWebhookEventDataObject<M> = {
  id: string
  customer?: string
  metadata: M
}

export type StripeCustomerMetadata = {
  userId: string
}
