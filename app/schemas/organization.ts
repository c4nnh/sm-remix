import { z } from 'zod'
import { getErrorMessage } from '~/utils'

export const OrganizationSchema = z.object({
  name: z.string().trim().nonempty({
    message: getErrorMessage().notEmpty,
  }),
})
