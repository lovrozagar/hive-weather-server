const express = require('express')

const apiKeyController = require('../controllers/google/apiKeyController')
const geocodingController = require('../controllers/google/geocodingController')

const router = express.Router()

router.get('/key', apiKeyController.getApiKey)
router.get('/geocoding', geocodingController.getUserPlace)

module.exports = router
