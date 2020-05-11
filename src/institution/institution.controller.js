import { getInstitutions } from './institution.service'

const institutionController = {}

institutionController.getInstitutions = async (req, res) => {
  const accessToken = req.header('Authorization')
  const institutions = await getAccounts(accessToken)
  res.status(200).send(institutions)
}

export default institutionController
