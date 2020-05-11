import plaidClient from './../plaid/plaid.service'

export const getAccounts = async accessTokens => {
  return await plaidClient.getAccounts(accessTokens)
}
