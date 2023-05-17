const express = require('express')

const apiKeyController = require('../controllers/google/apiKeyController')

const router = express.Router()

router.get('/key', apiKeyController.getApiKey)

module.exports = router
