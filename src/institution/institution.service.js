import plaidClient from './../plaid/plaid.service'

export const getInstitutions = async accessTokens => {
  return await plaidClient.getItem(accessTokens)
}
