const fetch = require('cross-fetch')
const dotenv = require('dotenv')

dotenv.config()

exports.getUserPlace = async (req, res) => {
  const { latitude, longitude } = req.query

  const prefix = 'https://maps.googleapis.com/maps/api/geocode/json?'
  const coords = `latlng=${latitude},${longitude}`
  const envKey = process.env.VITE_GOOGLE_API_KEY
  const key = `&key=${envKey}`

  try {
    const response = await fetch(`${prefix}${coords}${key}`)
    const json = await response.json()

    let city, country, countryCode
    json.results[0].address_components.forEach((component) => {
      if (component.types.includes('locality')) {
        city = component.long_name
      }
      if (component.types.includes('country')) {
        process.env.VITE_GOOGLE_API_KEY
        country = component.long_name
        countryCode = component.short_name
      }
    })
    const placeResponse = { city, country, countryCode }

    res.json(placeResponse)
    //
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' })
  }
}
