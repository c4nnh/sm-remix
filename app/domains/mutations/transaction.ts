import { makeDomainFunction } from 'domain-functions'
import {
  CreateTransactionEnvironmentSchema,
  TransactionSchema,
} from '~/schemas'
import { db } from '~/services'

export const createTransactionMutation = makeDomainFunction(
  TransactionSchema,
  CreateTransactionEnvironmentSchema
)(async (createTransactionDto, { membershipId }) => {
  return db.transaction.create({
    data: {
      ...createTransactionDto,
      membershipId,
    },
  })
})
