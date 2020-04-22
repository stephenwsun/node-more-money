import plaid from 'plaid'
import { config } from './config'

const plaidClient = new plaid.Client(
  config.plaidClientId,
  config.plaidSandboxSecret,
  config.plaidPublicKey,
  plaid.environments.sandbox,
  { version: '2019-05-29' }
)

export default plaidClient
