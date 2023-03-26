import { z } from 'zod'
import { getErrorMessage } from '~/utils'

export const SkillSchema = z.object({
  name: z.string().trim().nonempty({
    message: getErrorMessage().notEmpty,
  }),
  yoe: z.number().min(1, getErrorMessage({ min: 0 }).min),
  isMain: z.nullable(z.boolean()),
})

export const CreateSkillEnvironmentSchema = z.object({
  membershipId: z.string(),
})

export const UpdateSkillEnvironmentSchema = z.intersection(
  CreateSkillEnvironmentSchema,
  z.object({
    membershipId: z.string(),
    skillId: z.string(),
  })
)
