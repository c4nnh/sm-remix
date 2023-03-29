import { makeDomainFunction } from 'domain-functions'
import {
  CreateSkillEnvironmentSchema,
  SkillSchema,
  UpdateSkillEnvironmentSchema,
} from '~/schemas'
import { db } from '~/services'
import { isTwoObjectEqual } from '~/utils'

export const createSkillMutation = makeDomainFunction(
  SkillSchema,
  CreateSkillEnvironmentSchema
)(async (createSkillDto, { membershipId }) => {
  const existedSkill = await db.skill.findFirst({
    where: {
      name: createSkillDto.name,
      membershipId,
      isDeleted: false,
    },
  })

  if (existedSkill) {
    throw `You already have a skill with same name ${createSkillDto.name}`
  }

  return db.skill.create({
    data: {
      ...createSkillDto,
      membershipId,
    },
  })
})

export const updateSkillMutation = makeDomainFunction(
  SkillSchema,
  UpdateSkillEnvironmentSchema
)(async (updateSkilLDto, { membershipId, skillId }) => {
  const skill = await db.skill.findUnique({ where: { id: skillId } })

  if (!skill) {
    throw 'Skill does not exist'
  }

  if (skill.membershipId !== membershipId) {
    throw 'This skill does not belong to you'
  }

  if (isTwoObjectEqual(updateSkilLDto, skill)) {
    return skill
  }

  const existedSkill = await db.skill.findFirst({
    where: {
      name: {
        contains: updateSkilLDto.name,
      },
      id: {
        not: skillId,
      },
      isDeleted: false,
    },
  })

  if (existedSkill) {
    throw `You already have a skill with same name ${updateSkilLDto.name}`
  }

  return db.skill.update({
    data: updateSkilLDto,
    where: { id: skillId },
  })
})
