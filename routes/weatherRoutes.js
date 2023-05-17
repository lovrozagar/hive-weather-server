const express = require('express')

const currentController = require('../controllers/weather/currentController')
const forecastController = require('../controllers/weather/forecastController')
const throwbackController = require('../controllers/weather/throwbackController')

const router = express.Router()

router.get('/current', currentController.getCurrentData)
router.get('/forecast', forecastController.getForecastData)
router.get('/throwback', throwbackController.getThrowbackData)

module.exports = router
