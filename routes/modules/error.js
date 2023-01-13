const express = require('express')
const { route } = require('./home')
const router = express.Router()

router.get('/', (req, res) => res.render('error'))

module.exports = router