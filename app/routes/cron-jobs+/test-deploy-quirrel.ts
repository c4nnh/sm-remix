import { CronJob } from 'quirrel/remix'

export const action = CronJob(
  'cron-jobs/test-deploy-quirrel',
  ['* * * * *', 'Asia/Ho_Chi_Minh'],
  async () => {
    console.log('Log for test deploy quirrel')
  }
)
