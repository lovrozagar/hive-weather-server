const dotenv = require('dotenv')

dotenv.config()

exports.getApiKey = (req, res) => {
  const googleKey = process.env.VITE_GOOGLE_API_KEY
  const responseObj = { key: googleKey }

  if (googleKey) res.json(responseObj)
  else res.status(500).json({ error: 'An error occurred' })
}
