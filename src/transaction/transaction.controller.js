import moment from 'moment'
import plaidClient from '../plaid'

const transactionController = {}

transactionController.getTransactions = (req, res) => {
  // Pull transactions for the last 30 days
  const now = moment();
  const today = now.format('YYYY-MM-DD');
  const thirtyDaysAgo = now.subtract(30, 'days').format('YYYY-MM-DD');

  plaidClient.getTransactions(
    req.header('Authorization'),
    thirtyDaysAgo,
    today,
    {
      count: 250,
      offset: 0,
    },
    (error, transactionsResponse) => {
      res.json({ transactions: transactionsResponse })
      console.log(transactionsResponse)
    }
  )
}

export default transactionController
