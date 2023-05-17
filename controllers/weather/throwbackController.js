const fetch = require('cross-fetch')

exports.getThrowbackData = async (req, res) => {
  const { latitude, longitude } = req.query
  const throwbackDate = getRandomYearTodaysDate()

  const prefix = 'https://archive-api.open-meteo.com/v1/era5?'
  const lat = `latitude=${latitude}`
  const lng = `&longitude=${longitude}`
  const startDate = `&start_date=${throwbackDate}`
  const endDate = `&end_date=${throwbackDate}`
  const options =
    '&hourly=temperature_2m,windspeed_10m,winddirection_10m,weathercode'

  try {
    const response = await fetch(
      `${prefix}${lat}${lng}${startDate}${endDate}${options}`
    )
    const json = await response.json()

    // RESPONSE CONTAINS HOURLY DATA, DEPENDING ON CURRENT HOUR, SAME HOUR OF THROWBACK DATA OF THE SAME DATE WILL BE USED FOR WEATHER DATA
    // ADDING THROWBACK DATE TO RESPONSE
    const jsonFormatted = {
      ...json,
      throwbackDate,
    }

    res.json(jsonFormatted)
    //
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' })
  }
}

const getRandomYearTodaysDate = () => {
  // 5 - 40 YEARS THROWBACK
  const randomThrowBackYear = Math.floor(Math.random() * 35) + 5

  const date = new Date()
  const year = date.getFullYear() - randomThrowBackYear
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}
