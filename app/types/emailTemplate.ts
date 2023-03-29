export type ConfirmEmailTemplateModel = {
  name: string
  confirmUrl: string
}

export type ExtendSubscriptionTemplateModel = {
  serviceName: string
  name: string
  extendUrl: string
  expiredAt: string
}
