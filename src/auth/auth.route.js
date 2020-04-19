import express from 'express'
import authController from './auth.controller'

const router = express.Router()

router.post('/token', authController.getAccessToken)

export default router