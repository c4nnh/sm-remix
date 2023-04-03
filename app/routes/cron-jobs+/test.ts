import { CronJob } from 'quirrel/remix'

export const action = CronJob(
  'cron-jobs/test',
  ['* * * * *', 'Asia/Ho_Chi_Minh'],
  async () => {
    console.log(111)
  }
)
