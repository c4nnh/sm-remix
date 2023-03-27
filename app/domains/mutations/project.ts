import { makeDomainFunction } from 'domain-functions'
import {
  CreateProjectEnvironmentSchema,
  ProjectSchema,
  UpdateProjectEnvironmentSchema,
} from '~/schemas'
import { db } from '~/services'
import { checkDateDuration } from '~/utils'

export const createProjectMutation = makeDomainFunction(
  ProjectSchema,
  CreateProjectEnvironmentSchema
)(async ({ ...dto }, { membershipId }) => {
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

  // if (
  //   skillIds &&
  //   !skillIds?.every(item => !!skills.find(skill => skill.id === item))
  // ) {
  //   throw `You does not have one of these skills`
  // }

  // const projectRoles = await db.projectRole.findMany({ where: {} })
  // if (!roleIds.every(item => !!projectRoles.find(role => role.id === item))) {
  //   throw `One of these roles is invalid`
  // }

  return db.$transaction(async tx => {
    const project = await tx.project.create({
      data: {
        ...dto,
        membershipId,
      },
    })

    // await tx.roleInProject.createMany({
    //   data: roleIds.map(item => ({
    //     projectId: project.id,
    //     projectRoleId: item,
    //   })),
    // })

    // if (skillIds && skillIds.length) {
    //   await tx.skillInProject.createMany({
    //     data: skillIds.map(item => ({
    //       projectId: project.id,
    //       projectRoleId: item,
    //     })),
    //   })
    // }
  })
})

export const updateProjectMutation = makeDomainFunction(
  ProjectSchema,
  UpdateProjectEnvironmentSchema
)(async ({ ...dto }, { membershipId, projectId }) => {
  console.log({ dto })
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
  })

  if (!project) {
    throw 'Project does not exist'
  }

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

  // if (
  //   skillIds &&
  //   !skillIds?.every(item => !!skills.find(skill => skill.id === item))
  // ) {
  //   throw `You does not have one of these skills`
  // }

  // const projectRoles = await db.projectRole.findMany({ where: {} })
  // if (!roleIds.every(item => !!projectRoles.find(role => role.id === item))) {
  //   throw `One of these roles is invalid`
  // }

  return db.$transaction(async tx => {
    const project = await tx.project.update({
      data: {
        ...dto,
      },
      where: {
        id: projectId,
      },
    })

    // await tx.roleInProject.createMany({
    //   data: roleIds.map(item => ({
    //     projectId: project.id,
    //     projectRoleId: item,
    //   })),
    // })

    // if (skillIds && skillIds.length) {
    //   await tx.skillInProject.createMany({
    //     data: skillIds.map(item => ({
    //       projectId: project.id,
    //       projectRoleId: item,
    //     })),
    //   })
    // }
  })
})
