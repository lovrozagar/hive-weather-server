const express = require('express')
const cors = require('cors')
const weatherRoutes = require('./routes/weatherRoutes')
const googleRoutes = require('./routes/googleRoutes')

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
app.use('/api/google', googleRoutes)

module.exports = app
