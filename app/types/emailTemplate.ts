type BaseModel = {
  name: string
}

export type PostmarkTemplateMessage<T> = {
  to: string
  template: T
}

export type ConfirmEmailTemplateModel = BaseModel & {
  confirmUrl: string
}

export type ExtendSubscriptionReminderTemplateModel = BaseModel & {
  serviceName: string
  extendUrl: string
  expiredAt: string
}

export type AutoPayReminderTemplateModel = BaseModel & {
  service: string
  extendAt: string
  amount: number
  currency: string
  nextExipredAt: string
  turnOffAutoPayUrl: string
}

export type AutoPaySuccessTemplateModel = BaseModel & {
  serviceName: string
  nextExipredAt: string
}

export type AutoPayFailedTemplateModel = BaseModel & {
  serviceName: string
}
