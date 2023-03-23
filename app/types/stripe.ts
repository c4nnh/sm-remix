type BaseStripeSubscriptionMetadata = {
  subscriptionServiceId: string
}

export type StripeUpdateSubscriptionMetadata =
  BaseStripeSubscriptionMetadata & {
    subscriptionId: string
  }

export type StripeCreateSubscriptionMetadata =
  BaseStripeSubscriptionMetadata & {
    membershipId: string
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
