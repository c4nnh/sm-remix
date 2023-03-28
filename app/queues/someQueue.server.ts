import { Queue } from 'quirrel/remix'

export default Queue('queues/someQueue', async (job, meta) => {
  console.log(1)
})
