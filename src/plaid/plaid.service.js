import plaid from 'plaid'
import moment from 'moment'

class PlaidClient {
  constructor() {}

  init(clientId, secret, publicKey) {
    this.client = new plaid.Client(
      clientId,
      secret,
      publicKey,
      plaid.environments.sandbox,
      { version: '2019-05-29' }
    )
  }

  getTransactions() {
    const now = moment()
    const today = now.format('YYYY-MM-DD')
    const thirtyDaysAgo = now.subtract(30, 'days').format('YYYY-MM-DD')

    this.client.getTransactions(
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
}

const plaidClient = new PlaidClient()
export default plaidClient
