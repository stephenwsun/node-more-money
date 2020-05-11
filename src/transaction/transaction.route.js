import express from 'express'
import transactionController from './transaction.controller'

const router = express.Router()

router.get('/', transactionController.getTransactionsByDays)

export default router
