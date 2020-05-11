import express from 'express'
import accountController from './account.controller'

const router = express.Router()

router.get('/', accountController.getAccounts)

export default router
