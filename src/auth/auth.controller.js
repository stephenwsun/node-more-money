import plaidClient from '../plaid/plaid.service'

const authController = {}

authController.getAccessToken = (req, res) => {
  // First, receive the public token and set it to a variable
  const publicToken = req.body.public_token
  // Second, exchange the public token for an access token
  plaidClient.exchangePublicToken(publicToken, (error, tokenResponse) => {
    const accessToken = tokenResponse.access_token
    const itemId = tokenResponse.item_id
    res.json({
      access_token: accessToken,
      item_id: itemId,
    })
    console.log(accessToken)
  })
}

export default authController
