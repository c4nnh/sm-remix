import { makeDomainFunction } from 'domain-functions'
import {
  CreateProjectEnvironmentSchema,
  CreateUpdateProjectSchema,
  UpdateProjectEnvironmentSchema,
} from '~/schemas'
import { db } from '~/services'
import { checkDateDuration } from '~/utils'

export const createProjectMutation = makeDomainFunction(
  CreateUpdateProjectSchema,
  CreateProjectEnvironmentSchema
)(async ({ skillIds, roleIds, ...dto }, { membershipId }) => {
  const isValidDuration = checkDateDuration({
    from: dto.fromDate,
    to: dto.toDate,
  })

  if (!isValidDuration) {
    throw `From date must be same or before to date`
  }

  const existedProject = await db.project.findFirst({
    where: {
      membershipId,
      name: dto.name,
      isDeleted: false,
    },
  })

  if (existedProject) {
    throw `You already in a project with same name ${dto.name}`
  }

  const skills = await db.skill.findMany({
    where: {
      membershipId,
      isDeleted: false,
    },
  })

  if (
    skillIds &&
    !skillIds?.every(item => !!skills.find(skill => skill.id === item))
  ) {
    throw `You does not have one of these skills`
  }

  const projectRoles = await db.projectRole.findMany({ where: {} })
  if (!roleIds.every(item => !!projectRoles.find(role => role.id === item))) {
    throw `One of these roles is invalid`
  }

  return db.$transaction(async tx => {
    const project = await tx.project.create({
      data: {
        ...dto,
        membershipId,
      },
    })

    await tx.roleInProject.createMany({
      data: roleIds.map(item => ({
        projectId: project.id,
        projectRoleId: item,
      })),
    })

    await tx.skillInProject.createMany({
      data: skillIds.map(item => ({
        projectId: project.id,
        skillId: item,
      })),
    })
  })
})

export const updateProjectMutation = makeDomainFunction(
  CreateUpdateProjectSchema,
  UpdateProjectEnvironmentSchema
)(async ({ skillIds, roleIds, ...dto }, { membershipId, projectId }) => {
  const isValidDuration = checkDateDuration({
    from: dto.fromDate,
    to: dto.toDate,
  })

  if (!isValidDuration) {
    throw `From date must be same or before to date`
  }

  const project = await db.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      rolesInProject: {
        select: {
          projectRoleId: true,
        },
      },
      skillsInProject: {
        select: {
          skillId: true,
        },
      },
    },
  })

  if (!project) {
    throw 'Project does not exist'
  }

  const oldRoleIds = project.rolesInProject.map(item => item.projectRoleId)
  const oldSkillIds = project.skillsInProject.map(item => item.skillId)

  const newRoleIds = roleIds.filter(item => !oldRoleIds.includes(item))
  const newSkillIds = skillIds.filter(item => !oldSkillIds.includes(item))

  const useDeletedRoleId = await db.projectRole.findFirst({
    where: {
      id: {
        in: newRoleIds,
      },
      isDeleted: true,
    },
  })

  if (useDeletedRoleId) {
    throw `One of these role is deleted`
  }

  const useDeletedSkillId = await db.skill.findFirst({
    where: {
      id: {
        in: newSkillIds,
      },
      isDeleted: true,
    },
  })

  if (useDeletedSkillId) {
    throw `One of these skill is deleted`
  }

  const deleteRoleIds = oldRoleIds.filter(item => !roleIds.includes(item))
  const deleteSkillIds = oldSkillIds.filter(item => !skillIds.includes(item))

  const existedProject = await db.project.findFirst({
    where: {
      membershipId,
      name: dto.name,
      isDeleted: false,
      id: {
        not: projectId,
      },
    },
  })

  if (existedProject) {
    throw `You already in a project with same name ${dto.name}`
  }

  const skills = await db.skill.findMany({
    where: {
      membershipId,
      isDeleted: false,
    },
  })

  if (
    skillIds &&
    !skillIds?.every(item => !!skills.find(skill => skill.id === item))
  ) {
    throw `You does not have one of these skills`
  }

  const projectRoles = await db.projectRole.findMany({ where: {} })
  if (!roleIds.every(item => !!projectRoles.find(role => role.id === item))) {
    throw `One of these roles is invalid`
  }

  return db.$transaction(async tx => {
    await tx.project.update({
      data: {
        ...dto,
      },
      where: {
        id: projectId,
      },
    })

    if (newRoleIds && newRoleIds.length) {
      await tx.roleInProject.createMany({
        data: newRoleIds.map(item => ({
          projectId: project.id,
          projectRoleId: item,
        })),
      })
    }

    if (deleteRoleIds && deleteRoleIds.length) {
      await tx.roleInProject.deleteMany({
        where: {
          projectId: project.id,
          projectRoleId: {
            in: deleteRoleIds,
          },
        },
      })
    }

    if (newSkillIds && newSkillIds.length) {
      await tx.skillInProject.createMany({
        data: newSkillIds.map(item => ({
          projectId: project.id,
          skillId: item,
        })),
      })
    }

    if (deleteSkillIds && deleteSkillIds.length) {
      await tx.skillInProject.deleteMany({
        where: {
          projectId: project.id,
          skillId: {
            in: deleteSkillIds,
          },
        },
      })
    }
  })
})
