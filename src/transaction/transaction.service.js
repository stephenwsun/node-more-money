import plaidClient from '../plaid/plaid.service'

export const getTransactionsByDays = async days => {
  return await plaidClient.getTransactionsByDays(daysBack)
}
