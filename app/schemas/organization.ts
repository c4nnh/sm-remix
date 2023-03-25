import { z } from 'zod'
import { getErrorMessage } from '~/utils'

export const OrganizationSchema = z.object({
  name: z.string().trim().nonempty({
    message: getErrorMessage().notEmpty,
  }),
})

export const CreateOrganizationEnvironmentSchema = z.object({
  userId: z.string(),
})

export const UpdateOrganizationEnvironmentSchema = z.intersection(
  CreateOrganizationEnvironmentSchema,
  z.object({
    orgId: z.string(),
  })
)
