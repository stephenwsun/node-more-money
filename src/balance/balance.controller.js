import plaidClient from '../plaid'

const balanceController = {}

balanceController.getBalances = (req, res) => {
  plaidClient.getAccounts(req.header('Authorization'))
  plaidClient.getBalance(req.header('Authorization'))
}

export default balanceController
