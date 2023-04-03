import { Queue } from 'quirrel/remix'

export const someQueue = Queue('queues/someQueue', async (job, meta) => {
  // do something
  console.log({ job })

  console.log({ meta })
})
