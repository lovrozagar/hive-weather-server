const express = require('express')

const currentController = require('../controllers/weather/currentController')
const forecastController = require('../controllers/weather/forecastController')

const router = express.Router()

router.get('/current', currentController.getCurrentWeatherData)
router.get('/forecast', forecastController.getForecastData)

module.exports = router
