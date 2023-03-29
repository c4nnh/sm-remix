import { CronJob } from 'quirrel/remix'
import { DISPLAY_DATE_TIME_FORMAT } from '~/constants'
import { dayjs } from '~/libs'
import { db, sendAutoPayFailed, sendAutoPaySuccess, stripe } from '~/services'
import type {
  AutoPayFailedTemplateModel,
  AutoPaySuccessTemplateModel,
  PostmarkTemplateMessage,
} from '~/types'

export const action = CronJob(
  'cron-jobs/auto-pay',
  ['0 0 * * *', 'Asia/Ho_Chi_Minh'],
  async () => {
    const currentDate = dayjs().toDate()
    const yesterday = dayjs().subtract(1, 'day').toDate()

    const subscriptions = await db.subscription.findMany({
      where: {
        expiredDate: {
          lte: currentDate,
          gte: yesterday,
        },
        autoPay: true,
      },
      select: {
        membership: {
          select: {
            user: {
              select: {
                name: true,
                email: true,
                paymentCustomers: {
                  select: {
                    pspId: true,
                    paymentMethodPspId: true,
                  },
                  where: {
                    paymentMethodPspId: {
                      not: null,
                    },
                  },
                },
              },
            },
          },
        },
        subscriptionService: true,
        expiredDate: true,
        id: true,
      },
    })

    const res = await Promise.all(
      subscriptions.map(
        async ({
          subscriptionService: { id: subscriptionServiceId, price, currency },
          membership: {
            user: { paymentCustomers },
          },
          id,
        }) => {
          try {
            if (!paymentCustomers.length) {
              return [id, false]
            }

            const [paymentCustomer] = paymentCustomers

            if (!paymentCustomer.paymentMethodPspId) {
              return [id, false]
            }

            const paymentIntent = await stripe.paymentIntents.create({
              amount: +price * 100,
              currency,
              customer: paymentCustomer.pspId,
              payment_method: paymentCustomer.paymentMethodPspId,
              off_session: true,
              confirm: true,
              metadata: {
                subscriptionServiceId,
                subscriptionId: id,
              },
            })

            if (paymentIntent.status === 'succeeded') {
              return [id, true]
            }

            return [id, false]
          } catch {
            return [id, false]
          }
        }
      )
    )

    const success = res.filter(([, value]) => value).map(([id]) => id)
    const failed = res.filter(([, value]) => !value).map(([id]) => id)

    const successExtends = subscriptions.filter(item =>
      success.includes(item.id)
    )
    const failedExtends = subscriptions.filter(item => failed.includes(item.id))

    const successMessages: PostmarkTemplateMessage<AutoPaySuccessTemplateModel>[] =
      successExtends.map(
        ({
          membership: {
            user: { email, name },
          },
          expiredDate,
          subscriptionService: { name: serviceName, day, month, year },
        }) => {
          const nextExipredAt = dayjs(expiredDate)
            .add(year, 'year')
            .add(month, 'month')
            .add(day, 'day')
            .format(DISPLAY_DATE_TIME_FORMAT)

          return {
            to: email,
            template: {
              name,
              serviceName,
              nextExipredAt,
            },
          }
        }
      )

    const failedMessages: PostmarkTemplateMessage<AutoPayFailedTemplateModel>[] =
      failedExtends.map(
        ({
          membership: {
            user: { email, name },
          },
          subscriptionService: { name: serviceName },
        }) => {
          return {
            to: email,
            template: {
              name,
              serviceName,
            },
          }
        }
      )

    sendAutoPaySuccess(successMessages)
    sendAutoPayFailed(failedMessages)
  }
)
