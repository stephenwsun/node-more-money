import moment from 'moment'
import plaidClient from '../plaid'

const transactionController = {}

transactionController.getTransactions = (req, res) => {
  // Pull transactions for the last 30 days
  let startDate = moment()
    .subtract(30, "days")
    .format("YYYY-MM-DD");
  let endDate = moment().format("YYYY-MM-DD")

  plaidClient.getTransactions(
    req.query.accessToken,
    startDate,
    endDate,
    {
      count: 250,
      offset: 0
    },
    function(error, transactionsResponse) {
      res.json({ transactions: transactionsResponse })
      console.log(transactionsResponse);
    }
  )
}

export default transactionController