import plaid from '../plaid/plaid.service'
import database from './../db/database'

export const getTransactions = async () => {
  // Pull transactions for the last 30 days
  const plaidTransactions = plaid.getTransactions()
  // Save transactions in database
}
