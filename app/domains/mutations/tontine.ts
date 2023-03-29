import { makeDomainFunction } from 'domain-functions'
import {
  CreateTontineEnvironmentSchema,
  TontineSchema,
  UpdateTontineEnvironmentSchema,
} from '~/schemas'
import { db } from '~/services'
import { isTwoObjectEqual } from '~/utils'

export const createTontineMutation = makeDomainFunction(
  TontineSchema,
  CreateTontineEnvironmentSchema
)(async (createTontineDto, { membershipId }) => {
  return db.tontine.create({
    data: {
      ...createTontineDto,
      membershipId,
    },
  })
})

export const updateTontineMutation = makeDomainFunction(
  TontineSchema,
  UpdateTontineEnvironmentSchema
)(async (updateTontineDto, { membershipId, tontineId }) => {
  const tontine = await db.tontine.findUnique({
    where: { id: tontineId },
  })

  if (!tontine) {
    throw 'Tontine does not exist'
  }

  if (tontine.membershipId !== membershipId) {
    throw 'This tontine does not belong to you'
  }

  if (isTwoObjectEqual(updateTontineDto, tontine)) {
    return tontine
  }

  return db.tontine.update({
    data: updateTontineDto,
    where: { id: tontineId },
  })
})
