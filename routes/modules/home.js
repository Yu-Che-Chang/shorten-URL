const express = require('express')
const router = express.Router()
const urlGenerator = require('../../public/javascripts/url-generator')
const httpExisted = require('../../public/javascripts/httpExisted')
const URL = require('../../models/URLData')

router.get('/', (req, res) => {
  res.render('index')
  console.log(req.xhr)
  if (res.statusCode !== 200) {
    res.render('error')
  }
})

router.post('/', (req, res) => {
  const input = req.body
  const inputValue = req.body.url
  const shortenInput = urlGenerator()
  const survey = { ...input, ...shortenInput }

  // 如果有相同網址匯入資料
  URL.findOne({ url: inputValue })
    .lean()
    .then((Data) => {
      if (Data) {
        console.log('There was already existed')
        res.render('index', { Data })
      } else {
        // 如果沒有則創建一組
        console.log('Create new one')
        URL.create(survey)
          .then(() => res.render('index', { Data: survey }))
          .catch(error => res.redirect('/error'))
      }
    })
    .catch(error => res.redirect('/error'))
})

module.exports = router