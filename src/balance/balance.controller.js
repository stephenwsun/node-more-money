import plaid from '../plaid/plaid.service'

const balanceController = {}

balanceController.getBalances = (req, res) => {
  plaid.client.getAccounts(req.header('Authorization'))
  plaid.client.getBalance(req.header('Authorization'))
}

export default balanceController
