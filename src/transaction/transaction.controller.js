import { getTransactionsByDays } from './transaction.service'

const transactionController = {}

transactionController.getTransactionsByDays = async (req, res) => {
  // Default to 30 days
  const days = req.query.days ? req.query.days : 30
  const accounts = await getTransactionsByDays(days)
  res.status(200).send(accounts)
}

export default transactionController
