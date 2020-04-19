import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import auth from './auth/auth.route'
import transactions from './transaction/transaction.route'

const app = express()

app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/auth', auth)
app.use('/transactions', transactions)

app.all('*', (req, res) => {
  res.status(404).send({
    msg: 'Not Found',
  })
})

export default app