import { CronJob } from 'quirrel/remix'
import { DISPLAY_DATE_TIME_FORMAT, ROUTES } from '~/constants'
import { dayjs } from '~/libs'
import { db, PRODUCT_URL, sendAutoPayReminder } from '~/services'
import type { AutoPayTemplateModel } from '~/types'

export const action = CronJob(
  'cron-jobs/auto-pay-reminder',
  ['* * * * *', 'Asia/Ho_Chi_Minh'],
  async () => {
    const startOfNextTwoDays = dayjs().add(2, 'days').endOf('day').toDate()
    const endOfNextTwoDays = dayjs().add(2, 'days').startOf('day').toDate()

    const subscriptions = await db.subscription.findMany({
      where: {
        expiredDate: {
          lte: startOfNextTwoDays,
          gte: endOfNextTwoDays,
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
              },
            },
          },
        },
        subscriptionService: true,
        expiredDate: true,
      },
    })

    const messages: Array<{ to: string; template: AutoPayTemplateModel }> =
      subscriptions.map(
        ({
          membership: {
            user: { email, name },
          },
          expiredDate,
          subscriptionService: {
            name: serviceName,
            price,
            currency,
            day,
            month,
            year,
          },
        }) => {
          const url = `${PRODUCT_URL}${ROUTES.AUTO_PAY}`

          const nextExipredAt = dayjs(expiredDate)
            .add(year, 'year')
            .add(month, 'month')
            .add(day, 'day')
            .format(DISPLAY_DATE_TIME_FORMAT)

          return {
            to: email,
            template: {
              name,
              turnOffAutoPayUrl: url,
              service: serviceName,
              amount: price,
              currency,
              extendAt: dayjs(expiredDate)
                .endOf('day')
                .format(DISPLAY_DATE_TIME_FORMAT),
              nextExipredAt,
            },
          }
        }
      )

    sendAutoPayReminder(messages)
  }
)
