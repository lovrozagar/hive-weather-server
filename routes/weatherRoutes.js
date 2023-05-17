const express = require('express')

const currentController = require('../controllers/weather/currentController')
const forecastController = require('../controllers/weather/forecastController')
const hourlyController = require('../controllers/weather/hourlyController')

const router = express.Router()

router.get('/current', currentController.getCurrentData)
router.get('/forecast', forecastController.getForecastData)
router.get('/throwback', throwbackController.getThrowbackData)
router.get('/hourly', hourlyController.getHourlyData)

module.exports = router
