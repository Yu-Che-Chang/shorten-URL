const express = require('express')
const router = express.Router()

const home = require('./modules/home')
router.use('/', home)

const urls = require('./modules/urls')
router.use('/shorturl', urls)

const error = require('./modules/error')
router.use('/error', error)

module.exports = router