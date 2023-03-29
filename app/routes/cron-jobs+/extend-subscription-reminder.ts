import { SubscriptionServiceType } from '@prisma/client'
import { CronJob } from 'quirrel/remix'
import { DISPLAY_DATE_TIME_FORMAT, ROUTES } from '~/constants'
import { dayjs } from '~/libs'
import { db, PRODUCT_URL, sendExtendSubscriptionReminder } from '~/services'
import type { ExtendSubscriptionTemplateModel } from '~/types'

export const action = CronJob(
  'cron-jobs/extend-subscription-reminder',
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
        subscriptionService: {
          select: {
            name: true,
            type: true,
          },
        },
        expiredDate: true,
      },
    })

    const messages: Array<{
      to: string
      template: ExtendSubscriptionTemplateModel
    }> = subscriptions.map(
      ({
        expiredDate,
        membership: {
          user: { name, email },
        },
        subscriptionService: { name: serviceName, type },
      }) => {
        const path =
          type === SubscriptionServiceType.PROJECT_MANAGEMENT
            ? ROUTES.EXTEND_PROJECTS_SUBSCRIPTION
            : ''

        return {
          to: email,
          template: {
            name,
            extendUrl: `${PRODUCT_URL}${path}`,
            serviceName,
            expiredAt: dayjs(expiredDate)
              .endOf('day')
              .format(DISPLAY_DATE_TIME_FORMAT),
          },
        }
      }
    )

    sendExtendSubscriptionReminder(messages)
  }
)
