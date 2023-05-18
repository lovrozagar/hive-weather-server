const express = require('express')
const cors = require('cors')
const weatherRoutes = require('./routes/weatherRoutes')
const googleRoutes = require('./routes/googleRoutes')

const app = express()
app.use(
  cors({
    origin: [
      'http://localhost:5000',
      'https://hive-weather-client.onrender.com',
      'https://hive-weather-client.netlify.app',
    ],
    credentials: true,
  })
)

app.use(express.json())

app.use('/api/weather', weatherRoutes)
app.use('/api/google', googleRoutes)

module.exports = app
