import { stripe } from '~/services'

export const getPaymentMethodInfo = (id: string) =>
  stripe.paymentMethods.retrieve(id)
