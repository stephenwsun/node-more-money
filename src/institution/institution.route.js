import express from 'express'
import institutionController from './institution.controller'

const router = express.Router()

router.get('/', institutionController.getInstitutions)

export default router
