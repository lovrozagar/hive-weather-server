const express = require('express')
const cors = require('cors')
const weatherRoutes = require('./routes/weatherRoutes')

const app = express()
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
)

app.use(express.json())

app.use('/api/weather', weatherRoutes)

module.exports = app
