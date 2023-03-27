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
  roleIds: z.array(z.string()).min(1),
  skillIds: z.optional(z.array(z.string())),
  year: z.optional(z.number().min(0, getErrorMessage({ min: 0 }).min)),
  month: z.optional(z.number().min(0, getErrorMessage({ min: 0 }).min)),
  day: z.optional(z.number().min(0, getErrorMessage({ min: 0 }).min)),
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
