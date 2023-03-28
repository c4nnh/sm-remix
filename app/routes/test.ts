import { CronJob } from 'quirrel/remix'

export const action = CronJob(
  'test',
  ['* * * * *', 'Asia/Ho_Chi_Minh'],
  async () => {
    console.log(1)
  }
)
