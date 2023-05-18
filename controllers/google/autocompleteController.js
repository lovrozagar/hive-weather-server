const fetch = require('cross-fetch')
const dotenv = require('dotenv')

dotenv.config()

exports.getSuggestions = async (req, res) => {
  const { input } = req.query

  try {
    const prefix =
      'https://maps.googleapis.com/maps/api/place/autocomplete/json?'
    const envKey = process.env.VITE_GOOGLE_API_KEY
    const key = `key=${envKey}`

    const response = await fetch(`${prefix}input=${input}&types=geocode&${key}`)

    const json = await response.json()

    if (json.status === 'OK') {
      const predictions = json.predictions
      const suggestions = []

      for (const prediction of predictions) {
        const { place_id } = prediction
        const placeDetails = await getPlaceDetails(place_id, envKey)

        if (placeDetails) {
          const { city, country, countryCode, lat, lng } = placeDetails
          suggestions.push({
            city,
            country,
            countryCode,
            lat,
            lng,
          })
        }
      }

      res.json({ suggestions })
    }
    //
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' })
  }
}

async function getPlaceDetails(placeId, apiKey) {
  const detailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json?'
  const key = `key=${apiKey}`

  const response = await fetch(`${detailsUrl}place_id=${placeId}&${key}`)
  const json = await response.json()

  if (json.status === 'OK') {
    const { address_components } = json.result
    const cityComponent = address_components.find((component) =>
      component.types.includes('locality')
    )
    const countryComponent = address_components.find((component) =>
      component.types.includes('country')
    )

    if (cityComponent && countryComponent) {
      const city = cityComponent.long_name
      const country = countryComponent?.long_name || 'no-country' // HANDLE FOR UNDEFINED COUNTRIES LIKE PRISTINA, KOSOVO
      const countryCode = countryComponent?.short_name || 'no-country-code'
      const { lat, lng } = json.result.geometry.location
      return { city, country, countryCode, lat, lng }
    }
  }

  return null
}
