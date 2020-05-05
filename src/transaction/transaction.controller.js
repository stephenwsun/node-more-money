import moment from 'moment'
import { getTransactions } from './transaction.service'

const transactionController = {}

transactionController.getTransactions = (req, res) => {
  getTransactions()

  // const now = moment();
  // const today = now.format('YYYY-MM-DD');
  // const thirtyDaysAgo = now.subtract(30, 'days').format('YYYY-MM-DD');

  // plaid.client.getTransactions(
  //   req.header('Authorization'),
  //   thirtyDaysAgo,
  //   today,
  //   {
  //     count: 250,
  //     offset: 0,
  //   },
  //   (error, transactionsResponse) => {
  //     res.json({ transactions: transactionsResponse })
  //     console.log(transactionsResponse)
  //   }
  // )
}

export default transactionController
