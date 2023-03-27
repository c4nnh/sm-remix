import { z } from 'zod'
import { dayjs } from '~/libs'
import { getErrorMessage } from '~/utils'

export const ProjectSchema = z.object({
  name: z.string().trim().nonempty({
    message: getErrorMessage().notEmpty,
  }),
  teamSize: z.number().min(1, getErrorMessage({ min: 1 }).min),
  fromDate: z
    .date()
    .default(dayjs().toDate())
    .refine(value => {
      return dayjs(value).isSame(dayjs()) || dayjs(value).isBefore(dayjs())
    }, 'From date must be before or equal today'),
  toDate: z.date().optional(),
  description: z.optional(z.string().trim()),
  roleIds: z.string().transform(value => value.split(',')),
  skillIds: z.string().transform(value => value.split(',')),
})

export const CreateProjectEnvironmentSchema = z.object({
  membershipId: z.string(),
})

export const UpdateProjectEnvironmentSchema = z.intersection(
  CreateProjectEnvironmentSchema,
  z.object({
    projectId: z.string(),
  })
)
