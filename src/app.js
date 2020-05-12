import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import plaidClient from './plaid/plaid.service'

import auth from './auth/auth.route'
import institutions from './institution/institution.route'
import accounts from './account/account.route'
import transactions from './transaction/transaction.route'
import balances from './balance/balance.route'
import { config } from './config'

const app = express()

plaidClient.init(
  config.plaidClientId,
  config.plaidSandboxSecret,
  config.plaidPublicKey
)

app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/auth', auth)
app.use('/institutions', institutions)
app.use('/accounts', accounts)
app.use('/transactions', transactions)
app.use('/balances', balances)

app.all('*', (req, res) => {
  res.status(404).send({
    msg: 'Not Found',
  })
})

export default app
