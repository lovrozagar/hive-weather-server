const fetch = require('cross-fetch')

exports.getCurrentWeatherData = async (req, res) => {
  const { latitude, longitude } = req.query

  const prefix = 'https://api.open-meteo.com/v1/forecast?'
  const lat = `latitude=${latitude}`
  const lng = `longitude=${longitude}`
  const options = `&current_weather=true&hourly=temperature_2m,windspeed_10m,weathercode`

  try {
    const response = await fetch(`${prefix}${lat}${lng}${options}`)
    const json = await response.json()
    const { current_weather } = json

    res.json(current_weather)
    //
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' })
  }
}
