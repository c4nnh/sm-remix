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

export type AutoPayTemplateModel = {
  name: string
  service: string
  extendAt: string
  amount: number
  currency: string
  nextExipredAt: string
  turnOffAutoPayUrl: string
}
