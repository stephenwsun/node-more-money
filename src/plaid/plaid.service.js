import plaid from 'plaid'
import moment from 'moment'
import Model from './../db/model'
import database from './../db/database'

database.init()
const models = new Model(database.sequelize)

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

  async getItems(accessTokens) {
    const items = await Promise.all(
      accessTokens.map(async token => await this.client.getItem(token))
    )
    console.log('Items: ', items)
    return items
  }

  async getItem(accessToken) {
    const itemData = await this.client.getItem(accessToken)
    console.log('Item data: ', itemData)

    // const itemId = itemData.item.item_id
    const institutionId = itemData.item.institution_id

    const institutionData = await this.client.getInstitutionById(institutionId)
    console.log('Institution data: ', institutionData)
    const institutionName = institutionData.institution.name
    // Need to replace this with user id - add this info in JWT
    const appUserId = 1

    // Need to fix this
    return models.Item.insert({
      accessToken,
      institutionId,
      institutionName,
      appUserId,
    })
  }

  async getAccounts(accessTokens) {
    const arrayOfAccounts = await Promise.all(
      accessTokens.map(async accessToken => {
        const response = await this.client.getAccounts(accessToken)
        console.log('Response: ', response)

        const accounts = response.accounts
        const institutionId = response.item.institution_id
        const plaidItemId = response.item.item_id

        accounts.map(account => {
          account.id = account.account_id
          account.institutionId = institutionId
          account.balance = account.balances.current
          account.plaidItemId = plaidItemId
        })

        return accounts
      })
    )

    // accounts is currently array of arrays, need to flatten into one array
    let flatAccountsArray = []

    arrayOfAccounts.reduce(
      (flatAccountsArray, accountArray) =>
        (flatAccountsArray = flatAccountsArray.concat(accountArray)),
      []
    )

    console.log('Flat accounts array: ', flatAccountsArray)
    return flatAccountsArray
  }

  async getTransactionsByDates(fromDate, toDate) {
    const transactions = await this.client.getTransactions(
      req.header('Authorization'),
      fromDate,
      toDate
    )
    const mappedTransactions = []

    transactions.map(transaction => {
      const mappedTransaction = {}

      mappedTransaction.id = transaction.transaction_id
      mappedTransaction.plaidAccountId = transaction.account_id
      mappedTransaction.amount = Math.round(transaction.amount * 100)
      mappedTransaction.categoryId = transaction.category_id
      mappedTransaction.categories = JSON.stringify(transaction.category)
      mappedTransaction.dateOf = transaction.date
      mappedTransaction.location = JSON.stringify(transaction.location)
      mappedTransactions.push(mappedTransaction)
    })

    console.log('Mapped transactions: ', mappedTransactions)
    return {
      fromDate,
      toDate,
      mappedTransactions,
    }
  }

  async getTransactionsByDays(days) {
    const now = moment()
    const today = fromDate ? fromDate : now.format('YYYY-MM-DD')
    // default to 30 days
    const days = days ? days : now.subtract(30, 'days').format('YYYY-MM-DD')

    return this.getTransactionsByDates(days, today)
  }
}

const plaidClient = new PlaidClient()
export default plaidClient
