const express = require('express')

const apiKeyController = require('../controllers/google/apiKeyController')
const geocodingController = require('../controllers/google/geocodingController')
const autocompleteController = require('../controllers/google/autocompleteController')

const router = express.Router()

router.get('/key', apiKeyController.getApiKey)
router.get('/geocoding', geocodingController.getUserPlace)
router.get('/autocomplete', autocompleteController.getSuggestions)

module.exports = router
