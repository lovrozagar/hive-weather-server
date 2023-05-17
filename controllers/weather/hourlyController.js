const fetch = require('cross-fetch')

exports.getHourlyData = async (req, res) => {
  const { latitude, longitude, index } = req.query

  const prefix = 'https://api.open-meteo.com/v1/forecast?'
  const lat = `latitude=${latitude}`
  const lng = `&longitude=${longitude}`
  const options =
    '&hourly=relativehumidity_2m,temperature_2m,apparent_temperature,precipitation_probability,snowfall,weathercode,pressure_msl,cloudcover,visibility,windspeed_10m,winddirection_10m,uv_index,is_day&timezone=auto'

  try {
    const response = await fetch(`${prefix}${lat}${lng}${options}`)
    const json = await response.json()
    const { hourly } = json

    const indexDayHours = getSpecificDayHours(hourly, index)
    res.json(indexDayHours)
    //
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' })
  }
}

function getSpecificDayHours(hourlyObj, index) {
  const start = index * 24
  const end = start + 24

  const indexDayHours = {}
  for (let key in hourlyObj) {
    indexDayHours[key] = hourlyObj[key].slice(start, end)
  }

  return indexDayHours
}
