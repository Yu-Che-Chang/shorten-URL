const express = require('express')
const router = express.Router()
const URL = require('../../models/URLData')

router.get('/:url', (req, res) => {
  const params = req.params.url
  const shortenUrl = "/shorturl/" + params
  URL.findOne({ shortenUrl })
    .lean()
    .then((Data) =>
      res.redirect(Data.url)
    )
    .catch(error => res.redirect('/error'))
})


module.exports = router