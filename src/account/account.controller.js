import { getAccounts } from './account.service'

const accountController = {}

accountController.getAccounts = async (req, res) => {
  const accessToken = req.header('Authorization')
  const accounts = await getAccounts(accessToken)
  res.status(200).send(accounts)
}

export default accountController
