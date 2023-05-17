const fetch = require('cross-fetch')

exports.getForecastData = async (req, res) => {
  const { latitude, longitude } = req.query

  const prefix = 'https://api.open-meteo.com/v1/forecast?'
  const lat = `latitude=${latitude}`
  const lng = `&longitude=${longitude}`
  const options =
    '&current_weather=true&hourly=relativehumidity_2m,temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max&timezone=auto'

  try {
    const response = await fetch(`${prefix}${lat}${lng}${options}`)
    const json = await response.json()
    res.json(json)
    //
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' })
  }
}
