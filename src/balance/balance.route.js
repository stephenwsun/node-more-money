import express from 'express'
import balanceController from './balance.controller'

const router = express.Router()

router.get('/', balanceController.getBalances)

export default router
