const express = require('express')

const currentController = require('../controllers/weather/currentController')

const router = express.Router()

router.get('/current', currentController.getCurrentWeatherData)

module.exports = router
