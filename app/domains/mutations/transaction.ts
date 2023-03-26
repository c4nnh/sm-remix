import { makeDomainFunction } from 'domain-functions'
import {
  CreateTransactionEnvironmentSchema,
  TransactionSchema,
  UpdateTransactionEnvironmentSchema,
} from '~/schemas'
import { db } from '~/services'
import { isTwoObjectEqual } from '~/utils'

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

export const updateTransactionMutation = makeDomainFunction(
  TransactionSchema,
  UpdateTransactionEnvironmentSchema
)(async (updateTransactionDto, { membershipId, transactionId }) => {
  const transaction = await db.transaction.findUnique({
    where: { id: transactionId },
  })

  if (!transaction) {
    throw 'Transaction does not exist'
  }

  if (transaction.membershipId !== membershipId) {
    throw 'This transaction does not belong to you'
  }

  if (isTwoObjectEqual(updateTransactionDto, transaction)) {
    return transaction
  }

  return db.transaction.update({
    data: updateTransactionDto,
    where: { id: transactionId },
  })
})
